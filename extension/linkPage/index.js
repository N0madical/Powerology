try{document.getElementsByClassName("s-extlink-direct sExtlink-processed")[0].click()} catch (error) {console.error("Couldn't click link:", error)}

// exceptionList.get(linkPage)

// function linkPage() {  
//     let exclude = false
//     let exceptions = exceptionList.value[0].concat(exceptionList.value[1])
//     for(let i in exceptions) {
//         if(window.location.href.includes(exceptions[i]) && exceptions[i].length > 0) {
//             exclude = true
//         }
//     }
//     if(!exclude) {

//     function fixLinks() {
//         linkbutton = document.getElementsByClassName("sExtlink-processed")
//         if(linkbutton.length > 0) {
//             for(var i = 0; i < linkbutton.length; i++) {
//                 if(linkbutton[i].hasAttribute("href") && linkbutton[i].href != "") {
//                     if(linkbutton[i].href.includes("path=")) {
//                         let link = decodeURIComponent(linkbutton[i].href.substring(linkbutton[i].href.indexOf("path=")+5))
//                         linkbutton[i].removeAttribute("href")
//                         linkbutton[i].removeAttribute("target")
//                         linkbutton[i].style = "cursor: pointer;"
//                         linkbutton[i].addEventListener("click", () => {
//                             openLink(link)
//                         });
//                     }
//                 }
                
//             }
//         }
//     }

//     var fixrepeat = window.setInterval(function(){
//             fixLinks()
//     }, 200);
// }}
