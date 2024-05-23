projectName = localStorage.getItem("projectName")
solutionID = localStorage.getItem("solutionID")

currentDay = 0
currentAir = ''
separator = '/'
minDate = new Date("2020/01/01")
maxDate = new Date("2020/01/01")
minDateString = ''
numDias = 0

mainURL = 'http://localhost:8080/' + projectName + separator + solutionID + separator

getConnections()
getObj()
getFit()

function getConnections() {
    fetch(mainURL + currentDay + separator + currentAir).then(res => {
        return res.json()
    })
        .then(dataBack => {
            //Si databack.length == 0 poner mensaje de empty list
            document.getElementById('Sdate').value = dataBack.fechas.Fecha_Actual
            document.getElementById('Sdate').min = dataBack.fechas.Fecha_Inicial
            document.getElementById('Sdate').max = dataBack.fechas.Fecha_Final
            minDate = new Date(dataBack.fechas.Fecha_Inicial)
            maxDate = new Date(dataBack.fechas.Fecha_Final)
            numDias = Math.round((maxDate.getTime() - minDate.getTime()) / (1000 * 3600 * 24))
            minDateString = dataBack.fechas.Fecha_Inicial

            row1 = document.getElementById('row1')
            row2 = document.getElementById('row2')

            th1 = document.createElement('th')
            th1.setAttribute("scope", "col");
            th1.classList.add('text-center')
            th1.innerHTML = 'Connections'

            th2 = document.createElement('th')
            th2.setAttribute("scope", "col");
            th2.classList.add('text-center')
            th2.innerHTML = 'Bits'

            row1.appendChild(th1)
            row2.appendChild(th2)
            for(i = 0; i < dataBack.coordenadasConexiones.length; i++){
                row1TH = document.createElement('th')
                row1TH.setAttribute("scope", "col");
                row1TH.classList.add('text-center')
                row1TH.innerHTML = dataBack.coordenadasConexiones[i].iataOrigen + ' - ' + dataBack.coordenadasConexiones[i].iataDestino

                row2TD = document.createElement('td')
                row2TD.setAttribute("scope", "col");
                row2TD.classList.add('text-center')
                if(dataBack.coordenadasConexiones[i].abierto_cerrado){
                    row2TD.innerHTML = '1'
                }else{
                    row2TD.innerHTML = '0'
                }

                row1.appendChild(row1TH)
                row2.appendChild(row2TD)
            }
            document.getElementById('tableCaption').innerHTML = dataBack.coordenadasConexiones.length + ' connections'

        }
        )
}

function getObj(){
    fetch(mainURL + 'objetivos').then(res => {
        return res.json()
    })
        .then(dataBack => {
            //Si databack.length == 0 poner mensaje de empty list
            console.log(dataBack)
            

        }
        )
}

function getFit(){
    fetch(mainURL + 'hist').then(res => {
        return res.json()
    })
        .then(dataBack => {
            //Si databack.length == 0 poner mensaje de empty list
            console.log(dataBack)
            

        }
        )
}

function datesDifference(fecha) {
    let date1 = new Date(fecha);
    currentDay = Math.round((date1.getTime() - minDate.getTime()) / (1000 * 3600 * 24))
    if (currentDay < 0 || currentDay > numDias) {
        currentDay = 0
        document.getElementById('Sdate').value = minDateString
    }
}

function applyFilter() {
    currentAir = document.getElementById('airInput').value
    datesDifference(document.getElementById('Sdate').value)
    removeChildren(document.getElementById('row1'))
    removeChildren(document.getElementById('row2'))
    getConnections()
}

function resetFilter() {
    currentAir = ''
    currentDay = 0
    document.getElementById('Sdate').value = minDateString
    document.getElementById('airInput').value = ''
    removeChildren(document.getElementById('row1'))
    removeChildren(document.getElementById('row2'))
    getConnections()
}

function removeChildren(element) {
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

function exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}