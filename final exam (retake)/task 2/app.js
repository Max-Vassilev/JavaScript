window.addEventListener("load", solve);

function solve() {

  let tasks = {}

  let reviewList = document.getElementById("review-list")
  let publishedList = document.getElementById("published-list")

  let publishBtn = document.getElementById("publish-btn")
  publishBtn.addEventListener("click", publishHandler)
  
  let theForm = document.getElementsByClassName("newPostContent")[0]

  let titleInput = document.getElementById("task-title")
  let categoryInput = document.getElementById("task-category")
  let contentInput = document.getElementById("task-content")

  function publishHandler(){
      
      let titleValue = titleInput.value
      let categoryValue = categoryInput.value
      let contentValue = contentInput.value

      if (titleValue === "" || categoryValue === "" || contentValue === ""){
          return
      }

      tasks[titleValue] = [categoryValue, contentValue]

      let li = createElement("li", "", reviewList, "", ["rpost"])
      let article = createElement("article", "", li)
      createElement("h4", titleValue, article)
      createElement("p", `Category: ${categoryValue}`, article)
      createElement("p", `Content: ${contentValue}`, article)

      let editBtn = createElement("button", "Edit", article, "", ["action-btn", "edit"])
      let postBtn = createElement("button", "Post", article, "", ["action-btn", "post"])

      editBtn.addEventListener("click", editHandler)
      postBtn.addEventListener("click", postHandler)

      article.id = titleValue
      theForm.reset()
  }
  
  function editHandler(event){
      let article = event.currentTarget.parentNode

      let currentInfo = tasks[article.id]

      titleInput.value = article.id
      categoryInput.value = currentInfo[0]
      contentInput.value = currentInfo[1]

      reviewList.innerHTML = ""
  }

  function postHandler(event){

    reviewList.innerHTML = ""
    let article = event.currentTarget.parentNode

    console.log(article)

    let editBtn = Array.from(article.children)[3]
    let postBtn = Array.from(article.children)[4]

    editBtn.remove()
    postBtn.remove()     

      // article.removeAttribute("id")


      publishedList.appendChild(article.parentNode)

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