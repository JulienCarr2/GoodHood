import { GraphQLError } from "graphql";
import * as postFunctions from "../data/posts.js";

const postResolvers = {
	Query: {
		getPost: async (_, args) => {
			try {
				const post = await postFunctions.getPostById(args._id);
				return post;
			} catch (e) {
				throw new GraphQLError(e, {
					extensions: { code: "INTERNAL_SERVER_ERROR" },
				});
			}
		},
		getAllPosts: async (_, args) => {
			try {
				const posts = await postFunctions.getAll();
				return posts;
			} catch (e) {
				throw new GraphQLError(e, {
					extensions: { code: "INTERNAL_SERVER_ERROR" },
				});
			}
		}
	},
	Mutation: {
		createPost: async (_, args) => {
			try {
				const post = await postFunctions.create(args.owner, args.title, new Date(args.timestamp), args.latitude, args.longitude, args.image, args.donationGoal, args.volunteerInfo);
				return post;
			} catch (e) {
				throw new GraphQLError(e, {
					extensions: { code: "INTERNAL_SERVER_ERROR" },
				});
			}
		},
		deletePost: async (_, args) => {
			try {
				const post = await postFunctions.removePost(args.id);
				return post;
			} catch (e) {
				throw new GraphQLError(e, {
					extensions: { code: "INTERNAL_SERVER_ERROR" },
				});
			}
		},
	},
	Post: {
		owner: async (parentValue) => {
			const owner = await postFunctions.getOwner(
				String(parentValue._id)
			);
			return owner;
		},
		comments: async (parentValue) => {
			const comments = await postFunctions.getCommentsByID(
				String(parentValue._id)
			);
			return comments;
		},
	},
};

export default postResolvers;
