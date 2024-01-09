//########################################################
    //Powerology Web Extention - By Aiden C
    //Script: Schoology Home Variables
//########################################################

//Icons
refresh = storageapi.runtime.getURL("icons/refresh.png");
openext = storageapi.runtime.getURL("icons/openext.png");
opengrd = storageapi.runtime.getURL("icons/grades.png");
plusicon = storageapi.runtime.getURL("icons/plus.png");
reordr = storageapi.runtime.getURL("icons/reorder.png")
editicon = storageapi.runtime.getURL("icons/edit.png")
editon = storageapi.runtime.getURL("icons/edit2.png")

//Getting browser-saved variables
checkedAssignments.get()

pastGrades.get(sortPastGrades)
function sortPastGrades() {pastGrades.value.sort((a, b) => a[0] - b[0]); updateGradeList();}

classColors.get()

dateobj = new Date()
datenow = dateobj.toISOString().substring(0,10)


//##############################
    //The meat and bones of the homepage
//##############################
schoologyplusplusWeb = `
<script type="text/javascript">
function passFunctionCall(call) {
    document.getElementById('codeportal').innerHTML = call;
}
</script>
<p id="codeportal" style="display: none;" value="sus"></p>
<div id="centerbox">
    <div id="classes" class="box boxrounded shadow" style="width: 300px; height: fit-content;">
        <img class="clickable smbutton" src=${opengrd} style="left: calc(var(--vpl) + 280px); transform:translateY(12px);" onclickevent="openGrades()"></img>
        <img class="clickable smbutton" src=${reordr} style="left: calc(var(--vpl) + 25px); transform:translateY(12px);" onclickevent="openLink('/courses/reorder')"></img>
        <img id="editmodebutton" class="clickable smbutton" src=${editicon} style="left: calc(var(--vpl) + 50px); transform:translateY(12px);" onclickevent="toggleEditMode()"></img>
        <h1 class="header text-center">Classes</h1>
        <hr style="margin-bottom: 10px;">
        <div style="width: 100%;">
            <table id="classlist" style="width: 100%;">
            </table>
        </div>
    </div>
    <div id="assignments" class="box boxrounded shadow" style="width: 500px; height: fit-content;">
        <h1 class="header text-center">Assignments</h1>
        <img class="clickable smbutton" src=${refresh} style="left: calc(var(--vpl) + 355px); transform:translateY(-22px);" onclickevent="refreshClrAssLst()"></img>
        <img class="clickable smbutton" src=${plusicon} style="left: calc(var(--vpl) + 790px); transform:translateY(-20px); width: 13px; height: 13px;" onclickevent="toggleAddGrd()"></img>
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
        <div id="grades" class="box boxrounded shadow" style="width: 400px; height: fit-content; display: flex; flex-direction: column; max-height: 50vh; resize: vertical; overflow: hidden;">
            <img class="clickable smbutton" src=${openext} style="left: calc(var(--vpl) + 1215px); transform:translateY(15px);" onclickevent="openLink('/grades/grades')" onrightclickevent="openLink('/grades/grades', true)"></img>
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
        <div id="todo" class="box boxrounded shadow" style="width: 400px; display: flex; flex-direction: column; max-height: 36vh; display:none; resize: vertical; overflow: hidden;">
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