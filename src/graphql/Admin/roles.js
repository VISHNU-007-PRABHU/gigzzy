import gql from "graphql-tag";

export const GET_ADMIN_USER = gql`
 query GETADMINUSER($limit: Int,$page:Int) {
    get_admin_users(limit:$limit,page:$page) {
        pageInfo{
            totalDocs
            page
        }
        data{
            _id
            name
            email
            permissions
            roles
            admin_role_detail{
                name
                msg
            }
            individual_based_permissions_detail{
                _id
                name
                key
            }
            role_based_permissions_detail {
                _id
                permission {
                    _id
                    name
                    key
                }
            }
        }
    }
}
`;

export const FIND_ADMIN_USER = gql`
 query FINDADMINUSER($_id: ID) {
    get_admin_users(_id:$_id) {
        data{
            _id
            name
            email
            password
            permissions
            roles_permissions
            roles
            admin_role_detail{
                name
                msg
            }
            get_admin_roles_all{
                _id
                name
            }
            non_role_permissions_detail{
				_id
                name
                key
            }
     
            individual_based_permissions_detail{
                _id
                name
                key
            }
            role_based_permissions_detail {
                _id
                permission {
                    _id
                    name
                    key
                }
            }
        }
    }
}
`;

export const GET_ADMIN_ROLES = gql`
 query GETADMINROLES($limit: Int,$page:Int,$_id:ID) {
    get_admin_roles(limit:$limit,page:$page,_id:$_id) {
        pageInfo{
            totalDocs
            page
        }
        data{
            _id
        name
        key
        admin_type
        permissions
        role_based_permissions_detail {
          _id
          permission {
            _id
            name
            key
          }
        }
        }
    }
}
`;



export const GET_ADMIN_PERMISSION = gql`
 query GETADMINPERMISSION($limit: Int,$page:Int) {
    get_admin_permission(limit:$limit,page:$page) {
        pageInfo{
            totalDocs
            page
        }
        data{
            _id
            count
            permission {
                _id
                name
                key
                is_delete
                type
            }
        }
    }
}
`;


export const GET_FETCH_ADMIN_PERMISSION = gql`
 query GETFETCHADMINPERMISSION{
    get_all_admin_permission {
        _id
        name
        key
        is_delete
        type
    }
}
`;

export const ADD_ADMIN_ROLE = gql`
    mutation ADDADMINROLE($name:String,$key:String,$admin_type:Int)  {
        add_admin_roles(name:$name,key:$key,admin_type:$admin_type){
            status
            msg
            name
            key
            _id
    }
}`
export const ADD_ADMIN_PERMISSION = gql`
    mutation ADDADMINPERMISSION($_id: ID,$name:String,$key:String,$type:String)  {
        add_admin_permission(_id:$_id,name:$name,key:$key,type:$type){
            status
            msg
            name
            key
            _id
    }
}`


export const UPDATE_ADMIN_ROLE = gql`
    mutation UPDATEADMINROLE($_id:ID,$fun_type:String,$permissions:[ID])  {
        update_admin_roles(_id:$_id,fun_type:$fun_type,permissions:$permissions){
            status
            msg
            name
            key
            _id
    }
}`

export const DELETE_ADMIN_USER = gql`
    mutation DELETEADMINUSER($_id: ID)  {
        delete_admin_user(_id:$_id){
            status
            msg
    }
}`
export const DELETE_ADMIN_PERMISSION = gql`
    mutation DELETEADMINPERMISSION($_id: ID)  {
        delete_admin_permission(_id:$_id){
            status
            msg
    }
}`

export const DELETE_ADMIN_ROLES = gql`
    mutation DELETEADMINROLES($_id: ID)  {
        delete_admin_roles(_id:$_id){
            status
            msg
    }
}`

export const UPDATE_ADMIN_USER_PERMISSION = gql`
    mutation UPDATEADMINUSERPERMISSION($_id:ID,$name:String,$email:String,$password:String,$permissions:[ID],$roles:ID,$roles_permissions:[ID])  {
        update_admin_user_permission(_id:$_id,name:$name,email:$email,password:$password,permissions:$permissions,roles:$roles,roles_permissions:$roles_permissions){
            status
            msg
            _id
    }
}`



export const SEARCH_ADMIN = gql`
query SEARCHADMIN($data:JSON) {
    admin_search(data:$data) {
        _id
        email
        name
        roles
        admin_role_detail{
            name
            msg
        }
    }
}
`;

export const SEARCH_ROLE = gql`
query SEARCHROLE($data:JSON) {
    roles_search(data:$data) {
        _id
        name
        key
    }
}
`;
