refresh = browser.runtime.getURL("icons/refresh.png");
cngbg = browser.runtime.getURL("icons/changebg_white.png");

schoologyplusplusWeb = `
<img src=${cngbg} alt="Change Background" width="25" height="25" onclick="toggleCngBg()" class="clickable" style="position: absolute; left:5px; margin-top:5px;">
<div id="bgbox" class="shadow" style="visibility: hidden;">
    <h1 class="text-center">Change Background</h1>
    <hr style="transform: translate(0,0);">
    <h2 class="text-center" style="margin-bottom: 5px;">Set Background<br> to Color</h2>
    <input class="margin-center" type="color" id="bgcolor">
    <h2 class="text-center" style="margin-top: 30px; margin-bottom: 5px;">Set Background to Image (Url)</h2>
    <input class="margin-center" class="text-center" value="https://" id="bgimg">
    <h3 class="text-center" style="margin-top: 20px;" id="blurbox">Image Blur (Pixels 0-100)</h3>
    <input type="number" class="margin-center" id="bgblur" style="width: 50px; margin-bottom: 20px;" min="0" max="100" step="1">
    <button class="margin-center" onclick="saveBg()">Save</button>
</div>
<div id="centerbox">
    <div id="classes" class="box shadow" style="width: 300px; height: fit-content;">
        <h1 class="header text-center">Classes</h1>
        <hr style="margin-bottom: 10px;">
        <table id="classlist" style="width: 100%;">
        </table>
    </div>
    <div id="assignments" class="box shadow" style="width: 500px; height: fit-content;">
        <h1 class="header text-center">Assignments</h1>
        <img class="clickable" src=${refresh} style="position: absolute; left: 50%; transform:translate(160px,-22px); width: 15px; height: 15px;" onclick="refreshClrAssLst()"></img>
        <hr style="margin-bottom: 10px;">
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
    <div id="grades" class="box shadow" style="width: 400px; height: fit-content;">
        <h1 class="header text-center">Grades</h1>
        <hr style="margin-bottom: 10px;">
        <table id="gradelist" style="width: 100%;">
        </table>
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