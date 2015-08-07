// ==UserScript==
// @name           Unlimited Paginator Works
// @namespace      https://greasyfork.org/scripts/5250
// @description    Makes any(?) page with a paginator on various Danbooru clones "bottomless"--blend pages seamlessly or separate each with a paginator.
// @include        http://behoimi.org/*
// @include        http://www.behoimi.org/*
// @include        http://danbooru.donmai.us/*
// @include        http://hijiribe.donmai.us/*
// @include        http://sonohara.donmai.us/*
// @include        http://gelbooru.com/*
// @include        http://www.gelbooru.com/*
// @include        http://konachan.tld/*
// @include        https://yande.re/*
// @include        https://chan.sankakucomplex.com/*
// @version        2015.02.05
// ==/UserScript==

//If true, each added page retains its paginator.  If false, elements are smoothly joined together.
var pageBreak = false;

//Minimum amount of window left to scroll, maintained by loading more pages.
var scrollBuffer = 600;

//Time (in ms) the script will wait for a response from the next page before attempting to fetch the page again.  If the script gets trapped in a loop trying to load the next page, increase this value.
var timeToFailure = 15000;

//============================================================================
//=========================Script initialization==============================
//============================================================================

var nextPage, mainTable, mainParent, pending, timeout, iframe; 

if( typeof(customF) != "undefined" )
	customF();

initialize();
function initialize()
{
	//Stop if inside an iframe
	if( window != window.top || scrollBuffer == 0 )
		return;
		
	//Stop if no "table"
	mainTable = getMainTable(document);
	if( !mainTable )
		return;
		
	//Stop if no paginator
	var paginator = getPaginator(document);
	if( !paginator )
		return;

	//Stop if no more pages
	nextPage = getNextPage(paginator);
	if( !nextPage )
		return;

	//Hide the blacklist sidebar, since this script breaks the tag totals and post unhiding.
	var sidebar = document.getElementById("blacklisted-sidebar");
	if( sidebar )
		sidebar.style.display = "none";

	//Other important variables:
	scrollBuffer += window.innerHeight;
	mainParent = mainTable.parentNode;
	pending = false;
	
	iframe = document.createElement("iframe");
	iframe.addEventListener("load", appendNewContent, false);
	iframe.width = iframe.height = 0;
	iframe.style.visibility = "hidden";
	document.body.appendChild(iframe);

	//Stop if empty page
	if( /<p>(Nothing to display.|Nobody here but us chickens!)<.p>/.test(mainTable.innerHTML) )
		return;

	//Add copy of paginator to the top
	mainParent.insertBefore( paginator.cloneNode(true), mainParent.firstChild );

	if( !pageBreak )
		paginator.style.display = "none";//Hide bottom paginator
	else
	{
		//Reposition bottom paginator and add horizontal break
		mainTable.parentNode.insertBefore( document.createElement("hr"), mainTable.nextSibling );
		mainTable.parentNode.insertBefore( paginator, mainTable.nextSibling );
	}
		
	//Listen for scroll events
	window.addEventListener("scroll", testScrollPosition, false);
	testScrollPosition();
}

//============================================================================
//============================Script functions================================
//============================================================================

//Some pages match multiple "tables", so order is important.
function getMainTable(source)
{
	//Special case #1: Sankaku post index with Auto Paging enabled
	if( /sankaku/.test(location.host) && /auto_page=1/.test(document.cookie) && /^(post(\/|\/index\/?)?|\/)$/.test(location.pathname) )
		return null;
		
	var xpath =
	[
		 ".//div[@id='posts']/div"						// Danbooru 2; don't want to fall through to the wrong xpath if no posts ("<article>") on first page.
		,".//div[@id='c-pools']//section"				// Danbooru 2
		,".//div[@id='a-index']//table[not(contains(@class,'search'))]"	// Danbooru 2
		,".//div[@id='a-index']"						// Danbooru 2
		
		,".//table[contains(@class,'highlight')]"		// large number of pages
		,".//div[@id='content']/div/div/div/div/span[@class='author']/../../../.."	// Sankaku: note search
		,".//div[contains(@id,'comment-list')]/div/.."	// comment index
		,".//*[not(contains(@id,'popular'))]/span[contains(@class,'thumb')]/a/../.."	// post/index, pool/show, note/index
		,".//li/div/a[contains(@class,'thumb')]/../../.."	// post/index, note/index
		,".//div[@id='content']//table/tbody/tr[@class='even']/../.."	// user/index, wiki/history
		,".//div[@id='content']/div/table"				// 3dbooru user records
		,".//div[@id='forum']"							// forum/show
		,".//div[@id='content']"						// Gelbooru forum thread
		,".//div/span[contains(@class,'thumb')]/.."		// Gelbooru posts
	];
	
	for( var i = 0; i < xpath.length; i++ )
	{
		getMainTable = (function(query){ return function(source) { return new XPathEvaluator().evaluate(query, source, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }; })( xpath[i] );
		var result = getMainTable(source);
		if( result )
		{
			//alert("UPW main table query: "+xpath[i]+"\n"+location.pathname);
			return result;
		}
	}
	
	return null;
}

function getPaginator( source )
{
	var pager = new XPathEvaluator().evaluate("descendant-or-self::div[@id='paginator' or @class='paginator']", source, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
	// Need clear:none to prevent the 2nd page from being pushed to below the sidebar on the Post index... but we don't want this when viewing a specific pool,
	// because then the paginator is shoved to the right of the last images on a page.  Other sites have issues with clear:none as well, like //yande.re/post.
	if( pager && location.host.indexOf("donmai.") >= 0 && document.getElementById("sidebar") )
		pager.style.clear = "none";
	
	return pager;
}

function getNextPage( source )
{	
	var page = getPaginator(source);
	if( page )
		page = new XPathEvaluator().evaluate(".//a[@alt='next' or contains(text(),'>') or contains(text(),'Next')]", page, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
	return( page ? page.href : null );
}

function testScrollPosition()
{
	if( !nextPage )
		testScrollPosition = function(){};
	
	//Take the max of the two heights for browser compatibility
	else if( !pending && window.pageYOffset + scrollBuffer > Math.max( document.documentElement.scrollHeight, document.documentElement.offsetHeight ) )
	{	
		pending = true;
		timeout = setTimeout( function(){pending=false;testScrollPosition();}, timeToFailure );
		iframe.contentDocument.location.replace(nextPage);
	}
}

function appendNewContent()
{
	//Make sure page is correct
	clearTimeout(timeout);
	if( iframe.contentDocument.location.href != nextPage )
	{
		setTimeout( function(){ pending = false; }, 1000 );
		return;
	}

	//Copy content from retrived page to current page, but leave off certain headers, labels, etc...
	var sourcePaginator = document.adoptNode( getPaginator(iframe.contentDocument) );
	var nextElem, deleteMe, source = document.adoptNode( getMainTable(iframe.contentDocument) );
	
	if( /<p>(Nothing to display.|Nobody here but us chickens!)<.p>/.test(source.innerHTML) )
		nextPage = null;
	else
	{
		nextPage = getNextPage(sourcePaginator);

		if( pageBreak )
			mainParent.appendChild(source);
		else
		{
			//Hide elements separating one table from the next (h1 is used for user names on comment index)
			var rems = source.querySelectorAll("h2, h3, h4, thead, tfood");
			for( var i = 0; i < rems.length; i++ )
				rems[i].style.display = "none";
			
			//Move contents of next table into current one
			var fragment = document.createDocumentFragment();
			while( (nextElem = source.firstChild) )
				fragment.appendChild(nextElem);
			mainTable.appendChild(fragment);
		}
	}

	//Add the paginator at the bottom if needed.
	if( !nextPage || pageBreak )
		mainParent.appendChild( sourcePaginator );
	if( pageBreak && nextPage )
		mainParent.appendChild( document.createElement("hr") );
	
	//Clear the pending request marker and check position again
	pending = false;
	testScrollPosition();
}

// I am the code of my script.
// HTML is my body, and JavaScript is my blood.
// I have incorporated over a thousand paginators.
// Unaware of loss.
// Nor aware of gain.
// Withstood boredom to include many pages,
// Striving for the script's completion.
// I have no regrets, this is the only path.
// My whole life was "Unlimited Paginator Works."
