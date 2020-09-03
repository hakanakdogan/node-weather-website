const path = require("path");
const express = require("express");

const hbs = require("hbs");



const app = express();

const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");


// Express ayarları için yolları tanımlama
const publicDirectoryPath = path.join(__dirname , "../public");
const viewsPath = path.join(__dirname , "../templates/views");
const partialsPath = path.join(__dirname , "../templates/partials");
// Handlebars engine ve views in yerini ayarlama
app.set("view engine" ,"hbs");
app.set("views" , viewsPath);
hbs.registerPartials(partialsPath);


// static directory ayarlama
app.use(express.static(publicDirectoryPath));


app.get("" , (req , res)=>{
    res.render("index" , {
        title:"Weather",
        name:"Hakan Akdogan"
    });
});
app.get("/about" , (req , res)=>{
    res.render("about" , {
        title:"About Me",
        name:"Hakan Akdogan"
    });
});

app.get("/help" , (req , res)=>{
    res.render("help" , {
        helpText:"This is some helpful text",
        title:"Help",
        name:"Hakan Akdoğan"
        
    });

});

// app.get("" , (req , res)=>{
//     res.send("<h1>Hello Express!</h1>");
    
// }); //Bunu sildik çünkü artık html sayfamızdan alıyoruz.

// app.get("/help" , (req , res)=>{
//     res.send([{
//         name:"Hakan",
//         age:20
//     },
//     {
//         name:"Emiliano",
//         age:20

//     }]);

// });

// app.get("/about" , (req , res)=>{
//     res.send("<h1>Title</h1>");

// });

app.get("/weather" , (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please provide an address"
        });
    }
    geocode(req.query.address, (error , {latitude , longitude , text}={})=>{
        if(error !== undefined){

            return res.send({
                error
            })


        }else{
            forecast(latitude , longitude , (error , response)=>{
                if(error !== undefined){
                    return res.send({
                        error
                    });

                    
                }else{
                    res.send({
                        location:text,
                        forecast:`${response}`,
                        address:req.query.address
                    });
                }
            });

        }
    });

  

    
    
});

app.get("/products" , (req , res)=>{
    if(!req.query.search){
       return res.send({
            error:"You must provide a search term"
        });
    }
    console.log(req.query);
    res.send({
        products:[]
    })
});

app.get("/help/*" , (req , res)=>{
    res.render("404" ,{
        title:"404",
        error:"Help Article Not Found",
        name:"Hakan Akdoğan"
        
    });
});

app.get("*" , (req , res)=>{
    res.render("404" , {
        error:"Page Not Found",
        name:"Hakan Akdoğan",
        title:"404"
    });
});
app.listen(3000, ()=>{
    console.log("Server is up on port 3000.");
});