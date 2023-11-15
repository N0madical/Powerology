var grades = document.getElementsByClassName("rounded-grade")
var total = 0
for(var i = 0; i < grades.length; i++) {
    total += parseFloat(grades[i].innerHTML)
}
avgGrade = (total/grades.length)

console.debug("i'm working")

if(document.getElementById("averageBox") == null) {
    document.getElementById("content-wrapper").insertAdjacentHTML("afterbegin", `
        <div id="averageBox">
            <h1 class="text-center">Overall Grade</h1>
            <h2 id="overallgrade" class="text-center">-</h2>
        </div>
    `)
}

document.getElementById("overallgrade").innerHTML = avgGrade