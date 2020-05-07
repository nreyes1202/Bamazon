const inquirer = require("inquirer")
const mysql = require("mysql")
require("console.table")

const main = () => {
    // const database = connectToDB()
    // let inventory = loadProducts(database)
    // askCustomerForItem(inventory)
  loadProducts()
}

// const connectToDB = () => {
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
//       return connection
// }

//   function loadProducts(){

//   }
  const loadProducts = db => {
    connection.query("SELECT * FROM products", (err, res) => {
      if (err) throw err
      console.table(res)
      askCustomerForItem()
    })
  }

  const askCustomerForItem = items => {
    // The first should ask them the ID of the product they would like to buy.
    inquirer.prompt({
        //TO DO: Look up inquirer.promp documentation.
        //Validate: val => //logic to validate !isNaN
      type: "input",
      name: "id",
      message: "What item would you like to purchase?"

    }).then(val => {
        //TO DO: Check if value exists.
        // Check if there is more than 0 quantity.
        //TO DO: return the product for next function to use.
        console.log(val)
    }) 
  }

  const getCustomerQuantity = item => {
    // The second message should ask how many units of the product they would like to buy.
    //TO DO: write similar logic to inquirer.prompt but for quantity instead of item.
    //Return the item and quantity as a single array.
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
