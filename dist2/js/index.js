
const openModalBtns = document.querySelectorAll("[data-modal-target]")
const closeModalBtns = document.querySelectorAll("[data-close-button]")
const overlay = document.getElementById("overlay")
const formsIdsArray =["client-form","staff-form","email-form","sms-form","property-form"]

openModalBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const modal = document.querySelector(btn.dataset.modalTarget)
        openModal(modal)
    })
})
closeModalBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const modal = btn.closest(".mordal")
        closeModal(modal)
    })
})
overlay.addEventListener("click", () => {
    const openModals = document.querySelectorAll(".mordal.active")
    openModalBtns.forEach(mordal => {
        closeModal(mordal)
    })
})
function openModal(modal){
    modal.classList.remove("d-none")
    modal.classList.add("active")
    overlay.classList.remove("d-none")

    switch(modal.id)
    {
        case formsIdsArray[0]:
            apiPost(modal.id, "https://baseUrl/clients")
            break
        case formsIdsArray[1]:
            apiPost(modal.id, "https://baseUrl/staff")
            break
        case formsIdsArray[2]:
            apiPost(modal.id, "https://baseUrl/email")
            break
        case formsIdsArray[3]:
            apiPost(modal.id, "https://baseUrl/sms")
            break
        case formsIdsArray[4]:
            apiPost(modal.id, "https://baseUrl/property")
            break
    }
}
function closeModal(modal){
    modal.classList.add("d-none")
    modal.classList.remove("active")
    overlay.classList.add("d-none")
}
function prodNamesDrop(){
    const baseElem = document.querySelector(".drop-down-toggle")
    baseElem.children[0].addEventListener("click", () => {
        baseElem.children[1].classList.toggle("d-none")
    })
}

const properties = {
    properties: [
        {
            id: 1,
            name: "Havilla Plus Estate",
            value: 10000000
        },
        {
            id: 2,
            name: "Urban Oasis Realty",
            value: 12400000
        },
        {
            id: 3,
            name: "Haven Homes",
            value: 20000000
        }
    ],
    displayProps: function(){
        const tableArea = document.querySelector(".prop-table-content-area")
        for (let property of this.properties)
        {
            var tr = document.createElement("tr")
            var th = document.createElement("th")
            th.setAttribute("scope", "row")
            th.setAttribute("class", "col-2")
            th.innerText = property.id
            var td1 = document.createElement("td")
            td1.setAttribute("class", "col-6")
            td1.innerText = property.name
            td1.addEventListener("click", () => {
                loadPropClients(property)
            })
            var td2 = document.createElement("td")
            td2.setAttribute("class", "col-5")
            td2.innerText = property.value
            tr.appendChild(th)
            tr.appendChild(td1)
            tr.appendChild(td2)
            tableArea.appendChild(tr)
        }
    }
}

async function loadPropClients(currentProperty){
    document.querySelector(".prop-name-area").innerText = currentProperty.name
    const clientsArray = [
        {
            id: 1,
            name: "Niesta Charlotte",
            email: "niestacharlotte@gmail.com",
            phone: "+254798765432"
        },
        {
            id: 2,
            name: "Panthera Nestah",
            email: "pantheranestah@gmail.com",
            phone: "+254798765432"
        }
    ]
    const prodClients = {
        prodClients: clientsArray,
        loadClientsTable: function() {
            const tableArea = document.querySelector(".client-table-content-area")
            tableArea.innerHTML = ""
            for (let client of this.prodClients)
            {
                var tr = document.createElement("tr")
                var th = document.createElement("th")
                th.setAttribute("scope", "row")
                th.setAttribute("class", "col-1")
                th.innerText = client.id
                var td1 = document.createElement("td")
                td1.setAttribute("class", "col-4")
                td1.innerText = client.name
                var td2 = document.createElement("td")
                td2.setAttribute("class", "col-3")
                td2.innerText = client.email
                var td3 = document.createElement("td")
                td3.setAttribute("class", "col-3")
                td3.innerText = client.phone
                tr.appendChild(th)
                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                tableArea.appendChild(tr)
            }
        }
    }
    prodClients.loadClientsTable()
}

function defaultProdClients()
{
    var property = properties.properties[0]
    const prodClients = [
        {
            id: 1,
            name: "Mosh Hermedani",
            email: "moshhermedani@gmail.com",
            phone: "+254798765432"
        },
        {
            id: 2,
            name: "Dave Gray",
            email: "davegray@gmail.com",
            phone: "+254798765432"
        }
    ]
    const tableArea = document.querySelector(".client-table-content-area")
    document.querySelector(".prop-name-area").innerText = property.name
    tableArea.innerHTML = ""
    for (let client of prodClients)
    {
        var tr = document.createElement("tr")
        var th = document.createElement("th")
        th.setAttribute("scope", "row")
        th.setAttribute("class", "col-1")
        th.innerText = client.id
        var td1 = document.createElement("td")
        td1.setAttribute("class", "col-4")
        td1.innerText = client.name
        var td2 = document.createElement("td")
        td2.setAttribute("class", "col-3")
        td2.innerText = client.email
        var td3 = document.createElement("td")
        td3.setAttribute("class", "col-3")
        td3.innerText = client.phone
        tr.appendChild(th)
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tableArea.appendChild(tr)
    }
}


async function apiGet(url)
{
    const respPromise = await fetch(url,
        {
            method: "GET"
        }
    )
    const resp = await respPromise.json()
    const dataArray = resp.data.data

    return(dataArray)
}

async function apiPost(modalId, url)
{
    var dataBody = {}
    dataBody = await handleFormSubmition(modalId)
    /*const respPromise = await fetch(url,
        {
            method: "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(dataBody)
        }
    )
    const resp = await respPromise.json()
    const respStatusCode = resp.data.respStatusCode*/
    console.log("POSTing data to: " + url)
    console.log(dataBody)

    /*return(respStatusCode)*/
}

async function handleFormSubmition(modalId)
{
    const baseContainer = document.getElementById(modalId)
    var dataExtract = {}
    baseContainer.querySelector("form").addEventListener("submit", (form) => {
        form.preventDefault()
        const formData = new FormData(form.target)
        formData.forEach((value, key) => {
            dataExtract[key] = value
        })
    })
    return(dataExtract)
}

prodNamesDrop()
properties.displayProps()
defaultProdClients()
