
// let checkLetters = (str, term) => {
//     let chance = true
//     let secondChance = true
//     let thirdchance = true
//     for (let i = 0; i < term.length; i++) {
//         const element = term[i];
//         if (str.includes(element)) {
            
//         } else {
//             if (!chance) {
//              if (!secondChance) {
//                  if (thirdchance) {
                     
//                  }
//                  thirdchance = false
//             }
//             secondChance = false
//             }
//                 chance = false
//         }
//     }
//             return thirdchance
// }

let sort = (arr, midindex) => {
    let searchterm = ''
    let j =  midindex.length + 1
    let presorted = Array.from({length: j}, () => [])
             for (const iterator of midindex) {
               searchterm += iterator
                for(let i = 0; i < arr.length; i++) {
                          if(!arr[i].index){
                            arr[i].index = 0
                        }
                        let subname = arr[i].name.substring(0, searchterm.length)
                        if(subname !== searchterm){
                              arr[i].index++
                          }
                    if(searchterm === midindex) {
                       presorted[arr[i].index].push(arr[i])
                       arr[i].index = 0
                    }
                }
            }
        arr = [].concat(...presorted)
 return arr
}

export const search = (products, term) => {
  if (term === '') {
      return products
  }
let p = sort(products, term)

  return p

}