import { Router } from 'express';
import { register, login, getProfile } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { addBook, deleteBook, getAllBooks, updateBook, getBookById } from '../controllers/book.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticate, getProfile);
router.post('/book', authenticate, addBook);
router.put('/book/:id', authenticate, updateBook);
router.delete('/book/:id', authenticate, deleteBook);
router.get('/books', authenticate, getAllBooks);
router.get('/book/:id', authenticate, getBookById);
    
export default router; 