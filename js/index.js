fetch('https://192.168.1.41:8080/getData/').then(res => {
    return res.json()
})
    .then(dataBack => {
        //Si databack.length == 0 poner mensaje de empty list
        console.log(dataBack)

    }
    )