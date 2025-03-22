import Book from "../model/book.model.js"

export const getBook= async(req,res)=>{
    try{
        const book= await Book.find()

        res.status(200).json(book)
    }catch(error){
        console.log("Error" ,error);
        res.status(500).json(error);
    }
};

export const searchBook = async (req, res) => {
    const { name } = req.query;
    try {
      // Case-insensitive search using RegExp
      const book = await Book.findOne({ name: new RegExp('^' + name, 'i') }); // Use regex with `i` flag for case-insensitivity
  
      if (book) {
        res.status(200).json({ available: true, book });
      } else {
        res.status(404).json({ available: false, message: "Book not found" });
      }
    } catch (error) {
      console.error("Error fetching book:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  