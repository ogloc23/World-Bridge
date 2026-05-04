export const authTypeDefs = `#graphql
  type Admin {
    id: ID!
    email: String!
    role: String!
    isActive: Boolean!
    createdAt: String
    updatedAt: String
  }

  type AuthPayload {
    token: String!
    admin: Admin!
  }

  type Query {
    me: Admin
    admins: [Admin]
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input CreateAdminInput {
    email: String!
    password: String!
    role: String
  }

  type Mutation {
    loginAdmin(input: LoginInput!): AuthPayload
    createAdmin(input: CreateAdminInput!): Admin
    deactivateAdmin(adminId: ID!): Admin
  }
`;
