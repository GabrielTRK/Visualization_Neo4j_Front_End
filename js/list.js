
url = 'http://localhost:8080/loadP'

fetch(url).then(res => {
    return res.json()
})
    .then(dataBack => {
        main = document.getElementById("MainList")
        for (i = 0; i < dataBack.length; i++) {
            console.log(dataBack[i])
            projectI = document.createElement("a")
            projectI.classList.add("list-group-item")
            projectI.classList.add("list-group-item-action")
            projectI.classList.add("flex-column")
            projectI.classList.add("align-items-start")

            divInputs = document.createElement("div")
            divInputs.classList.add("d-flex")
            divInputs.classList.add("w-100")

            addInputs(divInputs, dataBack[i])

            epiP = document.createElement("p")
            epiP.innerHTML = 'Epidemiological constraint:'
            epiP.style.paddingTop = '1rem'

            divEpi = document.createElement("div")
            divEpi.classList.add('progress')
            divEpi.classList.add('mb-3')
            divEpi.style.height = '25px'

            addEpi(divEpi, dataBack[i])

            projectI.appendChild(divInputs)
            projectI.appendChild(epiP)
            projectI.appendChild(divEpi)
            main.appendChild(projectI)
        }
    }
    )

function addInputs(divInputs, dataBack) {
    divTagInput1 = document.createElement("div")
    divTagInput1.classList.add("input-group-prepend")

    divTagInput1Span = document.createElement("span")
    divTagInput1Span.classList.add("input-group-text")
    divTagInput1Span.innerHTML = "Project name"

    divInput1 = document.createElement("input")
    divInput1.setAttribute("type", "text");
    divInput1.classList.add("form-control")
    divInput1.setAttribute('value', dataBack.nombre)
    divInput1.setAttribute('disabled', 'true')
    divInput1.style.width = '15%'

    divTagInput2 = document.createElement("div")
    divTagInput2.classList.add("input-group-prepend")
    divTagInput2.style.marginLeft = '10%'

    divTagInput2Span = document.createElement("span")
    divTagInput2Span.classList.add("input-group-text")
    divTagInput2Span.innerHTML = "Start date"

    divInput2 = document.createElement("input")
    divInput2.setAttribute("type", "date");
    divInput2.classList.add("form-control")
    divInput2.setAttribute('value', dataBack.fechas.fechaI)
    divInput2.setAttribute('disabled', 'true')
    divInput2.style.width = '15%'

    divTagInput3 = document.createElement("div")
    divTagInput3.classList.add("input-group-prepend")
    divTagInput3.style.marginLeft = '10%'

    divTagInput3Span = document.createElement("span")
    divTagInput3Span.classList.add("input-group-text")
    divTagInput3Span.innerHTML = "End date"

    divInput3 = document.createElement("input")
    divInput3.setAttribute("type", "date");
    divInput3.classList.add("form-control")
    divInput3.setAttribute('value', dataBack.fechas.fechaF)
    divInput3.setAttribute('disabled', 'true')
    divInput3.style.width = '15%'

    divTagInput1.appendChild(divTagInput1Span)
    divInputs.appendChild(divTagInput1)
    divInputs.appendChild(divInput1)

    divTagInput2.appendChild(divTagInput2Span)
    divInputs.appendChild(divTagInput2)
    divInputs.appendChild(divInput2)

    divTagInput3.appendChild(divTagInput3Span)
    divInputs.appendChild(divTagInput3)
    divInputs.appendChild(divInput3)
}

function addEpi(divEpi, dataBack){
    divProgress = document.createElement('div')
    divProgress.classList.add('progress-bar')
    divProgress.setAttribute('role', 'progressbar')
    divProgress.style.width = String(dataBack.res.epi) + '%'
    divProgress.innerHTML = String(dataBack.res.epi) + '%'
    divEpi.appendChild(divProgress)
}