window.addEventListener('load', solve);

function solve() {

    let genreInput = document.getElementById("genre")
    let nameInput = document.getElementById("name")
    let authorInput = document.getElementById("author")
    let dateInput = document.getElementById("date")

    let allHitsContainer = document.getElementsByClassName("all-hits-container")[0]
    let savedHitsContainer = document.getElementsByClassName("saved-container")[0]

    console.log(savedHitsContainer)

    let likesCount = 0
    let likesParagraph = document.querySelector(".likes>p")


    let addBtn = document.getElementById("add-btn")
    addBtn.addEventListener("click", addHandler)

    function addHandler(event){
        event.preventDefault()
        if (genreInput.value === "" || nameInput.value === "" || authorInput.value === "" || dateInput.value === ""){
            return
        }

        let songDiv = createElement("div", "", allHitsContainer, "", ["hits-info"])
        createElement("img", "", songDiv, "", "", {src: "./static/img/img.png"})
        createElement("h2", `Genre: ${genreInput.value}`, songDiv)
        createElement("h2", `Name: ${nameInput.value}`, songDiv)
        createElement("h2", `Author: ${authorInput.value}`, songDiv)
        createElement("h3", `Date: ${dateInput.value}`, songDiv)

        let saveBtn = createElement("button", "Save song", songDiv, "", ["save-btn"])
        let likeBtn = createElement("button", "Like song", songDiv, "", ["like-btn"])
        let deleteBtn = createElement("button", "Delete", songDiv, "", ["delete-btn"])
        likeBtn.addEventListener("click", likeHandler)
        saveBtn.addEventListener("click", saveHandler)
        deleteBtn.addEventListener("click", deleteHandler)
    }

    function likeHandler(event){
        let likeBtn = event.currentTarget
        likeBtn.disabled = true
        likesCount += 1
        likesParagraph.textContent = `Total Likes: ${likesCount}`
    }

    function saveHandler(event){
        let songDiv = event.currentTarget.parentNode
        let songDivChildren = Array.from(songDiv.children)

        let saveBtn = songDivChildren[5]
        let likeBtn = songDivChildren[6]
        saveBtn.remove()
        likeBtn.remove()

        savedHitsContainer.appendChild(songDiv)
    }

    function deleteHandler(event){
        let songDiv = event.currentTarget.parentNode
        songDiv.remove()
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
