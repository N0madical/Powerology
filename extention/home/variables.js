refresh = storageapi.runtime.getURL("icons/refresh.png");
openext = storageapi.runtime.getURL("icons/openext.png");
opengrd = storageapi.runtime.getURL("icons/grades.png");
plusicon = storageapi.runtime.getURL("icons/plus.png");

defaultClasscolors = {
    "Computer science":"#4169E1",  
    "Creativity Activity Service":"#FFD700", 
    "Español":"#008000", 
    "Extended Essay":"#FF0000", 
    "General Information":"#808080", 
    "GPHC":"#FFA500", 
    "Language and Literature":"#87CEEB", 
    "Math":"#8B0000", 
    "Physics":"#800080", 
    "Post Oak Press":"#FFFF00", 
    "Theory of Knowledge":"#00008B",
    "Music":"#9b00c9",
    "English":"#FFFFFF",
    "Physical Fitness":"#e48300",
    "HSE":"#13fff4",
    "History":"#ff5e13",
    "Integrated Science":"#00d44d",
    "Biology":"#32ff7d"
}

checkedAssignments = new browserStorage("checkedAssignments", "sync", [[],[],[]])
checkedAssignments.get()

customAssignments = new browserStorage("customAssignments", "sync", [], parseCustomAss)

pastGrades = new browserStorage("pastGrades", "local", [], sortPastGrades)
pastGrades.get()
function sortPastGrades() {pastGrades.value.sort((a, b) => a[0] - b[0]); updateGradeList();}

classColors = new browserStorage("classColors", "sync", defaultClasscolors)
classColors.get()

dateobj = new Date()
datenow = dateobj.toISOString().substring(0,10)

schoologyplusplusWeb = `
<script type="text/javascript">
function passFunctionCall(call) {
    document.getElementById('codeportal').innerHTML = call;
}
</script>
<p id="codeportal" style="display: none;" value="sus"></p>
<div id="centerbox">
    <div id="classes" class="box boxrounded shadow" style="width: 300px; height: fit-content;">
        <img class="clickable" src=${opengrd} style="position: absolute; left: calc(var(--vpl) + 280px); transform:translateY(12px); width: 15px; height: 15px;" onclickevent="openGrades('mastery')"></img>
        <h1 class="header text-center">Classes</h1>
        <hr style="margin-bottom: 10px;">
        <div style="width: 100%;">
            <table id="classlist" style="width: 100%;">
            </table>
        </div>
    </div>
    <div id="assignments" class="box boxrounded shadow" style="width: 500px; height: fit-content;">
        <h1 class="header text-center">Assignments</h1>
        <img class="clickable" src=${refresh} style="position: absolute; left: calc(var(--vpl) + 355px); transform:translateY(-22px); width: 15px; height: 15px;" onclickevent="refreshClrAssLst()"></img>
        <img class="clickable" src=${plusicon} style="position: absolute; left: calc(var(--vpl) + 790px); transform:translateY(-20px); width: 13px; height: 13px;" onclickevent="toggleAddGrd()"></img>
        <hr style="margin-bottom: 10px;">
        <div id="addbox" style="display: none;">
            <h1 style="margin-bottom: 0px;" class="text-center">Add Task</h1>
            <div style="margin-left: 50%; transform: translate(-50%, 0); width:max-content;">
                <h2 class="" style="margin-bottom: 0px; display: inline-block; left: 0; margin-right: 100px;">Name</h2>
                <input id="caName" class="margin-center" value="" id="bgimg" style="display: inline-block; width: 215px;">
            </div>
            <div style="margin-left: 50%; transform: translate(-50%, 0); width:max-content;">
                <h2 class="" style="margin-bottom: 0px; display: inline-block; margin-right: 75px;">Due Date</h2>
                <input id="caDate" type="datetime-local" class="margin-center" value="${datenow}T12:00" id="bgimg" style="display: inline-block; width: 215px;">
            </div>
            <div style="margin-left: 50%; transform: translate(-50%, 0); width:max-content;">
                <h2 class="" style="margin-bottom: 0px; display: inline-block; margin-right: 33px;">Link (Optional)</h2>
                <input id="caLink" class="margin-center" value="" id="bgimg" style="display: inline-block; width: 215px;">
            </div>
            <div style="margin-left: 50%; transform: translate(-50%, 0); width:max-content; margin-top: 25px; margin-bottom: 20px;">
                <button class="clickable" style="width: 100px; display: inline-block; color: #556370;" onclickevent="toggleAddGrd(true)">Close</button>
                <button class="clickable" style="width: 100px; display: inline-block; color: #556370;" onclickevent="addCustomAss(true)">Add</button>
            </div>
            <hr style="margin-left: 50%; transform: translate(-50%, 0);">
        </div>
        <div style="width: 100%;">
            <table id="assignmentlist" style="width: 100%;">
            </table>
        </div>
    </div>
    <div>
        <div id="grades" class="box boxrounded shadow" style="width: 400px; height: fit-content; display: flex; flex-direction: column; max-height: 50vh;">
            <img class="clickable" src=${openext} style="position: absolute; left: calc(var(--vpl) + 1215px); transform:translateY(15px); width: 15px; height: 15px;" onclickevent="openLink('/grades/grades')" onrightclickevent="openLink('/grades/grades', true)"></img>
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
        <div id="todo" class="box boxrounded shadow" style="width: 400px; height: fit-content; display: flex; flex-direction: column; max-height: 36vh; display:none;">
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