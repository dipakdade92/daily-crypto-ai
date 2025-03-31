import { Request, Response } from 'express';
import Book, { IBook } from '../models/book.model'; 

// Add a new book
export const addBook = async (req: Request, res: Response) => {
    try {
        const { name, author, publishedYear} = req.body;
        const userId = req.user?.userId;

        // Create a new book instance
        const newBook: IBook = new Book({
            name,
            author,
            publishedYear,
            userId, 
        });

        const savedBook = await newBook.save();
        return res.status(201).json({ message: 'Book added successfully.', book: savedBook });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to add book.' });
    }
};

// Update a book
export const updateBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, author, publishedYear } = req.body;

    try {
        const book = await Book.findById(id);
        if (!book || book.userId !== req.user?.userId) {
            return res.status(404).json({ error: 'Book not found or does not belong to the user.' });
        }

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { name, author, publishedYear },
            { new: true } 
        );

        return res.status(200).json({ message: 'Book updated successfully.', book: updatedBook });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update book.' });
    }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id);
        if (!book || book.userId !== req.user?.userId) {
            return res.status(404).json({ error: 'Book not found or does not belong to the user.' });
        }

        const deletedBook = await Book.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Book deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete book.' });
    }
};

// Get all books for the authenticated user
export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;
        const books = await Book.find({ userId });

        return res.status(200).json({ books });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve books.' });
    }
}; 