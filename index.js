

// import express from 'express';
// import multer from 'multer';
// import cors from 'cors';
// import path from 'path';
// import mongoose from 'mongoose';
// import { log } from 'console';
// import jwt from 'jsonwebtoken';
// import { fileURLToPath } from 'url';




// const app = express();
// app.use(express.json());

// // cors added
// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Author    ization']
// }));




// const port = 4000;

// mongoose.connect("mongodb+srv://revathimohancse:fUDJolxXF7wy88HL@cluster0.tw8qyki.mongodb.net/");

// app.get('/', (req, res) => {
//     res.status(200).send('API is working');
// });

// // Get the current directory
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// //image storage
// const storage = multer.diskStorage({
//     // destination: './upload/images',
//     destination: path.join(__dirname, 'upload/images'),

//     filename: (req, file, cb) => {
//    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//     }
// });

// const upload = multer({ storage: storage });

// // app.use('/images', express.static('upload/images'));
// app.use('/images', express.static(path.join(__dirname, 'upload/images')));


// app.post("/upload", upload.single('product'), (req, res) => {
//     res.json({
//         success: 1,
//         // image_url: `https://localhost:${port}/images/${req.file.filename}`
//                 image_url: `https://itemcatalogpjtbe.onrender.com/images/${req.file.filename}`

        
//     });
// });

// const Product = mongoose.model("Product", {
//     id: {
//         type: Number,
//         required: true,
//     },
//     name: {
//         type: String,
//         required: true,
//     },
//     image: {
//         type: String,
//         required: true,
//     },
//     category: {
//         type: String,
//         required: true,
//     },
//     new_price: {
//         type: Number,
//         required: true,
//     },
//     old_price: {
//         type: Number,
//         required: true,
//     },
//     date: {
//         type: Date,
//         default: Date.now,
//     },
//     available: {
//         type: Boolean,
//         default: true,
//     },
// });

// app.post('/addproduct', async (req, res) => {
//     try {
//         let products = await Product.find({});
//         let id;
//         if(products.length>0){
//             let last_product_array = products.slice(-1)
//             let last_product = last_product_array[0];
//             id=last_product.id+1;
//         }
//         else{
//             id=1;
//         }
//         const newProduct = new Product({
//             id: id,
//             name: req.body.name,
//             image: req.body.image,
//             category: req.body.category,
//             new_price: req.body.new_price,
//             old_price: req.body.old_price,
//         });

//         await newProduct.save();
//         console.log("Product saved:", newProduct);
        
//         res.json({
//             success: true,
//             name: req.body.name,
//         });
//     } catch (error) {
//         console.error("Error saving product:", error);
//         res.status(500).json({ success: false, error: "Failed to save product" });
//     }
// });

// //API for deleting products

// app.post('/removeproduct', async (req, res) => {
//     try {
//         const deletedProduct = await Product.findOneAndDelete({ id: req.body.id });
//         if (!deletedProduct) {
//             return res.status(404).json({ success: false, error: "Product not found" });
//         }
//         console.log("Product removed:", deletedProduct);
//         res.json({
//             success: true,
//             name: deletedProduct.name
//         });
//     } catch (error) {
//         console.error("Error removing product:", error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// });


// // creating API for getting all products

// app.get('/allproducts',async(req,res)=>{
//     let products = await Product.find({});
//     console.log("All products fetched");
//     res.send(products);
// })

// const Users = mongoose.model('Users',{


// name:{
//     type:String,
// },
// email:{
//     type:String,
//     unique:true,
// },
// password:{
//     type:String,

// },
// cartData:{
//     type:Object,
// },
// date:{
//     type:Date,
//     default:Date.now,
// }
// })

// //creating endpoint for registering the user


// app.post('/signup',async (req,res)=>{
//     let check =await Users.findOne({email:req.body.email})
//     if(check){
//         return res.status(400).json({success:false,errors:"existing user found with same email address"})
//     }
//     let cart ={};
//     for (let i =0; i<300; i++){
// cart[i] =0;
//     }
//     const user =new Users({
//         name:req.body.username,
//         email :req.body.email,
//         password:req.body.password,
//         cartData:cart,
//     })
//     await user.save();
//     const data = {
//         user:{
//             id:user.id
//         }
//     }
//     const token = jwt.sign(data,'secret_ecom');
//     res.json({success:true,token})
// })

// //endpoint for user login


// app.post('/login',async(req,res)=>{
//     let user = await Users.findOne({email:req.body.email});
//     if(user){
//         const passCompare = req.body.password === user.password;
//         if(passCompare){
//             const data ={
//                 user:{
//                     id:user.id
//                 }
//             }
//             const token = jwt.sign(data,'secret_ecom');
//             res.json({success:true,token})
//         }
//         else{
//             res.json({success:false,errors:"Wrong Password"});

//         }
//     }
//     else{
//         res.json({sucess:false,errors:"Wrong Email Id"})
//     }
// })
// //ceating endpoint for newcollection data

// // app.get('/newcollections',async (req,res)=>{
// // let products = await Product.find({});
// // let newcollection = products.slice(1).slice(-8);
// // console.log("Newcollection fetched");
// // res.send(newcollection);
// // })
// //endpoint for popular in kids item

// app.get('/popularinkids',async(req,res)=>{
//     let products = await Product.find({category:"kid"});
//     let popular_in_kids= products.slice(0,4);
//     console.log("popular in kids fetched");
//     res.send(popular_in_kids);
// })

// // creating middleware to fetch user
// const fetchUser = async(req,res,next)=>{
// const token = req.header('auth-token');
// if(!token){
//     res.status(401).send({errors:"Please autheticate using vallid token"})

// }
// else{
// try{
//     const data =jwt.verify(token,'secret_ecom');
//     req.user =data.user;
//     next();
// }catch(error){
// res.status(401).send({errors:"please authenticate using a valid token"});

// }
// }
// }

// //creating endpoint for adding products in cartdata
// app.post('/addtocart',fetchUser,async(req,res)=>{
// //    console.log(req.body,req.user); 
// console.log("added",req.body.itemId)

// let userData =await Users.findOne({_id:req.user.id});
// userData.cartData[req.body.itemId] +=1;
// await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
// res.send("Added")
// })

// //creating api endpoint to remove data from cartdata

// app.post('/removefromcart',fetchUser,async(req,res)=>{
//     console.log("removed",req.body.itemId)
//     let userData =await Users.findOne({_id:req.user.id});
//     if(userData.cartData[req.body.itemId]>0)
// userData.cartData[req.body.itemId] -=1;
// await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
// res.send("removed")
// })


// //creating endpoint to get cartdata
// app.post('/getcart',fetchUser,async(req,res)=>{
//     console.log("GetCart");
//     let userData = await Users.findOne({_id:req.user.id});
// res.json(userData.cartData);

// })

// app.listen(port, () => {
//     console.log("App is running on the port", port);
// });



import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';

// import dotenv from 'dotenv'

// dotenv.config()
const app = express();
app.use(express.json());


// CORS Configuration
// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

app.use(cors({
    origin: 'https://itemcatelogfrontcode.netlify.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow credentials to be included in requests
}));



const port = 4000;

mongoose.connect("mongodb+srv://revathimohancse:fUDJolxXF7wy88HL@cluster0.tw8qyki.mongodb.net/");

app.get('/', (req, res) => {
    res.status(200).send('API is working');
});

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Image storage configuration
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'upload/images'),
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Serve images statically
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

app.post("/upload", upload.single('product'), (req, res) => {
    console.log("File uploaded:", req.file); // Logging file info for debugging
    res.json({
        success: 1,
                // image_url: `https://localhost:${port}/images/${req.file.filename}`

        image_url: `https://itemcatalogpjtbe.onrender.com/images/${req.file.filename}`
    });
});

const Product = mongoose.model("Product", {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true }
});

app.post('/addproduct', async (req, res) => {
    try {
        let products = await Product.find({});
        let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const newProduct = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price
        });

        await newProduct.save();
        console.log("Product saved:", newProduct);
        
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ success: false, error: "Failed to save product" });
    }
});


// API for deleting products

app.post('/removeproduct', async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({ id: req.body.id });
        if (!deletedProduct) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }
        console.log("Product removed:", deletedProduct);
        res.json({
            success: true,
            name: deletedProduct.name
        });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});


// creating API for getting all products

app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
})

const Users = mongoose.model('Users',{


name:{
    type:String,
},
email:{
    type:String,
    unique:true,
},
password:{
    type:String,

},
cartData:{
    type:Object,
},
date:{
    type:Date,
    default:Date.now,
}
})

//creating endpoint for registering the user


app.post('/signup',async (req,res)=>{
    let check =await Users.findOne({email:req.body.email})
    if(check){
        return res.status(400).json({success:false,errors:"existing user found with same email address"})
    }
    let cart ={};
    for (let i =0; i<300; i++){
cart[i] =0;
    }
    const user =new Users({
        name:req.body.username,
        email :req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await user.save();
    const data = {
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

//endpoint for user login


app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data ={
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token})
        }
        else{
            res.json({success:false,errors:"Wrong Password"});

        }
    }
    else{
        res.json({sucess:false,errors:"Wrong Email Id"})
    }
})
//ceating endpoint for newcollection data

// app.get('/newcollections',async (req,res)=>{
// let products = await Product.find({});
// let newcollection = products.slice(1).slice(-8);
// console.log("Newcollection fetched");
// res.send(newcollection);
// })
//endpoint for popular in kids item

app.get('/popularinkids',async(req,res)=>{
    let products = await Product.find({category:"kid"});
    let popular_in_kids= products.slice(0,4);
    console.log("popular in kids fetched");
    res.send(popular_in_kids);
})

// creating middleware to fetch user
const fetchUser = async(req,res,next)=>{
const token = req.header('auth-token');
if(!token){
    res.status(401).send({errors:"Please autheticate using vallid token"})

}
else{
try{
    const data =jwt.verify(token,'secret_ecom');
    req.user =data.user;
    next();
}catch(error){
res.status(401).send({errors:"please authenticate using a valid token"});

}
}
}

//creating endpoint for adding products in cartdata
app.post('/addtocart',fetchUser,async(req,res)=>{
//    console.log(req.body,req.user); 
console.log("added",req.body.itemId)

let userData =await Users.findOne({_id:req.user.id});
userData.cartData[req.body.itemId] +=1;
await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
res.send("Added")
})

//creating api endpoint to remove data from cartdata

app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("removed",req.body.itemId)
    let userData =await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
userData.cartData[req.body.itemId] -=1;
await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
res.send("removed")
})


//creating endpoint to get cartdata
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
res.json(userData.cartData);

})

app.listen(port, () => {
    console.log("App is running on the port", port);
});

