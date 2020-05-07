//Requiring inquirer, Mysql and console.table to display "store."

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
  main()

});

//Main function to display all products on Bamazon.

const main = () => {
  loadProducts()
}

//Creating this function to load all products from database when node is run.

const loadProducts = db => {
  connection.query("SELECT * FROM products", (err, res) => {
    if (err) throw err
    console.table(res)
    askCustomerForItem()
  })
}

//Function to ask customer for the ID of the product as well as the quantity
//that they'd like to buy.
//Function also validates whether or not customer input is a valid ID.

const askCustomerForItem = items => {
  inquirer.prompt([{
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

//Updating the SQL database to reflect the remaining quantity and showing customer the total cost of 
//their purchase.

const customerCheckoutCart = (id, quantity, price) => {

  console.log(id, quantity, price)
  connection.query("UPDATE products SET ? WHERE ?", [
    { stock_quantity: quantity },
    { item_id: id }
  ],
    function (error) {
      if (error) throw err;
      console.log("Order placed successfully!");
      console.log("The total price is $" + price)
      


      main(); //instead of callng main, do another inquirer and ask "would you like to purchase anoter item"
      //if they want to leave, then execute leavestore
      //
    }
  )
}

const leaveStore = () => {
  // look up connection.end
}
