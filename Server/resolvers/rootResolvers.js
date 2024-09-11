import postResolvers from "./postResolvers.js";
import userResolvers from "./userResolvers.js";
import commentResolvers from "./commentResolvers.js";

const rootResolvers = {
	Query: {
		...userResolvers.Query,
		...postResolvers.Query,
		...commentResolvers.Query,
	},
	Mutation: {
		...userResolvers.Mutation,
		...postResolvers.Mutation,
		...commentResolvers.Mutation,
	},
	User: {
		...userResolvers.User,
	},
	Post: {
		...postResolvers.Post,
	},
	Comment: {
		...commentResolvers.Comment,
	}
};

export default rootResolvers;
