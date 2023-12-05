//########################################################
    //Defining API
//########################################################

if (typeof browser !== "undefined") {
    storageapi = browser;
} else {
    storageapi = chrome;
}


//########################################################
    //Removing unwanted UI elements
//########################################################

buttons = document.getElementsByClassName("_13cCs _2M5aC _24avl _3ghFm _3LeCL _31GLY _9GDcm _1D8fw")
for(let h = 0; h < buttons.length; h++) {
    if(buttons[h].hasAttribute("aria-label")) {
        if(buttons[h].getAttribute("aria-label").includes("notifications")) {
            if(buttons[h].getElementsByClassName("_2JX1Q _2L4PN les2- USYsM tAI8z fioA9 _1tpub _3RmDr")[0]) {
                buttons[h].getElementsByClassName("_2JX1Q _2L4PN les2- USYsM tAI8z fioA9 _1tpub _3RmDr")[0].remove()
            }
        }
    }
}

if(document.getElementById("app-run-5922356464") != null) {
    document.getElementById("app-run-5922356464").remove()
}


//########################################################
    //Checking for updates
//########################################################

if(typeof browser !== "undefined") {
    nextCheck = new browserStorage("nextCheck", "local", Date.now(), onGetNextCheck)
    nextCheck.get()
}

function onGetNextCheck() {
    if(nextCheck.value <= Date.now()) {
        let gitHub = new XMLHttpRequest()
        gitHub.open("GET", "https://api.github.com/repos/N0madical/Powerology/contents/versions")
        gitHub.send()
        gitHub.onload = () => {
            versionlist = JSON.parse(gitHub.response)
            vname = versionlist[versionlist.length-1].name
            vnumber = vname.substring(vname.indexOf("-v")+2,vname.indexOf("-v")+5)
            if(storageapi == "browser") {
                if(parseFloat(vnumber) > parseFloat(browser.runtime.getManifest().version)) {
                    window.open("https://powerology.aidencunningham.com/")
                }
            } else {
                if(parseFloat(vnumber) > parseFloat(chrome.runtime.getManifest().version)) {
                    window.open("https://powerology.aidencunningham.com/")
                }
            }
            nextCheck.value = Date.now() + 86400000
            nextCheck.set()
            console.info("Current version is", vnumber, "and most recent Git version is", chrome.runtime.getManifest().version)
        }
    }
    console.info("It is currently", Date.now(), "ms, app will check for update at", nextCheck.value, "ms.")
}