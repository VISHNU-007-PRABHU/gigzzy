
import gql from "graphql-tag";

export const GET_MILESTONE_PAGINATION = gql`
    query GETMILESTONEPAGINATION($_id:ID,$contract_id:ID,$biding_id:ID){
        get_biding_milestone(_id:$_id,contract_id:$contract_id,biding_id:$biding_id){
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
`;

export const GET_MILESTONE_DETAIL = gql`
    query GETMILESTONEDETAIL($_id:ID,$contract_id:ID,$biding_id:ID){
        get_biding_milestone_detail(_id:$_id,contract_id:$contract_id,biding_id:$biding_id){
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
        }
    }
`


export const UPDATE_MILESTONE = gql`
mutation UPDATEMILESTONE($option:String  
    $_id:ID
    $user_id: String
    $provider_id:ID
    $biding_id:ID
    $contract_id:ID
    $file:[Upload]
    $milestone_data:JSON){ 
    update_milestone(
        option:$option  
        _id:$_id
        user_id: $user_id
        provider_id:$provider_id
        biding_id:$biding_id
        contract_id:$contract_id
        file:$file
        milestone_data:$milestone_data
  ) {
    msg
    status
  }
}`