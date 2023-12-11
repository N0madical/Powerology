//########################################################
    //Creating Grade Average
//########################################################

let avgGrade = "Error"

masteryGrades = new browserStorage("masteryGrades", "local", [], defineMasteryGrades)
masteryGrades.get()

function showAverage() {
    try {
        if(document.getElementById("learning-objectives-cards-view-more")) {
            document.getElementById("learning-objectives-cards-view-more").click()
        } else if (window.location.href.includes("learning-objectives")) {
            let grades = document.getElementById("learning-objectives-cards-container").children
            let name = document.getElementsByClassName("_24avl _1EyV_ _3v0y7 _2VUdE _3LeCL _2_GfG _3L6tC _10N3s _3Wb6n dVlNp _3_bfp")[1].textContent
            let total = 0
            let divby = 0
            for(let i = 0; i < grades.length; i++) {
                if(!grades[i].querySelectorAll("span")[0].innerHTML.includes("EF") && parseFloat(grades[i].querySelector('[id=district-mastery-grade-title]').innerHTML) <= 10.0) {
                    total += parseFloat(grades[i].querySelector('[id=district-mastery-grade-title]').innerHTML)
                    divby++
                }
            }

            avgGrade = (isNaN(total/divby)) ? "Not Avaliable - Try Reloading Page":(total/divby).toFixed(1)
            if(!isNaN(total/divby)) {
                let included = false
                for(let i = 0; i < masteryGrades.value.length; i++) {
                    if(masteryGrades.value[i][0] == name) {
                        if(masteryGrades.value[i][2] == avgGrade) {
                            included = true
                        } else {
                            masteryGrades.value.splice(i,1)
                        }
                    }
                }
                if(!included) {
                    masteryGrades.value.push([name, Date.now(), avgGrade])
                    masteryGrades.set()
                }
            }

            let efgrades = document.getElementById("learning-objectives-cards-container").children
            let eftotal = 0
            let efdivby = 0
            for(let i = 0; i < efgrades.length; i++) {
                if(grades[i].querySelectorAll("span")[0].innerHTML.includes("EF") && parseFloat(efgrades[i].querySelector('[id=district-mastery-grade-title]').innerHTML) <= 10.0) {
                    console.debug(parseFloat(efgrades[i].querySelector('[id=district-mastery-grade-title]').innerHTML))
                    eftotal += parseFloat(efgrades[i].querySelector('[id=district-mastery-grade-title]').innerHTML)
                    efdivby++
                }
            }

            efAvgGrade = (isNaN(eftotal/efdivby)) ? "Not Avaliable":(eftotal/efdivby).toFixed(1)

            if(document.getElementById("averageBox") == null) {
                document.getElementById("learning-objectives-cards-container").insertAdjacentHTML("afterbegin", `
                    <div id="averageBox">
                        <div class="avgBox">
                            <h1 class="text-center" style="display: inherit !important;">Overall Grade</h1>
                            <h2 id="overallgrade" class="text-center">-</h2>
                        </div>
                        <div class="avgBox">
                            <h1 class="text-center" style="display: inherit !important;">Executive Functions</h1>
                            <h2 id="overallEFgrade" class="text-center">-</h2>
                        </div>
                    </div>
                `)
            }

            document.getElementById("overallgrade").textContent = avgGrade
            document.getElementById("overallEFgrade").textContent = efAvgGrade

            document.getElementsByClassName("_3EZZc _1FFms _3QKei _2awxe _3skcp fjQuT uQOmx _2NVPS _1Sb_q WnfJn _3ARYD _3t4oF")[0].children[2].style.display = "none"
        }

        if(document.getElementById("averageBox")) {
            clearInterval(loadrepeat)
            loadrepeat = window.setInterval(function(){
                showAverage()
            }, 1000);
        }
    } catch (error) {
        if(document.getElementsByClassName("district-mastery-report-empty-wrapper-K3ciF")[0]) {
            setTimeout(()=>{location.reload()}, Math.floor(Math.random() * 2000))
        }
        //console.debug(error)
    }
}

function defineMasteryGrades() {
    loadrepeat = window.setInterval(function(){
        showAverage()
    }, 250);
}
