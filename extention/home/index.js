//document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1920x1080/?city,night')"

datacollected = false
classesarray = []
assignmentsarray = []
gradesarray = []
gradessort = [0,0]
errorlist = []

function loadSchoologyPlus() {

    //########################################################
        //Grabbing Data
    //########################################################

    grades = document.getElementsByClassName("recently-completed-event")
    gradesarray = []
    for(i = 0; i < grades.length; i++) {
        itime = Date.now()
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
        gradesarray.push([[itime],[iname,igrade,ilink]])
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
        try {
            hname = assignments[h].firstChild.innerHTML
            hdue = assignments[h].children[1].children[0].innerHTML
            hdate = hdue.substr(4,hdue.indexOf(" at ")-10)
            htime = hdue.substr(hdue.indexOf(" at ") + 4)
            hclass = assignments[h].children[1].children[1].innerHTML
            hlink = assignments[h].getElementsByClassName("sExtlink-processed")[0].href
            assignmentsarray.push([hdate, hname, htime, hclass, hlink])
        } catch(err) {
            console.debug("Error in parsing assignments:", err)
            errorlist.push(`<h3 class="text-center">Error reading assignment #: ${h}</h3>`)
        }
    }   

    if(document.getElementsByClassName("overdue-submissions")[0].getElementsByClassName("upcoming-list")[0]) {
        overdueassignments = document.getElementsByClassName("overdue-submissions")[0].getElementsByClassName("upcoming-list")[0].children
        overdueassignmentsarray = []
        for(u = 0; u < overdueassignments.length-1; u += 2) {
            while(overdueassignments[u].id != "overdue_submissions" && (u < overdueassignments.length-1)) {u++}
            uname = overdueassignments[u+1].getElementsByClassName("sExtlink-processed")[0].innerHTML
            udue = overdueassignments[u].children[0].innerHTML
            ulink = overdueassignments[u+1].getElementsByClassName("sExtlink-processed")[0].href
            if(Date.parse(udue) <= Date.now()) {
                overdueassignmentsarray.push([uname, ulink])
            }
            
        }
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

        document.getElementById("wrapper").style.width = "100%"
        document.getElementById("wrapper").innerHTML = schoologyplusplusWeb

        buttons = document.getElementsByClassName("_13cCs _2M5aC _24avl _3ghFm _3LeCL _31GLY _9GDcm _1D8fw")
        for(let h = 0; h < buttons.length; h++) {
            if(buttons[h].hasAttribute("aria-label")) {
                if(buttons[h].getAttribute("aria-label").includes("notifications")) {
                    if(buttons[h].getElementsByClassName("_2JX1Q _2L4PN les2- USYsM tAI8z fioA9 _1tpub _3RmDr")[0]) {
                        buttons[h].getElementsByClassName("_2JX1Q _2L4PN les2- USYsM tAI8z fioA9 _1tpub _3RmDr")[0].remove()
                    }
                }
            }
        }

        addEventListeners(document)

        updateClasses()
        updateAssignments()
        updateGradeList()

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
            openLink("https://postoakschool.schoology.com/settings/account/sethome")
            clearInterval(loadrepeat)
        }
    } else {
        clearInterval(loadrepeat)
    }
  }, 100);
