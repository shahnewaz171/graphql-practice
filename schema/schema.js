const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
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

// below this is how we can initially jump over the graph which is root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BooksType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                // args.id
                // code to get data from db/others resource
                return _.find(books, { id: args.id })
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
