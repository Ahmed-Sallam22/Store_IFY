import mongoose, { model, Schema, Types } from 'mongoose';


const CouponSchema = new Schema({
    name: { type: String, 
        required: [true, "Name is required"],
        unique: [true, "Name must be unique value"]},
        amount:{type:Number ,default:1},
        expireDate:Date,
        usedBy:[{type: Types.ObjectId , ref: 'User'}],
    createdBy: { type: Types.ObjectId, ref: 'User', required: false },
}, {
    timestamps: true
})



const CouponModel =mongoose.models.Coupon || model('Coupon', CouponSchema)

export default CouponModel