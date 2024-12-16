import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstame: { type: String, required: true },
    lastame: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address:{type:String,reqired:false},
    password: { type: String, required: true },
    confirmpassword: { type: String, required: true },
    cartData:{type:Object,default:{}}
}, { minimize: false })

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;