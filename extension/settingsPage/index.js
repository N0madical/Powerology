//########################################################
    //Powerology Web Extention - By Aiden C
    //Script: Auto Settings-Setter
//########################################################

// Changes the default home screen to classes so Schoology UI can run
setTimeout(changeSettings, 250)

function changeSettings() {
    if(document.getElementById("edit-homepage-view-1").checked) {
        openLink("https://postoakschool.schoology.com/home/")
    } else {
        document.getElementById("edit-homepage-view-0").checked = false
        document.getElementById("edit-homepage-view-1").checked = true
        document.getElementById("edit-submit-1").click()
    }
    
}
