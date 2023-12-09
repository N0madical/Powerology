document.addEventListener('DOMContentLoaded', function() {

    buttonlist = [["clearall", -1],["clearcol", 0],["clearass", 1],["clearcus", 2],["clearsav", 3]]
    for(let i = 0; i < buttonlist.length; i++) {
        document.getElementById(buttonlist[i][0]).addEventListener('click', function() {
            clearItem(buttonlist[i][1]);
        });
    }

    document.getElementById("debugfile").addEventListener('click', function() {
        outputDebug();
    });
    
});

function output(text) {
    document.getElementById("output").textContent = text
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

            let stroagelist = [classColors, checkedAssignments, customAssignments, pastGrades]

            stroagelist[index].clear()
        }
        output(`Success, cleared storage ${index}`)
    } catch (error) {
        output(error)
    }
    
}

function outputDebug() {
    if (typeof browser !== "undefined") {
        storageapi = browser;
    } else {
        storageapi = chrome;
    }
    browser.tabs
    .query({
      currentWindow: true,
      active: true,
    })
    .then(sendMessageToTabs)
    .catch(onError);
}
  
function sendMessageToTabs(tabs) {
    for (const tab of tabs) {
        browser.tabs
        .sendMessage(tab.id, { action: "debugprint" })
        .catch(onError);
    }
}

function onError(error) {
    console.error(`Error: ${error}`);
}