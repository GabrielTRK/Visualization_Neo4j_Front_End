projectName = localStorage.getItem("projectName")
solutionID = localStorage.getItem("solutionID")

currentDay = 0
currentAir = ''
separator = '/'
minDate = new Date("2020/01/01")
minDateString = ''

var params = { numDias: 0, diaActual: 0 };

mainURL = 'http://localhost:8080/' + projectName + separator + solutionID + separator

getData()

function getData() {
    fetch(mainURL + currentDay + separator + currentAir).then(res => {
        return res.json()
    })
        .then(dataBack => {
            //main = document.getElementById("MainList")
            //Si databack.length == 0 poner mensaje de empty list
            console.log(dataBack)
            document.getElementById('Sdate').value = dataBack.fechas.Fecha_Actual
            document.getElementById('Sdate').min = dataBack.fechas.Fecha_Inicial
            document.getElementById('Sdate').max = dataBack.fechas.Fecha_Final
            minDate = new Date(dataBack.fechas.Fecha_Inicial)
            minDateString = dataBack.fechas.Fecha_Inicial
            
        }
        )
}

function datesDifference(fecha) {
    let date1 = new Date(fecha);
    currentDay = Math.round((date1.getTime() - minDate.getTime()) / (1000 * 3600 * 24))
    if (currentDay < 0) {
        currentDay = 0
        document.getElementById('Sdate').value = minDateString
    }
}

function applyFilter() {
    document.getElementById('row3').remove()
    currentAir = document.getElementById('airInput').value
    datesDifference(document.getElementById('Sdate').value)
    //Quitar children de row1 y row2
    getData()
}

function resetFilter() {
    currentAir = ''
    currentDay = 0
    document.getElementById('Sdate').value = minDateString
    document.getElementById('airInput').value = ''
    //Quitar children de row1 y row2
    getData()
}

function removeChildren(element) {
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}