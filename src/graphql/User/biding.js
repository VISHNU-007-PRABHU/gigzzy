import gql from "graphql-tag";

export const GET_BIDING_PAGINATION = gql`
    query GETBIDINGPAGINATION($limit: Int,$page:Int,$data:JSON,$contract_id:ID) {
        get_biding_pagination(limit:$limit,page:$page,data:$data,contract_id:$contract_id) {
            pageInfo{
                totalDocs
                page
            }
            data{
                _id
                budget
                ref: biding_ref
                created_at
                user_id
                timeline
                timeline_type
                get_user {
                    img_url
                    first_name
                    user_type
                    last_name
                }
            }
        }
    }
`;

export const GET_BIDING = gql`
    query GETBIDING($contract_id:ID,$_id:ID){
        get_biding(contract_id:$contract_id,_id:$_id){
            description
            budget
            timeline
            timeline_type
        }
    }
`