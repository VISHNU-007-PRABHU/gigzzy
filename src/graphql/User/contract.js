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


export const UPDATE_CONTRACT_FILE = gql`
    mutation UPDATECONTRACTFILE($contract_id:ID,$file:[Upload],$category:String,$image_tag:String,$_id:ID){
        ContractJobFileUpload(contract_id:$contract_id,file:$file,category:$category,image_tag:$image_tag,_id:$_id){
            msg
            status
            _id
        }
    }
`
export const DELETE_CONTRACT_FILE = gql`
    mutation DELETECONTRACTFILE($_id:ID){
        DeleteContractJobFile(_id:$_id){
            msg
            status
        }
    }
`

export const GET_CONTRACT_FILES = gql`
    query GETCONTRACTFILES($contract_id:ID){
        get_contract_files(contract_id:$contract_id) {
            _id
            images{
                small_image
                image_tag
                doc_category
                _id
            }
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
            contract_ref
            get_contract_category{
                category_name
                subCategory_name
                category_type
            }
            get_contract_all_files(contract_id:$contract_id){
                small_image
            }
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





