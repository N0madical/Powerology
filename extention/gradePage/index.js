//########################################################
    //Creating Grade Average
//########################################################

let grades = document.getElementsByClassName("rounded-grade")
let total = 0
let divby = 0
for(let i = 0; i < grades.length; i++) {
    if(!grades[i].innerHTML.includes("%") && (grades[i].innerHTML <= 5 && grades[i].innerHTML >= 0)) {
        total += parseFloat(grades[i].innerHTML)
        divby++
    }
}
avgGrade = (total/divby).toFixed(1)

console.debug("i'm working")

if(document.getElementById("averageBox") == null) {
    document.getElementById("content-wrapper").insertAdjacentHTML("afterbegin", `
        <div id="averageBox">
            <h1 class="text-center" style="display: inherit !important;">Overall Grade</h1>
            <h2 id="overallgrade" class="text-center">-</h2>
        </div>
    `)
}

document.getElementById("overallgrade").innerHTML = avgGrade


//########################################################
    //Saving Grades
//########################################################

//pastGrades = []
// browser.storage.local.set({pastGrades})
browserGet("pastGrades", "local", "[]", "definePastGrades")
function definePastGrades() {; 
    let gradelist = document.getElementsByClassName("item-row")
    for(i = 0; i < gradelist.length; i++) {
        if(gradelist[i].getElementsByClassName("rounded-grade")[0]) {
            console.debug(gradelist[i])
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
                console.debug(`${pastGrades}`)
                // browser.storage.local.getBytesInUse("pastGrades").then(printBytes, onError)
                // function printBytes(input) {console.debug("Storage used:", input)}
                console.debug()
                browserSet("pastGrades", "local")
            }
        }
    }
}

