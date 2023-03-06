import mongoose from "mongoose";
const Schema = mongoose.Schema;

const catergorySchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    categoryName: String,
    createdAt:{type: Date, default: Date.now},
    isPublished: {type: Boolean, default: true}
})

export default mongoose.model('Category', catergorySchema);