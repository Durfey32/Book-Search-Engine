// import { Query } from "mongoose";
import type { BookDocument } from '../models/Book';
import User from "../models/User";
import { UserDocument } from "../models/User";

const resolvers = {
    Query: {
        bookSchema: async (_parent: any, { userId }: { userId: string }): Promise<BookDocument[] | null> => {
            const user = await User.findById(userId);
            return user ? user.savedBooks : null;
        },
        
        User: async (_parent: any, { _id }: { _id: string }): Promise<UserDocument[] | null> => {
         const params = _id ? { _id } : {};
            return User.find(params);
        },
    },
    Mutation: {
        createUser: async (_parent: any, { username, email, password }: { username: string, email: string, password: string }): Promise<UserDocument> => {
            return User.create({ username, email, password });
        },
        saveBook: async (_parent: any, { userId, bookId }: { userId: string, bookId: string }): Promise<UserDocument | null> => {
            return User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { savedBooks: bookId } },
                { new: true }
            );
        },
        deleteBook: async (_parent: any, { userId, bookId }: { userId: string, bookId: string }): Promise<UserDocument | null> => {
            return User.findOneAndUpdate(
                { _id: userId },
                { $pull: { savedBooks: bookId } },
                { new: true }
            );
        },
    },
};

export default resolvers;