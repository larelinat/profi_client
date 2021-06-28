import gql from "graphql-tag";


export const FETCH_CLIENTS_QUERY = gql`
    query{
        getClients{
            id
            name
            birth
            passport{
                series
                number
                issued_by
                date
                code
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
