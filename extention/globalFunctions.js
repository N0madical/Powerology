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
            console.error(`Error retreiving browser storage\nIs Cloud Storage: ${this.sync}\nError: ${error}`)
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
            console.error(`Error setting browser storage\nIs Cloud Storage: ${this.sync}\nError: ${error}`)
        }
    };

    let self = this

    this.internalGet = function(value) {
        self.value = value[self.name];
        if(self.value == undefined) {
            self.value = self.defaultValue
            if(self.sync) {
                console.debug("Value was undefined, Sync setting:", self.name)
                storageapi.storage.sync.set({[name]:self.value})
            } else {
                storageapi.storage.local.set({[name]:self.value})
            }
        }
        if(self.runAfter) {for(self.i = 0; self.i < self.runAfter.length; self.i++) {
                try {
                    self.runAfter[self.i]()
                } catch {
                    console.error("Tried to run invalid function\n-----\n", self.runAfter[self.i], "\n-----\nafter getting variable", self.name)
                }
        }   }
        
    };

    this.error = function(value) {
        console.error(`Browser storage ${name} had error: ${value}`)
    }
}

function openLink(link) {
    window.open(link, "_self")
}

function addEventListeners(object) {
    try{
        let clickable = object.getElementsByClassName("clickable")
        for(let b = 0; b < clickable.length; b++) {
            if(clickable[b].hasAttribute("onclickevent")) {
                let func = clickable[b].getAttribute("onclickevent");
                let funcname = func.substring(0,func.indexOf("("));
                let funcargs = JSON.parse(("[" + func.substring(func.indexOf("(")+1,func.length-1) + "]").replaceAll('\'', '\"')) //.split(/(?<=['|"]), (?=['|"])/);
                clickable[b].addEventListener("click", () => {
                    buttonfunctions[funcname].apply(null, funcargs)
                });
            }
        }
    } catch (error) {
        console.error(`Error setting event listeners: ${error}`)
    }
    
}