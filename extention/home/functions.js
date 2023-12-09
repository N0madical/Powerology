function updateClasses() {
    classiteratable = 0
    console.info("Powerology: Updating Class List...")
    document.getElementById("classlist").textContent = ""
    for(p=0; p < classesarray.length; p++) {
        addClass(classesarray[p][0],classesarray[p][1])
    }

    addEventListeners(document.getElementById("classlist"))
}

function updateAssignments() {
    console.info("Powerology: Updating Assignment List...")
    asdates = []
    tododates = []
    iteratable = 0
    document.getElementById("assignmentlist").textContent = ""
    document.getElementById("todolist").textContent = ""
    for(p=0; p < overdueassignmentsarray.length; p++) {
        addAssignment("overdue",overdueassignmentsarray[p][0],"",overdueassignmentsarray[p][1])
    }
    for(p=0; p < assignmentsarray.length; p++) {
        addAssignment(assignmentsarray[p][0],assignmentsarray[p][1],assignmentsarray[p][2],assignmentsarray[p][4],(assignmentsarray[p][3]=="custom"))
    }
    if(!document.getElementById("assignments").getElementsByClassName("errornotice")[0]) {
        for(let o = 0; o < errorlist.length; o++) {
            document.getElementById("assignments").insertAdjacentHTML("beforeend", errorlist[o])
        }
    }
    
    addEventListeners(document.getElementById("assignmentlist"))
    addEventListeners(document.getElementById("todolist"))
}

function updateGradeList() {
    console.info("Powerology: Updating Grades List...")
    document.getElementById("gradelist").textContent = ""
    for(p=0; p < gradesarray.length; p++) {
        if(gradessort[1] == "0") {
            addGrade(gradesarray[p][0][0],gradesarray[p][1][0],gradesarray[p][1][1],gradesarray[p][1][2],false)
        } else if (parseFloat(gradesarray[p][1][1]) >= gradessort[0] && parseFloat(gradesarray[p][1][1]) <= gradessort[1]) {
            addGrade(gradesarray[p][0][0],gradesarray[p][1][0],gradesarray[p][1][1],gradesarray[p][1][2],false)
        }
    }
    for(p=0; p < pastGrades.value.length; p++) {
        let counter = (pastGrades.value.length-1) - p
        match = false;
        for(c=0; c < gradesarray.length; c++) {
            if(gradesarray[c][1][0] == pastGrades.value[counter][1][0]) {
                match = true;
            }
        }
        if(!match) {
            if(gradessort[1] == "0") {
                addGrade(pastGrades.value[counter][0][0],pastGrades.value[counter][1][0],pastGrades.value[counter][1][1],pastGrades.value[counter][1][2],true)
            } else if (parseFloat(pastGrades.value[counter][1][1]) >= gradessort[0] && parseFloat(pastGrades.value[counter][1][1]) <= gradessort[1]) {
                addGrade(pastGrades.value[counter][0][0],pastGrades.value[counter][1][0],pastGrades.value[counter][1][1],pastGrades.value[counter][1][2],true)
            }
        }
    }

    addEventListeners(document.getElementById("gradelist"))
}

function intCustomAss(assignment) {
    let d1
    let d2
    let thisd
    let thisdate = new Date()
    let year = thisdate.getFullYear()
    for(let i = 0; i < assignmentsarray.length; i++) {
        d1 = (i == 0) ? 0:Date.parse(`${assignmentsarray[i][0].substring(assignmentsarray[i][0].indexOf(",")).trim()}, ${year}`)
        d2 = (assignmentsarray[i+1]) ? Date.parse(`${assignmentsarray[i+1][0].substring(assignmentsarray[i+1][0].indexOf(",")).trim()}, ${year}`):d1
        thisd = Date.parse(`${assignment[0].substring(assignment[0].indexOf(",")).trim()}, ${year}`)
        console.debug(d1,d2,thisd,assignment[1],assignmentsarray[i])
        if (thisd >= d1 && thisd <= d2) {
            assignmentsarray.splice(i, 0, assignment)
            return
        }
    }
    assignmentsarray.splice(assignmentsarray.length+1, 0, assignment)
    return
}

function addClass(name, link) {
    container = document.getElementById("classlist")
    carat = storageapi.runtime.getURL("icons/carat.png");
    if(name in classColors.value) {
        color = classColors.value[name]
    } else {
        color = "#808080"
    }

    if(typeof browser !== "undefined") {
        colorwidth = "7px"
    } else {
        colorwidth = "10px"
    }

    //<th onclick="javascript:sus()" class="classcolor" style="background-color: ;"></th>

    container.insertAdjacentHTML("beforeend", `
    <tr class="widthbox shadow hov clickable">
        <th class="classcolor"><input id="color_${classiteratable}" class="onchangeClickable" type="color" value="${color}" onchangeevent="setColor('color_${classiteratable}', '${name}')" style="width: ${colorwidth};"/></th>
        <th class="clickable" onclickevent="openLink('${link}')" onrightclickevent="openLink('${link}',true)" style="width: 100%;"><h2 style="padding-left: 10px; text-align: left; margin-top: 10px; margin-bottom: 10px;">${name}</h2></th>
        <th class="clickable" onclickevent="openLink('${link}')" onrightclickevent="openLink('${link}',true)" style="width: 40px; background: url(${carat}) no-repeat center center; background-size: 15px 15px;"></th>
    </tr>
    `)

    classiteratable++
} 

function addAssignment(day, name, time, link, isCustom) {
    if(!checkedAssignments.value[2].includes(unEscape(name))) {
        container = document.getElementById("assignmentlist")
        dates = asdates
    } else {
        container = document.getElementById("todolist")
        dates = tododates
    }

    xicon = storageapi.runtime.getURL("icons/x.png")
    todoicon = storageapi.runtime.getURL("icons/todo.png")

    if(!checkedAssignments.value[1].includes(unEscape(name))) {
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
            
            container.insertAdjacentHTML("beforeend", `
            <tr name="day" class="widthbox">
                <th style="width: 100%;">
                    <h2 style="padding-left: 15px; line-height: 5px; text-align: left; font-style: italic;"><em style="${color}">${dayonly}</em>${notday}</h2>
                </th>
            </tr>
            `)

            if(!checkedAssignments.value[2].includes(unEscape(name))) {
                asdates.push(day)
            } else {
                tododates.push(day)
            }
            if(tododates.length > 0) {
                document.getElementById("todo").style.display = "flex"
            } else {
                document.getElementById("todo").style.display = "none"
            }
        } 
        
        if(checkedAssignments.value[0].includes(unEscape(name))) {
            checked = "checked=true";
            textDec = "text-decoration: line-through;"
        } else {
            checked = "";
            textDec = "text-decoration: none;"
        }

        container.insertAdjacentHTML("beforeend",  `
        <tr name="assignment" id="aslist${iteratable}" class="widthbox hov clickable" style="padding-left:15px">
        <th><input class="clickable" style="margin-left: 2px; margin-top: 8px; margin-right: 2px;" type="checkbox" onclickevent="checkMe('${name}', ${iteratable})" ${checked}></th>
            <th><img class="hideuntilhover clickable" src="${xicon}" onclickevent="xMe('${name}', ${isCustom})" width="15px" height="15px" style="margin-left: 2px; margin-top: 8px; margin-right: 2px;"></th>
            <th><img class="hideuntilhover clickable" src="${todoicon}" onclickevent="todoMe('${name}', '${iteratable}', ${checkedAssignments.value[2].includes(unEscape(name))})" width="15px" height="15px" style="margin-left: 2px; margin-top: 8px; margin-right: 2px;"></th>
            <th style="width: 100%;"><h3 class="clickable" id="assignment${iteratable}" onclickevent="openLink('${link}')" onrightclickevent="openLink('${link}',true)" style="text-align: left; color: lightslategrey; margin-left: 20px; ${textDec}">${name}</h3></th>
            <th><h5 class="clickable" onclickevent="openLink('${link}')" onrightclickevent="openLink('${link}',true)" style="padding-right: 15px; text-align: right; white-space: nowrap;">${time}</h5></th>
        </tr>
        `)

        iteratable += 1
    }
}

function addGrade(date,name,grade,link,fromPast) {
    container = document.getElementById("gradelist")
    colorgrade = (grade > 5.0) ? (grade/20):grade
    if(colorgrade >= 4.0) {
        color = "green"
    } else if (colorgrade >= 3.5) {
        color = "gold"
    } else if (colorgrade >= 0) {
        color = "crimson"
    } else {
        color = "gray"
    }

    if(date == -1) {
        if(grade >= 0 && !fromPast) {
            match2 = false;
            for(h=0; h < pastGrades.value.length; h++) {
                if(pastGrades.value[h][1][0] == name) {
                    if(pastGrades.value[h][1][1] != grade) {
                        console.info("Powerology: Found same name with different grade:", name, ":", pastGrades.value[h][1][1], "=>", grade)
                        pastGrades.value.splice(h,1)
                    } else {
                        match2 = true;
                    }
                }
            }
            if(!match2) {
                pastGrades.value.push([[date],[name,grade,link]])
                pastGrades.value.sort((a, b) => a[0] - b[0])
                pastGrades.set()
            }
        }
    }

    container.insertAdjacentHTML("beforeend", `
    <tr name="grade" onclickevent="openLink('${link}')" onrightclickevent="openLink('${link}',true)" class="widthbox hov clickable">
        <th style="width: 100%;"><h3 style="padding-left: 20px; text-align: left;">${name}</h3></th>
        <th><h3 style="padding-right: 5px; text-align: right;">${grade}</h3></th>
        <th><div class="gradebox" style="background-color: ${color};"></div></th>
    </tr>
    `)
}

function openGrades(type) {
    if(type == "mastery") {
        let clsblacklist = [
            "General Information",
            "Extended Essay",
            "Creativity Activity Service",
            "Post Oak Press",
        ]
        let includes = false
        for(let i=0; i < classesarray.length; i++) {
            includes = false
            for(let h=0; h < clsblacklist.length; h++) {
                if(classesarray[i][0].includes(clsblacklist[h])) {
                    includes = true
                }
            }
            if(!includes) {
                window.open(classesarray[i][1].replace("materials", "student_district_mastery")) 
            }
        }
    } else {
        window.open("/grades/grades", "_self")
    }
    
}

function filterGrades() {
    let sortValue = document.getElementById("sgrades").value
    let from = parseFloat(sortValue.substring(0,3))
    let to = parseFloat(sortValue.substring(4))
    
    gradessort = [from,to]
    updateGradeList()
}

function checkMe(name, id) {
    if(!checkedAssignments.value[0].includes(name)) {
        checkedAssignments.value[0].push(name)
    } else {
        checkedAssignments.value[0].splice(checkedAssignments.value[0].indexOf(name), 1);
    }
    updateAssignments();
    checkedAssignments.set()
}

function xMe(name, isCustom) {
    if(isCustom) {
        for(let i = 0; i < customAssignments.value.length; i++) {
            if(customAssignments.value[i][1] == name) {
                customAssignments.value.splice(i, 1)
                customAssignments.set()
            }
        }
        for(let i = 0; i < assignmentsarray.length; i++) {
            if(assignmentsarray[i][1] == name) {
                assignmentsarray.splice(i, 1)
            }
        }
        console.info("Powerology: Removed custom assignment")
    } else {
        checkedAssignments.value[1].push(name);
        checkedAssignments.set();
    }
    updateAssignments();
}

function todoMe(name, id, remove) {
    if(!remove) {
        checkedAssignments.value[2].push(name)
    } else {
        checkedAssignments.value[2].splice(checkedAssignments.value[2].indexOf(name), 1)
    }
    updateAssignments();
    checkedAssignments.set()
}

function refreshClrAssLst() {
    checkedAssignments.value = [[],[],[]]
    checkedAssignments.set()
    location.reload();
}

function setColor(id, name) {
    classColors.value[name] = document.getElementById(id).value
    classColors.set()
}

function toggleAddGrd(force = false) {
    let widget = document.getElementById("addbox")
    if (force) {
        widget.style.display = "none"
        document.getElementById("caName").style.background = ""
        document.getElementById("caDate").style.background = ""
    } else {
        if(widget.style.display == "none") {
            widget.style.display = "inherit"
        } else {
            widget.style.display = "none"
            document.getElementById("caName").style.background = ""
            document.getElementById("caDate").style.background = ""
        }
    }
}

function addCustomAss() {
    let name = document.getElementById("caName").value
    let date = new Date(document.getElementById("caDate").value)
    let link = document.getElementById("caLink").value
    let daynames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let monthnames = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    if(name != "" && document.getElementById("caDate").value != "") {
        let day = `${daynames[date.getDay()]}, ${monthnames[date.getMonth()]} ${date.getDate()}`
        let time
        if(date.getHours() <= 12) {
            time = `${date.getHours()}:${date.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} am`
        } else {
            time = `${date.getHours()-12}:${date.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})} pm`
        }
        customAssignments.value.push([day, name, time, "custom", link])
        intCustomAss([day, name, time, "custom", link])
        customAssignments.set()
        updateAssignments()
        toggleAddGrd()
    } else {
        let tempdate = document.getElementById("caDate").value
        document.getElementById("caName").style.background = (name == "") ? "#ffcccb":""
        document.getElementById("caDate").style.background = (tempdate == "") ? "#ffcccb":""
    }
}

function parseCustomAss() {
    for (let i = 0; i < customAssignments.value.length; i++) {
        intCustomAss(customAssignments.value[i])
    }
    updateAssignments()
}

function closeBox(event) {
    if(event.clientX >= 210 || event.clientY >= 500) {
        toggleCngBg(true)
    }
}

function editSavedGrades(argument="h", input=-1) {
    if(argument == "h") {
        console.info("a = add grade, r = remove grade, leave second argument blank for help")
        console.info("Saved Grades:", pastGrades.value)
    } else if (argument == "r") {
        if(typeof input == "number") {
            if(input < 0 || input > pastGrades.value.length) {
                console.info("Please input a valid index to remove")
            } else {
                console.info("Success! Removed", pastGrades.value[input])
                pastGrades.value.splice(input, 1)
                pastGrades.set()
                location.reload();
            }
        } else {
            console.info("Please input a valid index to remove")
        }  
    } else if (argument == "a") {
        if (typeof input == "object") {
            if(input.length == 2 && input[1].length == 3) {
                pastGrades.value.push(input)
                console.info("Success! Added", input)
                pastGrades.set()
                location.reload();
            } else {
                console.info("Please input a valid array assignment to add (['Epoch ms'],['Name','Grade','Link'])")
            }
        } else {
            console.info("Please input a valid array assignment to add (['Name','Grade','Link'])")
        }
    }
}

function unEscape(htmlStr) {
    htmlStr = htmlStr.replace(/&lt;/g , "<");	 
    htmlStr = htmlStr.replace(/&gt;/g , ">");     
    htmlStr = htmlStr.replace(/&quot;/g , "\"");  
    htmlStr = htmlStr.replace(/&#39;/g , "\'");   
    htmlStr = htmlStr.replace(/&amp;/g , "&");
    return htmlStr;
}

function onError(error) {console.error("Powerology: Generic Error:", error)}

document.addEventListener("click", closeBox);

buttonfunctions = {
    "openGrades" : openGrades,
    "checkMe" : checkMe,
    "xMe" : xMe,
    "todoMe" : todoMe,
    "refreshClrAssLst" : refreshClrAssLst,
    "setColor" : setColor,
    "toggleCngBg" : toggleCngBg,
    "saveBg" : saveBg,
    "filterGrades" : filterGrades,
    "toggleAddGrd" : toggleAddGrd,
    "addCustomAss" : addCustomAss,
    "openLink" : openLink,
}