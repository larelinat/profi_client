import gql from "graphql-tag";


export const FETCH_CLIENTS_QUERY = gql`
    query getClients(
        $search: String
        $page: Int!
        $limit: Int!
    ){
        getClients(search: $search, page: $page, limit: $limit){
            clients{
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
            currentPage
            totalPages
        }
    }
`

export const SEARCH_CLIENTS_QUERY = gql`
    query getClients(
        $search: String
        $page: Int!
        $limit: Int!
    ){
        getClients(search: $search, page: $page, limit: $limit){
            clients{
                id
                name
                phone
                email
            }
        }
    }
`
