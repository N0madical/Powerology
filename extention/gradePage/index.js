//########################################################
    //Creating Grade Average
//########################################################

let grades = document.getElementsByClassName("rounded-grade")
let total = 0
for(let i = 0; i < grades.length; i++) {
    total += parseFloat(grades[i].innerHTML)
}
avgGrade = (total/grades.length).toFixed(1)

console.debug("i'm working")

if(document.getElementById("averageBox") == null) {
    document.getElementById("content-wrapper").insertAdjacentHTML("afterbegin", `
        <div id="averageBox">
            <h1 class="text-center">Overall Grade</h1>
            <h2 id="overallgrade" class="text-center">-</h2>
        </div>
    `)
}

document.getElementById("overallgrade").innerHTML = avgGrade


//########################################################
    //Saving Grades
//########################################################

pastGrades = []
// browser.storage.sync.set({pastGrades})
browser.storage.sync.get("pastGrades").then(definePastGrades, onError)
function definePastGrades(value) {; 
    pastGrades = value.pastGrades; 
    if(pastGrades == undefined) {
        pastGrades = []
        browser.storage.sync.set({pastGrades})
    }

    let gradelist = document.getElementsByClassName("item-row")
    for(i = 0; i < gradelist.length; i++) {
        if(gradelist[i].getElementsByClassName("rounded-grade")[0]) {
            let name = gradelist[i].getElementsByClassName("title")[0].textContent.substring(0,gradelist[i].getElementsByClassName("title")[0].textContent.indexOf("assignment"))
            let link = gradelist[i].getElementsByClassName("title")[0].children[0].href
            let duedate = gradelist[i].getElementsByClassName("due-date")[0].textContent.substring(4)
            let duedatems = Date.parse(duedate.substring(0,duedate.indexOf(" ")))
            let grade = parseFloat(gradelist[i].getElementsByClassName("rounded-grade")[0].innerHTML).toFixed(1)

            let match2 = false
            for(let h=0; h < pastGrades.length; h++) {
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
                pastGrades.push([[duedatems],[name,grade,link]])
                pastGrades.sort((a, b) => a[0] - b[0])
                browser.storage.sync.set({pastGrades})
            }
        }
    }
}