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
 import _ from 'lodash';
cartItems(products: <cartItems>)
{
    (async () => {
        try {
            let responseFromGroup = await groupBy(products, 'type', 'type', 'product');
            let resultAFterCalculation = await CalculateProductsPriceByType(responseFromGroup);
            res.json(resultAFterCalculation);

        } catch (e) {
            console.error(e);
        }
    })();
}

/**
 * aync function to perform data calculation
 * @param data
 * @returns {Promise<Array>}
 * @constructor
 */
async function CalculateProductsPriceByType (data) {
    let responseAfterCalculation = [];
    for(let i in data) {
        if (data.hasOwnProperty(i)) {
            let sumOfPriceType = await priceCalculate(data[i]['product']);
            let type = data[i]['type'];
            responseAfterCalculation.push({'sum':sumOfPriceType,'type':type});
        }
    }
    return responseAfterCalculation;
}
/*
 * orderfactor and price calculation check on item length
 * @input item array
 * @return calculated price with orderfactor
 */

function priceCalculation(items) {
    let totalAmount = 0;
    for(let key in items) {
        let sum;
        console.log('here',items[key].items.length);
        if (items[key].items.length > 3) {
            sum =  items[key].price *  items[key].orderFactor;
        } else {
            sum = items[key].price;
        }
        totalAmount = totalAmount + sum;
    }
    return totalAmount;
}

/**
 * groupBy data with specified key
 * @input product array
 * @return product array with grouped data
 * @param dataToGroupOn
 * @param fieldNameToGroupOn
 * @param fieldNameForGroupName
 * @param fieldNameForChildren
 * @returns {*}
 */
function groupBy(dataToGroupOn, fieldNameToGroupOn, fieldNameForGroupName, fieldNameForChildren) {

    let group_result = _.chain(dataToGroupOn.products)
        .groupBy(fieldNameToGroupOn)
        .toPairs()
        .map(function (currentItem) {
            return _.zipObject([fieldNameToGroupOn, fieldNameForChildren], currentItem,);
        })
        .value();
    return group_result;
}
