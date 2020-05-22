//Dependencies and console.table to display "store."

const inquirer = require("inquirer")
const mysql = require("mysql")
require("console.table")

//Creating connection to Mysql database.

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Bamazon'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  main();
});

//Main function to display all products on Bamazon.

const main = () => {
  loadProducts(connection)
}

//Function to load all products from database when node is run.

const loadProducts = connection => {
  connection.query("SELECT * FROM products", (err, res) => {
    if (err) throw err
    console.table(res)
    askCustomerForItem(res)
  })
}

  // List of all items with an inventory count lower than five.

const lowInventory = items => {
  inquirer.prompt([{
    type: "input",
    name: "id",
    message: "",
  }
  ]).then(val => {
    //Getting quantity from array.
    const userQuantity = val.quantity
    //Retrieving data from database by ID.
    connection.query("SELECT * FROM products WHERE item_id =" + val.id, (err, res) => {
      if (err) throw err
      //Grabbing stock quantity from array and multiplying by customer's desired quantity to get full price of
      //order.
      const stockQuantity = res[0].stock_quantity
      const priceOfCart = res[0].price * userQuantity
      console.log(stockQuantity)
      //Comparing what customer chose as quantity to stock quantity and determining whether customer can
      //purchase.
      if (userQuantity <= stockQuantity) {
        console.log("We have enough in stock!")
        const newQuantity = stockQuantity - userQuantity
        customerCheckoutCart(val.id, newQuantity, priceOfCart)
      }
      else {
        console.log("Insufficient quantity!")
        main()
      }
    })
  })
}

  // * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

  // * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.


