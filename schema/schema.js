const graphql = require('graphql');
const { GraphQLObjectType, GraphQLSchema, GraphQLList } = graphql;
const { FoodsType, inputFoodType, deleteFoodType, updateFoodType } = require('./types/types');
let foods = require('./data/data');
const _ = require('lodash');


//Mutations
const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addFood: {
            type: FoodsType,
            args: {
                input: { type: inputFoodType }
            },
            resolve(parent, args) {
                // code to get data from db/others resource
                let food = {
                    id: args.input.id,
                    category: args.input.category,
                    thumb: args.input.thumb,
                    description: args.input.description
                }
                foods.push(food);

                return _.find(foods, { id: args.input.id });
            }
        },
        removeFood: {
            type: new GraphQLList(FoodsType),
            args: {
                input: { type: deleteFoodType }
            },
            resolve(parent, args) {
                // code to get data from db/others resource
                const id = args.input.id;

                let data = foods.filter(item => item.id !== id);
                foods = data;

                if (data) {
                    return data;
                }
            }
        },
        updateFood: {
            type: new GraphQLList(FoodsType),
            args: {
                input: { type: updateFoodType },
            },
            resolve(parent, args) {
                // code to get data from db/others resource
                const { input } = args;

                let newData = foods.map(item => item.id === input.id ? { ...item, ...input } : item);
                foods = newData;

                return foods;
            }
        }
    }
});

// below this is how we can initially jump over the graph which is root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        foods: {
            type: new GraphQLList(FoodsType),
            resolve(parent, args) {
                // code to get data from db/others resource
                return foods;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutationType
});