import mongoose, { model, Schema, Types } from "mongoose";

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: [true, "Name must be unique value"],
    },
    image: { type: Object, required: [true, "Image is required"] },
    rate: { type: Number, required: [true, "Rate is required"] },
    createdBy: { type: Types.ObjectId, ref: "User", required: false },
    type: {
      type: String,
      enum: ["Food", "Clothes"],
    },
  },
  {
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
    timestamps: true,
  }
);

brandSchema.virtual('branch',{
    localField:'_id',
    foreignField:'StoreId',
    ref:'branch'
})

const brandModel = mongoose.models.Brand || model("Brand", brandSchema);

export default brandModel;
