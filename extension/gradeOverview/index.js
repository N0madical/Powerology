//########################################################
    //Powerology Web Extention - By Aiden C
    //Script: Schoology Grades Page
//########################################################


exceptionList.get(gradeOverview)

function gradeOverview() {  
    //Checking to see if script should be canceled in case of bugs
    let exclude = false
    let exceptions = exceptionList.value[0].concat(exceptionList.value[1])
    for(let i in exceptions) {
        if(window.location.href.includes(exceptions[i]) && exceptions[i].length > 0) {
            exclude = true
        }
    }
    if(!exclude) {

    //########################################################
        //Showing Grade Overviews
    //######################################################## 

    intval = false
    evntlstn = false
    classlinks = []

    masteryGrades.get(defineMasteryGrades)
    
    function defineMasteryGrades() {
        if(!intval) {
            document.getElementById("past-selector").innerHTML += `<p style="float: right; margin-top: 5px;">Overall Grade (Only shows when Mastery has been opened in the past three days)</p>`
            loadrepeat = window.setInterval(function(){
                masteryGrades.get(showGrades)
            }, 2000);
            intval = true
        }

        showGrades()
    }

    function showGrades() {
        let openext = storageapi.runtime.getURL("icons/openext.png");
        let classeslist = document.getElementById("main-inner").getElementsByClassName("gradebook-course")
        let months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
        
        //Grabbing grades
        for(let i = 0; i < classeslist.length; i++) {
            let selClassName = classeslist[i].getElementsByClassName("sExtlink-processed")[0].childNodes[1].data
            let selClassId = classeslist[i].id.substring(classeslist[i].id.length-10)
            let gradeAv = false
            for(let j = 0; j < masteryGrades.value.length; j++) {
                if(masteryGrades.value[j][0] == selClassName){
                    if(masteryGrades.value[j][1] >= Date.now()-(86400000*3)) {
                        gradeAv = true
                        avg = round(parseFloat(masteryGrades.value[j][2]),2)
                        gotDate = new Date(masteryGrades.value[j][1])
                    }
                }
            }

            if(!document.getElementsByClassName(`open_${selClassId}`)[0]) {
                classeslist[i].getElementsByClassName("gradebook-course-title")[0].style.width = "80%"
                classeslist[i].getElementsByClassName("gradebook-course-title")[0].style.display = "inline-block"
                classeslist[i].getElementsByClassName("gradebook-course-title")[0].insertAdjacentHTML("afterend", `<div class="ovgradebox" style="float: right; display: inline-block; margin-top: 5px;"><img src="${openext}" class="clickable open_${selClassId}" style="width: 15px; height: 15px; float: right; margin-left:10px; margin-top: 2px;" onclickevent="openLink('https://postoakschool.schoology.com/course/${selClassId}/student_district_mastery', true)"></div>`)
                classlinks.push(selClassId)
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
                
                classeslist[i].getElementsByClassName("gradebook-course-title")[0].parentElement.classList.add("hovmod") //${months[gotDate.getMonth()]} ${gotDate.getDate()}
                classeslist[i].getElementsByClassName("gradebook-course-title")[0].parentElement.getElementsByClassName("ovgradebox")[0].innerHTML += `<div class="grade_${selClassId}" style="width: 20px; height: 20px; float:right; background-color: ${color}; margin-left: 10px"></div><h3 class="hovhide" style="float: right; line-height: 9px">${round(parseFloat(avg),1)}</h3><h3 class="hovshow" style="float: right; line-height: 9px">${avg} - <i>${months[gotDate.getMonth()]} ${gotDate.getDate()}</i></h3>`
            }

        }

        //Displaying averages
        if(document.getElementById("averageBox") == null) {
            document.getElementById("main").insertAdjacentHTML("afterbegin", `
                <button id="mstryButton" class="text-center clickable" onclickevent="openAllMastery()" style="margin: 20px 50%; width: 200px; height: 40px; transform: translateX(-50%); border-radius: 10px;">Open All Mastery Pages</button>
            `)
            addEventListeners(document.getElementById("mstryButton"))
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

        //Averaging grades
        let count = 0
        let totalAvg = 0
        for(let j = 0; j < masteryGrades.value.length; j++) {
            if((masteryGrades.value[j][1] >= Date.now()-(86400000*3)) && (parseFloat(masteryGrades.value[j][2]) <= 5.0) && (parseFloat(masteryGrades.value[j][2]) >= 0.0)) {
                totalAvg += parseFloat(masteryGrades.value[j][2])
                count++
            }
        }
        let gpa = totalAvg/count
        document.getElementById("avg5").textContent = round(gpa,2)
        document.getElementById("avg4").textContent = round(gpa*0.8,2)
        document.getElementById("avg100").textContent = Math.round(gpa*20)

        if(!evntlstn) {
            addEventListeners(document.getElementById("main-inner"))
        }
        evntlstn = true
    }

    function openAllMastery() {
        let timeout = 0
        for(let i=0; i < classlinks.length; i++) {            
            setTimeout(function() {
                openLink(`https://postoakschool.schoology.com/course/${classlinks[i]}/student_district_mastery`, true)
            }, (timeout*500))
            timeout++
        }
    }

    buttonfunctions = Object.assign({}, buttonfunctions, {
        "openAllMastery" : openAllMastery,
    })


    //########################################################
        //Saving Grades
    //########################################################
    pastGrades.get(definePastGrades)

    function definePastGrades() {; 
        let gradelist = document.getElementsByClassName("item-row")
        for(i = 0; i < gradelist.length; i++) {
            if(gradelist[i].getElementsByClassName("rounded-grade")[0]) {
                let name = gradelist[i].getElementsByClassName("title")[0].textContent.substring(0,gradelist[i].getElementsByClassName("title")[0].textContent.indexOf("assignment"))
                let link = gradelist[i].getElementsByClassName("title")[0].children[0].href
                let id = link.substring(link.length - 10)
                let duedatems
                if(gradelist[i].getElementsByClassName("due-date")[0]) {
                    let duedate = gradelist[i].getElementsByClassName("due-date")[0].textContent.substring(4)
                    duedatems = Date.parse(duedate.substring(0,duedate.indexOf(" ")))
                } else {
                    duedatems = parseInt(Date.now())-604800000
                }
                let grade = round(parseFloat(gradelist[i].getElementsByClassName("rounded-grade")[0].innerHTML),2)
                if(parseFloat(grade) > 5) {
                    grade = round((parseFloat(grade)/20),2)
                } else {
                    grade = round(parseFloat(grade),2)
                }

                let match2 = false
                for(let h=0; h < pastGrades.value.length; h++) {
                    if(pastGrades.value[h][1][3] == id) {
                        if(pastGrades.value[h][1][1] != grade) {
                            console.info("Powerology: Found same name with different grade:", name, ":", pastGrades.value[h][1][1], "=>", grade)
                            pastGrades.value.splice(h,1)
                        } else {
                            match2 = true;
                        }
                    }
                }
                if(!match2) {
                    pastGrades.value.push([[duedatems],[name,grade,link,id]])
                    pastGrades.value.sort((a, b) => a[0] - b[0])
                }
            }
        }
        pastGrades.set()
    }
}}