refresh = storageapi.runtime.getURL("icons/refresh.png");
openext = storageapi.runtime.getURL("icons/openext.png");
opengrd = storageapi.runtime.getURL("icons/grades.png");
cngbg = storageapi.runtime.getURL("icons/changebg_white.png");

defaultClasscolors = {
    "Computer science 2023-24: Grade-12":"#4169E1",  
    "Creativity Activity Service : Class of 2024":"#FFD700", 
    "Español 11 y 12: Sección Intermedia":"#008000", 
    "Extended Essay: Seniors":"#FF0000", 
    "General Information: Community":"#808080", 
    "GPHC: Section D":"#FFA500", 
    "Language and Literature 23-24: A":"#87CEEB", 
    "Math Analysis and Approaches SL: Seniors 2":"#8B0000", 
    "Physics SL: Seniors":"#800080", 
    "Post Oak Press (School Newspaper): All Staff":"#FFFF00", 
    "Theory of Knowledge 12: Section H":"#00008B"
}

checkedAssignments = new browserStorage("checkedAssignments", "sync", [[],[],[]])
checkedAssignments.get()

pastGrades = new browserStorage("pastGrades", "local", [], sortPastGrades)
pastGrades.get()
function sortPastGrades() {pastGrades.value.sort((a, b) => a[0] - b[0]);}

classColors = new browserStorage("classColors", "sync", defaultClasscolors)
classColors.get()

defaultBackGround = ["#faf9f7", "https://source.unsplash.com/random/1920x1080/?city,night", 10]
backGround = new browserStorage("backGround", "sync", defaultBackGround, setBackground)
backGround.get()
function setBackground() {
    document.body.style.backgroundColor = backGround.value[0]
    document.body.style.backgroundImage = `url('${backGround.value[1]}')`
    document.body.style.backdropFilter = `blur(${backGround.value[2]}px)`
}

schoologyplusplusWeb = `
<script type="text/javascript">
function passFunctionCall(call) {
    document.getElementById('codeportal').innerHTML = call;
}
console.debug("hey i work")
</script>
<p id="codeportal" style="display: none;" value="sus"></p>
<img src=${cngbg} alt="Change Background" width="25" height="25" onclickevent="toggleCngBg()" class="clickable" style="position: absolute; left:5px; margin-top:5px;">
<div id="bgbox" class="shadow" style="visibility: hidden;">
    <h1 class="text-center">Change Background</h1>
    <hr style="transform: translate(0,0);">
    <h2 class="text-center" style="margin-bottom: 5px;">Set Background<br> to Color</h2>
    <input class="margin-center" type="color" id="bgcolor" value="${backGround.value[0]}">
    <h2 class="text-center" style="margin-top: 30px; margin-bottom: 5px;">Set Background to Image (Url)</h2>
    <input class="margin-center" class="text-center" value="${backGround.value[1]}" id="bgimg">
    <h3 class="text-center" style="margin-top: 20px;" id="blurbox">Image Blur (Pixels 0-100)</h3>
    <input type="number" class="margin-center" id="bgblur" style="width: 50px; margin-bottom: 20px;" min="0" max="100" step="1" value="${backGround.value[2]}">
    <button class="margin-center clickable" onclickevent="saveBg()">Save</button>
</div>
<div id="centerbox">
    <div id="classes" class="box shadow" style="width: 300px; height: fit-content;">
        <img class="clickable" src=${opengrd} style="position: absolute; left: 50%; transform:translate(-350px,15px); width: 15px; height: 15px;" onclickevent="openGrades('mastery')"></img>
        <h1 class="header text-center">Classes</h1>
        <hr style="margin-bottom: 10px;">
        <div style="width: 100%;">
            <table id="classlist" style="width: 100%;">
            </table>
        </div>
    </div>
    <div id="assignments" class="box shadow" style="width: 500px; height: fit-content;">
        <h1 class="header text-center">Assignments</h1>
        <img class="clickable" src=${refresh} style="position: absolute; left: 50%; transform:translate(150px,-22px); width: 15px; height: 15px;" onclickevent="refreshClrAssLst()"></img>
        <hr style="margin-bottom: 10px;">
        <div style="width: 100%;">
            <table id="assignmentlist" style="width: 100%;">
            </table>
        </div>
    </div>
    <div>
        <div id="grades" class="box shadow" style="width: 400px; height: fit-content; display: flex; flex-direction: column; max-height: 50vh;">
            <img class="clickable" src=${openext} style="position: absolute; left: 50%; transform:translate(570px,15px); width: 15px; height: 15px;" onclickevent="openGrades('grade')"></img>
            <h1 class="header text-center">Grades</h1>
            <hr style="margin-bottom: 10px;">
            <div class="text-center">
                <h3>Sort Grades: 
                    <select name="Sort Grades" id="sgrades" class="onchangeClickable" onchangeevent="filterGrades()">
                        <option value="000|000">All Grades</option>
                        <option value="0.0|5.0">Only Graded</option>
                        <option value="0.0|3.5">0.0 to 3.5</option>
                        <option value="3.5|4.0">3.5 to 4.0</option>
                        <option value="4.0|4.5">4.0 to 4.5</option>
                        <option value="4.5|5.0">4.5 to 5.0</option>
                    </select>
                </h3>
            </div>
            <div style="width: 100%; overflow-y: scroll;">
                <table id="gradelist" style="width: 100%;">
                </table>
            </div>
        </div>
        <div id="todo" class="box shadow" style="width: 400px; height: fit-content; display: flex; flex-direction: column; max-height: 36vh; display:none;">
            <h1 class="header text-center">For Later</h1>
            <hr style="margin-bottom: 10px;">
            <div style="width: 100%; overflow-y: scroll; flex-grow: 1">
                <table id="todolist" style="width: 100%;">
                </table>
            </div>
        </div>
    </div>
</div>
`;