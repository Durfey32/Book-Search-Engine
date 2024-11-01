import User from '../models/index.js';
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
        me: async (_parent: any, _args: any, context: any) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id})
            }
            throw new AuthenticationError('You must be logged in to view your profile');
        },
    },

    Mutation: {
        addUser: async (_parent: any, { input }: AddUserArgs) => {
            const user = await User.create({ ...input });
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },

        login: async (_parent: any, { email, password }: LoginUserArgs) => {
            const user = await User.findOne({ email });
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

        saveBook: async (_parent: any, { input }: SaveBookArgs, context: any) => {
            if (context.user) {
              return User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: input } },
                { new: true, runValidators: true }
              );
            }
      throw new AuthenticationError('You must be logged in to save a book');
    },

    removeBook: async (_parent: any, { bookId }: RemoveBookArgs, context: any ) => {
        if (context.user) {
          return User.findByIdAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId: bookId } } },
            { new: true }
          );
        }
        throw new AuthenticationError('You must be logged in to remove a book');
        },
    },
};

export default resolvers;