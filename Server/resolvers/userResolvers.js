import { GraphQLError } from "graphql";
import * as mongoUserFunctions from "../data/users.js";

const userResolvers = {
	Query: {
		getUser: async (_, args) => {
			// Validate the user ID
			// try {
			// 	args._id = validation.checkUUID(args._id, "User ID");
			// } catch (e) {
			// 	throw new GraphQLError(e, { extensions: { code: "BAD_USER_INPUT" } });
			// }

			// Attempt to fetch the user.
			try {
				const user = await mongoUserFunctions.get(args._id);
				return user;
			} catch (e) {
				throw new GraphQLError(e, {
					extensions: { code: "INTERNAL_SERVER_ERROR" },
				});
			}
		},
		checkUser: async (_, args) => {
			try {
				const user = await mongoUserFunctions.checkUser(args.emailAddress, args.password);
				return user;
			} catch (e) {
				throw new GraphQLError(e, {
					extensions: { code: "INTERNAL_SERVER_ERROR" },
				});
			}
		},

		getAllUsers: async (_, args) => {
			try {
				const users = await mongoUserFunctions.getAll();
				return users;
			} catch (e) {
				throw new GraphQLError(e, {
					extensions: { code: "INTERNAL_SERVER_ERROR" },
				});
			}
		},
	},
	Mutation: {
		createUser: async (_, args) => {
			// Validate the user arguments
			// try {
			// 	args.authID = validation.checkUserAuthID(args.authID, "Auth ID");
			// 	args.username = validation.checkUserUsername(args.username);
			// 	args.firstName = validation.checkUserName(args.firstName);
			// 	args.lastName = validation.checkUserName(args.lastName);
			// } catch (e) {
			// 	throw new GraphQLError(e, { extensions: { code: "BAD_USER_INPUT" } });
			// }

			// Add the user to the database and cache it
			try {
				const user = await mongoUserFunctions.create(args.username, args.firstName, args.lastName, args.userEmail, args.password);
				return user;
			} catch (e) {
				throw new GraphQLError(e, {
					extensions: { code: "INTERNAL_SERVER_ERROR" },
				});
			}
		},

		deleteUser: async (_, args) => {
			// Validate the user arguments
			// try {
			// 	args.userID = validation.checkUUID(args.userID, "User ID");
			// } catch (e) {
			// 	throw new GraphQLError(e, { extensions: { code: "BAD_USER_INPUT" } });
			// }

			// Delete the user from the database and the cache
			try {
				const user = await mongoUserFunctions.remove(args._id);
				return user;
			} catch (e) {
				throw new GraphQLError(e, {
					extensions: { code: "INTERNAL_SERVER_ERROR" },
				});
			}
		},

		modifyUser: async (_, args) => {
			// Validate the user arguments
			// try {
			// 	args.userID = validation.checkUUID(args.userID, "User ID");
			// 	if (args.username)
			// 		args.username = validation.checkUserUsername(args.username);
			// 	if (args.firstName)
			// 		args.firstName = validation.checkUserName(args.firstName);
			// 	if (args.lastName)
			// 		args.lastName = validation.checkUserName(args.lastName);
			// } catch (e) {
			// 	throw new GraphQLError(e, { extensions: { code: "BAD_USER_INPUT" } });
			// }

			// Modify the user in the database
			try {
				const user = await mongoUserFunctions.update(args._id, args.username, args.firstName, args.lastName, args.userEmail, args.picture, args.bio, args.businessEmail, args.phoneNumber, args.password);
				return user;
			} catch (e) {
				throw new GraphQLError(e, {
					extensions: { code: "INTERNAL_SERVER_ERROR" },
				});
			}
		}
	},
	User: {
		// TODO: NEED A GETPOSTSBYUSERID PLEASE
		posts: async (parentValue) => {
			const userPosts = await mongoUserFunctions.getPostsByUserID(
				String(parentValue._id)
			);
			return userPosts;
		},
	},
};

export default userResolvers;
