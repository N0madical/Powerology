//storage_types: sync, local
function browserStorage(name, storageType, defaultValue = "[]", ...onCompleteFunctions) {
    this.name = name;
    this.value = defaultValue;
    this.defaultValue = defaultValue;
    this.runAfter = onCompleteFunctions;

    if(storageType == "sync") {
        this.sync = true
    } else {
        this.sync = false
    }
    
    if (typeof browser !== "undefined") {
        storageapi = browser;
    } else {
        storageapi = chrome;
    }

    this.get = function() {
        try {
            if(typeof browser !== "undefined") {
                if(this.sync) {
                    browser.storage.sync.get(`${this.name}`).then(this.internalGet, this.error)
                } else {
                    browser.storage.local.get(`${this.name}`).then(this.internalGet, this.error)
                }
            } else {
                if(this.sync) {
                    chrome.storage.sync.get(`${this.name}`, this.internalGet)
                } else {
                    chrome.storage.local.get(`${this.name}`, this.internalGet)
                }
            }
        } catch (error) {
            console.error(`Powerology: Error retreiving browser storage for ${this.name}\nIs Cloud Storage: ${this.sync}\nError: ${error}`)
        }
    };

    this.set = function() {
        try{
            if(this.sync) {
                storageapi.storage.sync.set({[this.name]:this.value})
            } else {
                storageapi.storage.local.set({[this.name]:this.value})
            }
        } catch (error) {
            console.error(`Powerology: Error setting browser storage for ${this.name}\nIs Cloud Storage: ${this.sync}\nError: ${error}`)
        }
    };

    this.clear = function() {
        try{
            if(this.sync) {
                storageapi.storage.sync.remove(`${this.name}`)
            } else {
                storageapi.storage.local.remove(`${this.name}`)
            }
        } catch (error) {
            console.error(`Powerology: Error clearing browser storage for ${this.name}\nIs Cloud Storage: ${this.sync}\nError: ${error}`)
        }
    }

    let self = this

    this.internalGet = function(value) {
        self.value = value[self.name];
        if(self.value == undefined) {
            self.value = self.defaultValue
            if(self.sync) {
                console.debug("Powerology: Value was undefined, Sync setting:", self.name)
                storageapi.storage.sync.set({[name]:self.value})
            } else {
                storageapi.storage.local.set({[name]:self.value})
            }
        }
        if(self.runAfter) {for(self.i = 0; self.i < self.runAfter.length; self.i++) {
                try {
                    self.runAfter[self.i]()
                } catch (error) {
                    console.error("Powerology: Tried to run invalid function with error\n-----\n", self.runAfter[self.i], "\n-----\n", error ,"\n-----\nafter getting variable", self.name)
                }
        }   }
        
    };

    this.error = function(value) {
        console.error(`Powerology: (Catch-All) Browser storage ${name} had error: ${value}`)
    }
}

function openLink(link, newtab=false) {
    if(!newtab) {
        window.open(link, "_self")
    } else {
        window.open(link)
    }
    
}

function addEventListeners(object) {
    try{
        let clickable = object.getElementsByClassName("clickable")
        if(object.classList.contains("clickable")) {clickable = [object]}
        for(let b = 0; b < clickable.length; b++) {
            try{
                if(clickable[b].hasAttribute("onclickevent")) {
                    let func = clickable[b].getAttribute("onclickevent");
                    let funcname = func.substring(0,func.indexOf("("));
                    let funcargs = JSON.parse(("[" + func.substring(func.indexOf("(")+1,func.length-1) + "]").replaceAll('\'', '\"')) //.split(/(?<=['|"]), (?=['|"])/);
                    clickable[b].addEventListener("click", () => {
                        buttonfunctions[funcname].apply(null, funcargs)
                    });
                }
                if(clickable[b].hasAttribute("onrightclickevent")) {
                    let func = clickable[b].getAttribute("onrightclickevent");
                    let funcname = func.substring(0,func.indexOf("("));
                    let funcargs = JSON.parse(("[" + func.substring(func.indexOf("(")+1,func.length-1) + "]").replaceAll('\'', '\"')) //.split(/(?<=['|"]), (?=['|"])/);
                    clickable[b].addEventListener("contextmenu", (e) => {
                        buttonfunctions[funcname].apply(null, funcargs)
                        e.preventDefault()
                    });
                }
            } catch (error) {
                console.error(`Error setting event listener on specefic object ${clickable[b]} with error: ${error}`)
                // try {
                //     console.error(`Arguments:\n`, func, "\n", funcname, "\n", funcargs)
                // } catch {}
            }
            
        }
    } catch (error) {
        console.error(`Error setting event listeners for object ${object} with error: ${error}`)
    }
    
}

function toggleInfo() {
    ximage = storageapi.runtime.getURL("icons/x_white.png");
    if(!document.getElementById("infobox")) {
        document.body.insertAdjacentHTML("beforebegin", `
        <div class="clickable" id="infoboxbg" style="position: fixed; width: 100%; height: 100%; background-color: black; z-index: 25; opacity: 0.5; cursor: unset;" onclickevent="toggleInfo()"></div>
        <div id="infobox" class="shadow">
            <div style="width: 100%; height: 80px; background-color: rgb(54, 87, 59); margin: 0;">
                <h1 style="text-align: center; color: white; font-size: 30px; padding-top: 20px;">Powerology Info</h1>
                <img class="clickable" src="${ximage}" width="30px" height="30px" style="position: absolute; right: 5px; top: 5px;" onclickevent="toggleInfo()">
            </div>
            <div style="box-sizing: border-box; background-color: #faf9f7; width: 100%; max-height: 720px; min-height: max-content; overflow-y: scroll; padding: 20px 20px; font-size: medium;">
                <h2 style="font-size: 30px;">Powerology Features:</h2>
                <ul style="padding-left: 20px; padding-top: 10px;">
                    <li>Home Page Styling</li>
                    <li>Custom Class Color Coding (Click to change)</li>
                    <li>Assignment management!</li>
                    <li>Show all grades on home page</li>
                    <li>Custom backgrounds</li>
                    <li>Add custom assignments</li>
                    <li>Double click mastery standard grades to edit - Test grades!</li>
                    <li>Show overall mastery grades & GPA on grades page</li>
                    <li>Entirely client-side</li>
                    <li>Browser storage for easy preference saving</li>
                    <li>Sort grades by grade range!</li>
                    <li>Open all mastery tabs in new tabs</li>
                    <li>Right-click to open in new tab instantly</li>
                    <li>Instant links</li>
                    <li>Bypass glitched mastery pages</li>
                    <li>And much more...</li>
                </ul>
                <h2 style="font-size: 30px; padding-top: 20px;">Contributors/Special Thanks To:</h2>
                <ul style="padding-left: 20px; padding-top: 10px;">
                    <li><b>Creator, Developer:</b> Aiden</li>
                    <li><b>Early Debugging:</b> Sabrina & Eli C. -- The program would be crashing constantly without y'all</li>
                    <li><b>Feature Fixes:</b> Mateo, Everest, Mr. Grisbee, Eli L. & Isa P. -- You guys/gals helped make it so much better</li>
                </ul>
                <button type="button" class="clickable margin-center" onclickevent="openLink('https://powerology.aidencunningham.com/', true)" style="margin-top: 20px">Powerology Website</button>
                <button type="button" class="clickable margin-center" onclickevent="openLink('https://github.com/N0madical/Powerology', true)" style="margin-top: 20px">Powerology Source Code</button>
            </div>
        </div>
        `)
        addEventListeners(document.getElementById("infobox"))
        addEventListeners(document.getElementById("infoboxbg"))
        setTimeout(function() {document.getElementById("infobox").classList.add("show")}, 20)
    } else {
        document.getElementById("infobox").classList.remove("show")
        setTimeout(function() {
            document.getElementById("infobox").remove()
            document.getElementById("infoboxbg").remove()
        }, 500)
        
    }
}

function toggleCngBg(force = false) {
    let widget = document.getElementById("bgbox")
    if (force) {
        widget.classList.remove("show")
    } else {
        if(!widget.classList.contains("show")) {
            widget.classList.add("show")
            document.getElementById("bgcolor").value = backGround.value[0]
            document.getElementById("bgimg").value = backGround.value[1]
            document.getElementById("bgblur").value = backGround.value[2]
            document.getElementById("bgall").checked = backGround.value[3]
            document.getElementById("bubblepg").checked = backGround.value[4]
        } else {
            widget.classList.remove("show")
        }
    }
    
}

function saveBg() {
    color = document.getElementById("bgcolor").value
    link = document.getElementById("bgimg").value
    blurbg = document.getElementById("bgblur").value
    onall = document.getElementById("bgall").checked
    bubblepg = document.getElementById("bubblepg").checked
    if(onall || window.location.href.includes("home")) {
        document.getElementById("backgroundbox").style.backgroundColor = color
        document.getElementById("backgroundbox").style.backgroundImage = `url('${link}')`
        document.getElementById("backgroundbox").style.filter = `blur(${blurbg}px)`
        if(!window.location.href.includes("home") || window.location.href.includes("powerology")) {
            document.getElementById("wrapper").classList.add("shadow", "wrapperbox")
            if(bubblepg) {
                document.getElementById("wrapper").classList.add("bubblewrapperbox")
            } else {
                document.getElementById("wrapper").classList.remove("bubblewrapperbox")
            }
        } else {
            let boxes = document.getElementsByClassName("box")
            for(let y = 0; y < boxes.length; y++) {boxes[y].style.borderRadius = (bubblepg) ? "10px":"0px"}
        }
    } else {
        document.getElementById("backgroundbox").style.backgroundColor = "#faf9f7"
        document.getElementById("backgroundbox").style.backgroundImage = null
        document.getElementById("backgroundbox").style.filter = null
        document.getElementById("wrapper").classList.remove("shadow", "wrapperbox", "bubblewrapperbox")
    }
    
    backGround.value = [color, link, blurbg, onall, bubblepg]
    backGround.set()
}

function closeBox(event) {
    if(event.clientX >= 210 || event.clientY >= 580) {
        toggleCngBg(true)
    }
}

buttonfunctions = {
    "toggleCngBg" : toggleCngBg,
    "saveBg" : saveBg,
    "openLink" : openLink,
    "toggleInfo" : toggleInfo,
}

document.addEventListener("click", closeBox);