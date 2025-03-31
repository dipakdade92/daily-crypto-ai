import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
  name: string;
  author: string;
  publishedYear?: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new Schema<IBook>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    publishedYear: {
      type: Number,
      required: false,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model<IBook>('Book', bookSchema);
