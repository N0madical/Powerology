document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1920x1080/?city,night')"

checkedAssignments = []
browser.storage.sync.get("checkedAssignments").then(defineAssignments, onError)
function defineAssignments(value) {; 
    checkedAssignments = value.checkedAssignments; 
    if(checkedAssignments == undefined) {
        checkedAssignments = []
        browser.storage.sync.set({checkedAssignments})
    }
}

pastGrades = []
// browser.storage.sync.set({pastGrades})
browser.storage.sync.get("pastGrades").then(definePastGrades, onError)
function definePastGrades(value) {; 
    pastGrades = value.pastGrades; 
    if(pastGrades == undefined) {
        pastGrades = []
        browser.storage.sync.set({pastGrades})
    }
}

browser.storage.sync.get("classcolors").then(loadColors, onError)
function loadColors(value) {; 
    classcolors = value.classcolors; 
    if(classcolors == undefined) {
        classcolors = defaultClasscolors
        browser.storage.sync.set({classcolors})
    }
}

backGround = ["#faf9f7", "https://source.unsplash.com/random/1920x1080/?city,night", 10]
browser.storage.sync.get("backGround").then(getBackGround, onError)
function getBackGround(value) {; 
    backGround = value.backGround; 
    if(backGround == undefined) {
        backGround = ["#faf9f7", "https://source.unsplash.com/random/1920x1080/?city,night", 10]
        browser.storage.sync.set({backGround})
    }
    document.body.style.backgroundColor = backGround[0]
    document.body.style.backgroundImage = `url('${backGround[1]}')`
    document.body.style.backdropFilter = `blur(${backGround[2]}px)`
}

datacollected = false
classesarray = []
assignmentsarray = []
gradesarray = []

function loadSchoologyPlus() {

    //########################################################
        //Grabbing Data
    //########################################################

    grades = document.getElementsByClassName("recently-completed-event")
    gradesarray = []
    for(i = 0; i < grades.length; i++) {
        iname = grades[i].getElementsByClassName("sExtlink-processed")[0].textContent
        igrade = grades[i].getElementsByClassName("recently-completed-grade")[0].textContent;
        if(!isNaN(igrade) && !isNaN(parseFloat(igrade))) {
            if(parseFloat(igrade) > 5) {
                igrade = (parseFloat(igrade)/20).toFixed(1)
            } else {
                igrade = parseFloat(igrade).toFixed(1)
            }
        }
        ilink = grades[i].getElementsByClassName("sExtlink-processed")[0].href
        gradesarray.push([iname,igrade,ilink])
    }

    classes = document.getElementsByClassName("sgy-card")
    classesarray = []
    for(j = 0; j < classes.length; j++) {
        jtext = classes[j].getAttribute("aria-label")
        jname = jtext.slice(jtext.indexOf("Navigate to course:") + 20, jtext.indexOf(".  Organization:")).trim()
        jlist = classes[j].getElementsByClassName("course-dashboard__card-lens-img")
        jid = classes[j].getAttribute("data-reactid").substr(classes[j].getAttribute("data-reactid").length - 10)
        jlink = `https://postoakschool.schoology.com/course/${jid}/materials`
        if(jlist.length > 0) {
            jimage = jlist[0].src
        } else {
            jimage = "null"
        }
        classesarray.push([jname,jlink,jimage])
    }

    assignments = document.getElementsByClassName("upcoming-submissions")[0].getElementsByClassName("upcoming-list")[0].getElementsByClassName("event-title")
    assignmentsarray = []
    for(h = 0; h < assignments.length; h++) {
        hname = assignments[h].firstChild.innerHTML
        hdue = assignments[h].children[1].children[0].innerHTML
        hdate = hdue.substr(4,hdue.indexOf(" at ")-10)
        htime = hdue.substr(hdue.indexOf(" at ") + 4)
        hclass = assignments[h].children[1].children[1].innerHTML
        hlink = assignments[h].getElementsByClassName("sExtlink-processed")[0].href
        assignmentsarray.push([hdate, hname, htime, hclass, hlink])
    }

    overdueassignments = document.getElementsByClassName("overdue-submissions")[0].getElementsByClassName("upcoming-list")[0].getElementsByClassName("event-title")
    overdueassignmentsarray = []
    for(u = 0; u < overdueassignments.length; u++) {
        uname = overdueassignments[u].firstChild.innerHTML
        uclass = overdueassignments[u].children[1].children[1].innerHTML
        ulink = overdueassignments[u].getElementsByClassName("sExtlink-processed")[0].href
        overdueassignmentsarray.push([uname, uclass, ulink])
    }

    //########################################################
        //Injecting Data
    //########################################################

    console.debug(classesarray)
    if(classesarray.length > 0 && gradesarray.length > 0 && assignmentsarray.length > 0 && classcolors != undefined) {
        //document.getElementById("wrapper").style.display = "none"
        document.getElementById("site-navigation-footer").style.display = "none"
        document.getElementById("site-navigation-breadcrumbs").style.display = "none"

        // if(document.getElementById("schoologyplusplus")) {
        //     document.getElementById("schoologyplusplus").innerHTML = schoologyplusplusWeb
        // } else {
        //     document.body.innerHTML += `<div id="schoologyplusplus"></div>`
        //     document.getElementById("schoologyplusplus").innerHTML = schoologyplusplusWeb;
        // }

        document.getElementById("wrapper").style.width = "100%"
        document.getElementById("wrapper").innerHTML = schoologyplusplusWeb

        document.getElementById("classlist").innerHTML = ""
        for(p=0; p < classesarray.length; p++) {
            addClass(classesarray[p][0],classesarray[p][1])
        }

        document.getElementById("assignmentlist").innerHTML = ""
        for(p=0; p < overdueassignments.length; p++) {
            addAssignment("overdue",overdueassignmentsarray[p][0],"",overdueassignmentsarray[p][2])
        }
        for(p=0; p < assignmentsarray.length; p++) {
            addAssignment(assignmentsarray[p][0],assignmentsarray[p][1],assignmentsarray[p][2],assignmentsarray[p][4])
        }

        document.getElementById("gradelist").innerHTML = ""
        for(p=0; p < gradesarray.length; p++) {
            addGrade(gradesarray[p][0],gradesarray[p][1],gradesarray[p][2],false)
        }
        for(p=0; p < pastGrades.length; p++) {
            match = false;
            for(c=0; c < gradesarray.length; c++) {
                if(gradesarray[c][0] == pastGrades[p][0]) {
                    match = true;
                }
            }
            if(!match) {
                addGrade(pastGrades[p][0],pastGrades[p][1],pastGrades[p][2],true)
            }
        }

        clearInterval(loadrepeat)
    }
}


//########################################################
    //Run on page load
//########################################################

var loadrepeat = window.setInterval(function(){
    if(document.getElementById("centerbox") == null) {
        loadSchoologyPlus()
    } else {
        clearInterval(loadrepeat)
    }
  }, 100);