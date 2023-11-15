function fixLinks() {
    linkbutton = document.getElementsByClassName("sExtlink-processed")
    if(linkbutton.length > 0) {
        for(var i = 0; i < linkbutton.length; i++) {
            if(linkbutton[i].hasAttribute("href") && linkbutton[i].href != "") {
                if(linkbutton[i].href.includes("path=")) {
                    link = decodeURIComponent(linkbutton[i].href.substring(linkbutton[i].href.indexOf("path=")+5))
                    console.debug(linkbutton[i].href, link)
                    linkbutton[i].removeAttribute("href")
                    linkbutton[i].removeAttribute("target")
                    linkbutton[i].onclick = function() { openLink(link); }
                    linkbutton[i].style = "cursor: pointer;"
                }
            }
            
        }
    }
}

function openLink(inputLink) {
    window.open(inputLink)
}
exportFunction(openLink, window, { defineAs: "openLink" });

var fixrepeat = window.setInterval(function(){
        fixLinks()
  }, 200);
