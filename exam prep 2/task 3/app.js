const BASE_URL = "http://localhost:3030/jsonstore/grocery/"

let nameInput = document.getElementById("product")
let countInput = document.getElementById("count")
let priceInput = document.getElementById("price")

let tableBody = document.getElementById("tbody")

let loadProductsBtn = document.getElementById("load-product")
loadProductsBtn.addEventListener("click", loadHandler)

let addProductsBtn = document.getElementById("add-product")
addProductsBtn.addEventListener("click", addHandler)

let bigUpdateBtn = document.getElementById("update-product")
bigUpdateBtn.addEventListener("click", updateHandler)

let trId = null

function loadHandler(event){

    if (event){
        event.preventDefault()
    }

    tableBody.innerHTML = ""

    fetch(BASE_URL, {method: "GET"})
    .then((res) => res.json())
    .then((data) => {

        for (const key in data) {
            let currentInfo = data[key]
            let name = currentInfo.product
            let count = currentInfo.count
            let price = currentInfo.price
            let _id = currentInfo._id
            let tr = createElement("tr", "", tableBody)
            tr.id = _id

            createElement("td", name, tr, "", ["name"])
            createElement("td", count, tr, "", ["count-product"])
            createElement("td", price, tr, "", ["product-price"])
            let btnTd = createElement("td", "", tr, "", ["btn"])

            let updateBtn = createElement("button", "Update", btnTd, "", ["update"])
            let deleteBtn = createElement("button", "Delete", btnTd, "", ["delete"])

            updateBtn.addEventListener("click", loadUpdateDisplayHandler)
            deleteBtn.addEventListener("click", deleteHandler)
        }
    })
}

function addHandler(event){
    event.preventDefault()
    let httpHeaders = {
        method: "POST",
        body: JSON.stringify({product: nameInput.value, count: countInput.value, price: priceInput.value})
    }
    fetch(BASE_URL, httpHeaders)
    .then(() => {
        loadHandler()
        nameInput.value = ""
        countInput.value = ""
        priceInput.value = ""
    })

}

function deleteHandler(event){
    let tr = event.currentTarget.parentElement.parentElement
    fetch(`${BASE_URL}${tr.id}`, {method: "DELETE"})
    .then(() => loadHandler())
}

function loadUpdateDisplayHandler(event){
    let tr = event.currentTarget.parentElement.parentElement

    trId = tr.id

    let trChildren = Array.from(tr.children)
    nameInput.value = trChildren[0].textContent
    countInput.value = trChildren[1].textContent
    priceInput.value = trChildren[2].textContent
    addProductsBtn.disabled = true
    bigUpdateBtn.disabled = false
}

function updateHandler(){

    let httpHeaders = {
        method: "PATCH", 
        body: JSON.stringify({product: nameInput.value, count: countInput.value, price: priceInput.value})
    }

    fetch(`${BASE_URL}${trId}`, httpHeaders)
    .then(() =>{
        loadHandler()
        addProductsBtn.disabled = false
        bigUpdateBtn.disabled = true
        nameInput.value = ""
        countInput.value = ""
        priceInput.value = ""

    })
}

function createElement(type, content, parent, id, classes, attributes){
    let element = document.createElement(type)
    if (content && type !== "input"){
      element.textContent = content
    }
    if (content && type === "input"){
      element.value = content
    }
    if (parent){
      parent.appendChild(element)
    }
    if (id){
      element.id = id
    }
    if (classes){
      element.classList.add(...classes)
    }
    if (attributes){
      for (const key in attributes) {
        element.setAttribute(key, attributes[key])
      }
    }
    return element
}
