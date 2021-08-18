import gql from "graphql-tag";

export const ADMIN_LOGIN = gql`
      mutation ADMINLOGIN($email:String,$password:String) {
            adminLogin(email:$email,password:$password){ 
                  info
                  email
                  password
                  name
                  GizzyDeveloper
                  full_permission_list{
                        name
                        _id
                        key
                  }
            }
      }
`;
