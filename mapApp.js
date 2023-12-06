var margin = {top: 50, left: 50, right: 50, bottom: 50};
var margin2 = {top: 100, left: 100, right: 400, bottom: 100};
height = 400 //- margin.top - margin.bottom;
width = 800 //- margin.left - margin.right;
var params = {numDias: 0, diaActual: 0, numSoluciones: 0, solucionActual: 0};

var projection = d3.geoMercator()
    .translate([width / 2, height / 2])
    .scale(100);

var path = d3.geoPath()
    .projection(projection);

const zoom = d3.zoom()
    //.translateExtent([[0, 0], [width, height]])
    .scaleExtent([1, 10])
    .on('zoom', handlezoom);

function handlezoom(){
    const currentTransform = d3.event.transform;
    
    d3.select('svg')
        .attr('transform', currentTransform);
}

function initzoom(){
    d3.select('svg')
        .call(zoom)
}

var svg = d3.select('#map')
    .append('svg')
    .attr("viewBox", [0, 0, width, height])
    .attr('height', height + margin2.top + margin2.bottom)
    .attr('width', width + margin2.left + margin2.right)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');




d3.queue()
    .defer(d3.json, 'world.topojson')
    .await(drawWorld);

init();
initzoom();

function drawWorld(error, world){
    var countries = topojson.feature(world, world.objects.countries).features;
    svg.selectAll('.country')
        .data(countries)
        .enter().append('path')
        .attr('class', 'country')
        .attr('d', path)
        /*.on('mouseover', function(d){
            d3.select(this).classed('selected', true)
        })
        .on('mouseout', function(d){
            d3.select(this).classed('selected', false)
        })*/
}

function init(){
    getNumSoluciones()
    
}

function getNumSoluciones(){
    fetch('http://localhost:8080/numSoluciones').then(res => {
        return res.json()
    })
    .then(dataBack => {
        
        params.numSoluciones = dataBack
        params.solucionActual = dataBack-1
        getNumDias();
        circulosYConexiones();
        actualizarListaSoluciones();


    }
    )
}

function getNumDias(){

    /*p_id_sol = 'id='

    id_sol = params.solucionActual
    
    url = 'http://localhost:8080/solucionI/numDias' + '?' + p_id_sol + id_sol*/

    id = params.solucionActual
    
    url = 'http://localhost:8080/' + id + '  /numDias'


    fetch(url).then(res => {
        return res.json()
    })
    .then(dataBack => {
        
        params.numDias = dataBack
        actualizarBotones();
    }
    )
}
//Devolver desde el Back una lista de aeropuertos en donde cada aeropuerto contiene las coordenadas y el iata. 
//También se debe indicar si cada aeroipuerto es Origen o destino para cambiarso color en el mapa

function circulosYConexiones(){

    /*p_id_sol = 'id='
    p_dia = 'dia='

    id_sol = params.solucionActual + '&'
    dia = params.diaActual
    
    url = 'http://localhost:8080/solucionI/diaJ' + '?' + p_id_sol + id_sol + p_dia + dia*/

    id = params.solucionActual
    dia = params.diaActual
    
    url = 'http://localhost:8080/' + id + '/' + dia


    fetch(url)
    .then(res => {
        return res.json()
    })
    .then(dataBack => {
        drawServerResult(dataBack)
    })
}

function drawServerResult(dataBack){
    d3.selectAll('.airport').remove()
    d3.selectAll('.connection').remove()
    svg.selectAll('.airport')
            .data(dataBack.listaAeropuertos)
            .enter().append('circle')
            .attr('class', 'airport')
            .attr('r', 0.5)
            .attr('cx', function(d){
                var coords = projection([d.longitud, d.latitud])
                return coords[0]
            })
            .attr('cy', function(d){
                var coords = projection([d.longitud, d.latitud])
                return coords[1]
            })
            .attr('fill', function(d){
                if(d.origen == true){
                    return 'green'
                }
                else
                    return 'blue'
            })

            svg.selectAll('.connection')
            .data(dataBack.coordenadasConexiones)
            .enter().append('path')
            .attr('class', 'connection')
            .attr('d', function(d){
                var xO = projection([d.longitudeO, d.latitudeO])[0]
                var yO = projection([d.longitudeO, d.latitudeO])[1]
                var xD = projection([d.longitudeD, d.latitudeD])[0]
                var yD = projection([d.longitudeD, d.latitudeD])[1]
                return 'M' + xO + ' ' + yO + ' L' + xD + ' ' + yD
            })
            .attr('stroke', function(d){
                if(d.abierto_cerrado){
                    return 'black'
                }else{
                    return 'red'
                }
            })
}

function actualizarListaSoluciones(){
    
    const select = document.getElementById("Soluciones");

    for(var i = 0; i < params.numSoluciones; i++){
        const newOption = document.createElement('option');
        const optionText = document.createTextNode(i);
        newOption.appendChild(optionText);
        newOption.setAttribute('value', i);
        select.appendChild(newOption);
        if(i == params.numSoluciones-1){
            newOption.selected = true;
        }
    }
}

function solucionDiaAnterior(){

    /*p_id_sol = 'id='
    p_dia = 'dia='

    params.diaActual -= 1
    console.log(params)

    id_sol = params.solucionActual
    dia = params.diaActual


    url = 'http://localhost:8080/solucionI/diaJ' + '?' + p_id_sol + id_sol + p_dia + dia*/

    params.diaActual -= 1
    console.log(params)

    id = params.solucionActual
    dia = params.diaActual


    url = 'http://localhost:8080/' + id + '/' + dia
    
    return fetch(url).then(res => {
        return res.json()
    })
    .then(dataBack => {
        drawServerResult(dataBack)
        actualizarBotones()
    }
    )
}

function solucionDiaPosterior(){

    /*p_id_sol = 'id='
    p_dia = 'dia='

    params.diaActual += 1
    console.log(params)

    id_sol = params.solucionActual
    dia = params.diaActual


    url = 'http://localhost:8080/solucionI/diaJ' + '?' + p_id_sol + id_sol + p_dia + dia*/

    params.diaActual += 1
    console.log(params)

    id = params.solucionActual
    dia = params.diaActual


    url = 'http://localhost:8080/' + id + '/' + dia
    
    return fetch(url).then(res => {
        return res.json()
    })
    .then(dataBack => {
        drawServerResult(dataBack)
        actualizarBotones()
    }
    )
}

function actualizarBotones(){
    if(params.diaActual == 0){
        document.getElementById("anterior").disabled = true;
    }else{
        document.getElementById("anterior").disabled = false;
    }
    if(params.diaActual == params.numDias - 1){
        document.getElementById("posterior").disabled = true;
    }else{
        document.getElementById("posterior").disabled = false;
    }

}

//Cuando se seleccione una solución, llamar al back con el id seleccionado para actualizar el mapa
function selectChange(sel){
    //console.log(sel.options[sel.selectedIndex].value)
    params.solucionActual = parseInt(sel.options[sel.selectedIndex].value)
    params.diaActual = 0
    getNumDias();
    circulosYConexiones();
}

function algoritmo(){
    fecha_I = new Date(document.getElementById("start").value)
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
    )
}

function addZ(fecha){
    return fecha<10? '0'+fecha:''+fecha
}