//########################################################
    //Powerology Web Extention - By Aiden C
    //Script: Schoology Class Pages & Teacher Mods
//########################################################


//These browser storage elements are specefic to the teachermods, so I don't load them globally
pinnedStandards = new browserStorage("pinnedStandards", "sync", ["1.Body Paragraphs"])
pinicon = storageapi.runtime.getURL("icons/pin.png");
piniconFilled = storageapi.runtime.getURL("icons/pinFull.png");

exceptionList.get(classPage)

function classPage() {  
    //Checking to see if script should be canceled in case of bugs
    let exclude = false
    let exceptions = exceptionList.value[0].concat(exceptionList.value[1])
    for(let i in exceptions) {
        if(window.location.href.includes(exceptions[i]) && exceptions[i].length > 0) {
            exclude = true
        }
    }
    if(!exclude) {
    try{

    let searchsave
    defaultGraded = ""
    
    try {
        if(document.getElementsByClassName("page-title")[0]) {
            if(document.getElementsByClassName("page-title")[0].children[0]) {
                reNames.get(setName)
                function setName() {
                    let classname = document.getElementsByClassName("page-title")[0].children[0]
                    if(reNames.value[classname.textContent]) {
                        classname.textContent = reNames.value[classname.textContent]
                    }
                }
            }
        }
    } catch (error) {
        console.error("Couldn't get class name, error:", error)
    }
    
    
    //Schoology's UI is reactive, so this script repeats every 1/4 second to check for updates
    function reactiveCheck() {

        //Standards page search bar and pins
        if(document.getElementsByClassName("_1Z0RM Ivlky _2awxe _1EwGW _3skcp _26UWf _2nSV0 nOK4_")[0]) {
            if(document.getElementsByClassName("_1Z0RM Ivlky _2awxe _1EwGW _3skcp _26UWf _2nSV0 nOK4_")[0].children.length == 4) {
                let box = document.getElementsByClassName("fjQuT uQOmx _17X0S _2oDcw Ivlky _2awxe _2UdSL _1Z0RM _1EwGW _2v5vf _35kHT")[0]
                let standards = box.children[0].children[0].children
                if(!document.getElementById("standardssearchbar")) {
                    searchicon = storageapi.runtime.getURL("icons/search.png");
                    box.insertAdjacentHTML("beforebegin", `
                        <div style="background-image: url(${searchicon}); float: left; width: 25px; height: 25px; background-size: 100%; position: absolute; left: 10%; transform: translate(-100%, 50%);"></div>
                        <input type="text" id="standardssearchbar" class="searchbar">
                    `)
                    for(let i = 0; i < standards.length; i++) {
                        standards[i].children[0].style.width = "85%"
                        let thisicon = (pinnedStandards.value.includes(standards[i].getElementsByClassName("_2qcpH _3ghFm _22tOa drGks _23_WZ")[0].textContent)) ? piniconFilled:pinicon
                        let isHovshow = (pinnedStandards.value.includes(standards[i].getElementsByClassName("_2qcpH _3ghFm _22tOa drGks _23_WZ")[0].textContent)) ? "":"hovshow"
                        standards[i].classList.add("hovmod")
                        standards[i].insertAdjacentHTML("beforeend", `
                        <img class="pin_${i} clickable ${isHovshow}" src=${thisicon} name="${standards[i].getElementsByClassName("_2qcpH _3ghFm _22tOa drGks _23_WZ")[0].textContent}" style="margin: auto; height: 25px;" onclickevent="togglePin('pin_${i}')">
                        `)
                        if(pinnedStandards.value.includes(standards[i].getElementsByClassName("_2qcpH _3ghFm _22tOa drGks _23_WZ")[0].textContent)) {
                            box.children[0].children[0].prepend(standards[i])
                        }
                    }
                    addEventListeners(box)
                }
                let searchvalue = document.getElementById("standardssearchbar").value
                if(searchvalue != "" && searchvalue != searchsave) {
                    searchsave = searchvalue
                    for(let i = 0; i < standards.length; i++) {
                        if(standards[i].getElementsByClassName("_2qcpH _3ghFm _22tOa drGks _23_WZ")[0].textContent.toLowerCase().includes(searchvalue.toLowerCase())) {
                            standards[i].style.display = "flex"
                        } else {
                            standards[i].style.display = "none"
                        }
                    }
                } else if (searchvalue == "") {
                    for(let i = 0; i < standards.length; i++) {
                        standards[i].style.display = "flex"
                    }
                }
            }
        }

        //'Add assignment' UI fixes
        box = document.getElementsByClassName("popups-box")[0]
        if(box) {
            title = box.getElementsByClassName("title")[0]
            if(title) {
                if(title.textContent == "Create Assignment") {
                    if(!document.getElementById("customGui")) {
                        defaultGraded = document.getElementById("edit-grading-category-id").value
                        form = box.querySelector("[id='s-grade-item-add-form']").children[0]
                        for(let i = 3; i < form.children.length; i++) {
                            if(!form.children[i].classList.contains("submit-buttons") && !form.children[i].classList.contains("s-common-adv-options-wrapper")) {
                                form.children[i].style.display = "none"
                            }
                        }
                        calendaricon = storageapi.runtime.getURL("icons/calendar.png");
                        masteryicon = storageapi.runtime.getURL("icons/mastery.png");
                        openext = storageapi.runtime.getURL("icons/openext.png");
                        form.querySelector("[id='attachments']").insertAdjacentHTML("afterend", `
                        <div id="customGui" style="display: flex; width: 80%; margin-bottom: 10px;" class="margin-center">
                            <div class="box2" id="datebox">
                                <h1>Set Date</h1>
                                <img src=${calendaricon} style="width: 25px;">
                            </div>
                            <div class="box2 clickable hov" onclick="renderSgyMasteryAlignmentUi(true)">
                                <h1 style="margin-top: 25%;">Add Standards</h1>
                                <img src=${masteryicon} style="width: 25px;">
                            </div>
                            <div class="box2 clickable hov" onclickevent="toggleGraded()">
                                <h1 style="margin-top: 25%;">Graded?</h1>
                                <h1 id="gradedDisplay">-</h1>
                            </div>
                            <div class="box2 clickable hov" onclickevent="openLink('${window.location.href.replace("materials", "gradesetup")}')">
                                <h1 style="margin-top: 15%;">Set Defaults</h1>
                                <img src=${openext} style="margin-top: 0px; width: 25px;">
                            </div>
                        </div>
                        <h2 id="advButton" class="clickable text-center" onclickevent="openAdvanced()">Advanced</h2>
                        `)
                        document.getElementById("datebox").insertAdjacentElement("beforeend", document.getElementsByClassName("form-row-wrapper due-date-wrapper")[0])
                        document.getElementById("customGui").insertAdjacentElement("afterend", document.getElementsByClassName("alignment-item-container")[0])
                        document.getElementById("datebox").getElementsByClassName("form-row-wrapper due-date-wrapper")[0].style.display = "inherit"
                        document.getElementById("datebox").getElementsByClassName("form-row-wrapper due-date-wrapper")[0].children[1].style.display = "none"
                        document.getElementById("datebox").getElementsByClassName("form-item")[0].children[1].style.marginTop = "10px"
                        document.getElementById("datebox").getElementsByClassName("form-item")[0].children[2].style.marginTop = "5px"
                        document.getElementById("datebox").getElementsByClassName("form-item")[0].children[1].style.marginLeft = "8px"
                        document.getElementById("datebox").getElementsByClassName("form-item")[0].children[2].style.marginLeft = "24px"
                        document.getElementsByClassName("alignment-item-container")[0].style.marginLeft = "50%"
                        document.getElementsByClassName("alignment-item-container")[0].style.transform = "translateX(-50%)"
                        document.getElementsByClassName("alignment-item-container")[0].style.marginBottom = "10px";
                        document.getElementsByClassName("s-common-adv-options-wrapper")[0].style.marginLeft = "39%";
                        document.getElementById("datebox").querySelector("label").style.display = "none"
                        addEventListeners(document.getElementById("customGui"))
                        addEventListeners(document.getElementById("advButton"))
                    }
                categoryValue = document.getElementById("edit-grading-category-id").value
                canGraded = (defaultGraded == "0") ? "No Default Category":"No"
                isGraded = (categoryValue == "0") ? canGraded:"Yes"
                document.getElementById("gradedDisplay").textContent = isGraded
                }
            }
        }
    }

    pinnedStandards.get(() => {setInterval(reactiveCheck, 250)})

    } catch (error) {
        console.error("Couldn't run class page fixes with error", error)
    }

    //Toggles pin on mastery standards
    function togglePin(pin) {
        let name = document.getElementsByClassName(pin)[0].getAttribute("name")
        if(pinnedStandards.value.includes(name)) {
            pinnedStandards.value.splice(pinnedStandards.value.indexOf(name),1)
            document.getElementsByClassName(pin)[0].src = pinicon
            document.getElementsByClassName(pin)[0].classList.add("hovshow")
            pinnedStandards.set()
        } else {
            pinnedStandards.value.push(name)
            document.getElementsByClassName(pin)[0].src = piniconFilled
            document.getElementsByClassName(pin)[0].classList.remove("hovshow")
            pinnedStandards.set()
        }
    }

    //Advanced button on custom 'add assignment' ui
    function openAdvanced() {
        box = document.getElementsByClassName("popups-box")[0]
        form = box.querySelector("[id='s-grade-item-add-form']").children[0]
        for(let i = 4; i < form.children.length; i++) {
            if(form.children[i].getAttribute("type") != "hidden" && !form.children[i].classList.contains("classic-mastery") && (form.children[i].id != "edit-alignments-wrapper-0")) {
                form.children[i].style.display = "inherit"
            }
            if(form.children[i].children[0]) {
                if(form.children[i].children[0].id == "edit-district-mastery-grading-scale-id-wrapper") {
                    form.children[i].style.visibility = "hidden"
                }
            }
        }
        document.getElementById("advButton").remove()
    }

    //Function for 'graded' button
    function toggleGraded() {
        console.debug(document.getElementById("edit-grading-category-id").value, defaultGraded)
        if(document.getElementById("edit-grading-category-id").value == "0") {
            document.getElementById("edit-grading-category-id").value = defaultGraded
        } else {
            document.getElementById("edit-grading-category-id").value = 0
        }
    }
    
    buttonfunctions = Object.assign({}, buttonfunctions, {
        "togglePin" : togglePin,
        "openAdvanced" : openAdvanced,
        "toggleGraded" : toggleGraded,
    })

}}