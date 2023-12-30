import mongoose, { model, Schema, Types } from 'mongoose';


const SubcategorySchema = new Schema({
    name: { type: String, 
    required: [true, "Name is required"],
    unique: [true, "Name must be unique value"]},
    slug: { type: String, required: true },
    categoryId:{ type: Types.ObjectId, ref: 'Category', required: true },
}, {
    timestamps: true
})

const SubcategoryModel =mongoose.models.SubCategory || model('SubCategory', SubcategorySchema)

export default SubcategoryModel