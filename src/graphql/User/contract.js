import gql from "graphql-tag";

export const UPDATE_CONTRACT = gql`
    mutation UPDATECONTRACT($_id:ID,$contract_data:JSON){
        update_contract(_id:$_id,contract_data:$contract_data){
            msg
            status
            _id
        }
    }
`




export const GET_CONTRACT = gql`
    query GETCONTRACT($contract_id:ID){
        get_contracts(contract_id:$contract_id){
            name
            description
            current_page
            address_id
            budget
            timeline
            timeline_type
            terms_condition
            get_contract_files(contract_id:$contract_id) {
                _id
                images{
                    small_image
                    large_image
                    image_tag
                }
            }
        }
    }
`





