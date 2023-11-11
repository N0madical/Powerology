gradesarray = []
classesarray = []
assignmentsarray = []

grades = document.getElementsByClassName("recently-completed-event")
for(i = 0; i < grades.length; i++) {
    iname = grades[i].getElementsByClassName("sExtlink-processed")[0].textContent
    igrade = grades[i].getElementsByClassName("recently-completed-grade")[0].textContent
    gradesarray.push([iname,igrade])
}

classes = document.getElementsByClassName("sgy-card")
for(j = 0; j < classes.length; j++) {
    jtext = classes[j].getAttribute("aria-label")
    jname = jtext.slice(jtext.indexOf("Navigate to course:") + 20, jtext.indexOf(".  Organization:"))
    jlist = classes[j].getElementsByClassName("course-dashboard__card-lens-img")
    if(jlist.length > 0) {
        jimage = jlist[0].src
    } else {
        jimage = "null"
    }
    classesarray.push([jname,jimage])
}

assignments = document.getElementsByClassName("upcoming-submissions")[0].getElementsByClassName("upcoming-list")[0].getElementsByClassName("event-title")
for(h = 0; h < classes.length; h++) {
    hname = assignments[h].firstChild.innerHTML
    hdate = assignments[h].children[1].children[0].innerHTML
    hclass = assignments[h].children[1].children[1].innerHTML
    assignmentsarray.push([hname,hdate,hclass])
}

document.getElementById("wrapper").style.display = "none"
document.getElementById("site-navigation-footer").style.display = "none"
document.getElementById("site-navigation-breadcrumbs").style.display = "none"

console.debug(gradesarray, classesarray, assignmentsarray)