import gql from "graphql-tag";

export const GET_BIDING_PAGINATION = gql`
    query GETBIDINGPAGINATION($limit: Int,$page:Int,$data:JSON,$contract_id:ID,$location_code:String) {
        get_biding_pagination(limit:$limit,page:$page,data:$data,contract_id:$contract_id,location_code:$location_code) {
            pageInfo{
                totalDocs
                page
            }
            data{
                _id
                budget(code:$location_code)
                service_fee
                admin_fee(code:$location_code)
                ref: biding_ref
                created_at
                user_id
                contract_id
                description
                experience
                timeline
                timeline_type
                payment_option(code:$location_code)
                add_to_shortlist
                provider_rating_by_category(root: true) {
                    rating
                }
                get_biding_all_files {
                    small_image
                }
                get_user(root_parent:true) {
                    img_url
                    first_name
                    user_type
                    last_name
                    _id
                    get_company_root_detail(root: true) {
                        company_name
                        company_website
                        company_category
                        get_company_images {
                            small_image
                        }
                    }
                }
            }
        }
    }
`;

export const GET_BIDING_DETAIL = gql`
    query GETBIDINGDETAIL($_id:ID){
        get_biding_detail(_id:$_id){
            _id
                budget
                ref: biding_ref
                created_at
                user_id
                contract_id
                description
                experience
                timeline
                timeline_type
                add_to_shortlist
                get_biding_all_files {
                    small_image
                }
                get_user {
                    img_url
                    first_name
                    user_type
                    last_name
                    _id
                    get_company_root_detail(root: true) {
                        company_name
                        company_website
                        company_category
                        get_company_images {
                            small_image
                        }
                    }
                }
        }
    }
`

export const UPDATE_BIDING = gql`
mutation UPDATEBIDING($_id:ID,$biding_data:[JSON]){ 
    update_biding(
    _id: $_id
    biding_data: $biding_data
  ) {
    msg
    status
  }
}`