const express = require("express");
require("dotenv").config();
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})
app.post("/", function (req, res) {
    var firstname = req.body.fname;
    var lastname = req.body.lname;
    const emailA = req.body.email;
    const data = {
        members: [
            {
                email_address: emailA,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };
    const jdata = JSON.stringify(data);
    const url = "https://us5.api.mailchimp.com/3.0/lists/f754378f1e";
    const options = {
        method: "POST",
        auth:"mohit26:"+ process.env.MAILCHIMP_API
    };
    const request = https.request(url, options, function (response) {
        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });
    request.write(jdata);
    request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
});
app.listen(process.env.PORT||3000, function () {
    console.log("App is Running on 3000");
});
//api key
//8304af691631952bf65de885b162eccd-us5
// Id
// f754378f1e
//f754378f1e

//https://us6.api.mailchimp.com/3.0/lists/57afe96172