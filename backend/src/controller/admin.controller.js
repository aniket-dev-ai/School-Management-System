const adminModel = require("../models/admin.model");
const {createAdmin} = require("../services/admin.service");

module.exports.registerAdminController = async (req, res) => {
    try {
        //get user data
        const { name, email, password, phoneNumber, schoolName } = req.body;

        
        //creating user
        const newAdmin = await createAdmin({ name, email, password, phoneNumber, schoolName })

        //genrate token
        const token = adminModel.generateToken(newAdmin);

        //send Response
        res.status(201).json({ message: "Admin created successfully" , 
            newAdmin, 
            token
        } );


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}