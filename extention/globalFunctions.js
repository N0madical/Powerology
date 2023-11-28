//storage_types: sync, local
function browserGet(variable_name, storage_type, default_value = "[]", on_return = "") {
    // let obj = {}
    // obj[variable_name] = variable_name
    if (typeof browser !== "undefined") {
        storageapi = "browser";
    } else {
        storageapi = "chrome";
    }
    onReturn = "'bruh'"
    if(on_return != "") {
        onReturn = on_return
    }
    if(typeof variable_name == "string") {
        eval?.(`
        try {
            ${variable_name} = ${default_value}
        } catch {
            let ${variable_name} = ${default_value}
        }
        if(typeof browser !== "undefined") {
            ${storageapi}.storage.${storage_type}.get('${variable_name}').then(browserGet_${variable_name}, onError)
        } else {
            ${storageapi}.storage.${storage_type}.get('${variable_name}', browserGet_${variable_name})
        }
        function browserGet_${variable_name}(value) {
            ${variable_name} = value.${variable_name}; 
            if(${variable_name} == undefined) {
                ${variable_name} = ${default_value}
                ${storageapi}.storage.${storage_type}.set({${variable_name}})
            }
            if(typeof ${onReturn} == "function") {
                ${onReturn}()
            }
        }
        `)
    } else {
        console.error("browserGet: variable_name (input 0) must be type String")
    }
}

function browserSet(variable_name, storage_type) {
    if (typeof browser !== "undefined") {
        storageapi = "browser";
    } else {
        storageapi = "chrome";
    }
    eval?.(`
        ${storageapi}.storage.${storage_type}.set({${variable_name}})
    `)
} 

function openLink(link) {
    window.open(link, "_self")
}

function addEventListeners(object) {
    let clickable = object.getElementsByClassName("clickable")
    for(let b = 0; b < clickable.length; b++) {
        //console.debug(clickable[b])
        if(clickable[b].hasAttribute("onclickevent")) {
            //console.debug(clickable[b].getAttribute("onclickevent"))
            let func = clickable[b].getAttribute("onclickevent")
            clickable[b].addEventListener("click", () => {
                eval?.(`${func}`)
            });
        }
    }
}