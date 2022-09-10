import { ApolloClient,
    createHttpLink,
    InMemoryCache 
} from "@apollo/client/core";

const httplink = createHttpLink({
    uri:"http://10.154.130.55:1337/graphql",
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
    link:httplink,
    cache,
});

export default apolloClient;