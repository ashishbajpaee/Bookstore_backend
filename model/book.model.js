import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
    name: { type: String, required: true },
    title: String,
    price: Number,
    category: String,
    image: String,
  });
  
const Book= mongoose.model("Book" ,bookSchema);

export default Book;