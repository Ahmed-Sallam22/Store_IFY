import mongoose, { model, Schema, Types } from 'mongoose';


const branchSchema = new Schema({
    city:{type:String, required: [true, "Name is required"]},
    name: { type: String, 
    required: [true, "Name is required"],
    unique: [true, "Name must be unique value"]},
    StoreId:{ type: Types.ObjectId, ref: 'Brand', required: true },
}, {
    timestamps: true
})

const branchModel =mongoose.models.branch || model('branch', branchSchema)

export default branchModel