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
            solutionI = document.createElement("button")
            solutionI.setAttribute("type", "button");
            solutionI.classList.add("Solution-" + dataBack[i].id)
            solutionI.classList.add("list-group-item")
            solutionI.classList.add("list-group-item-action")
            solutionI.classList.add("flex-column")
            solutionI.classList.add("align-items-start")
            solutionI.setAttribute('onclick', 'myF(event)')

            divIDInputs = document.createElement("div")
            divIDInputs.classList.add("Solution-" + dataBack[i].id)
            divIDInputs.classList.add("d-flex")
            divIDInputs.classList.add("w-100")

            addIDInputs(divIDInputs, dataBack[i])

            solutionI.appendChild(divIDInputs)

            main.appendChild(solutionI)
        }
    }
    )

function addIDInputs(divIDInputs, dataBack){
    SolutionID = document.createElement('h4')
    idText = dataBack.id + 1
    SolutionID.innerHTML = 'Solution ' + idText
    SolutionID.classList.add("Solution-" + dataBack.id)

    divTagInput1 = document.createElement("div")
    divTagInput1.classList.add("input-group-prepend")
    divTagInput1.style.marginLeft = '10%'

    divTagInput1Span = document.createElement("span")
    divTagInput1Span.classList.add("Solution-" + dataBack.id)
    divTagInput1Span.classList.add("input-group-text")
    divTagInput1Span.innerHTML = "Number of iterations"

    divInput1 = document.createElement("input")
    divInput1.setAttribute("type", "text");
    divInput1.classList.add("form-control")
    divInput1.setAttribute('value', dataBack.iter)
    divInput1.setAttribute('disabled', 'true')
    divInput1.style.width = '15%'

    divTagInput2 = document.createElement("div")
    divTagInput2.classList.add("input-group-prepend")
    divTagInput2.style.marginLeft = '10%'

    divTagInput2Span = document.createElement("span")
    divTagInput2Span.classList.add("Solution-" + dataBack.id)
    divTagInput2Span.classList.add("input-group-text")
    divTagInput2Span.innerHTML = "Fitness"

    divInput2 = document.createElement("input")
    divInput2.setAttribute("type", "text");
    divInput2.classList.add("form-control")
    divInput2.setAttribute('value', dataBack.fitness)
    divInput2.setAttribute('disabled', 'true')
    divInput2.style.width = '15%'

    divIDInputs.appendChild(SolutionID)
    divTagInput1.appendChild(divTagInput1Span)
    divIDInputs.appendChild(divTagInput1)
    divIDInputs.appendChild(divInput1)

    divTagInput2.appendChild(divTagInput2Span)
    divIDInputs.appendChild(divTagInput2)
    divIDInputs.appendChild(divInput2)
}