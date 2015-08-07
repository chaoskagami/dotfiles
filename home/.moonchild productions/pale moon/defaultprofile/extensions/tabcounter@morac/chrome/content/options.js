function savePrefs(saveNow) {
	if (saveNow) {
		var prefs = document.getElementsByTagName('preference');
		for (var i=0; i<prefs.length; i++) {
			prefs[i].valueFromPreferences = prefs[i].value;
		}
		document.getElementById("tab_counter_prefs").getButton("extra1").disabled = true;
	}
	
	var windowsEnum = Components.classes["@mozilla.org/appshell/window-mediator;1"]
	                  .getService(Components.interfaces.nsIWindowMediator).getEnumerator("navigator:browser");
	while (windowsEnum.hasMoreElements())
	{
		var win = windowsEnum.getNext();
		if (win.gTabCounter) win.gTabCounter.updateToolbar2();
	}
}
		
function openLink(url) {
	var top = Components.classes["@mozilla.org/appshell/window-mediator;1"]
             .getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser");
		             
    if (!top) window.open(url, "", "");
    else {
	    var tBrowser = top.document.getElementById("content");
			
		// Is current tab blank.	Different methods for determining depending on whether browser is
		// FF 1.5 or FF 1.0 based
		var currBlank =  (tBrowser && 
		                  (tBrowser.mCurrentTab.linkedBrowser && 
		                   (tBrowser.mCurrentTab.linkedBrowser.contentDocument.location == "about:blank")) ||
		                  (!tBrowser.mCurrentTab.linkedBrowser && 
		                   (tBrowser.mCurrentTab.label == "(Untitled)")));
				                   
		if (currBlank) tBrowser.loadURI(url);
		else {
			var tab = tBrowser.addTab(url);
			tBrowser.selectedTab = tab;
			if (top.gTabCounter) top.gTabCounter.updateToolbar2();
		}
	}
}

function toggleUseFormatString(useFormatString) {
    document.getElementById("optionTextGrid").hidden = useFormatString;

    document.getElementById("formatStringGrid").hidden = !useFormatString;
}

function useFormatStringCheckboxChanged(event) {
    toggleUseFormatString(event.target.checked);
}

/**
 * setMaxWindowHeight
 *
 * Set the window size to the largest content that can be displayed by way of
 * the toggleUseFormatString() method.
 *
 * This is a pretty ugly hack, but it appears to be the easiest way to make
 * sure the window is big enough for whatever we will display.
 *
 * This method should only be called one time, from onLoad().
 * toggleUseFormatString() MUST be called after calling this method to set the
 * Options window to the correct state based on useFormatString.
 */
function setMaxWindowHeight() {
    // Check the height when toggleUseFormatString is set to the true state:
    toggleUseFormatString(true);
    sizeToContent();
    var height_when_true = document.height;

    // Set toggleUseFormatString to the false state and resize to reflect that:
    toggleUseFormatString(false);
    sizeToContent();

    // If the window was bigger when toggleUseFormatString was in the true
    // state, resize the window to match the size in the that state.
    if( height_when_true > document.height ) {
        toggleUseFormatString(true);
        sizeToContent();
    }
}

function onLoad() {
	// fix window size by giving explicit height to label
	var elem = document.getElementById("info"); 
	elem.style.height=document.defaultView.getComputedStyle(elem, null).getPropertyValue("height");
	
	// disable apply button
	document.getElementById("tab_counter_prefs").getButton("extra1").disabled = true;
	
	if ((typeof(Application) == "undefined") || (Application.name != "Firefox" || parseInt(Application.version) < 4)) {
		document.getElementById("noAppTabsCheckbox").style.visibility = "collapse";
	}
	
	// Update tooltip localization
	localizeTooltips()
	
	// Correctly enable/disable the labelling fields
	var useFormatStringCheckbox = document.getElementById("useFormatStringCheckbox");
	useFormatStringCheckbox.addEventListener("CheckboxStateChange", useFormatStringCheckboxChanged, false);
	setMaxWindowHeight();
	toggleUseFormatString(useFormatStringCheckbox.checked);

	// focus on first text field
	document.getElementById('color').focus();
}

function enableApply() {
	document.getElementById("tab_counter_prefs").getButton("extra1").disabled = false;
}

function localizeTooltips() {
	var mBundle = document.getElementById("bundle_tabcounter");
	document.getElementById("after").value = "%" + mBundle.getString("formatStringToolTip.after.key") + document.getElementById("after").value;
	document.getElementById("before").value = "%" + mBundle.getString("formatStringToolTip.before.key") + document.getElementById("before").value;
	document.getElementById("current").value = "%" + mBundle.getString("formatStringToolTip.current.key") + document.getElementById("current").value;
	document.getElementById("number").value = "%" + mBundle.getString("formatStringToolTip.number.key") + document.getElementById("number").value;
	document.getElementById("visible_after").value = "%" + mBundle.getString("formatStringToolTip.visible_after.key") + document.getElementById("visible_after").value;
	document.getElementById("visible_before").value = "%" + mBundle.getString("formatStringToolTip.visible_before.key") + document.getElementById("visible_before").value;
	document.getElementById("visible_current").value = "%" + mBundle.getString("formatStringToolTip.visible_current.key") + document.getElementById("visible_current").value;
	document.getElementById("visible_number").value = "%" + mBundle.getString("formatStringToolTip.visible_number.key") + document.getElementById("visible_number").value;
}
	
