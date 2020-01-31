const axios = require("axios");

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
} = require("graphql");

const LaunchType = new GraphQLObjectType({
    name: "Launch",
    fields: () => ({
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString },
        launch_year: { type: GraphQLInt },
        launch_date_utc: { type: GraphQLString },
        rocket: { type: RocketType },
        launch_success: { type: GraphQLBoolean }
    })
});

const RocketType = new GraphQLObjectType({
    name: "Rocket",
    fields: () => ({
        rocket_id: { type: GraphQLString },
        rocket_name: { type: GraphQLString },
        rocket_type: { type: GraphQLString }
    })
});

const LinksType = new GraphQLObjectType({
    name: "Links",
    fields: () => ({
        article_link: { type: GraphQLString },
        video_link: { type: GraphQLString },
        flickr_images: { type: GraphQLList }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType"
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
