//########################################################
    //Creating Grade Average
//########################################################

avgGrade = "Error"

masteryGrades.get(defineMasteryGrades)

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

            avgGrade = (isNaN(total/divby)) ? "Not Avaliable - Try Reloading Page":(total/divby).toFixed(2)
            avgGrade1p = (isNaN(total/divby)) ? "Not Avaliable - Try Reloading Page":(total/divby).toFixed(1)
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
                    eftotal += parseFloat(efgrades[i].querySelector('[id=district-mastery-grade-title]').innerHTML)
                    efdivby++
                }
            }

            efAvgGrade = (isNaN(eftotal/efdivby)) ? "Not Avaliable":(eftotal/efdivby).toFixed(2)
            efAvgGrade1p = (isNaN(eftotal/efdivby)) ? "Not Avaliable":(eftotal/efdivby).toFixed(1)

            if(document.getElementById("averageBox") == null) {
                warnImage = storageapi.runtime.getURL("icons/warnIcon.png");
                document.getElementById("learning-objectives-cards-container").insertAdjacentHTML("afterbegin", `
                    <div id="averageBox">
                        <div class="avgBox hovmod">
                            <h1 class="text-center" style="display: inherit !important;">Overall Grade</h1>
                            <h2 id="overallgrade" class="text-center hovhide">-</h2>
                            <h2 id="overallgrade2p" class="text-center hovshow">-</h2>
                            <h3 id="overallwarning" style="display: none; margin: 10px 50%; transform: translateX(-50%); width: max-content;"><img src="${warnImage}" style="width: 25px; height: 25px; transform: translateY(25%); margin-right: 10px;">  What-If Grade</h3>
                            <p id="overalltotal" style="display: none;"></p>
                        </div>
                        <div class="avgBox hovmod">
                            <h1 class="text-center" style="display: inherit !important;">Executive Functions</h1>
                            <h2 id="overallEFgrade" class="text-center hovhide">-</h2>
                            <h2 id="overallEFgrade2p" class="text-center hovshow">-</h2>
                            <h3 id="overallEFwarning" style="display: none; margin: 10px 50%; transform: translateX(-50%); width: max-content;"><img src="${warnImage}" style="width: 25px; height: 25px; transform: translateY(25%); margin-right: 10px;">  What-If Grade</h3>
                            <p id="overallEFtotal" style="display: none;"></p>
                        </div>
                    </div>
                `)
            }

            document.getElementById("overallgrade").textContent = avgGrade1p
            document.getElementById("overallgrade2p").textContent = avgGrade
            document.getElementById("overallEFgrade").textContent = efAvgGrade1p
            document.getElementById("overallEFgrade2p").textContent = efAvgGrade
            document.getElementById("overalltotal").textContent = divby
            document.getElementById("overallEFtotal").textContent = efdivby

            document.getElementsByClassName("_3EZZc _1FFms _3QKei _2awxe _3skcp fjQuT uQOmx _2NVPS _1Sb_q WnfJn _3ARYD _3t4oF")[0].children[2].style.display = "none"

            document.querySelectorAll("[id=district-mastery-grade-title]").forEach(function(node){
                var elmIsEf = !node.parentElement.parentElement.parentElement.parentElement.parentElement.querySelectorAll("span")[0].innerHTML.includes("EF")
                node.ondblclick=function(){
                    var val=this.innerHTML;
                    var svval = this.innerHTML
                    var input=document.createElement("input");
                    input.value=val;
                    input.onblur=function(){
                        if(!isNaN(parseFloat(this.value).toFixed(2))) {
                            var val=parseFloat(this.value).toFixed(2);
                            this.parentNode.innerHTML=val;
                            testAvg(parseFloat(svval), parseFloat(val), elmIsEf)
                        }
                    }
                    input.addEventListener("keydown", function(event) {
                        if (event.keyCode === 13) {
                            input.onblur()
                        }
                    });
                    this.innerHTML="";
                    this.appendChild(input);
                    input.focus();
                    input.style.width = "50px"
                }
            });
        }

        if(document.getElementById("averageBox")) {
            clearInterval(loadrepeat)
            loadrepeat = window.setInterval(function(){
                showAverage()
            }, 500);
        }
    } catch (error) {
        if(document.getElementsByClassName("district-mastery-report-empty-wrapper-K3ciF")[0]) {
            setTimeout(()=>{location.reload()}, Math.floor(Math.random() * 2000))
        }
        //console.debug(error)
    }
}

document.getElementById("wrapper").style.width = "80%"

function testAvg(rem, ad, isEf) {
    let inputvar = (isEf) ? parseFloat(document.getElementById("overallgrade").textContent):parseFloat(document.getElementById("overallEFgrade").textContent)
    let inputnum = (isEf) ? parseFloat(document.getElementById("overalltotal").textContent):parseFloat(document.getElementById("overallEFtotal").textContent)
    let inputtotal = inputvar*inputnum
    inputtotal -= parseFloat(rem)
    inputtotal += parseFloat(ad)
    if(isEf) {
        document.getElementById("overallgrade").textContent = (inputtotal/inputnum).toFixed(1)
        document.getElementById("overallgrade2p").textContent = (inputtotal/inputnum).toFixed(2)
        document.getElementById("averageBox").children[0].style.height = "100px"
        document.getElementById("overallwarning").style.display = "inherit"
    } else {
        document.getElementById("overallEFgrade").textContent = (inputtotal/inputnum).toFixed(1)
        document.getElementById("overallEFgrade2p").textContent = (inputtotal/inputnum).toFixed(2)
        document.getElementById("averageBox").children[1].style.height = "100px"
        document.getElementById("overallEFwarning").style.display = "inherit"
    }
}

function defineMasteryGrades() {
    loadrepeat = window.setInterval(function(){
        showAverage()
    }, 250);
}
