function addClass(name, link) {
    container = document.getElementById("classlist")
    carat = browser.runtime.getURL("icons/carat.png");
    if(name in classcolors) {
        color = classcolors[name]
    } else {
        color = "#808080"
    }

    //<th onclick="javascript:sus()" class="classcolor" style="background-color: ;"></th>

    container.innerHTML += `
    <tr class="widthbox shadow hov clickable">
        <th class="classcolor"><input type="color" value="${color}" onchange="setColor(value, '${name}')"/></th>
        <th onclick="openLink('${link}')" style="width: 100%;"><h2 style="padding-left: 10px; text-align: left; margin-top: 10px; margin-bottom: 10px;">${name}</h2></th>
        <th onclick="openLink('${link}')" style="width: 40px; background: url(${carat}) no-repeat center center; background-size: 15px 15px;"></th>
    </tr>
    `
} 

dates = []
iteratable = 0
function addAssignment(day, name, time, link) {
    container = document.getElementById("assignmentlist")
    xicon = browser.runtime.getURL("icons/x.png")

    if(!checkedAssignments[1].includes(unEscape(name))) {
        if(!(dates.includes(day, 0))) {
            if(day == "overdue") {
                dayonly = "Overdue"
                notday = ""
                color = "color: darkred"
            } else {
                dayonly = day.substring(0,day.indexOf(","))
                notday = day.substring(day.indexOf(","))
                color = ""
            }
            
            container.innerHTML += `
            <tr name="day" class="widthbox">
                <th style="width: 100%;">
                    <h2 style="padding-left: 15px; line-height: 5px; text-align: left; font-style: italic;"><em style="${color}">${dayonly}</em>${notday}</h2>
                </th>
            </tr>
            `
            dates.push(day)
        } 
        
        if(checkedAssignments[0].includes(unEscape(name))) {
            checked = "checked=true";
            textDec = "text-decoration: line-through;"
        } else {
            checked = "";
            textDec = "text-decoration: none;"
        }

        container.innerHTML += `
        <tr name="assignment" id="aslist${iteratable}" class="widthbox hov clickable">
            <th><img src="${xicon}" onclick="xMe('${name}', '${iteratable}')" width="15px" height="15px" style="margin-left: 10px; margin-top: 8px; margin-right: 2px;"></th>
            <th><input style="margin-left: 2px; margin-top: 8px; margin-right: 20px;" type="checkbox" onclick="checkMe('${name}', ${iteratable})" ${checked}></th>
            <th style="width: 100%;"><h3 id="assignment${iteratable}" onclick="openLink('${link}')" style="text-align: left; color: lightslategrey; ${textDec}">${name}</h3></th>
            <th><h4 onclick="openLink('${link}')" style="padding-right: 15px; text-align: right; white-space: nowrap;">${time}</h4></th>
        </tr>
        `

        iteratable += 1
    }
}

function addGrade(name,grade,link,fromPast) {
    container = document.getElementById("gradelist")
    if(grade >= 4.0) {
        color = "green"
    } else if (grade >= 3.5) {
        color = "yellow"
    } else if (grade >= 0) {
        color = "red"
    } else {
        color = "gray"
    }

    if(grade >= 0 && !fromPast) {
        match2 = false;
        for(h=0; h < pastGrades.length; h++) {
            if(pastGrades[h][0] == name) {
                match2 = true;
            }
        }
        if(!match2) {
            pastGrades.push([name,grade,link])
            browser.storage.sync.set({pastGrades})
        }
    }

    container.innerHTML += `
    <tr name="grade" onclick="openLink('${link}')" class="widthbox hov clickable">
        <th style="width: 100%;"><h3 style="padding-left: 20px; text-align: left;">${name}</h3></th>
        <th><h3 style="padding-right: 5px; text-align: right;">${grade}</h3></th>
        <th><div class="gradebox" style="background-color: ${color};"></div></th>
    </tr>
    `
}

function openLink(link) {
    window.open(link, "_self")
}
exportFunction(openLink, window, { defineAs: "openLink" });

function checkMe(name, id) {
    if(!checkedAssignments[0].includes(name)) {
        checkedAssignments[0].push(name)
        document.getElementById(`assignment${id}`).style.textDecoration = "line-through";
    } else {
        checkedAssignments[0].splice(checkedAssignments[0].indexOf(name), 1);
        document.getElementById(`assignment${id}`).style.textDecoration = "";
    }
    browser.storage.sync.set({checkedAssignments})
}
exportFunction(checkMe, window, { defineAs: "checkMe" });

function xMe(name, id) {
    checkedAssignments[1].push(name)
    document.getElementById(`aslist${id}`).remove();
    browser.storage.sync.set({checkedAssignments})
}
exportFunction(xMe, window, { defineAs: "xMe" });

function refreshClrAssLst() {
    checkedAssignments = [[],[]]
    browser.storage.sync.set({checkedAssignments})
    location.reload();
}
exportFunction(refreshClrAssLst, window, { defineAs: "refreshClrAssLst" });

function setColor(value, name) {
    classcolors[name] = value
    browser.storage.sync.set({classcolors})
}
exportFunction(setColor, window, { defineAs: "setColor" });

function toggleCngBg() {
    widget = document.getElementById("bgbox")
    if(widget.style.visibility == "hidden") {
        widget.style.visibility = ""
        document.getElementById("bgcolor").value = backGround[0]
        document.getElementById("bgimg").value = backGround[1]
        document.getElementById("bgblur").value = backGround[2]
    } else {
        widget.style.visibility = "hidden"
    }
}
exportFunction(toggleCngBg, window, { defineAs: "toggleCngBg" });

function saveBg() {
    color = document.getElementById("bgcolor").value
    link = document.getElementById("bgimg").value
    blurbg = document.getElementById("bgblur").value
    document.body.style.backgroundColor = color
    document.body.style.backgroundImage = `url('${link}')`
    document.body.style.backdropFilter = `blur(${blurbg}px)`
    backGround = [color, link, blurbg]
    browser.storage.sync.set({backGround})
}
exportFunction(saveBg, window, { defineAs: "saveBg" });

function editSavedGrades(argument="h", input=-1) {
    if(argument == "h") {
        console.info("a = add grade, r = remove grade, leave second argument blank for help")
        console.info("Saved Grades:", pastGrades)
    } else if (argument == "r") {
        if(typeof input == "number") {
            if(input < 0 || input > pastGrades.length) {
                console.info("Please input a valid index to remove")
            } else {
                console.info("Success! Removed", pastGrades[input])
                pastGrades.splice(input, 1)
                browser.storage.sync.set({pastGrades})
                location.reload();
            }
        } else {
            console.info("Please input a valid index to remove")
        }  
    } else if (argument == "a") {
        if (typeof input == "object") {
            if(input.length == 3) {
                pastGrades.push(input)
                console.info("Success! Added", input)
                browser.storage.sync.set({pastGrades})
                location.reload();
            } else {
                console.info("Please input a valid array assignment to add (['Name','Grade','Link'])")
            }
        } else {
            console.info("Please input a valid array assignment to add (['Name','Grade','Link'])")
        }
    }
}
exportFunction(editSavedGrades, window, { defineAs: "editSavedGrades" });

function unEscape(htmlStr) {
    htmlStr = htmlStr.replace(/&lt;/g , "<");	 
    htmlStr = htmlStr.replace(/&gt;/g , ">");     
    htmlStr = htmlStr.replace(/&quot;/g , "\"");  
    htmlStr = htmlStr.replace(/&#39;/g , "\'");   
    htmlStr = htmlStr.replace(/&amp;/g , "&");
    return htmlStr;
}

function onError(error) {console.debug(error)}