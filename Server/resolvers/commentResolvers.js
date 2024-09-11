import { GraphQLError } from "graphql";
import * as commentFunctions from "../data/comments.js";

const commentResolvers = {
  Query: {
    getComment: async (_, args) => {
      try {
        const comment = await commentFunctions.get(args._id);
        return comment;
      } catch (e) {
        throw new GraphQLError(e, {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },
  },
  Mutation: {
    createComment: async (_, args) => {
      try {
        const comment = await commentFunctions.create(args.originalPost, args.owner, args.text);
        return comment;
      } catch (e) {
        throw new GraphQLError(e, {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    },
  },
  Comment: {
    owner: async (parentValue) => {
      const owner = await commentFunctions.getOwner(
        String(parentValue._id)
      );
      return owner;
    },
    originalPost: async (parentValue) => {
      const post = await commentFunctions.getOP(
        String(parentValue._id)
      )
      return post;
    }
  },
};

export default commentResolvers;
