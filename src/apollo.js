import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

// const uri_link = 'localhost:8990';
// const uri_link = '192.168.0.33:8844';  GX5wA]6e~/@T&2>]
const uri_link='gigzzy.com';
const uri = `https://${uri_link}`;

const links = createUploadLink({ uri: `https://${uri_link}/graphql`, });

const wsLink = new WebSocketLink({
    uri:`wss://${uri_link}/graphql`,
    options: {
      reconnect: true,
    }
  });
  
  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink,
    links
  );

  
export const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

// apollo schema:download --endpoint=http://localhost:8844/graphql schema.json