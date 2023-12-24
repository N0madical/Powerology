datacollected = false
classesarray = []
assignmentsarray = []
gradesarray = []
overdueassignmentsarray = []
gradessort = [0,0]
errorlist = []

function loadSchoologyPlus() {
    //########################################################
        //Grabbing Data
    //########################################################

    try {
        grades = document.getElementsByClassName("recently-completed-event")
        gradesarray = []
        for(i = 0; i < grades.length; i++) {
            itime = Date.now()
            iname = grades[i].getElementsByClassName("sExtlink-processed")[0].textContent
            igrade = grades[i].getElementsByClassName("recently-completed-grade")[0].textContent;
            if(!isNaN(igrade) && !isNaN(parseFloat(igrade))) {
                if(parseFloat(igrade) > 5) {
                    igrade = round((parseFloat(igrade)/20),2)
                } else {
                    igrade = round(parseFloat(igrade),2)
                }
            }
            ilink = grades[i].getElementsByClassName("sExtlink-processed")[0].href
            iid = ilink.substring(ilink.length-10)
            gradesarray.push([[itime],[iname,igrade,ilink,iid]])
        }
    } catch (error) {
        console.error("Powerology: Error reading grades from Schoology page:\n", error)
        gradesarray.push([[-1],["Error - Save Debug & Report to Aiden","-","/home"]])
    }

    try {
        classes = document.getElementsByClassName("sgy-card")
        classesarray = []
        for(j = 0; j < classes.length; j++) {
            jtext = classes[j].getAttribute("aria-label")
            jname = jtext.slice(jtext.indexOf("Navigate to course:") + 20, jtext.indexOf(".")).trim()
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
    } catch (error) {
        console.error("Powerology: Error reading classes from Schoology page:\n", error)
        classesarray.push(["Error - Save Debug & Report to Aiden","/home",""])
    }

    try {
        assignmentparents = document.getElementsByClassName("upcoming-submissions")[0].getElementsByClassName("upcoming-list")[0].getElementsByClassName("upcoming-event")
        assignmentsarray = []
        for(h = 0; h < assignmentparents.length; h++) {
            try {
                let assignment = assignmentparents[h].children[0].children[0].children[1]
                hdue = (assignment.children[1].firstChild) ? assignment.children[1].children[0].textContent:assignment.children[1].textContent
                hdate = hdue.substr(4,hdue.indexOf(" at ")-4)
                hname = assignment.firstChild.innerHTML
                htime = hdue.substr(hdue.indexOf(" at ") + 4)
                hclass = assignment.children[1].children[1].innerHTML
                hlink = (assignment.getElementsByClassName("sExtlink-processed")[0]) ? assignment.getElementsByClassName("sExtlink-processed")[0].href:""
                hid = assignmentparents[h].getAttribute("data-start")
                let replace = false
                for(let i = 0; i < assignmentsarray.length; i++) {
                    if(assignmentsarray[i][5] == hid) {
                        replace = i
                    }
                }
                if(replace && (hlink != "")) {assignmentsarray[replace] = [hdate, hname, htime, hclass, hlink, hid]}
                else if (!replace) {assignmentsarray.push([hdate, hname, htime, hclass, hlink, hid])}
            } catch(err) {
                console.error("Powerology: Error in parsing assignments:", err)
                errorlist.push(`<h3 class="text-center">Error reading assignment #: ${h}</h3>`)
            }
        }
    } catch (error) {
        console.error("Powerology: Error reading assignments from Schoology page:\n", error)
        assignmentsarray.push(["Error", "Error - Save Debug & Report to Aiden", "-", "", "/home"])
    }

    try {
        if(document.getElementsByClassName("overdue-submissions")[0].getElementsByClassName("upcoming-list")[0]) {
            overdueassignments = document.getElementsByClassName("overdue-submissions")[0].getElementsByClassName("upcoming-list")[0].children
            overdueassignmentsarray = []
            for(u = 0; u < overdueassignments.length-1; u += 2) {
                while(overdueassignments[u].id != "overdue_submissions" && (u < overdueassignments.length-1)) {u++}
                uname = overdueassignments[u+1].getElementsByClassName("event-title")[0].children[0].innerHTML
                udue = overdueassignments[u].children[0].innerHTML
                ulink = (overdueassignments[u+1].getElementsByClassName("sExtlink-processed")[0]) ? overdueassignments[u+1].getElementsByClassName("sExtlink-processed")[0].href:""
                uid = overdueassignments[u+1].getAttribute("data-start")
                if(Date.parse(udue) <= Date.now()) {
                    overdueassignmentsarray.push([uname, ulink, uid])
                }
            }
        }
    } catch (error) {
        console.error("Powerology: Error reading overdue assignments from Schoology page:\n", error)
        overdueassignmentsarray.push(["Error - Check Console (f12) & Report to Aiden", "/home"])
    }

    //########################################################
        //Injecting Data
    //########################################################

    if(classesarray.length > 0 && gradesarray.length > 0 && assignmentsarray.length > 0 && classColors.value) {
        //document.getElementById("wrapper").style.display = "none"
        document.getElementById("site-navigation-footer").style.display = "none"
        document.getElementById("site-navigation-breadcrumbs").style.display = "none"

        // if(document.getElementById("schoologyplusplus")) {
        //     document.getElementById("schoologyplusplus").innerHTML = schoologyplusplusWeb
        // } else {
        //     document.body.innerHTML += `<div id="schoologyplusplus"></div>`
        //     document.getElementById("schoologyplusplus").innerHTML = schoologyplusplusWeb;
        // }

        //document.getElementById("wrapper").style.width = "100%"
        document.getElementById("wrapper").insertAdjacentHTML("beforebegin", schoologyplusplusWeb)
        document.getElementById("wrapper").style.display = "none"

        addEventListeners(document.getElementById("centerbox"))

        customAssignments.get(parseCustomAss)

        updateClasses()
        settings.get(updateClasses)
        updateAssignments()
        updateGradeList()

        settings.get(() => {
            if(settings.value.bubbleBoxes) {
                let boxes = document.getElementsByClassName("box")
                for(let y = 0; y < boxes.length; y++) {boxes[y].style.borderRadius = "10px"}
            }
        })

        let clickable = document.getElementsByClassName("onchangeClickable")
        for(let b = 0; b < clickable.length; b++) {
            if(clickable[b].hasAttribute("onchangeevent")) {
                let func = clickable[b].getAttribute("onchangeevent");
                let funcname = func.substring(0,func.indexOf("("));
                let funcargs = JSON.parse(("[" + func.substring(func.indexOf("(")+1,func.length-1) + "]").replaceAll('\'', '\"')) //.split(/(?<=['|"]), (?=['|"])/);
                clickable[b].addEventListener("change", () => {
                    buttonfunctions[funcname].apply(null, funcargs)
                });
            }
        }

        let mgleft = window.getComputedStyle(document.getElementById("centerbox")).getPropertyValue("margin-left");
        var r = document.querySelector(':root')
        r.style.setProperty('--vpl', mgleft);

        clearInterval(loadrepeat)
    }
}


//########################################################
    //Run on page load
//########################################################

var loadrepeat = window.setInterval(function(){
    if(document.getElementById("centerbox") == null) {
        if(!document.getElementById("home-feed-container")) {
            loadSchoologyPlus()
        } else {
            if(!window.location.href.includes("powerology")) {
                openLink("https://postoakschool.schoology.com/settings/account/sethome")
                clearInterval(loadrepeat)
            } else {
                if(document.getElementById("right-column") || document.getElementsByClassName("sgy-tabbed-navigation")[0]) {
                    document.getElementById("right-column").remove()
                    document.getElementsByClassName("sgy-tabbed-navigation")[0].remove()
                    document.getElementById("main").style.width = "100%"
                }
                
            }
        }
    } else {
        clearInterval(loadrepeat)
    }
}, 100);

onresize = () => {
    let mgleft = window.getComputedStyle(document.getElementById("centerbox")).getPropertyValue("margin-left");
    var r = document.querySelector(':root')
    r.style.setProperty('--vpl', mgleft);
};