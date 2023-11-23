version = parseFloat(browser.runtime.getManifest().version).toFixed(1)
setTimeout(checkVersion, 1000)
function checkVersion() {
    if(!document.getElementById("vtext")) {
        document.getElementById("body").insertAdjacentHTML("afterbegin", `
            <h4 style="text-align: center;" id="vtext">Current installed version: v${version}</h4>
        `)
    } else {
        document.getElementById("vtext").innerHTML = `Current installed version: v${version}`
    }
    if(version < parseFloat(document.getElementById("latestversion").innerHTML)) {
        if(!document.getElementById("utext")) {
            document.getElementById("body").insertAdjacentHTML("afterbegin", `
                <h2 id="utext" style="color: darkblue; text-align: center;">Please Update Powerology!</h2>
            `)
        }
    } else {
        if(document.getElementById("utext")) {
            document.getElementById("utext").remove()
        }
    }
}
