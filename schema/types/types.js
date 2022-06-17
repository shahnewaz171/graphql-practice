const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInputObjectType } = graphql;

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

const deleteBookType = new GraphQLInputObjectType({
    name: 'DeleteBookInput',
    fields: {
        id: { type: GraphQLString },
    }
});

const updateBookType = new GraphQLInputObjectType({
    name: 'UpdateBookInput',
    fields: {
        id: { type: GraphQLString },
        genre: { type: GraphQLString },
    }
});

module.exports = {
    BooksType,
    inputBookType,
    deleteBookType,
    updateBookType
}