/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */

const {classes: Cc, interfaces: Ci, utils: Cu} = Components;
const PREF_BRANCH = "extensions.tabcounter.";
const PREFS = {
	color: "", fontSize: "", fontFamily: "", fontWeight: "", preLabel: "",
	postLabel: "", useFormatString: false, formatString: "%n", noAppTabs: false,
	noTooltip: false
}

Cu.import("resource://gre/modules/XPCOMUtils.jsm");
Cu.import("resource://gre/modules/Services.jsm");

let global = this;
let addonData = null;
let disabled = true;

/* Includes a javascript file with loadSubScript
*
* @param src (String)
* The url of a javascript file to include.
*/
(function(global) global.include = function include(src) {
  var o = {};
  Components.utils.import("resource://gre/modules/Services.jsm", o);
  var uri = o.Services.io.newURI(
      src, null, o.Services.io.newURI(__SCRIPT_URI_SPEC__, null, null));
  o.Services.scriptloader.loadSubScript(uri.spec, global);
})(this);

/* Imports a commonjs style javascript file with loadSubScrpt
 * 
 * @param src (String)
 * The url of a javascript file.
 */
(function(global) {
  var modules = {};
  global.require = function require(src) {
    if (modules[src]) return modules[src];
    var scope = {require: global.require, exports: {}};
    var tools = {};
    Cu.import("resource://gre/modules/Services.jsm", tools);
    var baseURI = tools.Services.io.newURI(__SCRIPT_URI_SPEC__, null, null);
    try {
      var uri = tools.Services.io.newURI(
          "packages/" + src + ".js", null, baseURI);
      tools.Services.scriptloader.loadSubScript(uri.spec, scope);
    } catch (e) {
      var uri = tools.Services.io.newURI(src, null, baseURI);
      tools.Services.scriptloader.loadSubScript(uri.spec, scope);
    }
    return modules[src] = scope.exports;
  }
})(this);


/**
 * Initialize default preferences specified in PREFS
 */
function setDefaultPrefs() {
  let branch = Services.prefs.getDefaultBranch(PREF_BRANCH);
  for (let [key, val] in Iterator(PREFS)) {
    switch (typeof val) {
      case "boolean":
        branch.setBoolPref(key, val);
        break;
			case "number":
				if (Math.round(val) == val) {
					branch.setIntPref(key, val);
					break;
				}
      case "string":
        branch.setCharPref(key, val);
        break;
    }
  }
}

include("includes/buttons.js");

var {unload} = require("unload");
var {runOnLoad, runOnWindows, watchWindows} = require("window-utils");
var {loadOverlay, applyOverlay} = require("overlay");

function install(params, reason) {}
function uninstall(params, reason) {
	// remove preferences when uninstalling
	if (reason == ADDON_UNINSTALL) {
		Services.prefs.deleteBranch(PREF_BRANCH);
	}
}

function startup(params, reason)
{
	disabled = false;
	addonData = params;

	// If installing set default button position to the nav-bar before the bookmark container or in menu bar
  if (reason == ADDON_INSTALL) {
		switch(Services.appinfo.name) {
			case "Firefox":
				setDefaultPosition("tabcounter-toolbar-item", "TabsToolbar", "alltabs-button");
				break;
			case "SeaMonkey":
				setDefaultPosition("tabcounter-toolbar-item", "toolbar-menubar", "spring");
				break;
		}
  };

	// Load default preferences
	setDefaultPrefs();
	
	// Read in window overlay
	loadOverlay();
	
	// Watch for existing and newly opened windows
	watchWindows(applyOverlay, "navigator:browser");

	// Add unload functions
	unload(function() { 
		// If options window open, close it
		let win = Services.wm.getMostRecentWindow("TabCounter:Options");
		if (win)
			win.close();
		Services.strings.flushBundles();
	});
}

function shutdown(params, reason)
{
	disabled = true;

	// Don't both unloading if shutting down
	if (reason == APP_SHUTDOWN)
		return;

	unload();
	addonData = null;
}
