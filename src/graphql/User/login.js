import gql from "graphql-tag";

export const CHECK_OPT = gql`
 query CHECKOPT($_id:ID,$otp:String) {
    checkOtp(_id:$_id,otp:$otp) {
        msg
        role
        email
        password
        _id
        name
        demo
        address
        phone_number
        country_code
        phone_no
        location
        img_url
        lat
        lng
        rating
        profile
        status
        user_type
        company_register_status
    }
}`



export const SEND_FORGET_EMAIL = gql`
    query SENDFORGETEMAIL($role:Int,$email:String){
        confirm_email(role:$role,email:$email){
                msg
                status
            }
    }`

export const CHECK_DEMO = gql`
    query CHECKDEMO($_id:ID){
        check_demo_app(_id:$_id){
                msg
                status
            }
    }`

export const EMAIL_LOGIN = gql`
query EMAILLOGIN($role: Int,$email: String,$password: String,$location_code:String){
    sign_up( role: $role
            email: $email
            password: $password
        ){
            msg
            role
            _id
            email
            password
            name
            demo
            address
            phone_number
            country_code
            phone_no
            location
            img_url
            lat
            lng
            rating
            profile
            status
            get_currency(location_code:$location_code) {
                _id
                country_code
                code
                symbol
                location
                msg
                status
            }
        }
}`

export const USERS = gql`
query USER($_id:ID){
    user(_id:$_id){
            msg
            role
            _id
            email
            password
            name
            demo
            address
            phone_number
            country_code
            phone_no
            location
            img_url
            lat
            lng
            rating
            profile
            status
        }
}`

export const RESET_PwD = gql`
  mutation RESETPASSWORD($password:String,$id:ID) {
    reset_password(password:$password,id:$id) {
      msg
      status
    }
  }
`

export const ADD_USER = gql`
    mutation ADDUSER($_id:ID,$user_type:String,$option:String,$location_code:String,$phone_no:String,$role:Int,$location_code:String,$country_code:String,$email:String,$password:String,$first_name:String,$last_name:String,$lng:Float,$lat:Float,$provider_subCategoryID:[ID]){
        addUser(_id:$_id,user_type:$user_type,option:$option,phone_no:$phone_no,role:$role,location_code:$location_code,country_code:$country_code,email:$email,password:$password,last_name:$last_name,first_name:$first_name,lng:$lng,lat:$lat,provider_subCategoryID:$provider_subCategoryID){
            msg
            otp
            status
            _id
            demo
            role
            email
            password
            name
            address
            phone_number
            country_code
            location_code
            phone_no
            location
            img_url
            lat
            lng
            rating
            profile
            user_type
            company_register_status
           company_id
        }
    }
`
export const UPDATE_COMPANY = gql`
    mutation UPDATECOMPANY($_id:ID,$company_data:JSON){
        update_company_detail(_id:$_id,company_data:$company_data){
            msg
            status
            _id
            user_id
            get_currency(location_code:$location_code) {
                _id
                country_code
                code
                symbol
                location
                msg
                status
            }
        }
    }
`

export const UPDATE_IMG = gql`
    mutation UPDATEIMG($_id:ID,$file:Upload){
        update_profile(_id:$_id,file:$file){
            msg
            otp
            status
            _id
            role
            email
            demo
            password
            name
            address
            phone_number
            country_code
            phone_no
            location
            img_url
            lat
            lng
            rating
            profile
        }
    }
`
