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
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        for (var i = 0; i < res.length; i++){
            console.log("ID: "+ res[i].item_id+ "\nProduct name: " + res[i].product_name + "\nDepartment name: " + res[i].department_name + "\nPrice: " + res[i].price + "\nStock quantity: " + res[i].stock_quantity + "\n----------------\n")
        };
        search()
    })
}
function search(){
    inquirer.prompt([
        {
        name: "productID",
        type: "input",
        message: "What ID number would you like to search for?"
      },
      {
        name: "units",
        type: "input",
        message: "How many units of the product you would like to buy?"    
        }
    ]).then(function(answer){
            var query = "SELECT stock_quantity from products WHERE ?";
            connection.query(query, {item_id: answer.productID}, function(err, res){
                console.log ("The stock quantity of selected item is: " + res[0].stock_quantity + "\nAnd you want: " + answer.units);
                if (res[0].stock_quantity < answer.units){
                    console.log("Insufficient quantity!")
                }
                else{
                    var quantityUpdate =res[0].stock_quantity - answer.units;
                    var requestObject = {
                        quantity: quantityUpdate,
                        id:answer.productID
                    }
                    fullfilment(requestObject, function(update){
                        console.log ("Update quantity: " + update)
                    })
                }
                
            
            })
        })
}

function fullfilment(request, cb){
    connection.query(
        "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
        [request.quantity, request.id], function(err, res){
          cb(request.quantity)
        }
    )
}