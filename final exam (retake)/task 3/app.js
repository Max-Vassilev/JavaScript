const BASE_URL = "http://localhost:3030/jsonstore/tasks/"

let loadBtn = document.getElementById("load-course")
loadBtn.addEventListener("click", loadHandler)

let addBtn = document.getElementById("add-course")
addBtn.addEventListener("click", addHandler)

let bigEditBtn = document.getElementById("edit-course")
bigEditBtn.addEventListener("click", editHandler)

let theForm = Array.from(document.getElementsByTagName("form"))[0]

let divContainer = document.getElementById("list")


let titleInput = document.getElementById("course-name")
let typeInput = document.getElementById("course-type")
let descriptionInput = document.getElementById("description")
let teacherInput = document.getElementById("teacher-name")

let lastId = null

function loadHandler(event){

    divContainer.innerHTML = ""

    fetch(BASE_URL, {method: "GET"})
    .then((res) => res.json())
    .then((data) => {
        
        for (const key in data) {
            let currentInfo = data[key]

            let title = currentInfo["title"]
            let type = currentInfo["type"]
            let description = currentInfo["description"]
            let teacher = currentInfo["teacher"]
            let _id = currentInfo["_id"]

            let div = createElement("div", "", divContainer, "", ["container"])

            div.id = _id

            createElement("h2", title, div)
            createElement("h3", teacher, div)
            createElement("h3", type, div)
            createElement("h4", description, div)

            let editBtn = createElement("button", "Edit Course", div, "", ["edit-btn"])
            let finishBtn = createElement("button", "Finish Course", div, "", ["finish-btn"])

            editBtn.addEventListener("click", editInputHandler)

            finishBtn.addEventListener("click", finishHandler)
        }
    })
}

function addHandler(event){
    if (event){
        event.preventDefault()
    }

    let titleValue = titleInput.value
    let typeValue = typeInput.value
    let descriptionValue = descriptionInput.value
    let teacherValue = teacherInput.value

    let httpHeaders = {
        method: "POST", 
        body: JSON.stringify({
            title: titleValue,
            type: typeValue, 
            description: descriptionValue,
            teacher: teacherValue
        })
    }
    fetch(BASE_URL, httpHeaders)
    .then(() => {
        loadHandler()
        theForm.reset()
    })
}

function editInputHandler(event){


    addBtn.disabled = true
    bigEditBtn.disabled = false


    let div = event.currentTarget.parentNode

    let [title, teacher, type, description] = Array.from(div.children)

    titleInput.value = title.textContent
    teacherInput.value = teacher.textContent
    typeInput.value = type.textContent
    descriptionInput.value = description.textContent

    lastId = div.id

}

function editHandler(event){
    if (event){
        event.preventDefault()
    }


    let httpHeaders = {
        method: "PUT",
        body: JSON.stringify({
            title: titleInput.value,
            type: typeInput.value,
            description: descriptionInput.value,
            teacher: teacherInput.value,

        })
    }

    fetch(`${BASE_URL}${lastId}`, httpHeaders)
    .then(() => {
        loadHandler()
        addBtn.disabled = false
        bigEditBtn.disabled = true
    })


}

function finishHandler(event){
    let div = event.currentTarget.parentNode

    fetch(`${BASE_URL}${div.id}`, {method: "DELETE"})
    .then(() => loadHandler())

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
