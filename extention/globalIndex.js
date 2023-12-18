checkedAssignments = new browserStorage("checkedAssignments", "sync", [[],[],[]])

customAssignments = new browserStorage("customAssignments", "sync", [])

pastGrades = new browserStorage("pastGrades", "local", [])

classColors = new browserStorage("classColors", "sync")

defaultBackGround = ["#faf9f7", "https://source.unsplash.com/random/1920x1080/?city,night", 10, true, true]
backGround = new browserStorage("backGround", "sync", defaultBackGround)

masteryGrades = new browserStorage("masteryGrades", "local", [])

exceptionList = new browserStorage("exceptionList", "sync", [[],[]])
exceptionList.get(globalIndex)

function globalIndex() {
    let gitHub = new XMLHttpRequest()
    gitHub.open("GET", "https://api.github.com/repos/N0madical/Powerology/contents/exclusions.raw")
    gitHub.send()
    gitHub.onload = () => {
        let output = atob(JSON.parse(gitHub.response).content)
        exceptionList.value[0] = JSON.parse(output)
        exceptionList.set()
    }
    
    let exclude = false
    let exceptions = exceptionList.value[0].concat(exceptionList.value[1])
    for(let i in exceptions) {
        if(window.location.href.includes(exceptions[i]) && exceptions[i].length > 0) {
            exclude = true
        }
    }
    if(!exclude) {
    try{
    //########################################################
        //Setting Background
    //########################################################
    backGround.get(setBackground)
    function setBackground() {
        document.body.classList.remove("js")
        document.body.style.height = "max-content"
        document.body.style.overflowX = "hidden"
        document.body.style.minHeight = "100%"
        document.body.insertAdjacentHTML("afterbegin", `<div id="backgroundbox"></div>`)
        if(backGround.value[3] || window.location.href.includes("home")) {
            document.getElementById("backgroundbox").style.backgroundColor = backGround.value[0]
            document.getElementById("backgroundbox").style.backgroundImage = `url('${backGround.value[1]}')`
            document.getElementById("backgroundbox").style.filter = `blur(${backGround.value[2]}px)`
            if(!window.location.href.includes("home") || window.location.href.includes("powerology")) {
                document.getElementById("wrapper").classList.add("shadow", "wrapperbox")
                if(backGround.value[4]) {
                    document.getElementById("wrapper").classList.add("bubblewrapperbox")
                }
            } else if (window.location.href.includes("powerology")) {
                document.getElementById("container").style.margin = 0
                document.getElementById("main").style.minHeight = "91vh"
            }
            window.addEventListener("scroll", function(){
                document.getElementById("backgroundbox").style.backgroundPositionY = ((window.pageYOffset*-0.1)) + "px";
            });

        }

        cngbg = storageapi.runtime.getURL("icons/changebg_white.png");

        document.body.insertAdjacentHTML('afterbegin', `<div id="bgboxbox">
        <img src=${cngbg} alt="Change Background" width="25" height="25" onclickevent="toggleCngBg()" class="clickable" style="position: absolute; left:5px; top:5px; cursor: pointer;">
        <div id="bgbox" class="shadow">
            <h1 class="text-center">Change Background</h1>
            <hr style="transform: translate(10px,0);">
            <h2 class="text-center" style="margin-bottom: 5px;">Set Background<br> to Color</h2>
            <input class="margin-center" type="color" id="bgcolor" value="${backGround.value[0]}">
            <h2 class="text-center" style="margin-top: 30px; margin-bottom: 5px;">Set Background to Image (Url)</h2>
            <input class="margin-center" class="text-center" value="${backGround.value[1]}" id="bgimg">
            <h3 class="text-center" style="margin-top: 20px;" id="blurbox">Image Blur (Pixels 0-100)</h3>
            <input type="number" class="margin-center" id="bgblur" style="width: 50px; margin-bottom: 20px;" min="0" max="100" step="1" value="${backGround.value[2]}">
            <h3 class="text-center" style="margin-top: 20px;" id="blurbox">Active On All Pages</h3>
            <input type="checkbox" class="margin-center" id="bgall" style="margin-bottom: 20px;">
            <h3 class="text-center" style="margin-top: 20px;" id="bubblebox">Bubble Pages</h3>
            <input type="checkbox" class="margin-center" id="bubblepg" style="margin-bottom: 20px;">
            <button class="margin-center clickable" onclickevent="saveBg()" style="margin-bottom: 20px;">Save</button>
        </div>
        </div>`)

        document.getElementById("bgall").checked = backGround.value[3]

        addEventListeners(document.getElementById("bgboxbox"))
    }


    //########################################################
        //Defining API
    //########################################################

    if (typeof browser !== "undefined") {
        storageapi = browser;
    } else {
        storageapi = chrome;
    }


    //########################################################
        //Removing unwanted UI elements & Fixing Others
    //########################################################

    if(document.getElementById("app-run-5922356464") != null) {
        document.getElementById("app-run-5922356464").remove()
    }

    headerbuttons = document.getElementById("header").querySelector("nav").querySelectorAll("button")
    for(let i = 0; i < headerbuttons.length; i++) {
        if(headerbuttons[i].innerHTML == "Grades") {
            headerbuttons[i].parentElement.innerHTML = `
            <a class="_13cCs _2M5aC _24avl _3ghFm _3LeCL _31GLY _9GDcm _1D8fw util-height-six-3PHnk util-pds-icon-default-2kZM7 _1SIMq _2kpZl _3OAXJ _3_bfp _3v0y7 _2s0LQ util-line-height-six-3lFgd util-text-decoration-none-1n0lI Header-header-button-active-state-3AvBm Header-header-button-1EE8Y sExtlink-processed" href="/grades/grades">Grades</a>
            `
        }
    }

    headerbuttonsbox = document.getElementById("header").querySelector("nav").querySelector("ul")
    headerbuttonsbox.insertAdjacentHTML("beforeend", `
    <a class="_13cCs _2M5aC _24avl _3ghFm _3LeCL _31GLY _9GDcm _1D8fw util-height-six-3PHnk util-pds-icon-default-2kZM7 _1SIMq _2kpZl _3OAXJ _3_bfp _3v0y7 _2s0LQ util-line-height-six-3lFgd util-text-decoration-none-1n0lI Header-header-button-active-state-3AvBm Header-header-button-1EE8Y sExtlink-processed" href="/home/recent-activity/powerology">Messages</a>
    `)

    headerbuttonsbox = document.getElementById("header").querySelector("nav").querySelectorAll("ul")[1]
    powerologyinfo = storageapi.runtime.getURL("icons/powerology_white.png");
    headerbuttonsbox.insertAdjacentHTML("afterbegin", `
    <a id="powerologyinfobutton" class="clickable _13cCs _2M5aC _24avl _3ghFm _3LeCL _31GLY _9GDcm _1D8fw util-height-six-3PHnk util-pds-icon-default-2kZM7 _1SIMq _2kpZl _3OAXJ _3_bfp _3v0y7 _2s0LQ util-line-height-six-3lFgd util-text-decoration-none-1n0lI Header-header-button-active-state-3AvBm Header-header-button-1EE8Y" onclickevent="toggleInfo()"><img src="${powerologyinfo}" width="25px" height="25px" style="margin-top: 17px"></a>
    `)
    addEventListeners(document.getElementById("header"))
} catch (error) {
    console.error("Powerology: Global Index Error:", error)
}
}}

//########################################################
    //Checking for updates
//########################################################

if(typeof browser !== "undefined") {
    nextCheck = new browserStorage("nextCheck", "local", Date.now())
    nextCheck.get(onGetNextCheck)
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
            console.info("Powerology: Current version is", vnumber, "and most recent Git version is", chrome.runtime.getManifest().version)
        }
    }
    console.info("Powerology: It is currently", Date.now(), "ms, app will check for update at", nextCheck.value, "ms.")
}


//########################################################
    //Debugging
//########################################################

checkedAssignments = new browserStorage("checkedAssignments", "sync", [[],[],[]])
checkedAssignments.get()

customAssignments = new browserStorage("customAssignments", "sync", [])
customAssignments.get()

pastGrades = new browserStorage("pastGrades", "local", [])
pastGrades.get()

storageapi.runtime.onMessage.addListener((request) => {
    if(request.action == "debugprint") {
        let output = (document.getElementsByClassName("LGaPf _3LkKR _17Z60 util-max-width-twenty-characters-2pOJU")[0]) ? `Powerology Debug For User: ${document.getElementsByClassName("LGaPf _3LkKR _17Z60 util-max-width-twenty-characters-2pOJU")[0].textContent}`:"Powerology Debug For Undefined User"
        output += "\n\n--\n\nCurrent Page:\n"
        output += window.location.href
        output += "\n\n--\n\nAssignments:\n"
        output += (typeof assignmentsarray !== 'undefined') ? assignmentsarray:""
        output += "\n\n--\n\nOverdue Assignments:\n"
        output += (typeof overdueassignmentsarray !== 'undefined') ? overdueassignmentsarray:""
        output += "\n\n--\n\nClasses:\n"
        output += (typeof classesarray !== 'undefined') ? classesarray:""
        output += "\n\n--\n\nGrades:\n"
        output += (typeof gradesarray !== 'undefined') ? gradesarray:""
        output += "\n\n--\n\nCloud Checked:\n"
        output += (typeof checkedAssignments.value !== 'undefined') ? checkedAssignments.value:""
        output += "\n\n--\n\nCloud Custom:\n"
        output += (typeof customAssignments.value !== 'undefined') ? customAssignments.value:""
        output += "\n\n--\n\nCloud Past Grades:\n"
        output += (typeof pastGrades.value !== 'undefined') ? pastGrades.value:""
        output += "\n\n--\n\nHTML:\n"
        output += (document.getElementsByTagName('html')[0].innerHTML)
        const file = new File([output], `PowerologyDebug-v${storageapi.runtime.getManifest().version}.html`, {
            type: 'text/plain',
        })
          
        const link = document.createElement('a')
        const url = URL.createObjectURL(file)
        
        link.href = url
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
    }

    if(request.action == "storageprint") {
        console.debug("Dumping Stored Variables:")
        checkedAssignments = new browserStorage("checkedAssignments", "sync", [[],[],[]])
        checkedAssignments.get(() => {console.debug("Modified Assignments:", checkedAssignments.value)})

        customAssignments = new browserStorage("customAssignments", "sync", [])
        customAssignments.get(() => {console.debug("Custom Assignments:", customAssignments.value)})

        pastGrades = new browserStorage("pastGrades", "local", [])
        pastGrades.get(() => {console.debug("Past Grades:", pastGrades.value)})
    }
});