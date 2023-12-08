 document.getElementById("past-selector").innerHTML += `<p style="float: right; margin-top: 5px;">Overall Grade (Including Executive Functions)</p>`
 
 let classeslist = document.getElementById("main-inner").getElementsByClassName("gradebook-course")
 for(let i = 0; i < classeslist.length; i++) {
    grades = classeslist[i].getElementsByClassName("item-row")
    let avgvar = 0
    let count = 0
    let avg = "Not Avaliable"
    for(let j = 0; j < grades.length; j++) {
        if(grades[j].getElementsByClassName("rounded-grade").length > 0) {
            avgvar += parseFloat(grades[j].getElementsByClassName("rounded-grade")[0].innerHTML)
            count++
        }
    }

    if((avgvar/count) <= 100) {
        avg = (avgvar/count).toFixed(1)
    }

    let color = "gray"
    if(avg >= 4.0 && avg <= 5.0) {
        color = "green"
    } else if (avg >= 3.5 && avg < 4.0) {
        color = "gold"
    } else if (avg >= 0.0 && avg < 3.5) {
        color = "crimson"
    }

    classeslist[i].getElementsByClassName("gradebook-course-title")[0].innerHTML += `<div style="width: 20px; height: 20px; float:right; background-color: ${color}; margin-left: 10px"></div><h3 style="float: right; line-height: 9px">${avg}</h3>`
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

