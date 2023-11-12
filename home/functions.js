function addClass(name, link) {
    container = document.getElementById("classlist")
    carat = browser.runtime.getURL("icons/carat.png");
    if(name in classcolors) {
        color = classcolors[name]
    } else {
        color = "gray"
    }
    

    console.debug(link)

    container.innerHTML += `
    <tr class="widthbox shadow hov clickable">
        <th onclick="javascript:sus()" class="classcolor" style="background-color: ${color};"></th>
        <th onclick="openLink('${link}')" style="width: 100%;"><h2 style="padding-left: 10px; text-align: left; margin-top: 10px; margin-bottom: 10px;">${name}</h2></th>
        <th onclick="openLink('${link}')" style="width: 40px; background: url(${carat}) no-repeat center center; background-size: 15px 15px;"></th>
    </tr>
    `
} 

dates = []
function addAssignment(day, name, time, link) {
    container = document.getElementById("assignmentlist")

    if(!(dates.includes(day, 0))) {
        dayonly = day.substring(0,day.indexOf(","))
        notday = day.substring(day.indexOf(","))
        container.innerHTML += `
        <tr name="day" class="widthbox">
            <th style="width: 100%;">
                <h2 style="padding-left: 10px; line-height: 5px; text-align: left; padding-top: 10px; font-style: italic;"><em>${dayonly}</em>${notday}</h2>
            </th>
        </tr>
        `
        dates.push(day)
    } 

    container.innerHTML += `
    <tr name="assignment" onclick="openLink('${link}')" class="widthbox hov clickable">
        <th style="width: 100%;"><h3 style="padding-left: 40px; text-align: left; color: lightslategrey;">${name}</h3></th>
        <th><h4 style="padding-right: 20px; text-align: right;">${time}</h4></th>
    </tr>
    `
}

function addGrade(name,grade,link) {
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