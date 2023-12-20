const weightsVAR = [0.4,0.6];

function algoritmo(){
    const params = {
        "weights": [0.4,0.6]
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