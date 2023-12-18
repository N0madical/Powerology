document.addEventListener('DOMContentLoaded', function() {
    exceptionList = new browserStorage("exceptionList", "sync", [[],[]])
    exceptionList.get(() => {document.getElementById("excludes").value = arrayInText(exceptionList.value[1])})

    buttonlist = [["clearall", -1],["clearcol", 0],["clearass", 1],["clearcus", 2],["clearsav", 3],["clearsty",4]]
    for(let i = 0; i < buttonlist.length; i++) {
        document.getElementById(buttonlist[i][0]).addEventListener('click', function() {
            clearItem(buttonlist[i][1]);
        });
    }

    document.getElementById("debugfile").addEventListener('click', function() {
        outputDebug("debugprint");
    });

    document.getElementById("debugvars").addEventListener('click', function() {
        outputDebug("storageprint");
    });

    document.getElementById("opensc").addEventListener('click', function() {
        window.open("https://postoakschool.schoology.com/");
    });

    document.getElementById("savebutton").addEventListener('click', function() {
        try {
            if(document.getElementById("excludes").value != "" && document.getElementById("excludes").value != undefined) {
                exceptionList.value[1] = document.getElementById("excludes").value.replaceAll(",", "").split('\n')
                exceptionList.set()
                document.getElementById("excludes").value = arrayInText(exceptionList.value[1])
            } else {
                exceptionList.value[1] = []
                exceptionList.set()
                document.getElementById("excludes").value = arrayInText(exceptionList.value[1])
            }
        } catch (error) {
            output(error)
        }
        
        
    });
    
});

function arrayInText(arrayin) {
    let temp = ""
    for(let i in arrayin) {
        if(i < arrayin.length-1) {
            temp += arrayin[i] + "\n"
        } else {
            temp += arrayin[i]
        }
    }
    return temp
}

function output(text) {
    document.getElementById("output").innerHTML += text + '<br>'
}

function clearOutput() {
    document.getElementById("output").innerHTML = ""
}

function clearItem(index) {
    try{
        if(index == -1) {
            if (typeof browser !== "undefined") {
                storageapi = browser;
            } else {
                storageapi = chrome;
            }
            storageapi.storage.sync.clear()
            storageapi.storage.local.clear()
        } else {
            classColors = new browserStorage("classColors", "sync")
            checkedAssignments = new browserStorage("checkedAssignments", "sync", [[],[],[]])
            customAssignments = new browserStorage("customAssignments", "sync", [])
            pastGrades = new browserStorage("pastGrades", "local", [])
            backGround = new browserStorage("backGround", "sync", ["#faf9f7", "https://source.unsplash.com/random/1920x1080/?city,night", 10, true, true])

            let stroagelist = [classColors, checkedAssignments, customAssignments, pastGrades, backGround]

            stroagelist[index].clear()
        }
        output(`Success, cleared storage ${index}`)
    } catch (error) {
        output(error)
    }
    
}

function outputDebug(message) {
    try{
        message = message
        if (typeof browser !== "undefined") {
            storageapi = browser;
        } else {
            storageapi = chrome;
        }
        storageapi.tabs
        .query({
        currentWindow: true,
        active: true,
        })
        .then(function sendMessageToTabs(tabs) {
            output(message)
            for (const tab of tabs) {
                storageapi.tabs
                .sendMessage(tab.id, { action: `${message}` })
                .catch(onError);
            }
        })
        .catch(onError);
    } catch (error) {
        output(error)
    }
}

function onError(error) {
    output(`Error: ${error}`);
}