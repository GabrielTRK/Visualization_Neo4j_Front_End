function login(){
    
    const usuario = document.getElementById("user").value;
    const pass = document.getElementById("password").value;

    const params = {
        "usuario": usuario,
        "pass": pass
    };
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( params )
    };
    fetch( 'http://localhost:8080/test', options )
        .then( response => response.json() )
        .then( response => {
            if(response){
                location.replace("../html/home.html")
            }else{
                console.log("bbbbb")
            }
        } );
}