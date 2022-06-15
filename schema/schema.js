const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLInputObjectType, GraphQLInt } = graphql;
const _ = require('lodash');

const books = [
    { id: '1', name: 'Name of the Wind', genre: 'Fantasy' },
    { id: '2', name: 'The Final Empire', genre: 'Fantasy' },
    { id: '3', name: 'The Long Earth', genre: 'Sci-Fi' },
]

const BooksType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const inputBookType = new GraphQLInputObjectType({
    name: 'BookInput',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    }
});

// 
const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBook: {
            type: BooksType,
            args: {
                input: { type: inputBookType }
            },
            resolve(parent, args) {
                // code to get data from db/others resource
                let book = {
                    id: args.input.id,
                    name: args.input.name,
                    genre: args.input.genre
                }
                books.push(book);
                return _.find(books, { id: args.input.id });
            }
        }
    }
});

// below this is how we can initially jump over the graph which is root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: new GraphQLList(BooksType),
            // args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                // args.id
                // code to get data from db/others resource
                return books;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutationType
});
