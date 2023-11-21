if(document.getElementById("app-run-5922356464") != null) {
    document.getElementById("app-run-5922356464").remove()
}

console.debug("I'm working")

lastCheck = 0
browser.storage.local.get("lastCheck").then(onGetLastCheck, onError)
function onGetLastCheck(value) {;
    lastCheck = value.lastCheck; 
    if(lastCheck == undefined) {
        lastCheck = Date.now()
        browser.storage.local.set({lastCheck})
    }
    if(lastCheck <= Date.now()) {
        let gitHub = new XMLHttpRequest()
        gitHub.open("GET", "https://api.github.com/repos/N0madical/Powerology/contents/versions")
        gitHub.send()
        gitHub.onload = () => {
            versionlist = JSON.parse(gitHub.response)
            vname = versionlist[versionlist.length-1].name
            vnumber = vname.substring(vname.indexOf("-v")+2,vname.indexOf("-v")+5)
            console.debug(parseFloat(vnumber), parseFloat(browser.runtime.getManifest().version))
            if(parseFloat(vnumber) < parseFloat(browser.runtime.getManifest().version)) {
                window.open("https://powerology.aidencunningham.com/")
            }
            lastCheck = Date.now //+ 86400000
            browser.storage.local.set({lastCheck})
        }
    }
}
function onError(){console.error("Error: Could not get update check timestamp")}