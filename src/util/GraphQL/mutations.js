import gql from "graphql-tag";

export const UPDATE_CLIENT_MUTATION = gql`
    mutation updateClient($id: ID!, $newData: ClientInput!){
        updateClient(clientId: $id, clientInput: $newData) {
            name
        }
    }
`
