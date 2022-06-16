const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInputObjectType } = graphql;

export const BooksType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

export const inputBookType = new GraphQLInputObjectType({
    name: 'BookInput',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    }
});

export const deleteBookType = new GraphQLInputObjectType({
    name: 'DeleteBookInput',
    fields: {
        id: { type: GraphQLString },
    }
});

export const updateBookType = new GraphQLInputObjectType({
    name: 'UpdateBookInput',
    fields: {
        id: { type: GraphQLString },
        genre: { type: GraphQLString },
    }
});