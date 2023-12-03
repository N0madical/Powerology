if (typeof browser !== "undefined") {
    storageapi = browser;
} else {
    storageapi = chrome;
}

if(document.getElementById("app-run-5922356464") != null) {
    document.getElementById("app-run-5922356464").remove()
}

nextCheck = new browserStorage("nextCheck", "local", Date.now(), onGetNextCheck)
nextCheck.get()
function onGetNextCheck(value) {;
    console.info("It is currently", Date.now(), "ms, app will check for update at", nextCheck.value, "ms.")
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
        }
    }
}
function onError(){console.error("Error: Could not get update check timestamp")}