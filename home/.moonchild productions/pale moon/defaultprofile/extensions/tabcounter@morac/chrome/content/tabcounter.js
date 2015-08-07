Components.utils.import("resource://gre/modules/Services.jsm");

var gTabCounter = {
	mBundle: null,
	mLastTabClosed: false,
	lastCount: 0,
	storedTooltip: null,

	/*
 	* do stuff when new browser window opens 
 	*/
	initialize : function() {
		gTabCounter.Gecko191Up = (Services.vc.compare(Services.appinfo.platformVersion, "1.9.1a1pre") >= 0);
		gTabCounter.isFF = (Application.name == "Firefox");
		gTabCounter.FF4Up = (typeof(Application) == "object") && (Application.name == "Firefox") && (Services.vc.compare(Services.appinfo.platformVersion, "2.0a1pre") >= 0);
	
		window.addEventListener("aftercustomization", gTabCounter.updateToolbar, false);

		var container = gBrowser.tabContainer;
		container.addEventListener("TabOpen", gTabCounter.updateToolbar, false);
		container.addEventListener("TabClose", gTabCounter.updateToolbar, false);
		container.addEventListener("TabMove", gTabCounter.updateToolbar, false);
		container.addEventListener("TabSelect", gTabCounter.updateToolbar, false);
		if (gTabCounter.FF4Up) {
			window.addEventListener("tabviewhidden", gTabCounter.updateToolbar, false);
			container.addEventListener("TabPinned", gTabCounter.updateToolbar, false);
			container.addEventListener("TabUnpinned", gTabCounter.updateToolbar, false);
			// This is needed to correctly update tab count groups are restored.
			Services.obs.addObserver(gTabCounter, "sessionstore-windows-restored", false);
			Services.obs.addObserver(gTabCounter, "sessionstore-browser-state-restored",false);
		}
		
		// Update tab count
		gTabCounter.updateToolbar();
	},
   
	/* 
 	* do stuff when browser window closes
 	*/
	uninitialize : function() {
		window.removeEventListener("aftercustomization", gTabCounter.updateToolbar, false);
	
		var container = gBrowser.tabContainer;
		container.removeEventListener("TabOpen", gTabCounter.updateToolbar, false);
		container.removeEventListener("TabClose", gTabCounter.updateToolbar, false);
		container.removeEventListener("TabMove", gTabCounter.updateToolbar, false);
		container.removeEventListener("TabSelect", gTabCounter.updateToolbar, false);
		if (gTabCounter.FF4Up) {
			window.removeEventListener("tabviewhidden", gTabCounter.updateToolbar, false);
			container.removeEventListener("TabPinned", gTabCounter.updateToolbar, false);
			container.removeEventListener("TabUnpinned", gTabCounter.updateToolbar, false);
			Services.obs.removeObserver(gTabCounter, "sessionstore-windows-restored");
			Services.obs.removeObserver(gTabCounter, "sessionstore-browser-state-restored");
		}
		gTabCounter = null;
	},
	
	observe: function(aSubject, aTopic, aData)
	{
		switch (aTopic)
		{
		case "sessionstore-windows-restored":
		case "sessionstore-browser-state-restored":
			//dump(aTopic + "\n");
			this.updateToolbar2();
			break;
		}
	},
	
	expandCountStringFormats : function(formatString, tabCount, currentTab, totalCount, totalCurrentTab, pinned) {
		var expandedString = formatString.replace("%" + this._string("formatStringToolTip.visible_after.key"), pinned ? tabCount : (tabCount - currentTab));
		expandedString = expandedString.replace("%" + this._string("formatStringToolTip.visible_before.key"), pinned ? "0" : (currentTab - 1));
		expandedString = expandedString.replace("%" + this._string("formatStringToolTip.visible_current.key"), pinned ? "0" : currentTab);
		expandedString = expandedString.replace("%" + this._string("formatStringToolTip.visible_number.key"), tabCount);
		expandedString = expandedString.replace("%" + this._string("formatStringToolTip.after.key"), pinned ? totalCount : (totalCount - totalCurrentTab));
		expandedString = expandedString.replace("%" + this._string("formatStringToolTip.before.key"), pinned ? "0" : (totalCurrentTab - 1));
		expandedString = expandedString.replace("%" + this._string("formatStringToolTip.current.key"), pinned ? "0" : totalCurrentTab);
		expandedString = expandedString.replace("%" + this._string("formatStringToolTip.number.key"), totalCount);
		
		return expandedString;
	},
	
	// The offset is used to correct when ignoring app tabs
	findTabIndex: function(aTab, offSet) {
		var totalCurrent = null;
		// Find total current tab
		// For Firefox, the tab index is stored in _tPos. For SeaMonkey use gBrowser.getTabIndex.  If that doesn't exist, do a search.
		if (typeof aTab._tPos != "undefined") totalCurrent = aTab._tPos
		else if (typeof gBrowser.getTabIndex == "function") totalCurrent = gBrowser.getTabIndex(aTab);
		else {
			// Check each tab of this browser instance
			for (var index = 0; index < aTab.parentNode.childNodes.length; index++) {
				if (aTab == aTab.parentNode.childNodes[index]) {
					totalCurrent = index;
					break;
				}
			}
		}
		
		// Find visible current tab if exists, otherwise use total current
		// If visible Tabs exists and not the same length as browsers, then there are hidden tabs so calculate tab "index" manually.
		if (gBrowser.visibleTabs && (gBrowser.visibleTabs.length != gBrowser.browsers.length)) {
			// Check each visible tab of this browser instance
			for (var index = 0; index < gBrowser.visibleTabs.length; index++) {
				if (aTab == gBrowser.visibleTabs[index]) {
					visibleCurrent = index;
					break;
				}
			}
		}
		else visibleCurrent = totalCurrent;

		return [visibleCurrent + 1 - offSet, totalCurrent + 1 - offSet];
	},
	
	// give browser time to update tab count
	updateToolbar: function(aEvent) {
		gTabCounter.updateToolbar2(aEvent);
	},
	
	// For some reason when closing count is always 1 greater so subtract one on close
	updateToolbar2 : function(aEvent) {
		var myToolbar = document.getElementById("tabcounter-toolbar-item");

		if (myToolbar) {
			var tweakValue = 0;
			if (aEvent) {
				//dump(aEvent.type + " - ");
				// When closing a tab, the gBrowser.browsers.length will be one too large in Firefox.  This also applies
				// to events that fire after the TabClose event.  This is TabSelect for any tab other than the last tab.
				// For the last tab closed, TabOpen and TabSelect will also fire after TabClose (Firefox 3.5 and earlier)
				// We need to tweak the result for any event that fires after TabClose.  
				switch(aEvent.type) {
					case "TabClose":
						// Firefox only
						if (gTabCounter.isFF) {
							tweakValue = 1;
							this.mLastTabClosed = true;
						}
						break;
					case "TabOpen":
						if (this.mLastTabClosed) {
							this.mLastTabClosed = false;
							tweakValue = 1;
						}
						break;
					case "TabSelect":
						if (this.mLastTabClosed) {
							// Only tweak here in Gecko 1.9.1 and above
							if (this.Gecko191Up)
								tweakValue = 1;
							this.mLastTabClosed = false;
						}
						else {
							// this is needed because if the CTRL-` key is used to switch groups, the gBrowser.visibleTabs count
							// won't update immediately
							if (gBrowser.visibleTabs) {
								window.setTimeout(function() { gTabCounter.updateToolbar2(); }, 0);
								return;
							}
						}
						break;
					case "tabviewhidden":
						// When hidding tab view gBrowser.visibleTabs still includes old group so delay the refresh
						window.setTimeout(function() { gTabCounter.updateToolbar2(); }, 0);
						return;
						break;
				}
			}
			
			// If not counting app (pinned) tabs, then get the pinned tab count
			var pinnedTabCount = this.getPref("extensions.tabcounter.noAppTabs", Components.interfaces.nsIPrefBranch.PREF_BOOL) ? gBrowser._numPinnedTabs : 0;
			
			//dump(gBrowser.visibleTabs.length + ", " + gBrowser.browsers.length + "\n");		
			// Remove hidden tabs from count for Gecko 2 and up browsers, otherwise use tab count
			// Visible Tabs is always correct so don't tweak it.
			var count = (gBrowser.visibleTabs ? gBrowser.visibleTabs.length : gBrowser.browsers.length - tweakValue) - pinnedTabCount;
			var totalCount = gBrowser.browsers.length - tweakValue - pinnedTabCount;

			var preText = this.getPref("extensions.tabcounter.preLabel", Components.interfaces.nsIPrefBranch.PREF_STRING);
			var postText = this.getPref("extensions.tabcounter.postLabel", Components.interfaces.nsIPrefBranch.PREF_STRING);
			preText = preText ? preText + " " : "";
			postText = postText ? " " + postText : "";

			var useFormatString = this.getPref("extensions.tabcounter.useFormatString", Components.interfaces.nsIPrefBranch.PREF_BOOL);
			var countString = "";
			if (!useFormatString) {
				countString = preText + count + postText;
			} else {
				var formatString = this.getPref("extensions.tabcounter.formatString", Components.interfaces.nsIPrefBranch.PREF_STRING);
				var current = this.findTabIndex(gBrowser.selectedTab, pinnedTabCount)
				// dump(current + "\n");
				if (current[0] > count) current[0] = count;
				if (current[1] > totalCount) current[1] = totalCount;
				// If a pinned tab is selected and not countning them don't use current values
				countString = this.expandCountStringFormats(formatString, count, current[0], totalCount, current[1], ((pinnedTabCount > 0) && gBrowser.selectedTab.getAttribute("pinned")));
			}
			
			// tricky way of getting "Open Tabs: " locale text without requiring stringbundle - gets all text but numbers
			if (this.getPref("extensions.tabcounter.noTooltip", Components.interfaces.nsIPrefBranch.PREF_BOOL)) {
				this.storedTooltip = myToolbar.getAttribute("tooltiptext").match(/[^\d]*/);
				myToolbar.removeAttribute("tooltiptext");
				myToolbar.childNodes[0].removeAttribute("tooltiptext");
			}
			else {
				myToolbar.setAttribute("tooltiptext", (this.storedTooltip || myToolbar.getAttribute("tooltiptext").match(/[^\d]*/)) + count);
				myToolbar.childNodes[0].setAttribute("tooltiptext", myToolbar.getAttribute("tooltiptext"));
			}
			myToolbar.childNodes[0].setAttribute("value", countString);
    		
    	myToolbar.style.color = this.getPref("extensions.tabcounter.color", Components.interfaces.nsIPrefBranch.PREF_STRING);
    	myToolbar.style.fontSize = this.getPref("extensions.tabcounter.fontSize", Components.interfaces.nsIPrefBranch.PREF_STRING);
    	myToolbar.style.fontFamily = this.getPref("extensions.tabcounter.fontFamily", Components.interfaces.nsIPrefBranch.PREF_STRING);
    	myToolbar.style.fontWeight = this.getPref("extensions.tabcounter.fontWeight", Components.interfaces.nsIPrefBranch.PREF_STRING);
		}
	},
	
	// check and get Preference value
	getPref: function(name, type) {
		try {
			if (Services.prefs.getPrefType(name) == type) {
				switch(type) {
					case Components.interfaces.nsIPrefBranch.PREF_STRING:
						return Services.prefs.getComplexValue(name, Components.interfaces.nsISupportsString).data
					case Components.interfaces.nsIPrefBranch.PREF_BOOL:
						return Services.prefs.getBoolPref(name);
					case Components.interfaces.nsIPrefBranch.PREF_INT:
						return Services.prefs.getIntPref(name);
				}
			}
		} catch(ex) { dump(ex + "\n"); }
		return null;
	},
	
	openOptions: function() {
		var dialog = Components.classes["@mozilla.org/appshell/window-mediator;1"]
		             .getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("TabCounter:Options");
		if (dialog)
		{
			dialog.focus();
			return;
		}
		openDialog("chrome://tabcounter-morac/content/options.xul", "_blank", "chrome,titlebar,toolbar,centerscreen," + 
		           ((this.getPref("browser.preferences.instantApply", Components.interfaces.nsIPrefBranch.PREF_BOOL))?"dialog=no":"modal"));
	},
	
	_string: function(aName)
	{
		if (!this.mBundle)
			this.mBundle = Services.strings.createBundle("chrome://tabcounter-morac/locale/tabcounter.properties");
			
		return this.mBundle.GetStringFromName(aName);
	}
}

gTabCounter.initialize();