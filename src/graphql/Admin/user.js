import gql from "graphql-tag";

export const ADD_USER = gql`
    mutation ADDUSER($role:Int,$demo:Boolean,$country_code:String,$phone_no:String,$email:String,$password:String,$name:String,$provider_subCategoryID:[ID],$lat:Float,$lng:Float,$address:String) {
        admin_add_user(role:$role,demo:$demo,country_code:$country_code,phone_no:$phone_no,email:$email,password:$password,name:$name,provider_subCategoryID:$provider_subCategoryID,lat:$lat,lng:$lng,address:$address){
            info
        }
    }
`;

export const UPDATE_USER = gql`
    mutation UPDATEUSER($_id:ID,$role:Int,$demo:Boolean,$country_code:String,$phone_no:String,$email:String,$password:String,$name:String,$provider_subCategoryID:[ID],$lat:Float,$lng:Float,$address:String) {
        admin_update_user(_id:$_id,role:$role,demo:$demo,country_code:$country_code,phone_no:$phone_no,email:$email,password:$password,name:$name,provider_subCategoryID:$provider_subCategoryID,lat:$lat,lng:$lng,address:$address){
            info
        }
    }
`;

export const GET_USER = gql`
 query GETUSER($limit: Int,$page:Int,$role:String,$proof_status:Int) {
    get_user(limit:$limit,page:$page,role:$role,proof_status:$proof_status) {
        pageInfo{
      totalDocs
      page
    }
    data{
        _id
        country_code
        phone_no
        email
        name
        address
        location
        password
        provider_subCategoryID
        # provider_document_url
        proof_status
    }
    }
}
`;



export const DELETE_USER = gql`
    mutation DELETEUSER($_id: ID)  {
        deleteDetails(_id:$_id){
        msg
        status         
    }
}`

export const FIND_USER = gql`
query FINDUSER($_id:ID) {
    user(_id:$_id) {
        _id
        country_code
        phone_no
        email
        name
        demo
        address
        location
        password
        provider_subCategoryID
        professional_document_url
        personal_document_url
        proof_status
    }
}
`;


export const PROVIDER_DOCUMENT_VERIFIED = gql`
mutation PROVIDERDOCUMENTVERIFIED($_id:ID,$proof_status:String) {
    provider_document_verified(_id:$_id,proof_status:$proof_status) {
        info
        # provider_document_url
        proof_status
    }
}
`;

export const USER_EMAIL_QUERY = gql`
query USEREMAILQUERY($data:JSON) {
    user_search(data:$data) {
        _id
        email
        proof_status
        phone_no
        name
        role
    }
}
`;

export const GET_COMPANY = gql`
 query GETCOMPANY($limit: Int,$page:Int,$search:JSON,$company_id:ID,$provider_search:JSON) {
    get_company_detail(limit:$limit,page:$page,search:$search,company_id:$company_id) {
        pageInfo{
            totalDocs
            page
        }
        data{
            _id
            company_name
            company_website
            companyCategory
            about_company
            get_company_address_detail(company_id:$company_id) {
                address
                lat
                lng
            }
            get_parent_company_provider(provider_search:$provider_search,company_id:$company_id) {
                email
                created_at
                provider_id
                register_status
                register_link_status
                _id
            }
        }
    }
}
`;



export const UPDATE_COMPANY_DETAIL = gql`
    mutation UPDATECOMPANYDETAIL($_id: ID,$company_data:JSON,$logo_file:Upload,$profile_file:Upload)  {
        update_company_detail(_id:$_id,company_data:$company_data,logo_file:$logo_file,profile_file:$profile_file){
        msg
        status         
    }
}`

export const DELETE_COMPANY = gql`
    mutation DELETECOMPANY($company_id: ID)  {
        deleteCompany(company_id:$company_id){
        msg
        status         
    }
}`


export const DELETE_COMPANY_PROVIDER = gql`
    mutation DELETECOMPANYPROVIDER($_id:ID,$company_id: ID)  {
        deleteCompanyProvider(_id:$_id,company_id:$company_id){
        msg
        status         
    }
}`
