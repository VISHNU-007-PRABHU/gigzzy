
import gql from "graphql-tag";

export const GET_MILESTONE_PAGINATION = gql`
    query GETMILESTONEPAGINATION($_id:ID,$contract_id:ID,$biding_id:ID,$location_code:String){
        get_biding_milestone(_id:$_id,contract_id:$contract_id,biding_id:$biding_id){
                _id
                budget(code:$location_code)
                ref: milestone_ref
                created_at
                user_id
                contract_id
                timeline
                timeline_type
                payment_option(code:$location_code)
                booking_status
                description
                title
                pro_description
                extra_fare
                extra_fare_reason
                total(code:$location_code)
                get_milestone_all_images(root:true){
                    small_image
                }
        }
    }
`;

export const GET_MILESTONE_DETAIL = gql`
    query GETMILESTONEDETAIL($_id:ID,$contract_id:ID,$biding_id:ID){
        get_biding_milestone_detail(_id:$_id,contract_id:$contract_id,biding_id:$biding_id){
            _id
            budget
            ref: milestone_ref
            created_at
            user_id
            contract_id
            description
            timeline
            timeline_type
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