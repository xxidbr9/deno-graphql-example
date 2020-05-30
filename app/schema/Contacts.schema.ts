import { gql } from "https://deno.land/x/oak_graphql/mod.ts";

export default gql`
    input ContactInput {
        _id: ID
        name: String
        phone_number: Float
    }
    
    type Contact {
        _id: ID!
        name: String!
        phone_number: Float!
    }
    
    type Status {
        status: Int!
        msg: String!
    }
    
    type Query {
        findAll: [Contact]!
        findOne(input: ContactInput): Contact
    }
    
    type Mutation {
        addOne(input: ContactInput!): Status!
        edit(input: ContactInput!): Status!
        delete(_id:ID): Status!
    }  
`;
