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

export const GET_ADMIN_ROLES = gql`
 query GETADMINROLES($limit: Int,$page:Int) {
    get_admin_roles(limit:$limit,page:$page) {
        pageInfo{
            totalDocs
            page
        }
        data{
            _id
        name
        key
        admin_type
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
