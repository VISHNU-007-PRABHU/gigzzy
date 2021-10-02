
import gql from "graphql-tag";

export const DELETE_CURRENCY = gql`
    mutation DELETECURRENCY($_id:ID) {
        delete_currency(_id:$_id){
            msg
            status
        }
    }
`;

export const UPDATE_CURRENCY = gql`
    mutation UPDATECURRENCY($_id:ID,$currency_data:JSON){
        update_currency(_id:$_id,currency_data:$currency_data){
            status
            msg
        }
    }
`;



export const GET_CURRENCY_PAGINATION = gql`
 query GETCURRENCYPAGINATION($limit: Int,$page:Int,$data:JSON,$pagination:Boolean,$search:JSON) {
    get_currencys(limit:$limit,page:$page,data:$data,pagination:$pagination,search:$search) {
        pageInfo{
            totalDocs
            page
        }
        data{
            code
            symbol
            country_code
            location
            rate
            name
            _id
        }
    }
}
`;



export const GET_CURRENCY = gql`
query GETCURRENCY($_id:ID) {
    get_currency(_id:$_id) {
        code
            symbol
            country_code
            location
            rate
            name
            _id
    }
}
`;

