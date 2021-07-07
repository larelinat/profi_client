import gql from "graphql-tag";

export const UPDATE_CLIENT_SUBSCRIPTION = gql`
    subscription updateClient($id: ID!) {
        updateClient(id: $id){
            id
            name
            birth
            passport{
                series
                number
                issued_by
                date
                code
                snils
            }
            address
            phone
            email
            where_know
            description
            createdAt
            createdBy
        }
    }
`

export const NEW_CLIENT_SUBSCRIPTION = gql`
    subscription newClient{
        newClient{
            id
            name
            phone
            email
        }
    }
`
