function addClass(name, link) {
    container = document.getElementById("classlist")
    carat = browser.runtime.getURL("icons/carat.png");
    if(name in classcolors) {
        color = classcolors[name]
    } else {
        color = "gray"
    }

    container.innerHTML += `
    <tr class="widthbox shadow hov clickable">
        <th onclick="javascript:sus()" class="classcolor" style="background-color: ${color};"></th>
        <th onclick="openLink('${link}')" style="width: 100%;"><h2 style="padding-left: 10px; text-align: left; margin-top: 10px; margin-bottom: 10px;">${name}</h2></th>
        <th onclick="openLink('${link}')" style="width: 40px; background: url(${carat}) no-repeat center center; background-size: 15px 15px;"></th>
    </tr>
    `
} 

dates = []
iteratable = 0
function addAssignment(day, name, time, link) {
    container = document.getElementById("assignmentlist")

    if(!checkedAssignments.includes(name)) {
        if(!(dates.includes(day, 0))) {
                dayonly = day.substring(0,day.indexOf(","))
                notday = day.substring(day.indexOf(","))
                container.innerHTML += `
                <tr name="day" class="widthbox">
                    <th style="width: 100%;">
                        <h2 style="padding-left: 15px; line-height: 5px; text-align: left; font-style: italic;"><em>${dayonly}</em>${notday}</h2>
                    </th>
                </tr>
                `
                dates.push(day)
            } 

        container.innerHTML += `
        <tr name="assignment" class="widthbox hov clickable">
            <th><input style="margin-left: 20px; margin-top: 8px; margin-right: 20px;" type="checkbox" onclick="checkMe('${name}', ${iteratable})"></th>
            <th style="width: 100%;"><h3 id="assignment${iteratable}" onclick="openLink('${link}')" style="text-align: left; color: lightslategrey;">${name}</h3></th>
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
    if(!checkedAssignments.includes(name)) {
        checkedAssignments.push(name)
        document.getElementById(`assignment${id}`).style.textDecoration = "line-through";
    } else {
        checkedAssignments.splice(checkedAssignments.indexOf(name), 1);
        document.getElementById(`assignment${id}`).style.textDecoration = "";
    }
    browser.storage.sync.set({checkedAssignments})
}
exportFunction(checkMe, window, { defineAs: "checkMe" });

function refreshClrAssLst() {
    checkedAssignments = []
    browser.storage.sync.set({checkedAssignments})
    location.reload();
}
exportFunction(refreshClrAssLst, window, { defineAs: "refreshClrAssLst" });

function onError(error) {console.debug(error)}