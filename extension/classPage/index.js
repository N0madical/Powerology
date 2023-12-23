pinnedStandards = new browserStorage("pinnedStandards", "sync", ["1.Body Paragraphs"])
pinicon = storageapi.runtime.getURL("icons/pin.png");
piniconFilled = storageapi.runtime.getURL("icons/pinFull.png");

exceptionList.get(masteryPage)

function masteryPage() {  
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

    function reactiveCheck() {
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
    }

    pinnedStandards.get(() => {setInterval(reactiveCheck, 250)})

    
    } catch (error) {
        console.error("Couldn't run class page fixes with error", error)
    }

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
    
    buttonfunctions = Object.assign({}, buttonfunctions, {
        "togglePin" : togglePin,
    })

}}