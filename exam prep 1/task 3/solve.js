function attachEvents() {

    const BASE_URL = "http://localhost:3030/jsonstore/tasks/"

    let ul = document.getElementById("todo-list")

    let loadBtn = document.getElementById("load-button")
    loadBtn.addEventListener("click", loadHandler)

    let addBtn = document.getElementById("add-button")
    addBtn.addEventListener("click", addHandler)

    let newTitle = document.getElementById("title")


    function loadHandler(event){
        if (event){
            event.preventDefault()
        }
        ul.innerHTML = ""
        fetch(BASE_URL, {method: "GET"})
        .then((res) => res.json())
        .then((tasksObject) =>{
            for (const key in tasksObject) {
                let taskInfo = tasksObject[key]
                let taskName = taskInfo.name

                let li = createElement("li", "", ul)

                li.id = taskInfo._id
                createElement("span", taskName, li)

                let removeBtn = createElement("button", "Remove", li)
                removeBtn.addEventListener("click", removeHandler)

                let editBtn = createElement("button", "Edit", li)
                editBtn.addEventListener("click", editHandler)
            }
        }) 
    }

    function addHandler(event){
        if (event){
            event.preventDefault()
        }
        let httpHeaders = {
            method: "POST",
            body : JSON.stringify({name: newTitle.value})
        }
        fetch(BASE_URL, httpHeaders)
        .then(() => loadHandler())
        newTitle.value = ""
    }

    function removeHandler(event){
        let li = event.currentTarget.parentNode
        fetch(`${BASE_URL}${li.id}`, {method: "DELETE"})
        .then(() => loadHandler())
    }

    function editHandler(event){
        let li = event.currentTarget.parentNode
        let liChildren = Array.from(li.children)
        let name = liChildren[0].textContent

        li.innerHTML = ""
        createElement("input", name, li)
        let removeBtn = createElement("button", "Remove", li)
        removeBtn.addEventListener("click", removeHandler)

        let submitBtn = createElement("button", "Submit", li)
        submitBtn.addEventListener("click", submitHandler)    
    }
    
    function submitHandler(event){
        let li = event.currentTarget.parentNode
        let liChildren = Array.from(li.children)

        let newName = liChildren[0].value

        let httpHeaders = {
            method: "PATCH",
            body: JSON.stringify({name: newName})
        }

        fetch(`${BASE_URL}${li.id}`, httpHeaders)
        .then(() => loadHandler())
    }








  
}

attachEvents();





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