function horseRace(info){

    let horses = info.shift().split("|")

    while (true){
        let command = info.shift().split(" ")

        let commandType = command[0]

        if (commandType === "Retake"){
            let overtakingHorse = command[1]
            let overtakenHorse = command[2]

            let overtakingHorseIndex = horses.indexOf(overtakingHorse)
            let overtakenHorseIndex = horses.indexOf(overtakenHorse)

            if (overtakingHorseIndex < overtakenHorseIndex){
                horses[overtakingHorseIndex] = overtakenHorse
                horses[overtakenHorseIndex] = overtakingHorse
                console.log(`${overtakingHorse} retakes ${overtakenHorse}.`)

            }
            
        }

        else if (commandType === "Trouble"){
            let horseName = command[1]

            let horsePos = horses.indexOf(horseName)
            
            if (horsePos !== 0){
                let previousPos = horsePos - 1
                previousHorseName = horses[previousPos]

                horses[previousPos] = horseName
                horses[horsePos] = previousHorseName

                console.log(`Trouble for ${horseName} - drops one position.`)
            }
        }


        else if (commandType === "Rage"){
            let horseName = command[1]

            let horsePos = horses.indexOf(horseName)

            let availablePositions = (horses.length - 1) - horsePos

            if (availablePositions === 2){
                horses.splice(horsePos, 1)
                horses.splice(horsePos + 2, 0, horseName)
                // Might explode
            }
            else if (availablePositions === 1){
                let nextPos = horsePos + 1
                let nextHorse = horses[nextPos]

                horses[nextPos] = horseName
                horses[horsePos] = nextHorse               
            }
            console.log(`${horseName} rages 2 positions ahead.`)
        }
        
        else if (commandType === "Miracle"){
            let lastHorse = horses[0]
            horses.shift()
            horses.push(lastHorse)

            console.log(`What a miracle - ${lastHorse} becomes first.`)
        }        

        else if (commandType === "Finish"){
            console.log(horses.join("->"))
            console.log(`The winner is: ${horses[horses.length - 1]}`)
            break
        }

    }

}






horseRace(['Fancy|Lilly',
'Retake Lilly Fancy',
'Trouble Lilly',
'Trouble Lilly',
'Finish',
'Rage Lilly'])




