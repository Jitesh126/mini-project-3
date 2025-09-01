const express=require("express");
const app=express();
const port=8080;
const path=require("path");
let { v4: uuidv4}=require("uuid");
const methodOverride = require("method-override");

app.listen(port,()=>{
    console.log("app is listening on port- 8080");
});

app.set("path engine","ejs");
app.set(path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,"public")));

app.use(methodOverride("_method"));

let Data = [
    {
        userPhoto:"https://png.pngtree.com/png-clipart/20190516/original/pngtree-users-vector-icon-png-image_3725294.jpg",
        name:"user",
        qualification:"BCA",
        skills:"Something Something Something Something Something Something Something Something Something Something Something Something Something ",
        about:"everything everything everything everything everything everything everything everything everything everything everything everything everything everything everything everything",
        // postArr:[{
        //     id:uuidv4(),
        //     postImage:"https://th.bing.com/th/id/OIP.XyHJR89mK-qPZhbFhDI7BwHaLL?w=126&h=190&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        //     postDesc:"Today is my birth-day. Today is my birth-day. Today is my birth-day."
        // }]
    },
    {
        userPhoto:"https://tse1.mm.bing.net/th/id/OIP.HYvKhuuayzoHsGAdaSE4XAAAAA?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
        name:"microsoft",
        qualification:"Business",
        skills:"Build an software microsoft for computers.",
        about:"Build an software microsoft for computers. Most of the peoples in the world uses microsoft. Powerful and easy to use",
        postArr:[{
            id:uuidv4(),
            postImage:"https://th.bing.com/th/id/OIP.FWCN1BPpH8t_2j5yBNZOagHaJU?w=156&h=198&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
            postDesc:"60th anniversary of microsoft",
        }]
    }
];

let userPostData=[
    {
        id:uuidv4(),
        postImage:"https://th.bing.com/th/id/OIP.XyHJR89mK-qPZhbFhDI7BwHaLL?w=126&h=190&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        postDesc:"Today is my birth-day. Today is my birth-day. Today is my birth-day."
    }
];

app.get("/search",(req,res)=>{
    let {name}=req.query;
    if(name=="user"){
        let data=Data.find((d)=>name===d.name);
        res.render("user.ejs",{data,userPostData});
    }else {
        app.get('*',(req,res)=>{
            res.send("Invalid search");
        });
    }
});

app.post("/linkedln",(req,res)=>{
    let {name}=req.body;
    if(name=="microsoft"){
        let data=Data.find((d)=>name===d.name);
        res.render("microsoft.ejs",{data});
    }else {
        app.get('*',(req,res)=>{
            res.send("Invalid search");
        });
    }
});

app.get("/newpost",(req,res)=>{
    res.render("newpost.ejs");
});

app.post("/newpost",(req,res)=>{
    let {name,postImage, postDesc} = req.body;
    // let data=Data.find((d)=>name===d.name);
    // let id=uuidv4();
    // data.postArr.push({id,postImage,postDesc});
    // res.redirect(`/search?name=${name}`);

    let id=uuidv4();
    userPostData.push({id,postImage,postDesc});
    res.redirect(`/search?name=${name}`);

});

app.get("/:name/editSkill",(req,res)=>{
    let {name} = req.params;
    let data=Data.find((d)=>name===d.name);
    res.render("editSkill.ejs",{data});
});

app.patch("/skills/:name",(req,res)=>{
    let {name}=req.params;
    let newContent=req.body.skill;
    let data=Data.find((d)=>name===d.name);
    data.skills=newContent;
    res.redirect(`/search?name=${name}`);
});

app.get("/:name/editAbout",(req,res)=>{
    let {name} = req.params;
    let data=Data.find((d)=>name===d.name);
    res.render("editAbout.ejs",{data});
});

app.patch("/about/:name",(req,res)=>{
    let {name}=req.params;
    let newContent=req.body.about;
    let data=Data.find((d)=>name===d.name);
    data.about=newContent;
    res.redirect(`/search?name=${name}`);
});

app.delete("/delete/:name/:id",(req,res)=>{
    // let {name,id}= req.params;
    // let data=Data.find((d)=>name===d.name);
    // let arr=data.postArr;
    // postArr=arr.filter((i)=>id!==i.id);
    // res.redirect(`/search?name=${name}`);

    let {name,id}=req.params;
    userPostData=userPostData.filter((p)=>id!==p.id);
    res.redirect(`/search?name=${name}`);
});


// comments has been done to change the code for app.delete