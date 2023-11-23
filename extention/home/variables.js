backGround = ["#faf9f7", "https://source.unsplash.com/random/1920x1080/?city,night", 10]

refresh = browser.runtime.getURL("icons/refresh.png");
openext = browser.runtime.getURL("icons/openext.png");
cngbg = browser.runtime.getURL("icons/changebg_white.png");

schoologyplusplusWeb = `
<img src=${cngbg} alt="Change Background" width="25" height="25" onclick="toggleCngBg()" class="clickable" style="position: absolute; left:5px; margin-top:5px;">
<div id="bgbox" class="shadow" style="visibility: hidden;">
    <h1 class="text-center">Change Background</h1>
    <hr style="transform: translate(0,0);">
    <h2 class="text-center" style="margin-bottom: 5px;">Set Background<br> to Color</h2>
    <input class="margin-center" type="color" id="bgcolor" value="${backGround[0]}">
    <h2 class="text-center" style="margin-top: 30px; margin-bottom: 5px;">Set Background to Image (Url)</h2>
    <input class="margin-center" class="text-center" value="${backGround[1]}" id="bgimg">
    <h3 class="text-center" style="margin-top: 20px;" id="blurbox">Image Blur (Pixels 0-100)</h3>
    <input type="number" class="margin-center" id="bgblur" style="width: 50px; margin-bottom: 20px;" min="0" max="100" step="1" value="${backGround[2]}">
    <button class="margin-center" onclick="saveBg()">Save</button>
</div>
<div id="centerbox">
    <div id="classes" class="box shadow" style="width: 300px; height: fit-content;">
        <h1 class="header text-center">Classes</h1>
        <hr style="margin-bottom: 10px;">
        <div style="width: 100%;">
            <table id="classlist" style="width: 100%;">
            </table>
        </div>
    </div>
    <div id="assignments" class="box shadow" style="width: 500px; height: fit-content;">
        <h1 class="header text-center">Assignments</h1>
        <img class="clickable" src=${refresh} style="position: absolute; left: 50%; transform:translate(150px,-22px); width: 15px; height: 15px;" onclick="refreshClrAssLst()"></img>
        <hr style="margin-bottom: 10px;">
        <div style="width: 100%;">
            <table id="assignmentlist" style="width: 100%;">
                <tr name="day" class="widthbox">
                    <th style="width: 100%;"><h2 style="padding-left: 10px; line-height: 5px; text-align: left;">Tuesday, March 3rd</h2></th>
                </tr>
                <tr name="assignment" onclick="javascript:sus2()" class="widthbox hov clickable">
                    <th style="width: 100%;"><h3 style="padding-left: 40px; text-align: left;">Assignment One</h3></th>
                    <th><h4 style="padding-right: 20px; text-align: right;">12:00pm</h4></th>
                </tr>
                <tr name="assignment" onclick="javascript:sus2()" class="widthbox hov clickable">
                    <th style="width: 100%;"><h3 style="padding-left: 40px; text-align: left;">Assignment Two</h3></th>
                    <th><h4 style="padding-right: 20px; text-align: right;">12:00pm</h4></th>
                </tr>
            </table>
        </div>
    </div>
    <div>
        <div id="grades" class="box shadow" style="width: 400px; height: fit-content; display: flex; flex-direction: column; max-height: 50vh;">
            <img class="clickable" src=${openext} style="position: absolute; left: 50%; transform:translate(570px,15px); width: 15px; height: 15px;" onclick="openGrades()"></img>
            <h1 class="header text-center">Grades</h1>
            <hr style="margin-bottom: 10px;">
            <div class="text-center">
                <h3>Sort Grades: 
                    <select name="Sort Grades" id="sgrades" onChange="sortGrades()">
                        <option value="000|000">All Grades</option>
                        <option value="0.0|5.0">Only Graded</option>
                        <option value="0.0|3.5">0.0 to 3.5</option>
                        <option value="3.5|4.0">3.5 to 4.0</option>
                        <option value="4.0|4.5">4.0 to 4.5</option>
                        <option value="4.5|5.0">4.5 to 5.0</option>
                    </select>
                </h3>
            </div>
            <div style="width: 100%; overflow: scroll;">
                <table id="gradelist" style="width: 100%;">
                </table>
            </div>
        </div>
        <div id="todo" class="box shadow" style="width: 400px; height: fit-content; display: flex; flex-direction: column; max-height: 36vh; display:none;">
            <h1 class="header text-center">For Later</h1>
            <hr style="margin-bottom: 10px;">
            <div style="width: 100%; overflow: scroll; flex-grow: 1">
                <table id="todolist" style="width: 100%;">
                </table>
            </div>
        </div>
    </div>
</div>
`;

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