/**
 Write an utility that group all items by the property `type` and return the sum of each group by the `price` property. Only if the item has more than 3 cart `items` multiply the price with the `orderFactor`.

 Acceptance criteria
 - Have to work on latest version of Chrome and NodeJS.
 - Should not block the progress
 - Latest ecmascript specifications


Extra question (please write the answer)
- What do you have to do to make this utility running on IE 11
Answer:- for making the utility function run on IE11, we need to use Transpilers.
Most of the old browsers supports the old version of ES due to which in order to run latest ES syntax we need our code to compile back to the old javascript hence to run the code on iE 11 or prior we need Transpilers which can convert the latest ES code to old ( eg : babel)


 *
 *
 * @param cartItems [{
         type: String,
         title: String,
         description: String,
         firstname: String,
         lastname: String,
         price: Number | undefined,
         tax: Number | undefined,
         items: [
             {
                 picture: String,
                 price: Number,
                 tax: Number,
                 description: String,
             }
         ],
         orderFactor: Number | undefined
     }
     , ... ]
 *
 * @return
 * [{type: String, sum: Number}, ...] |
 * Promise<[{type: String, sum: Number}, ...]>
 */

cartItems(cart_items: <cartItems>)
{
    (async () => {
        try {
            let itemsTypes = await itemsCollarge(cart_items);
            let result = await itemcalculation(itemsTypes);
            res.json(result);

        }  catch (e) {
            console.error(e);
        }
    })();
}
/**
 * Looping the input Data
 * @param {*} data 
 */
function itemsCollarge(data) {
    let groups = {};
    let myArray = [];
    for (let i = 0; i < data.length; i++) {
        let groupName = data[i].type;
         if (!groups[groupName]) {
            groups[groupName] = [];
        }
        groups[groupName].push(data[i]);
    }
    return groups;

}
/**
 *  functio tofind the calucation result for data provided 
 * @param {*} data 
 */
async function itemcalculation (data) {
    let itemResult = [];
    let new_data = [];
    let final_array = [];
    for(let key in data) {
        let sum = 0;
        let itemType = key;
        for(let i = 0; i < data[key].length; i++) {
          sum =  data[key][i].price + sum;
          
        }
        if(data[key].length>3){
            sum = sum * data[key][0].orderFactor; 
        }
        itemResult.push({'ItemsSum':sum,'itemType':itemType});
        
    }
    return itemResult;
}
