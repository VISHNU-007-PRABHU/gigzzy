import React,{useState,useEffect} from 'react'
import { useLocation } from "react-router";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Icon, Empty, List, Skeleton, Button } from 'antd';
import gql from 'graphql-tag';
import { LocationContext, EditLocationContext } from '../../context/Location'
import { Alert_msg } from "../../Comman/alert_msg";
import size from 'lodash/size'
import includes from 'lodash/includes'

const GET_ADDRESS = gql`
query ADDRESS($user_id: ID) {
  user_address(user_id: $user_id) {
      _id
    title
    flat_no
    landmark
    address
    lat
    lng
    location_code
  }
}
`;

const DELETE_ADDRESS = gql`
  mutation delete_address($option: Int,$_id: ID) {
     modified_address(option:$option,_id:$_id ) {
        msg
        status
    }
  }
`;



const SetAddress = (props) => {
    let location = useLocation();
    const [user_id, setuser_id] = useState("");
    useEffect(() => {
        console.log("SetAddress -> props", props)
        if (props['user_id']) {
            setuser_id(props['user_id'])
        } else if(JSON.parse(localStorage.getItem('user'))){
            setuser_id(JSON.parse(localStorage.getItem('user'))._id)
        }

    }, [props])
    const { loading, error, data } = useQuery(GET_ADDRESS, {
        variables: { user_id: user_id },
    });
    const [delete_address, { loading: removeLoading }] = useMutation(DELETE_ADDRESS, {
        refetchQueries: [{ query: GET_ADDRESS, variables: { user_id:user_id} }],
        awaitRefetchQueries: true,
    });

    if (loading) return <Skeleton />;
    if (removeLoading) return <Skeleton />;
    if (error) return `Error! ${error.message}`;

    //  delete saved address 
    const delete_data = (item) => {
        console.log(item)
        var data = {
            option: 3,
            _id: item._id,
        };
        delete_address({ variables: data }).then(results => {
            console.log(results)
            if (results.data.modified_address.status === 'success') {
                Alert_msg({ msg: "Delete success", status: "success" });
            } else {
                Alert_msg({ msg: "Delete failed", status: "failed" });
            }
        });
    }
    const loader = (values) => {
        if(values && size(values)){
            values.no_data();
        }
    }

    return (
        <LocationContext.Consumer>
            {
                (value) => {
                    return (
                        <EditLocationContext.Consumer>
                            {
                                (values) => {
                                    values.no_data(data.user_address)
                                    return (
                                        <>
                                            {data.user_address.length === 0 ?
                                                <>
                                                    {loader(values)}
                                                    <Empty className="m-5" description={false} />
                                                </> :
                                                <>
                                                    <List
                                                        className={(includes(['contract_booking'],location.pathname.split('/')[1]))?'contract_saved_address_list':''}
                                                        itemLayout="horizontal"
                                                        dataSource={data.user_address}
                                                        renderItem={item => (
                                                            <List.Item
                                                                className={props && props.address_id && props.address_id==item._id ?'cursor_point table-active':'cursor_point'}
                                                                actions={[
                                                                    <Button type="link primary_color d-flex" size="small"
                                                                        onClick={() => { values.location_edit(item) }} >
                                                                        <Icon type="edit" /> Edit
                                                                    </Button>,
                                                                    <Button type="link primary_color d-flex" size="small" onClick={() => { delete_data(item) }}>
                                                                        <Icon type="delete" /> Delete
                                                                    </Button>
                                                                ]}
                                                            >
                                                                <Skeleton avatar title={true} loading={item.loading} active>
                                                                    <List.Item.Meta
                                                                        onClick={() => {
                                                                            let url_value=['profile']
                                                                            let url_value_contract=['contract_booking']
                                                                            if (includes(['contract_booking'],location.pathname.split('/')[1])) {
                                                                                value.location_change(item);
                                                                            }
                                                                            else if (!includes(url_value,location.pathname.split('/')[1])) {
                                                                                value.location_change(data);
                                                                            }
                                                                            
                                                                        }}
                                                                        avatar={item.title === 'Work' ?
                                                                            <Icon className="f_25 ml-3 mt-1" type="shop" /> :
                                                                            item.title === 'Home' ? <Icon className="f_25 ml-3 mt-1" type="home" /> :
                                                                                <Icon className="f_25 ml-3 mt-1" type="security-scan" />}
                                                                        title={item.title}
                                                                        description={item.address}
                                                                    />
                                                                </Skeleton>
                                                            </List.Item>
                                                        )}
                                                    />

                                                </>
                                            }
                                        </>
                                    )
                                }}
                        </EditLocationContext.Consumer>
                    )
                }}
        </LocationContext.Consumer >

    );
}

export default SetAddress;
