function piano(info){

    let n = info.shift()
    let piecesCollection = {}

    for (let index = 0; index < n; index++) {
        let [piece, composer, key] = info.shift().split("|")
        piecesCollection[piece] = {composer, key}
    }

    while (true){
        let command = info.shift().split("|")
        let commandType = command[0]        

        if (commandType === "Add"){
            let piece = command[1]
            let composer = command[2]
            let key = command[3]

            if (piecesCollection.hasOwnProperty(piece)){
                console.log(`${piece} is already in the collection!`)
            }
            else{
                piecesCollection[piece] = {composer, key}
                console.log(`${piece} by ${composer} in ${key} added to the collection!`)
            }
        }

        else if (commandType === "Remove"){
            let piece = command[1]
            if (piecesCollection.hasOwnProperty(piece)){
                delete piecesCollection[piece]
                console.log(`Successfully removed ${piece}!`)
            }
            else{
                console.log(`Invalid operation! ${piece} does not exist in the collection.`)
            }            
        }

        else if (commandType === "ChangeKey"){
            let piece = command[1]
            let newKey = command[2]
            if (piecesCollection.hasOwnProperty(piece)){
                piecesCollection[piece]["key"] = newKey
                console.log(`Changed the key of ${piece} to ${newKey}!`)
            }
            else{
                console.log(`Invalid operation! ${piece} does not exist in the collection.`)
            }            
        }

        else if (commandType === "Stop"){
            for (const key in piecesCollection) {
                console.log(`${key} -> Composer: ${piecesCollection[key]["composer"]}, Key: ${piecesCollection[key]["key"]}`)
            }
            break
        }
    }
}


piano([
    '3',
    'Fur Elise|Beethoven|A Minor',
    'Moonlight Sonata|Beethoven|C# Minor',
    'Clair de Lune|Debussy|C# Minor',
    'Add|Sonata No.2|Chopin|B Minor',
    'Add|Hungarian Rhapsody No.2|Liszt|C# Minor',
    'Add|Fur Elise|Beethoven|C# Minor',
    'Remove|Clair de Lune',
    'ChangeKey|Moonlight Sonata|C# Major',
    'Stop'  
  ]
  
  
  )