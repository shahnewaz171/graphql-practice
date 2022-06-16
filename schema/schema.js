const graphql = require('graphql');
const { GraphQLObjectType, GraphQLSchema, GraphQLList } = graphql;
const { BooksType, deleteBookType, updateBookType, inputBookType } = require('./types/types');
const _ = require('lodash');

let books = [
    { id: '1', name: 'Name of the Wind', genre: 'Fantasy' },
    { id: '2', name: 'The Final Empire', genre: 'Fantasy' },
    { id: '3', name: 'The Long Earth', genre: 'Sci-Fi' },
];


//Mutations
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
        },
        removeBook: {
            type: new GraphQLList(BooksType),
            args: {
                input: { type: deleteBookType }
            },
            resolve(parent, args) {
                // code to get data from db/others resource
                const id = args.input.id;

                let data = books.filter(item => item.id !== id);
                console.log(data);
                books = data;

                if (data) {
                    return data;
                }
            }
        },
        updateBook: {
            type: new GraphQLList(BooksType),
            args: {
                input: { type: updateBookType },
            },
            resolve(parent, args) {
                // code to get data from db/others resource
                const { input } = args;

                let newData = books.map(item => item.id === input.id ? { ...item, ...input } : item);
                books = newData;

                return books;
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
            resolve(parent, args) {
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