const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect(process.env.DBURL, () => { console.log("Mongoose Connected MongoDB Doctor app"); });

const specialtiesSchema = new mongoose.Schema({
    name:String,
    image:String
})
const doctorsImageSchema = new mongoose.Schema({
    doctorId:{
        type:String,
        unique:true,
        index:true,},
        doctorimg:String
})
const specialties  = mongoose.model("specialties",specialtiesSchema)
const doctors = mongoose.model("doctor",doctorsImageSchema)


app.get("/v1/api/specialties",(req,res)=>{
    specialties.find().exec(function(err,docs){
        if (err){
            console.log(err);
        }else(
            res.status(200).json({docs})
        )
    })
})
app.get("/v1/api/topdoctors",(req,res)=>{
    doctors.find().exec(function(err,docs){
        if (err){
            console.log(err);
        }else(
            res.status(200).json({docs})
        )
    })
})


app.listen(process.env.PORT,()=>{console.log("App is Listning on port 9000")})