var mysql = require("mysql");
var inquirer = require("inquirer");
require ('dotenv').config()
var key = require("./keys.js");

var connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: process.env.password,
    database: "bamazon"
})

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
})

function start(){
    inquirer
        .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ]
        })
        .then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
            viewSale();
            break;
    
        case "View Low Inventory":
            viewInventory();
            break;
    
        case "Add to Inventory":
            addInventory();
            break;
    
        case "Add New Product":
            addProduct();
            break;
        }
        });
}

function viewSale(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        for (var i = 0; i < res.length; i++){
            console.log("ID: "+ res[i].item_id+ "\nProduct name: " + res[i].product_name + "\nDepartment name: " + res[i].department_name + "\nPrice: " + res[i].price + "\nStock quantity: " + res[i].stock_quantity + "\n----------------\n")
        };
    })
}

function viewInventory(){
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res){
        if (err) throw err;
        for (var i = 0; i < res.length; i++){
            console.log("ID: "+ res[i].item_id+ "\nProduct name: " + res[i].product_name + "\nDepartment name: " + res[i].department_name + "\nPrice: " + res[i].price + "\nStock quantity: " + res[i].stock_quantity + "\n----------------\n")
        };
    })
}

function addInventory (){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        var productname = [];
        for (var i = 0; i < res.length; i++){
            var name = res[i].product_name +"_"+ res[i].item_id;
            productname.push(name);
        };
        inquirer.prompt({
            name: "SelectedProduct",
            type: "list",
            message: "Selec the Item you would like to add Inventory",
            choices: productname    
            }).then(function(answer){
                var selected = answer.SelectedProduct;
                var newId = selected.split("_")[1];
                inquirer.prompt({
                    name: "newAmount",
                    type: "input",
                    message: "How many items you want to add"
                }).then(function(answer){
                    var newQuery = "SELECT stock_quantity from products WHERE item_id = ?"
                    connection.query(newQuery, newId, function(err, res){
                        var currentQuantity = res[0].stock_quantity;
                        var quantityToUpdate = parseInt(currentQuantity)  + parseInt(answer.newAmount);
                        console.log(quantityToUpdate);
                        connection.query(
                            "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
                            [quantityToUpdate, newId], 
                        )
                    })
                    
                })

            })
    })
}

function addProduct(){
    inquirer.prompt([
      {
        name: "product",
        type: "input",
        message: "What product name would you like to add?"
      },
      {
        name: "department",
        type: "input",
        message: "In which department would you like to add product?"
      },
      {
        name: "price",
        type: "input",
        message: "What is product price?" 
      },
      {
        name: "quantity",
        type: "input",
        message: "How many items you would like to add?" 
      }
    ]).then(function(answer){
        var price = parseFloat(answer.price);
        var quantity = parseInt(answer.quantity)
        var query = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)"
        connection.query(query, [answer.product, answer.department, price, quantity]);
    })
}