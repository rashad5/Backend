var cors = require('cors');
const express = require("express");
const mysql = require("mysql2");
const { resourceLimits } = ("worker_threads");


const app = express();
app.use(cors());
app.use(express.json());

  let connection = mysql.createConnection({
    host: "b4cm8t3vkrtn184xcyzf-mysql.services.clever-cloud.com",
    user: "u6wakl7b5op3f5yq",
    password: "q8leQu1uW4SacY9FucVL",
    database: "b4cm8t3vkrtn184xcyzf",
  });
  app.get("/users", function (req, res) {
   
  connection.query(
    "select * from users ",
    function (err, result, fields) {
      console.log(err);
      console.log(result);
      console.log(fields);
      res.send(result);});
    });

    app.get("/users/:id", (req, res) => {
      const elem = req.params;
      // sql id get method
      connection.query("select * from users", function (err, result, fields) {
        // console.log(result);
        for (let i = 0; i < result.length; i++) {
          if (elem.id == result[i].ID) {
            res.send(result[i]);
          }
        }
      });
    })

        // app.get("/users/:id", (req, res) => {
        //     const elem = req.params;
        //       for (let i = 0; i < result.length; i++) {
        //         if (elem.id == result[i].ID) {
        //           res.send(result[i]);
        //         }
        //       }
        //     });
      


app.delete("/users/:id", (req, res) => {
    const elem = req.params.id;

    connection.query(
      `DELETE FROM users WHERE ID=${elem}`,
      function (err, result, fields) 
      {
        console.log(result);
        // res.send(result);
     }
    );

  });

// post method
app.post("/users", (req, res) => {
  let obj = req.body;
  console.log(obj);
    connection.query(
      `INSERT INTO users (ID, Name, Surname, Password)
      VALUES ("${obj.cid}", "${obj.name}", "${obj.surname}", "${obj.password}")`,
      function (err, result, fields) {
          res.send(result);
      }
    );
  });
        

  app.listen( 3306 || 3000);