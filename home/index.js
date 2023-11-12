classesarray = []
assignmentsarray = []
gradesarray = []

function loadSchoologyPlus() {
    console.debug("test")

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
        gradesarray.push([iname,igrade, ilink])
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
    for(h = 0; h < classes.length; h++) {
        hname = assignments[h].firstChild.innerHTML
        hdue = assignments[h].children[1].children[0].innerHTML
        hdate = hdue.substr(4,hdue.indexOf(" at ")-10)
        htime = hdue.substr(hdue.indexOf(" at ") + 4)
        hclass = assignments[h].children[1].children[1].innerHTML
        hlink = assignments[h].getElementsByClassName("sExtlink-processed")[0].href
        assignmentsarray.push([hdate, hname, htime, hclass, hlink])
    }

    //########################################################
        //Injecting Data
    //########################################################

    //document.getElementById("wrapper").style.display = "none"
    document.getElementById("site-navigation-footer").style.display = "none"
    document.getElementById("site-navigation-breadcrumbs").style.display = "none"

    // if(document.getElementById("schoologyplusplus")) {
    //     document.getElementById("schoologyplusplus").innerHTML = schoologyplusplusWeb
    // } else {
    //     document.body.innerHTML += `<div id="schoologyplusplus"></div>`
    //     document.getElementById("schoologyplusplus").innerHTML = schoologyplusplusWeb;
    // }

    document.getElementById("wrapper").innerHTML = schoologyplusplusWeb

    document.getElementById("classlist").innerHTML = ""
    for(p=0; p < classesarray.length; p++) {
        addClass(classesarray[p][0],classesarray[p][1])
    }

    document.getElementById("assignmentlist").innerHTML = ""
    for(p=0; p < assignmentsarray.length; p++) {
        addAssignment(assignmentsarray[p][0],assignmentsarray[p][1],assignmentsarray[p][2],assignmentsarray[p][4])
    }

    document.getElementById("gradelist").innerHTML = ""
    for(p=0; p < gradesarray.length; p++) {
        addGrade(gradesarray[p][0],gradesarray[p][1],gradesarray[p][2])
    }
}


//########################################################
    //Run on page load
//########################################################

var loadrepeat = window.setInterval(function(){
    loadSchoologyPlus()
    if(classesarray.length > 0) {
        clearInterval(loadrepeat)
    }
  }, 500);
