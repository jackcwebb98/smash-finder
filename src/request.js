import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("https://api.smash.gg/gql/alpha", {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
  }
});

const query = `query tournamentsByLocation($coordinates: String!, $radius: String!, $videogameId: ID!) 
{
  tournaments(query: {
    filter: {
      location: {
        distanceFrom: $coordinates, 
        distance: $radius
      }
      videogameIds:[
        $videogameId
      ]
    }
  }) {
    nodes {
      id
      name
      url
      startAt
      images{
        url
      }
    }
  }
}`;

function getTournaments(variables) {
  let tourneys = client.request(query, variables);

  return tourneys;
}

export default getTournaments;
