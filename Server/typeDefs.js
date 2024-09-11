export const typeDefs = `#graphql
  type Query {
    getUser(_id: ID!): User
    checkUser(emailAddress: String!, password: String!): User
    getPost(_id: ID!): Post
    getAllPosts: [Post]
    getAllUsers: [User]
    getComment(_id: ID!): Comment
  }

  type User {
    _id: ID!
    username: String!
    userEmail: String!
    firstName: String!
    lastName: String!
    password: String!
    posts: [Post]
    picture: String
    bio: String
    phoneNumber: String
    businessEmail: String
  }
  
  type Post {
    _id: ID!
    owner: User!
    title: String!
    timestamp: String!
    latitude: Float!
    longitude: Float!
    image: String!
    donationGoal: Int!
    volunteerInfo: String!
    comments: [Comment]
  }
  
  type Comment {
    _id: ID!
    originalPost: Post!
    owner: User!
    text: String!
  }  

  type Mutation {
    createUser(
      username: String!,
      firstName: String!,
      lastName: String!,
      userEmail: String!,
      password: String!
    ): User
    deleteUser(_id: ID!): User
    modifyUser(
      _id: ID!,
      username: String,
      firstName: String,
      lastName: String,
      userEmail: String,
      picture: String,
      bio: String,
      businessEmail: String,
      phoneNumber: String,
      password: String
    ): User
    createPost(
      owner: ID!,
      title: String!,
      timestamp: String!,
      latitude: Float!,
      longitude: Float!,
      image: String!,
      donationGoal: Int!,
      volunteerInfo: String!,
    ) : Post
    deletePost(
      _id: ID!,
    ) : Post
    createComment(
      originalPost: ID!,
      owner: ID!,
      text: String!,
    ) : Comment
  }
`;
