// ==UserScript==
// @name        KissAnime Anti-Adblock Blocker
// @namespace   userscripts.org/user/swyter
// @description Not even the people from Easylist seem to fight this site anymore, someone had to try as this looks popular enough. *sigh*
// @match       http://kissanime.com/*
// @version     3.3.3.5
// @grant       GM_addStyle
// @run-at      document-end
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=swyterzone%40gmail%2ecom&item_number=swydonations&currency_code=EUR
// ==/UserScript==

/* run this just on the parent page, not in sub-frames */
if (window.parent !== window)
  throw "stop execution";

/* get rid of timeouts right away, they aren't used for anything useful */
console.log("Started KissAnime Anti-Adblock Blocker, waiting for the DOM to load...");
   
function when_external_loaded()
{   
  console.log("DOM loaded, processing stuff...");
  
  /* override the check in Chrome and call it a day */
  Object.defineProperty(window, 'DoDetect2',
  {
    value: function()
    {
      console.info("check overriden!");
    }
  });

  /* remove the anti-adblock script */
  if(thing=document.querySelector("#adCheck3 + script"))
  {
    console.log("Getting rid of the script itself...");
    thing.parentElement.removeChild(thing);
  }
  
  /* get rid of the cruft */
  for(elem in cruft=document.querySelectorAll("iframe[src*='ad'], .divCloseBut, .clear2, div[style*='!important'], div[id*='divFloat'], .episodeList div[style$='float: left;'], .episodeList .clear"))
  {
    if(typeof cruft[elem]==="object")
    {
      console.log("removing cruft: ", cruft[elem]);
      cruft[elem].parentElement.removeChild(cruft[elem]);
    }
  }
  
  /* custom timeout override */
  (function(timeout_func)
  {
    window.setTimeout = function(arg, time)
    {
      if(typeof arguments[0] === "string" && arguments[0].match(/detect/i) != null)
      {
        console.info("No timeout for you, AdBlock blocker!", arguments.callee.caller.toString(), arguments);
        return 0;
      }
      else
      {
        timeout_func.apply(this,arguments);
      }
    }
  }(window.setTimeout))
      
  /* let's hook the AJAX requests, just in case, and filter out the so-called 'ban'
     avoiding potential fake points loss and such, what a scummy move by the site owner */
  (function(xhr_proto_open)
  {
    XMLHttpRequest.prototype.open = function(method,url)
    {
      if(url.match(/ban|Banned|GotBanned/) != null)
      {
        console.info("Intercepted shitty 'ban' request!", arguments);
        this.abort();
      }
      else
      {
        xhr_proto_open.apply(this,arguments);
      }
    }
  }(XMLHttpRequest.prototype.open))
}


/* inject this cleaning function right in the page */
window.document.head.appendChild(
  inject_fn = document.createElement("script")
);

inject_fn.innerHTML = when_external_loaded.toString() + ";when_external_loaded()";


/* fix upper links positioning after removing the cruft and
   add styling rules for my custom lightsoff lampshade */
   
GM_addStyle("a#qualityChoose                    \
             {                                  \
               display: block;                  \
             }                                  \
                                                \
             div.swylightsoff                   \
             {                                  \
               right: 0;                        \
               width: 100%;                     \
               height: 100%;                    \
               top: 0;                          \
               left: 0;                         \
               position: fixed;                 \
               background: rgba(0,0,0,0.96);    \
             }                                  \
                                                \
             #divContentVideo                   \
             {                                  \
               z-index: 999;                    \
             }                                  \
                                                \
             #switch                            \
             {                                  \
               z-index: auto;                   \
             }");


/* make the *lights off* button work */
if(lo_switch_button=document.getElementById("switch"))
{
  lo_switch_button.addEventListener("click",function(e)
  {

    lights_off = document.querySelector('.swylightsoff');

    if(!lights_off)
    {
      console.log("Lights off");

      lo_switch_button.appendChild(
        inject_lo = document.createElement("div")
      );
      
      inject_lo.classList.add("swylightsoff");
    }
    else
    {
      console.log("Lights on");
      lights_off.parentElement.removeChild(lights_off);
    }
    
    e.stopPropagation();
  });
}