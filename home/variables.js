refresh = browser.runtime.getURL("icons/refresh.png");

schoologyplusplusWeb = `
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

classcolors = {
    "Computer science 2023-24: Grade-12":"blue",  
    "Creativity Activity Service : Class of 2024":"gold", 
    "Español 11 y 12: Sección Intermedia":"green", 
    "Extended Essay: Seniors":"red", 
    "General Information: Community":"gray", 
    "GPHC: Section D":"orange", 
    "Language and Literature 23-24: A":"skyblue", 
    "Math Analysis and Approaches SL: Seniors 2":"darkred", 
    "Physics SL: Seniors":"purple", 
    "Post Oak Press (School Newspaper): All Staff":"yellow", 
    "Theory of Knowledge 12: Section H":"darkblue"
}