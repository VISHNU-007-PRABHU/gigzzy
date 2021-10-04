import React, { useState, useEffect } from 'react';
import { UserContext } from "../context/Location";
import find from 'lodash/find';
import size from 'lodash/size';

const RoleView = (props) => {
    let data = localStorage.getItem('hokjighsasd')
    const user = JSON.parse(window.atob(data))
    const [PermissionAllow, setPermissionAllow] = useState(false);
    const [GizzyDeveloper, setGizzyDeveloper] = useState(false);

    useEffect(() => {
        setGizzyDeveloper(user['GizzyDeveloper'] || false)
        // if (user && user['full_permission_list'] && props.permission) {
        //     let data = find(user['full_permission_list'], { key: props.permission })
        //     if (size(data) || GizzyDeveloper) {
        //         setPermissionAllow(true)
        //     }
        // } else {
            setPermissionAllow(true)
        // }
    }, [props.permission])
    if (PermissionAllow) {
        return (
            <div>{props.children}</div>
        )
    } else {
        return (
            <div></div>
        )
    }
};
export default RoleView;


export const RoleViewFunction = (permission) => {
    let data = localStorage.getItem('hokjighsasd')
    const user = JSON.parse(window.atob(data))
    let func_data = false
    let GizzyDeveloper = user['GizzyDeveloper'] || false

    if (user && user['full_permission_list'] && permission) {
        let data = find(user['full_permission_list'], { key: permission })
        if (size(data) || GizzyDeveloper) {
            func_data = true
        }
    }
    else {
        func_data = true
    }
    return true
};