function callBack(){
    fetch('http://localhost:8081/getData').then(res => {
        return res.json()
    })
        .then(response => {
            document.getElementById('Num').innerHTML = response
            console.log(response)
            const myTimeout = setTimeout(callBack, 2000);
        }
        )
}
callBack()