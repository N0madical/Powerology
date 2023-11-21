if(document.getElementById("app-run-5922356464") != null) {
    document.getElementById("app-run-5922356464").remove()
}

nextCheck = 0
browser.storage.local.get("nextCheck").then(onGetnextCheck, onError)
function onGetnextCheck(value) {;
    nextCheck = value.nextCheck; 
    if(nextCheck == undefined) {
        nextCheck = Date.now()
        browser.storage.local.set({nextCheck})
    }
    console.debug("It is currently", Date.now(), "ms, app will check for update at", nextCheck, "ms.")
    if(nextCheck <= Date.now()) {
        let gitHub = new XMLHttpRequest()
        gitHub.open("GET", "https://api.github.com/repos/N0madical/Powerology/contents/versions")
        gitHub.send()
        gitHub.onload = () => {
            versionlist = JSON.parse(gitHub.response)
            vname = versionlist[versionlist.length-1].name
            vnumber = vname.substring(vname.indexOf("-v")+2,vname.indexOf("-v")+5)
            if(parseFloat(vnumber) > parseFloat(browser.runtime.getManifest().version)) {
                window.open("https://powerology.aidencunningham.com/")
            }
            nextCheck = Date.now() + 86400000
            browser.storage.local.set({nextCheck})
        }
    }
}
function onError(){console.error("Error: Could not get update check timestamp")}