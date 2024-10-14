import { BookDocument } from '../models/Book.js';
import User, { UserDocument } from '../models/User.js';
import { AuthenticationError, signToken } from '../utils/auth.js';

interface AddUserArgs {
    input: {
        username: string;
        email: string;
        password: string;
    };
  }

interface LoginUserArgs {
    email: string;
    password: string;
}


interface SaveBookArgs {
    input: {
      authors: string[];
      description: string;
      bookId: string;
      image: string;
      link: string;
      title: string;
    };
  }
  
  interface RemoveBookArgs {
    bookId: string;
  }

const resolvers = {
    Query: {
        me: async (_parent: any, _args: any, context: { user: UserDocument | null }): Promise<UserDocument | null> => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in to view your profile');
            }

            const user = await User.findById(context.user._id).populate('savedBooks');
            return user;
        },

        Book: async (_parent: any, { userId }: { userId: string }): Promise<BookDocument[] | null> => {
            const user = await User.findById(userId);
            return user ? user.savedBooks : null;
        },
    },

    Mutation: {
        addUser: async (_parent: any, { input }: AddUserArgs): Promise<{ token: string; user: UserDocument }> => {
            const user = await User.create(input);
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },

        login: async (_parent: any, { email, password }: LoginUserArgs): Promise<{ token: string; user: UserDocument } | null> => {
            const user = await User.findOne
                ({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const isValidatePassword = await user.isCorrectPassword(password);
            if (!isValidatePassword) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },

        saveBook: async (_parent: any, { input }: SaveBookArgs, context: { user: UserDocument | null }): Promise<UserDocument | null> => {
            if (!context.user) {
              throw new AuthenticationError('You must be logged in to save a book');
            }

            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
        { $addToSet: { savedBooks: input } },
        { new: true }
      ).populate('savedBooks');

      return updatedUser;
    },

    removeBook: async (_parent: any, { bookId }: RemoveBookArgs, context: { user: UserDocument | null }): Promise<UserDocument | null> => {
        if (!context.user) {
          throw new AuthenticationError('You must be logged in to remove a book');
        }
  
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        ).populate('savedBooks');
  
        return updatedUser;
        },
    },
};

export default resolvers;