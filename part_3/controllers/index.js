const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const awesomeFunction =  (req,res) => {
    res.send("Hello World")
};

const secondFunction = (req,res)=>{
    res.send("Tooele Tech is Awesome!")
}

const getAllStudents = async (req, res) =>{
    try {
        const result = await mongodb.getDb().db().collection("Students").find();
        result.toArray().then((lists) =>{
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(lists);
        });
    } catch (error) {
        res.status(500).json(error);
    }
}

const getSingleStudent = async (req,res)=>{
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb
        .getDb()
        .db()
        .collection("Students")
        .find({_id:userId});
        result.toArray().then((lists) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(lists[0]);
        })
    } catch (error) {
        res.status(500).json(error);
    }
};

const createStudent = async (req, res) => {
    try {
        const student = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            age: req.body.age,
            currentCollege: req.body.currentCollege,
        };

        const response = await mongodb
        .getDb()
        .db()
        .collection("Students")
        .insertOne(student);
    if (response.acknowledged){
        res.status(201).json(response);
    }else{
        res
        .status(500)
        .json(response.error || "Some error occurred while creating the student.")
    }
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateStudent = async(req,res) =>{
    try{
        const userId = new ObjectId(req.params.id);

        const student = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            age: req.body.age,
            currentCollege: req.body.currentCollege,
        };

        const response = await mongodb
        .getDb()
        .db()
        .collection("Students")
        .replaceOne({_id: userId}, student);
        console.log(response);
        if(response.modifiedCount > 0){
            res.status(204).send(response);
        }else{
            res.status(500).json(
                response.error || "Some error occured while updating the student."
            );
        }
    }catch(error){
        res.status(500).json(error);
    }
};

const deleteStudent = async(req,res ) =>{
    try {
        const userId = new ObjectId(req,params.id);
        const response = await mongodb
        .getDb()
        .db()
        .collection("students")
        .deleteOne({_id: userId}, true);
        console.log(response);
        if(response.deletedCount >0){
            res.status(200).send();
        }else{
            res
            .status(500)
            .json(
                response.error || "Some error occurred while deleting the student."
            );
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { awesomeFunction, secondFunction, getAllStudents, createStudent, getSingleStudent, updateStudent, deleteStudent};