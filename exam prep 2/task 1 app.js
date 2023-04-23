function shopping(shoppingInfo){
    let basket = shoppingInfo.shift().split("!")

   for (let index = 0; index < shoppingInfo.length; index++) {
    let command = shoppingInfo[index].split(" ")
    let commandType = command[0]
    if (commandType === "Urgent"){
        let item = command[1]
        if (!basket.includes(item)){
            basket.unshift(item)
        }
    }

    else if (commandType === "Unnecessary"){
        let item = command[1]
        if (basket.includes(item)){
            let indexOfItem = basket.indexOf(item)
            basket.splice(indexOfItem, 1)
        } 
    }

    else if (commandType === "Correct"){
        let oldItem = command[1]
        let newItem = command[2]
        if (basket.includes(oldItem)){
            let indexOfItem = basket.indexOf(oldItem)
            basket[indexOfItem] = newItem
        } 
    }

    else if (commandType === "Rearrange"){
        let item = command[1]
        if (basket.includes(item)){
            let indexOfItem = basket.indexOf(item)
            basket.splice(indexOfItem, 1)
            basket.push(item)
        }
    }

    else{
        console.log(basket.join(", "))
        break
    }
   }
    
}


shopping(
    (["Milk!Pepper!Grapes!Salt!Water!Banana!",

    "Rearrange Grapes",

    "Go Shopping!"])
    

)