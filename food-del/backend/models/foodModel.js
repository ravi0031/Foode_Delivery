import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true},
    image: { type: String, required: true },
    category:{ type:String, required:true},
    rating:{type:String,required:true},
    app1_price: { type: Number },
    app2_price: { type: Number },
    app3_price: { type: Number }
})

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
export default foodModel;