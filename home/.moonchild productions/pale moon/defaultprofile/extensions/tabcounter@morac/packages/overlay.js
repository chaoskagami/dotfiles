var {Cc, Ci, Cu} = require("chrome");

var overlay_loaded = false;
var windows_already_loaded = [];
var overlay = {};

/**
 * Provesses overlay document data and initializes overlay property.
 */
function processOverlay(/**Element*/ root)
{
	// Remove whitespace text nodes
	let walker = root.ownerDocument.createTreeWalker(
		root, Ci.nsIDOMNodeFilter.SHOW_TEXT,
		function(node) !/\S/.test(node.nodeValue), false
	);
	let whitespaceNodes = [];
	while (walker.nextNode())
		whitespaceNodes.push(walker.currentNode);

	for (let i = 0; i < whitespaceNodes.length; i++)
		whitespaceNodes[i].parentNode.removeChild(whitespaceNodes[i]);

	// Put overlay elements into appropriate fields
	while (root.firstElementChild)
	{
		let child = root.firstElementChild;

		if (child.getAttribute("id"))
			overlay[child.getAttribute("id")] = child;
		root.removeChild(child);
	}
	
	overlay_loaded = true;
	
	// apply overlay to windows that already loaded
	while (windows_already_loaded.length) {
		exports.applyOverlay(windows_already_loaded.pop());
	}
};

exports.loadOverlay = function() {
	let request = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIJSXMLHttpRequest);
	request.mozBackgroundRequest = true;
	request.open("GET", "chrome://tabcounter-morac/content/tabcounter.xul");
	request.addEventListener("load", function(event)
	{
		if (disabled)
			return;
			
		processOverlay(request.responseXML.documentElement);
	}.bind(this), false);
	request.send(null);
};

exports.applyOverlay = function(window) {
	let toolbarElems = ["toolbarbutton", "toolbaritem"];
	if (overlay_loaded) {
	
		// Add non speical items to window
		for (let id in overlay) {
			// Toolbar buttons needs to be added manually
			if (id == "BrowserToolbarPalette") {
				for (let i=0; i < overlay[id].childNodes.length; i++) 
					if (toolbarElems.indexOf(overlay[id].childNodes[i].nodeName.toLowerCase()) != -1) 
						restorePosition(window.document, overlay[id].childNodes[i].cloneNode(true));
			}
			// If normal element, just add it's children to the element
			else {
				let elem = window.document.getElementById(id);
				if (elem) {
					for (let i=0; i < overlay[id].childNodes.length; i++) 
						elem.appendChild(overlay[id].childNodes[i].cloneNode(true));
				}
			}
		}

		// Run script
		try {
			Services.scriptloader.loadSubScript("chrome://tabcounter-morac/content/tabcounter.js", window);
		}
		catch(ex) {
			Cu.reportError(ex);
		}
		
		function removeOverlay() {
			window.gTabCounter.uninitialize();

			// Try to find and remove toolbar button from the toolbar palette.
			let toolbox = window.document.getElementById("navigator-toolbox");
			for (let childElem = toolbox.palette.firstElementChild; childElem; childElem = childElem.nextElementSibling)
				if (childElem.id == "tabcounter-toolbar-item")
					childElem.parentNode.removeChild(childElem);
					
			for (let id in overlay) {
				for (let i=0; i < overlay[id].childNodes.length; i++) {
					let childElem = window.document.getElementById(overlay[id].childNodes[i].getAttribute("id"));
					if (childElem) 
						childElem.parentNode.removeChild(childElem);
				}
			}

			window.gTabCounter = null;
		}
		
		unload(removeOverlay, window);
	}
	else {
		// Window loaded before we were ready so process it when finished loading overlay
		windows_already_loaded.push(window);
	}
};


