//########################################################
    //Creating Grade Average
//########################################################

let avgGrade = "Error"

function showAverage() {
    try {
        if(document.getElementById("learning-objectives-cards-view-more")) {
            document.getElementById("learning-objectives-cards-view-more").click()
        } else if (window.location.href.includes("learning-objectives")) {
            let grades = document.getElementById("learning-objectives-cards-container").children
            let total = 0
            let divby = 0
            for(let i = 0; i < grades.length; i++) {
                if(!grades[i].querySelectorAll("span")[0].innerHTML.includes("EF") && parseFloat(grades[i].querySelector('[id=district-mastery-grade-title]').innerHTML) <= 5.0) {
                    total += parseFloat(grades[i].querySelector('[id=district-mastery-grade-title]').innerHTML)
                    divby++
                }
            }

            avgGrade = (total/divby).toFixed(1)

            let efgrades = document.getElementById("learning-objectives-cards-container").children
            let eftotal = 0
            let efdivby = 0
            for(let i = 0; i < efgrades.length; i++) {
                if(grades[i].querySelectorAll("span")[0].innerHTML.includes("EF") && parseFloat(efgrades[i].querySelector('[id=district-mastery-grade-title]').innerHTML) <= 5.0) {
                    console.debug(parseFloat(efgrades[i].querySelector('[id=district-mastery-grade-title]').innerHTML))
                    eftotal += parseFloat(efgrades[i].querySelector('[id=district-mastery-grade-title]').innerHTML)
                    efdivby++
                }
            }

            efAvgGrade = (eftotal/efdivby).toFixed(1)

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

            document.getElementById("overallgrade").innerHTML = avgGrade
            document.getElementById("overallEFgrade").innerHTML = efAvgGrade
        }

        if(document.getElementById("averageBox")) {
            clearInterval(loadrepeat)
            loadrepeat = window.setInterval(function(){
                showAverage()
            }, 1000);
        }
    } catch (error) {
        // if(document.getElementsByClassName("district-mastery-report-empty-wrapper-K3ciF")[0]) {
        //     location.reload()
        // }
    }
}

var loadrepeat = window.setInterval(function(){
    showAverage()
}, 250);

console.debug("i'm working")