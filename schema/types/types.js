const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInputObjectType } = graphql;

const FoodsType = new GraphQLObjectType({
    name: 'Food',
    fields: () => ({
        id: { type: GraphQLString },
        category: { type: GraphQLString },
        thumb: { type: GraphQLString },
        description: { type: GraphQLString }
    })
});

const inputFoodType = new GraphQLInputObjectType({
    name: 'FoodInput',
    fields: {
        id: { type: GraphQLString },
        category: { type: GraphQLString },
        thumb: { type: GraphQLString },
        description: { type: GraphQLString }
    }
});

const deleteFoodType = new GraphQLInputObjectType({
    name: 'DeleteFoodInput',
    fields: {
        id: { type: GraphQLString },
    }
});

const updateFoodType = new GraphQLInputObjectType({
    name: 'UpdateFoodInput',
    fields: {
        id: { type: GraphQLString },
        category: { type: GraphQLString },
    }
});

module.exports = {
    FoodsType,
    inputFoodType,
    deleteFoodType,
    updateFoodType
}