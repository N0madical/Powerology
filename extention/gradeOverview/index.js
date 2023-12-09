
//########################################################
    //Showing Grade Overviews
//######################################################## 

intval = false
evntlstn = false

masteryGrades = new browserStorage("masteryGrades", "local", [], defineMasteryGrades)
masteryGrades.get()

function defineMasteryGrades() {
    if(!intval) {
        document.getElementById("past-selector").innerHTML += `<p style="float: right; margin-top: 5px;">Overall Grade (Only shows when Mastery has been opened in the past day)</p>`
        loadrepeat = window.setInterval(function(){
            masteryGrades.get()
        }, 3000);
        intval = true
    }

    showGrades()
    
}

function showGrades() {
    let openext = storageapi.runtime.getURL("icons/openext.png");
    let classeslist = document.getElementById("main-inner").getElementsByClassName("gradebook-course")
    for(let i = 0; i < classeslist.length; i++) {
        let selClassName = classeslist[i].getElementsByClassName("sExtlink-processed")[0].childNodes[1].data
        let selClassId = classeslist[i].id.substring(classeslist[i].id.length-10)
        let gradeAv = false
        for(let j = 0; j < masteryGrades.value.length; j++) {
            if(masteryGrades.value[j][0] == selClassName){
                if(masteryGrades.value[j][1] >= Date.now()-86400000) {
                    gradeAv = true
                    avg = parseFloat(masteryGrades.value[j][2]).toFixed(1)
                }
            }
        }

        if(!document.getElementsByClassName(`open_${selClassId}`)[0]) {
            classeslist[i].getElementsByClassName("gradebook-course-title")[0].innerHTML += `<img src="${openext}" class="clickable open_${selClassId}" style="width: 15px; height: 15px; float: right; margin-left:10px; margin-top: 2px;" onclickevent="openLink('https://postoakschool.schoology.com/course/${selClassId}/student_district_mastery', true)">`
        }

        if(gradeAv && !document.getElementsByClassName(`grade_${selClassId}`)[0]) {
            let color = "gray"
            if(avg >= 4.0 && avg <= 5.0) {
                color = "green"
            } else if (avg >= 3.5 && avg < 4.0) {
                color = "gold"
            } else if (avg >= 0.0 && avg < 3.5) {
                color = "crimson"
            }
    
            classeslist[i].getElementsByClassName("gradebook-course-title")[0].innerHTML += `<div class="grade_${selClassId}" style="width: 20px; height: 20px; float:right; background-color: ${color}; margin-left: 10px"></div><h3 style="float: right; line-height: 9px">${avg}</h3>`
        }

    }

    if(!evntlstn) {
        addEventListeners(document.getElementById("main-inner"))
    }
    evntlstn = true
}


//########################################################
    //Saving Grades
//########################################################

pastGrades = new browserStorage("pastGrades", "local", [], definePastGrades)
pastGrades.get()

function definePastGrades() {; 
    let gradelist = document.getElementsByClassName("item-row")
    for(i = 0; i < gradelist.length; i++) {
        if(gradelist[i].getElementsByClassName("rounded-grade")[0]) {
            let name = gradelist[i].getElementsByClassName("title")[0].textContent.substring(0,gradelist[i].getElementsByClassName("title")[0].textContent.indexOf("assignment"))
            let link = gradelist[i].getElementsByClassName("title")[0].children[0].href
            let duedatems
            if(gradelist[i].getElementsByClassName("due-date")[0]) {
                let duedate = gradelist[i].getElementsByClassName("due-date")[0].textContent.substring(4)
                duedatems = Date.parse(duedate.substring(0,duedate.indexOf(" ")))
            } else {
                duedatems = parseInt(Date.now())-604800000
            }
            let grade = parseFloat(gradelist[i].getElementsByClassName("rounded-grade")[0].innerHTML).toFixed(1)

            let match2 = false
            for(let h=0; h < pastGrades.value.length; h++) {
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
                pastGrades.value.push([[duedatems],[name,grade,link]])
                pastGrades.value.sort((a, b) => a[0] - b[0])
                // browser.storage.local.getBytesInUse("pastGrades").then(printBytes, onError)
                // function printBytes(input) {console.debug("Storage used:", input)}
            }
        }
    }
    pastGrades.set()
}

