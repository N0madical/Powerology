schoologyplusplusWeb = `
<div id="centerbox">
    <div id="classes" class="box shadow" style="width: 300px; height: fit-content;">
        <h1 class="header text-center">Classes</h1>
        <hr style="margin-bottom: 10px;">
        <table id="classlist" style="width: 100%;">
            <tr class="widthbox shadow hov clickable">
                <th onclick="javascript:sus()" class="classcolor" style="background-color: red;"></th>
                <th onclick="javascript:sus2()" style="width: 100%;"><h2 style="padding-left: 10px; text-align: left; transform:translate(0, 50%);">Class One</h2></th>
                <th onclick="javascript:sus2()" style="width: 40px;"><p style="font-size: 40px; line-height: 20px; transform:translate(0, 50%);">›</p></th>
            </tr>
            <tr class="widthbox shadow hov clickable">
                <th class="classcolor" style="background-color: green;"><a href="javascript:sus()" style="display: block; width: 100%; height: 100%;"></a></th>
                <th onclick="javascript:sus2()" style="width: 100%;"><h2 style="padding-left: 10px; text-align: left; transform:translate(0, 50%);">Class Two</h2></th>
                <th onclick="javascript:sus2()" style="width: 40px;"><p style="font-size: 40px; line-height: 20px; transform:translate(0, 50%);">›</p></th>
            </tr>
        </table>
    </div>
    <div id="assignments" class="box shadow" style="width: 500px; height: fit-content;">
        <h1 class="header text-center">Assignments</h1>
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
    <div id="grades" class="box shadow" style="width: 300px; height: fit-content;">
        <h1 class="header text-center">Grades</h1>
        <hr style="margin-bottom: 10px;">
        <table id="gradelist" style="width: 100%;">
            <tr name="grade" onclick="javascript:sus2()" class="widthbox hov clickable">
                <th style="width: 100%;"><h3 style="padding-left: 20px; text-align: left;">Assignment One</h3></th>
                <th><h3 style="padding-right: 5px; text-align: right;">1.2</h3></th>
                <th><div class="gradebox" style="background-color: red;"></div></th>
            </tr>
            <tr name="grade" onclick="javascript:sus2()" class="widthbox hov clickable">
                <th style="width: 100%;"><h3 style="padding-left: 20px; text-align: left;">Assignment Two</h3></th>
                <th><h3 style="padding-right: 5px; text-align: right;">4.5</h3></th>
                <th><div class="gradebox" style="background-color: lightgreen;"></div></th>
            </tr>
        </table>
    </div>
</div>
`