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
        console.debug(object, clickable)
        for(let b = 0; b < clickable.length; b++) {
            try{
                if(clickable[b].hasAttribute("onclickevent")) {
                    let func = clickable[b].getAttribute("onclickevent");
                    console.debug("added", func)
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
        console.debug("hmm")
        document.body.insertAdjacentHTML("beforebegin", `
        <div class="clickable" id="infoboxbg" style="position: fixed; width: 100%; height: 100%; background-color: black; z-index: 25; opacity: 0.5; cursor: unset;" onclickevent="toggleInfo()"></div>
        <div id="infobox" class="shadow" style="width: 600px; max-height: 1000px; min-height: max-content; position: fixed; z-index: 50; top: 50%; left: 50%; transform: translate(-50%, -50%);">
            <div style="width: 100%; height: 80px; background-color: rgb(54, 87, 59); margin: 0;">
                <h1 style="text-align: center; color: white; font-size: 30px; padding-top: 20px;">Powerology Info</h1>
                <img class="clickable" src="${ximage}" width="30px" height="30px" style="position: absolute; right: 5px; top: 5px;" onclickevent="toggleInfo()">
            </div>
            <div style="box-sizing: border-box; background-color: #faf9f7; width: 100%; max-height: calc(100% - 80px); min-height: max-content; overflow-y: scroll; padding: 20px 20px; font-size: medium;">
                <h2 style="font-size: 30px;">Powerology Features:</h2>
                <ul style="padding-left: 20px; padding-top: 10px;">
                    <li>Home Page Styling</li>
                    <li>Custom Class Color Coding (Click to change)</li>
                    <li>Assignment management!</li>
                    <li>Show all grades on home page</li>
                    <li>Custom backgrounds</li>
                    <li>Add custom assignments</li>
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
                <h2 style="font-size: 30px; padding-top: 20px;">Contributors:</h2>
                <ul style="padding-left: 20px; padding-top: 10px;">
                    <li><b>Creator, Developer:</b> Aiden</li>
                    <li><b>Early Debugging:</b> Sabrina & Eli C.</li>
                    <li><b>Feature Fixes:</b> Mateo, Everest, Mr. Grisbee, Max F. & Isa P.</li>
                </ul>
            </div>
        </div>
        `)
        addEventListeners(document.getElementById("infobox"))
        addEventListeners(document.getElementById("infoboxbg"))
    } else {
        document.getElementById("infobox").remove()
        document.getElementById("infoboxbg").remove()
    }
}

function toggleCngBg(force = false) {
    let widget = document.getElementById("bgbox")
    if (force) {
        widget.style.visibility = "hidden"
    } else {
        if(widget.style.visibility == "hidden") {
            widget.style.visibility = ""
            document.getElementById("bgcolor").value = backGround.value[0]
            document.getElementById("bgimg").value = backGround.value[1]
            document.getElementById("bgblur").value = backGround.value[2]
        } else {
            widget.style.visibility = "hidden"
        }
    }
    
}

function saveBg() {
    color = document.getElementById("bgcolor").value
    link = document.getElementById("bgimg").value
    blurbg = document.getElementById("bgblur").value
    onall = document.getElementById("bgall").checked
    if(onall || window.location.href.includes("home")) {
        document.body.style.backgroundColor = color
        document.body.style.backgroundImage = `url('${link}')`
        document.body.style.backdropFilter = `blur(${blurbg}px)`
        if(!window.location.href.includes("home")) {
            document.getElementById("wrapper").style.backgroundColor = "#faf9f7"
            document.getElementById("wrapper").classList.add("shadow")
        }
    } else {
        document.body.style.backgroundColor = "#faf9f7"
        document.body.style.backgroundImage = ``
        document.body.style.backdropFilter = ``
        document.getElementById("wrapper").classList.remove("shadow")
    }
    
    backGround.value = [color, link, blurbg, onall]
    backGround.set()
}

buttonfunctions = {
    "toggleCngBg" : toggleCngBg,
    "saveBg" : saveBg,
    "openLink" : openLink,
    "toggleInfo" : toggleInfo,
}