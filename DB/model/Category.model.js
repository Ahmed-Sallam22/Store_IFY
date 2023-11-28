import mongoose, { model, Schema, Types } from 'mongoose';


const categorySchema = new Schema({
    name: { type: String, 
        required: [true, "Name is required"],
        unique: [true, "Name must be unique value"]},
    description: { type: String, required: true},
    slug: { type: String, required: true },
    image: { type: Object },
    createdBy: { type: Types.ObjectId, ref: 'User', required: false },
}, {
    timestamps: true
})

const categoryModel =mongoose.models.Category || model('Category', categorySchema)

export default categoryModel