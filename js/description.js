// Get the modal
var modal = document.getElementById("myModalSaved");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

date_PDMAX = new Date(document.getElementById("end").max)
date_PDMIN = new Date(document.getElementById("end").min)

function algoritmo(){
    idOrder = []
    const parents = document.getElementsByClassName("DDContainer");
    
    for(i = 1; i < parents[2].children.length-1; i++){
        idOrder[i-1] = parseInt(parents[2].children[i].children[0].id)
    }

    const params = {
        "order": idOrder
    };
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( params )
    };
    fetch( 'http://localhost:8080/test', options )
        .then( response => response.json() )
        .then( response => {
            console.log(response)
        } );


    /*fecha_I = new Date(document.getElementById("start").value)
    fecha_F = new Date(document.getElementById("end").value)
    año_I = String(fecha_I.getFullYear()) + "&"
    mes_I = String(addZ(fecha_I.getMonth() + 1)) + "&"
    dia_I = String(addZ(fecha_I.getUTCDate())) + "&"
    
    año_F = String(fecha_F.getFullYear()) + "&"
    mes_F = String(addZ(fecha_F.getMonth() + 1)) + "&"
    dia_F = String(addZ(fecha_F.getUTCDate())) + "&"

    iteraciones = document.getElementById("ite").value

    p_año_I = 'año_inicial='
    p_mes_I = 'mes_inicial='
    p_dia_I = 'dia_inicial='

    p_año_F = 'año_final='
    p_mes_F = 'mes_final='
    p_dia_F = 'dia_final='
    p_iteraciones = 'iteraciones='
    
    url = 'http://localhost:8080/algoritmo/dia' + '?' + p_dia_I + dia_I + p_dia_F + dia_F + p_mes_I + mes_I + p_mes_F + mes_F + p_año_I + año_I + p_año_F + año_F + p_iteraciones + iteraciones
    
    return fetch(url).then(res => {
        return res.json()
    })
    .then(dataBack => {
        params.diaActual = 0
        params.numSoluciones += 1
        params.solucionActual = params.numSoluciones - 1
        drawServerResult(dataBack)
        getNumDias()
        //actualizarBotones()
    }
    )*/
}

function saveConf(){
    //Comprobar datos y enviar error en caso de no validez
    err = false
    
    projectName = document.getElementById("projectName").value;

    if(projectName == ''){
        err = true
    }
    
    fecha_I = String(document.getElementById("start").value) + '&'
    fecha_F = String(document.getElementById("end").value) + '&'

    fecha_ID = new Date(document.getElementById("start").value)
    fecha_FD = new Date(document.getElementById("end").value)

    fecha_PDMAX = new Date(document.getElementById("start").max)
    fecha_PDMIN = new Date(document.getElementById("start").min)

    if(document.getElementById("start").value == '' || document.getElementById("end").value == ''){
        err = true
    }else if(fecha_ID < fecha_PDMIN || fecha_ID > fecha_PDMAX || fecha_FD < fecha_PDMIN || fecha_FD > fecha_PDMAX || fecha_ID > fecha_FD){
        err = true
    }
    
    cont = 0
    
    const parents = document.getElementsByClassName("DDContainer");
    for(i = 0; i < parents[2].children.length; i++){
        if(parents[2].children[i].children.length != 0){
            cont++
        }
    }
    if(cont != parents[2].children.length){
        err = true
    }

    epiRes = String(document.getElementById("restriction").value) + '&'
    
    switchs = document.getElementsByClassName("form-check-input")

    polRes = []

    cont = 0
    for(i = 0; i < switchs.length; i++){
        if(switchs[i].checked){
            polRes[cont] = switchs[i].id
            cont++
        }
    }

    idOrder = []
    
    if(cont == parents[2].children.length){
        for(i = 0; i < parents[2].children.length; i++){
            idOrder[i] = parseInt(parents[2].children[i].children[0].id)
        }
    }
    

    if(document.getElementById("numP").value != ''){
        numP = String(document.getElementById("numP").value) + '&'
    }else{
        numP = String(document.getElementById("numP").placeholder) + '&'
    }

    if(document.getElementById("iW").value != ''){
        iW = String(document.getElementById("iW").value) + '&'
    }else{
        iW = String(document.getElementById("iW").placeholder) + '&'
    }
    
    if(document.getElementById("c1").value != ''){
        c1 = String(document.getElementById("c1").value) + '&'
    }else{
        c1 = String(document.getElementById("c1").placeholder) + '&'
    }

    if(document.getElementById("c2").value != ''){
        c2 = String(document.getElementById("c2").value) + '&'
    }else{
        c2 = String(document.getElementById("c2").placeholder) + '&'
    }

    if(err){
        //Mostrar modal con error
        modal.style.display = "block";
        document.getElementById('ModalText').innerHTML = "Invalid data"
    }else{
        p_fecha_I = 'fecha_inicial='
    p_fecha_F = 'fecha_final='
    p_iteraciones = 'iteraciones='
    p_num_P = 'numIndividuos='
    p_iW = 'inertiaW='
    p_c1 = 'c1='
    p_c2 = 'c2='
    p_m = 'm='
    p_p = 'p='
    p_c1 = 'c1='
    p_res_epi = 'res_epi='

    p_nombre = 'nombre='
    
    url = 'http://localhost:8080/saveP' + '?' + p_fecha_I + fecha_I + p_fecha_F + fecha_F + p_iteraciones + String(0)+'&' + p_num_P + numP + 
    p_iW + iW + p_c1 + c1 + p_c2 + c2 + p_m + String(0.0)+'&' + p_p + String(0.0)+'&' + p_res_epi + epiRes + p_nombre + projectName

    const params = {
        "pol": polRes,
        "order": idOrder
    };
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( params )
    };
    fetch( url, options )
        .then( response => response.json() )
        .then( response => {
            if(response){
                modal.style.display = "block";
                document.getElementById('ModalText').innerHTML = "Project saved"

                for(i = 0; i < switchs.length; i++){
                    switchs[i].setAttribute("disabled", true)
                }

                imgs = parents[2].children
                for(i = 0; i < imgs.length; i++){
                    imgs[i].children[0].setAttribute("draggable", false)
                }
                
                inputs = document.getElementsByTagName('input')
                for(i = 0; i < inputs.length; i++){
                    inputs[i].setAttribute("disabled", true)
                }

                document.getElementById("SaveButton").style.display = 'none'
                document.getElementById("NewPButton").style.display = 'block'
            }
            else{
                //Mostrar modal con error
                modal.style.display = "block";
                document.getElementById('ModalText').innerHTML = "The name of the project already exists"
            }
        } );
    }
    
}

function refresh(){
    document.getElementById("SaveButton").style.display = 'block'
    document.getElementById("NewPButton").style.display = 'none'
    location.reload()
}

function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
  
function drop(ev) {
    cont = 0
    ev.preventDefault();
    if(ev.target.tagName == 'DIV'){
        var data = ev.dataTransfer.getData("text");
        ev.target.style.border = "1px solid rgb(90, 89, 89)"
        ev.target.appendChild(document.getElementById(data));
    }
    //Comprobar con un for los que no tienen asociado un criterio y ponerlos en rojo
    const parents = document.getElementsByClassName("DDContainer");
    for(i = 0; i < parents[2].children.length; i++){
        if(parents[2].children[i].children.length == 0){
            parents[2].children[i].style.border = "1px solid #de4251"
        }else{
            cont++
        }
    }
    if(cont == parents[2].children.length){
        document.getElementById('PrefValid').style.color = "#198754"
        document.getElementById('PrefValid').innerHTML = "Valid"
    }else{
        document.getElementById('PrefValid').style.color = "#de4251"
        document.getElementById('PrefValid').innerHTML = "All the criteria must be on the right column"
    }
}

function NumPshowHelp(){
    document.getElementById("NumPTooltipText").style.visibility = "visible";

}

function NumPhideHelp(){
    document.getElementById("NumPTooltipText").style.visibility = "hidden";
}

function IneWshowHelp(){
    document.getElementById("IneWTooltipText").style.visibility = "visible";
}

function IneWhideHelp(){
    document.getElementById("IneWTooltipText").style.visibility = "hidden";
}

function c1showHelp(){
    document.getElementById("c1TooltipText").style.visibility = "visible";
}

function c1hideHelp(){
    document.getElementById("c1TooltipText").style.visibility = "hidden";
}

function c2showHelp(){
    document.getElementById("c2TooltipText").style.visibility = "visible";
}

function c2hideHelp(){
    document.getElementById("c2TooltipText").style.visibility = "hidden";
}

function startDateOnChange(){
    date = document.getElementById('start').value

    fecha_PDMAX = new Date(document.getElementById("start").max)
    fecha_PDMIN = new Date(document.getElementById("start").min)

    fecha_ID = new Date(date)

    if(date != '' && fecha_ID >= fecha_PDMIN && fecha_ID <= fecha_PDMAX){
        document.getElementById('end').min = date
    }else{
        document.getElementById('end').min = date_PDMIN
    }
}

function endDateOnChange(){
    date = document.getElementById('end').value

    fecha_PDMAX = new Date(document.getElementById("end").max)
    fecha_PDMIN = new Date(document.getElementById("end").min)

    fecha_FD = new Date(date)

    if(date != '' && fecha_FD >= fecha_PDMIN && fecha_FD <= fecha_PDMAX){
        document.getElementById('start').max = date
    }else{
        document.getElementById('start').max = date_PDMAX
    }
}

function numPOnChange(){
    //console.log(document.getElementById('numP').value)
    /*if(document.getElementById('numP').value == ''){
        document.getElementById('numP').value = ''
    }else if(document.getElementById('numP').value > document.getElementById('numP').max){
        document.getElementById('numP').value = document.getElementById('numP').max
        console.log(document.getElementById('numP').value)
    }*/
    if(document.getElementById('numP').value > document.getElementById('numP').max){
        document.getElementById('numP').value = document.getElementById('numP').max
    }
        
    
}