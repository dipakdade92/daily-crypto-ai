import { Request, Response } from 'express';
import Book, { IBook } from '../models/book.model';
import { sendResponse } from '../utils/response';
import { StatusCodes } from '../utils/status';
import messages from '../config/messages.json'; 

// Add a new book
export const addBook = async (req: Request, res: Response) => {
    try {
        const { name, author } = req.body;
        const userId = req.user?.userId;

        // Validate required fields
        if (!name) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, messages.bookNameRequired);
        }
        if (!author) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, messages.authorNameRequired);
        }

        // Create a new book instance
        const newBook: IBook = new Book({
            name,
            author,
            userId,
        });

        const savedBook = await newBook.save();
        return sendResponse(res, StatusCodes.CREATED, messages.bookAdded, savedBook);
    } catch (error) {
        return sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, messages.failedToAddBook);
    }
};

// Update a book
export const updateBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, author } = req.body;

    try {
        const book = await Book.findById(id);
        if (!book || book.userId !== req.user?.userId) {
            return sendResponse(res, StatusCodes.NOT_FOUND, messages.bookNotFound);
        }

        // Validate required fields
        if (!name) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, messages.bookNameRequired);
        }
        if (!author) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, messages.authorNameRequired);
        }

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { name, author },
            { new: true }
        );

        return sendResponse(res, StatusCodes.OK, messages.bookUpdated, updatedBook);
    } catch (error) {
        return sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, messages.failedToUpdateBook);
    }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id);
        if (!book || book.userId !== req.user?.userId) {
            return sendResponse(res, StatusCodes.NOT_FOUND, messages.bookNotFound);
        }

        await Book.findByIdAndDelete(id);
        return sendResponse(res, StatusCodes.OK, messages.bookDeleted);
    } catch (error) {
        return sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, messages.failedToDeleteBook);
    }
};

// Get all books for the authenticated user
export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;
        const books = await Book.find({ userId });

        return sendResponse(res, StatusCodes.OK, '', books);
    } catch (error) {
        return sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, messages.failedToRetrieveBooks);
    }
};

// Get a book by ID for the authenticated user
export const getBookById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id);
        if (!book || book.userId !== req.user?.userId) {
            return sendResponse(res, StatusCodes.NOT_FOUND, messages.bookNotFound);
        }

        return sendResponse(res, StatusCodes.OK, '', book);
    } catch (error) {
        return sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, messages.failedToRetrieveBooks);
    }
}; 