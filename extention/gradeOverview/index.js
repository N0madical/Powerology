
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
                    avg = parseFloat(masteryGrades.value[j][2]).toFixed(2)
                }
            }
        }

        if(!document.getElementsByClassName(`open_${selClassId}`)[0]) {
            classeslist[i].getElementsByClassName("gradebook-course-title")[0].style.width = "90%"
            classeslist[i].getElementsByClassName("gradebook-course-title")[0].style.display = "inline-block"
            classeslist[i].getElementsByClassName("gradebook-course-title")[0].insertAdjacentHTML("afterend", `<div class="ovgradebox" style="float: right; display: inline-block; margin-top: 5px;"><img src="${openext}" class="clickable open_${selClassId}" style="width: 15px; height: 15px; float: right; margin-left:10px; margin-top: 2px;" onclickevent="openLink('https://postoakschool.schoology.com/course/${selClassId}/student_district_mastery', true)"></div>`)
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
            
            classeslist[i].getElementsByClassName("gradebook-course-title")[0].parentElement.classList.add("hovmod")
            classeslist[i].getElementsByClassName("gradebook-course-title")[0].parentElement.getElementsByClassName("ovgradebox")[0].innerHTML += `<div class="grade_${selClassId}" style="width: 20px; height: 20px; float:right; background-color: ${color}; margin-left: 10px"></div><h3 class="hovhide" style="float: right; line-height: 9px">${parseFloat(avg).toFixed(1)}</h3><h3 class="hovshow" style="float: right; line-height: 9px">${avg}</h3>`
        }

    }

    if(document.getElementById("averageBox") == null) {
        document.getElementById("main").insertAdjacentHTML("beforeend", `
            <h1 class="text-center" style="margin-top: 50px">Average GPAs (Only Out Of Currently Visible)</h1>
            <div id="averageBox">
                <div class="avgBox">
                    <h1 class="text-center" style="display: inherit !important;">Out Of 5.0</h1>
                    <h2 id="avg5" class="text-center">-</h2>
                </div>
                <div class="avgBox">
                    <h1 class="text-center" style="display: inherit !important;">Out Of 4.0</h1>
                    <h2 id="avg4" class="text-center">-</h2>
                </div>
                <div class="avgBox">
                    <h1 class="text-center" style="display: inherit !important;">Out Of 100</h1>
                    <h2 id="avg100" class="text-center">-</h2>
                </div>
            </div>
        `)
    }

    let count = 0
    let totalAvg = 0
    for(let j = 0; j < masteryGrades.value.length; j++) {
        if((masteryGrades.value[j][1] >= Date.now()-86400000) && (parseFloat(masteryGrades.value[j][2]) <= 5.0) && (parseFloat(masteryGrades.value[j][2]) >= 0.0)) {
            totalAvg += parseFloat(masteryGrades.value[j][2])
            count++
        }
    }
    let gpa = totalAvg/count
    document.getElementById("avg5").textContent = (gpa.toFixed(2))
    document.getElementById("avg4").textContent = (gpa*0.8).toFixed(2)
    document.getElementById("avg100").textContent = Math.round(gpa*20)

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
            let grade = parseFloat(gradelist[i].getElementsByClassName("rounded-grade")[0].innerHTML).toFixed(2)

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

