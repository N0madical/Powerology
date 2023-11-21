version = browser.runtime.getManifest().version
setTimeout(checkVersion, 0)
function checkVersion() {
    console.debug(document.getElementById("body").innerHTML)
    if(document.getElementById("body").innerHTML != ""){
        document.getElementById("body").insertAdjacentHTML("afterbegin", `
            <h4 style="color: red; text-align: center;">Please uninstall your existing version of Powerology before installing a new one</h4>
            <h4 style="text-align: center;">Current installed version: v${version}</h4>
        `)
    }
}
