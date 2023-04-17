window.addEventListener("load", solve);

function solve() {
  let firstName = document.getElementById("first-name")
  let lastName = document.getElementById("last-name")
  let age = document.getElementById("age")
  let title = document.getElementById("story-title")
  let genre = document.getElementById("genre")
  let story = document.getElementById("story")

  let storiesObject = {}
  let mainDiv = document.getElementById("main")


  let previewUl = document.getElementById("preview-list")

  let publishBtn = document.getElementById("form-btn")
  publishBtn.addEventListener("click", publishHandler)

  function publishHandler(){
    let firstNameValue = firstName.value 
    let lastNameValue = lastName.value
    let ageValue = age.value
    let titleValue = title.value
    let genreValue = genre.value
    let storyValue = story.value
    
    if (firstNameValue === "" || lastNameValue === "" || ageValue === "" || titleValue === "" || storyValue === ""){
      return
    }

    let li = createElement("li", "", previewUl, titleValue, ["story-info"])
    let article = createElement("article", "", li)
    createElement("h4", `Name: ${firstNameValue} ${lastNameValue}`, article)
    createElement("p", `Age: ${ageValue}`, article)
    createElement("p", `Title: ${titleValue}`, article)
    createElement("p", `Genre: ${genreValue}`, article)
    createElement("p", storyValue, article)

    let saveBtn = createElement("button", "Save Story", li, "", ["save-btn"])
    let editBtn = createElement("button", "Edit Story", li, "", ["edit-btn"])
    let deleteBtn = createElement("button", "Delete", li, "", ["delete-btn"])

    saveBtn.addEventListener("click", saveHandler)
    editBtn.addEventListener("click", editHandler)
    deleteBtn.addEventListener("click", deleteHandler)

    storiesObject[titleValue] = {firstNameValue, lastNameValue, ageValue, genreValue, storyValue}

    document.querySelector("form").reset()
    publishBtn.disabled = true
  }

  function editHandler(event){
    let ul = event.currentTarget.parentNode
    let currentTitle = ul.id

    let storyInfo = storiesObject[currentTitle]

    firstName.value = storyInfo["firstNameValue"]
    lastName.value = storyInfo["lastNameValue"]
    age.value = storyInfo["ageValue"]
    title.value = currentTitle
    genre.value = storyInfo["genreValue"]
    story.value = storyInfo["storyValue"]

    publishBtn.disabled = false

    previewUl.innerHTML = ""
    createElement("h3", "Preview", previewUl)

  }

  function deleteHandler(event){
    let li = event.currentTarget.parentNode
    li.remove()
    publishBtn.disabled = false
  }

  function saveHandler(){
    mainDiv.innerHTML = ""
    createElement("h1", "Your scary story is saved!", mainDiv)
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

}
