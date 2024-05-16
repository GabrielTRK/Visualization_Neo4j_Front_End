projectName = localStorage.getItem("projectName")

document.getElementById('ListTitle').innerHTML = 'Solutions list from project ' + projectName

url = 'http://localhost:8080/' + projectName + '/loadS'

fetch(url).then(res => {
    return res.json()
})
    .then(dataBack => {
        main = document.getElementById("MainList")
        //Si databack.length == 0 poner mensaje de empty list
        for (i = 0; i < dataBack.length; i++) {
            console.log(dataBack[i])
        }
    }
    )