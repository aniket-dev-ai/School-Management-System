const adminModel = require("../models/admin.model");

const createAdmin = async ({ name, email, password, phoneNumber, schoolName }) => {



    if (!name || !email || !password || !phoneNumber || !schoolName) throw new Error("All fields are required");

    //check if user already exist
    const adminExists = await adminModel.findOne({ email: email });

    // console.log(adminExists)

    if (adminExists) throw new Error("Admin already exists");

    //hash password
    const hashedPassword = await adminModel.generateHash(password);

    //create new user
    const newAdmin = await adminModel.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        schoolName
    });

    if (!newAdmin) throw new Error("Admin not created");

    const adminObject = newAdmin.toObject();
    delete adminObject.password;



    return adminObject


}




module.exports = {
    createAdmin
}