const inquirer = require("inquirer")
const mysql = require("mysql")
require("console.table")

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Bamazon'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  main()

});

const main = () => {
  loadProducts()
}

const loadProducts = db => {
  connection.query("SELECT * FROM products", (err, res) => {
    if (err) throw err
    console.table(res)
    askCustomerForItem()
  })
}

const askCustomerForItem = items => {
  // The first should ask them the ID of the product they would like to buy.
  // The second message should ask how many units of the product they would like to buy.
  inquirer.prompt([{
    //Validate: val => //logic to validate !isNaN
    type: "input",
    name: "id",
    message: "What item would you like to purchase?",
    validate: function (value) {
      if (!isNaN(value)) {
        return true
      }
      return "Sorry! Not valid!"
    }
  },
  {
    type: "input",
    name: "quantity",
    message: "How many would you like to purchase?",
  }
  ]).then(val => {
    //TO DO: return the product for next function to use.
    const userQuantity = val.quantity
    //retrieving data from database by id
    connection.query("SELECT * FROM products WHERE item_id =" + val.id, (err, res) => {
      if (err) throw err
      // console.table(res)
      // TO DO: check to see if there is enough in stock from res
      const stockQuantity = res[0].stock_quantity
      console.log(res)
      console.log(stockQuantity)
      if (userQuantity <= stockQuantity) {
        console.log("We have enough in stock!")
      }
      else {
        console.log("Insufficient quantity!")
        main()
      }
    })
  })
  // end of function
}


const isItemAvailable = (itemCustomerChose, inventory) => {
  // Once the customer has placed the order, 
  // your application should check if your store has enough of the product to meet the customer's request.
  // If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.
  //TO DO: return true or false.
}

const customerCheckoutCart = (itemCustomerWillBuy, quantity) => {
  //     However, if your store _does_ have enough of the product, you should fulfill the customer's order.
  //    * This means updating the SQL database to reflect the remaining quantity.
  //    * Once the update goes through, show the customer the total cost of their purchase.
  //
}

const leaveStore = () => {

}

  //Manager folder -> add items to inventory
