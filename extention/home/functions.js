function updateClasses() {
    classiteratable = 0
    console.info("Updating Class List...")
    document.getElementById("classlist").innerHTML = ""
    for(p=0; p < classesarray.length; p++) {
        addClass(classesarray[p][0],classesarray[p][1])
    }

    addEventListeners(document.getElementById("classlist"))
}

function updateAssignments() {
    console.info("Updating Assignment List...")
    asdates = []
    tododates = []
    iteratable = 0
    document.getElementById("assignmentlist").innerHTML = ""
    document.getElementById("todolist").innerHTML = ""
    for(p=0; p < overdueassignmentsarray.length; p++) {
        addAssignment("overdue",overdueassignmentsarray[p][0],"",overdueassignmentsarray[p][1])
    }
    for(p=0; p < assignmentsarray.length; p++) {
        addAssignment(assignmentsarray[p][0],assignmentsarray[p][1],assignmentsarray[p][2],assignmentsarray[p][4])
    }
    if(!document.getElementById("assignments").getElementsByClassName("errornotice")[0]) {
        for(let o = 0; o < errorlist.length; o++) {
            document.getElementById("assignments").innerHTML += errorlist[o]
        }
    }
    
    addEventListeners(document.getElementById("assignmentlist"))
    addEventListeners(document.getElementById("todolist"))
}

function updateGradeList() {
    console.info("Updating Grades List...")
    document.getElementById("gradelist").innerHTML = ""
    for(p=0; p < gradesarray.length; p++) {
        if(gradessort[1] == "0") {
            addGrade(gradesarray[p][0][0],gradesarray[p][1][0],gradesarray[p][1][1],gradesarray[p][1][2],false)
        } else if (parseFloat(gradesarray[p][1][1]) >= gradessort[0] && parseFloat(gradesarray[p][1][1]) <= gradessort[1]) {
            addGrade(gradesarray[p][0][0],gradesarray[p][1][0],gradesarray[p][1][1],gradesarray[p][1][2],false)
        }
    }
    for(p=0; p < pastGrades.length; p++) {
        let counter = (pastGrades.length-1) - p
        match = false;
        for(c=0; c < gradesarray.length; c++) {
            if(gradesarray[c][1][0] == pastGrades[counter][1][0]) {
                match = true;
            }
        }
        if(!match) {
            if(gradessort[1] == "0") {
                addGrade(pastGrades[counter][0][0],pastGrades[counter][1][0],pastGrades[counter][1][1],pastGrades[counter][1][2],true)
            } else if (parseFloat(pastGrades[counter][1][1]) >= gradessort[0] && parseFloat(pastGrades[counter][1][1]) <= gradessort[1]) {
                addGrade(pastGrades[counter][0][0],pastGrades[counter][1][0],pastGrades[counter][1][1],pastGrades[counter][1][2],true)
            }
        }
    }

    addEventListeners(document.getElementById("gradelist"))
}

function addClass(name, link) {
    container = document.getElementById("classlist")
    eval?.(`
    carat = ${storageapi}.runtime.getURL("icons/carat.png");
    `)
    if(name in classcolors) {
        color = classcolors[name]
    } else {
        color = "#808080"
    }

    //<th onclick="javascript:sus()" class="classcolor" style="background-color: ;"></th>

    container.innerHTML += `
    <tr class="widthbox shadow hov clickable">
        <th class="classcolor"><input id="color_${classiteratable}" class="onchangeClickable" type="color" value="${color}" onchangeevent="setColor('color_${classiteratable}', '${name}')"/></th>
        <th class="clickable" onclickevent="openLink('${link}')" style="width: 100%;"><h2 style="padding-left: 10px; text-align: left; margin-top: 10px; margin-bottom: 10px;">${name}</h2></th>
        <th class="clickable" onclickevent="openLink('${link}')" style="width: 40px; background: url(${carat}) no-repeat center center; background-size: 15px 15px;"></th>
    </tr>
    `

    classiteratable++
} 

function addAssignment(day, name, time, link) {
    if(!checkedAssignments[2].includes(unEscape(name))) {
        container = document.getElementById("assignmentlist")
        dates = asdates
    } else {
        container = document.getElementById("todolist")
        dates = tododates
    }

    eval?.(`
    xicon = ${storageapi}.runtime.getURL("icons/x.png")
    todoicon = ${storageapi}.runtime.getURL("icons/todo.png")
    `)

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

            if(!checkedAssignments[2].includes(unEscape(name))) {
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
        
        if(checkedAssignments[0].includes(unEscape(name))) {
            checked = "checked=true";
            textDec = "text-decoration: line-through;"
        } else {
            checked = "";
            textDec = "text-decoration: none;"
        }

        container.innerHTML += `
        <tr name="assignment" id="aslist${iteratable}" class="widthbox hov clickable" style="padding-left:15px">
        <th><input class="clickable" style="margin-left: 2px; margin-top: 8px; margin-right: 2px;" type="checkbox" onclickevent="checkMe('${name}', ${iteratable})" ${checked}></th>
            <th><img class="hideuntilhover clickable" src="${xicon}" onclickevent="xMe('${name}', '${iteratable}')" width="15px" height="15px" style="margin-left: 2px; margin-top: 8px; margin-right: 2px;"></th>
            <th><img class="hideuntilhover clickable" src="${todoicon}" onclickevent="todoMe('${name}', '${iteratable}', ${checkedAssignments[2].includes(unEscape(name))})" width="15px" height="15px" style="margin-left: 2px; margin-top: 8px; margin-right: 2px;"></th>
            <th style="width: 100%;"><h3 class="clickable" id="assignment${iteratable}" onclickevent="openLink('${link}')" style="text-align: left; color: lightslategrey; margin-left: 20px; ${textDec}">${name}</h3></th>
            <th><h4 class="clickable" onclickevent="openLink('${link}')" style="padding-right: 15px; text-align: right; white-space: nowrap;">${time}</h4></th>
        </tr>
        `

        iteratable += 1
    }
}

function addGrade(date,name,grade,link,fromPast) {
    container = document.getElementById("gradelist")
    if(grade >= 4.0) {
        color = "green"
    } else if (grade >= 3.5) {
        color = "gold"
    } else if (grade >= 0) {
        color = "crimson"
    } else {
        color = "gray"
    }

    if(grade >= 0 && !fromPast) {
        match2 = false;
        for(h=0; h < pastGrades.length; h++) {
            if(pastGrades[h][1][0] == name) {
                if(pastGrades[h][1][1] != grade) {
                    console.info("Found same name with different grade:", name, ":", pastGrades[h][1][1], "=>", grade)
                    pastGrades.splice(h,1)
                } else {
                    match2 = true;
                }
            }
        }
        if(!match2) {
            pastGrades.push([[date],[name,grade,link]])
            pastGrades.sort((a, b) => a[0] - b[0])
            browserSet("pastGrades","local")
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

function openGrades() {
    for(let i=0; i < classesarray.length; i++) {
        console.debug(classesarray[i][0])
        if(classesarray[i][0] != "General Information: Community" && !classesarray[i][0].includes("Extended Essay: Seniors") && !classesarray[i][0].includes("Creativity Activity Service")) {
            window.open(classesarray[i][1].replace("materials", "student_grades"))
        }
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
    if(!checkedAssignments[0].includes(name)) {
        checkedAssignments[0].push(name)
    } else {
        checkedAssignments[0].splice(checkedAssignments[0].indexOf(name), 1);
    }
    updateAssignments();
    browserSet("checkedAssignments", "sync")
}

function xMe(name, id) {
    checkedAssignments[1].push(name);
    updateAssignments();
    browserSet("checkedAssignments","sync");
}

function todoMe(name, id, remove) {
    if(!remove) {
        checkedAssignments[2].push(name)
    } else {
        checkedAssignments[2].splice(checkedAssignments[2].indexOf(name), 1)
    }
    updateAssignments();
    browserSet("checkedAssignments","sync")
}

function refreshClrAssLst() {
    checkedAssignments = [[],[],[]]
    browserSet("checkedAssignments","sync")
    location.reload();
}

function setColor(id, name) {
    classcolors[name] = document.getElementById(id).value
    console.debug(classcolors[name])
    browserSet("classcolors","sync")
}

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

function saveBg() {
    color = document.getElementById("bgcolor").value
    link = document.getElementById("bgimg").value
    blurbg = document.getElementById("bgblur").value
    document.body.style.backgroundColor = color
    document.body.style.backgroundImage = `url('${link}')`
    document.body.style.backdropFilter = `blur(${blurbg}px)`
    backGround = [color, link, blurbg]
    browserSet("backGround","sync")
}

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
                browserSet("pastGrades","local")
                location.reload();
            }
        } else {
            console.info("Please input a valid index to remove")
        }  
    } else if (argument == "a") {
        if (typeof input == "object") {
            if(input.length == 2 && input[1].length == 3) {
                pastGrades.push(input)
                console.info("Success! Added", input)
                browserSet("pastGrades","local")
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

function onError(error) {console.debug("Error:", error)}