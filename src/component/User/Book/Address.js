import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router";
import { Modal, Icon, Input, Button } from 'antd';
import GoogleMapReact from 'google-map-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import Geocode from "react-geocode";
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import SetAddress from './SetAddress';
import { GoChevronLeft } from "react-icons/go";
import { Alert_msg } from "../../Comman/alert_msg";
import includes from 'lodash/includes'
import { LocationContext, EditLocationContext } from "../../context/Location";
const ADD_ADDRESS = gql`
  mutation add_address($company_id:ID,$location_code:String,$option: Int,$_id:ID,$user_id: String,$title: String,$flat_no: String ,$landmark: String,$address: String,$lat: String,$lng: String ) {
     modified_address(company_id:$company_id,location_code:$location_code,option: $option,_id:$_id,user_id: $user_id,title: $title,flat_no: $flat_no, landmark: $landmark,address: $address,lat: $lat,lng: $lng ) {
        msg
        status
    }
  }
`;

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
const Address = (props) => {
    let location = useLocation();
    const [user_id, setuser_id] = useState("");
    const [address_id, setaddress_id] = useState("");
    const [service_modal, setservice_modal] = useState(false);
    const [draggable, setdraggable] = useState(true);
    const [zoom, setzoom] = useState(15);
    const [address, setaddress] = useState('');
    const [country_code, set_country_code] = useState('');
    const [lat, setlat] = useState(9.9619289);
    const [lng, setlng] = useState(78.1288218);
    const [flat_no, setflat_no] = useState("");
    const [landmark, setlandmark] = useState('');
    const [title, settitle] = useState('Others');
    const [_id, set_id] = useState('');
    const [center, setcenter] = useState([9.9619289, 78.1288218]);
    const [add, setadd] = useState(false);
    const [edit, setedit] = useState(false);

    useEffect(() => {
        let local_user_id = ""
        if(JSON.parse(localStorage.getItem('user'))){
            local_user_id= JSON.parse(localStorage.getItem('user'))._id
        }
        if (props.user_id) {
            setuser_id(props.user_id)
        } else if (local_user_id) {
            setuser_id(local_user_id)
        }
        if(props.address_id){
            setaddress_id(props.address_id) 
        }
    }, [props])
    const [updateTodo] = useMutation(ADD_ADDRESS, {
        refetchQueries: [{ query: GET_ADDRESS, variables: { user_id } }],
        awaitRefetchQueries: true,
    });


    useEffect(() => {
        console.log(props)
        setservice_modal(props.visible);
        setadd(false);
    }, [props])
    const add_new = () => {
        setadd(true);
        setedit(false);
        setflat_no("");
        settitle('Others');
        setlandmark('');
        setaddress("");
    }
    const skip = () => { setadd(false) }
    const handleChange1 = address => { setaddress(address); };
    const handleSelect = address => {
        setaddress(address);
        geocodeByAddress(address)
            .then(results => {
                if (results[0]) {
                    results[0].address_components.map(data => {
                        if (data.types.includes("country")) {
                            set_country_code(data.short_name)
                        }
                    })
                }
                getLatLng(results[0])
            })
            .then(latLng => {
                setlat(latLng.lat);
                setlng(latLng.lng);
                setcenter([latLng.lat, latLng.lng])
            })
            .catch(error => console.error('Error', error));
    };

    const _onChange = ({ center, zoom }) => {
        setcenter(center);
        setzoom(zoom);
    };

    const onCircleInteraction = async (childKey, childProps, mouse) => {
        // function is just a stub to test callbacks
        setdraggable(false);
        setlat(mouse.lat);
        setlng(mouse.lng);
        Geocode.setApiKey("AIzaSyDYRYnxipjEBUNazDUwUa_8BDvm8ON7TIk");
        // Get address from latidude & longitude.
        await Geocode.fromLatLng(mouse.lat, mouse.lng).then(
            response => {
                console.log("onCircleInteraction -> response", response)
                if (response.results[0].address_components) {
                    response.results[0].address_components.map(data => {
                        if (data.types.includes("country")) {
                            set_country_code(data.short_name)
                        }
                    })
                }
                const address = response.results[0].formatted_address;
                setaddress(address);
            },
            error => {
                console.error(error);
            })
    };

    const onCircleInteraction3 = (childKey, childProps, mouse) => {
        setdraggable(true);
    };

    const add_data = (value) => {
        console.log(value);
        var data = {
            option: 1,
            user_id: JSON.parse(localStorage.getItem('user'))._id,
            title: title,
            flat_no: flat_no,
            landmark: landmark,
            address: address,
            lat: String(lat),
            lng: String(lng),
            location_code:country_code
        };
        console.log(data)
        if(props.company){
            data['company_id'] = localStorage.getItem('user_company_id')
        }
        if (data.lat === null || data.lat === '' || data.lng === '' || data.lng === null || data.address === '' || data.address === null || data.user_id === '' || data.user_id === null || data.title === '' || data.title === null) {

            Alert_msg({ msg: "Please add mandatory field", status: 'failed' })
        } else {
            updateTodo({ variables: data }).then(results => {
                if (results.data.modified_address.status === 'success') {
                    let url_value=['/profile','/login']
                    if (!includes(url_value,location.pathname.split('/')[1])) {
                        value.location_change(data);
                    }
                    Alert_msg({ msg: "Address saved", status: "success" });
                } else {
                    Alert_msg({ msg: "Address not saved", status: "failed" });
                }
            });
        }
    }

    const edit_data = (value) => {
        var data = {
            option: 2,
            _id: _id,
            title: title,
            flat_no: flat_no,
            landmark: landmark,
            address: address,
            lat: String(lat),
            lng: String(lng),
            location_code:country_code
        };
        console.log(data)
        if(props.company){
            console.log("edit_data -> props.company", props.company)
            data['company_id'] = localStorage.getItem('user_company_id')
        }
        if (data.lat !== null && data.lat !== '' && data.lng !== '' && data.lng !== null && data.address !== '' && data.address !== null && data._id !== '' && data._id !== null && data.title !== '' && data.title !== null) {
            updateTodo({ variables: data }).then(results => {
                if (results.data.modified_address.status === 'success') {
                    if (location.pathname !== '/profile' && location.pathname !== '/login') {
                        value.location_change(data);
                    }
                    Alert_msg({ msg: "Address update saved", status: "success" });
                } else {
                    Alert_msg({ msg: "Address not update", status: "failed" });
                }
            });
        } else {
            Alert_msg({ msg: "Please add mandatory field", status: 'failed' })
        }
    }

    const edit_location = (item) => {
        console.log(item);
        set_id(item._id);
        setadd(true);
        setedit(true);
        setaddress(item.address);
        setlat(item.lat);
        setlng(item.lng);
        settitle(item.title);
        setlandmark(item.landmark);
        setflat_no(item.flat_no);
        setlat(Number(item.lat));
        setlng(Number(item.lng));
        setcenter([Number(item.lat), Number(item.lng)])
    }

    return (
        <LocationContext.Consumer>
            {
                (value) => {
                    return (
                        <EditLocationContext.Provider value={{ location_edit: edit_location, no_data: add_new }}>
                            <div>
                                <Modal
                                    title="Set Location"
                                    className="new_modal maping"
                                    centered
                                    visible={service_modal}
                                    onOk={() => setservice_modal(false)}
                                    onCancel={() => setservice_modal(false)}
                                    footer={
                                        add === false ?
                                            <Button value="large" type="dashed" onClick={add_new} className="w-100" style={{ borderRadius: '17px' }}>
                                                Add New Address
                                            </Button> :
                                            <>
                                                <div className="my-2 no_color d-flex justify-content-between">
                                                    <div>
                                                        Set location
                                                    </div>
                                                    <div className='primary_color'>
                                                        <Button className='primary_color' type="link" onClick={skip}>
                                                            <GoChevronLeft />  skip
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="my-2">
                                                    <div className="d-flex">
                                                        <span className='m-1 primary_error'>*</span>
                                                        <PlacesAutocomplete
                                                            value={address}
                                                            onChange={handleChange1}
                                                            onSelect={handleSelect}
                                                        >
                                                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                                <div className="position-relative w-100">
                                                                    <input
                                                                        {...getInputProps({
                                                                            placeholder: 'Location',
                                                                            icon: 'eye',
                                                                            className: 'location-search-input jiffy_input place_input loc_img'
                                                                        })}
                                                                    />
                                                                    <div className="autocomplete-dropdown-container">
                                                                        {loading && <div className="suggest_load">Loading...</div>}
                                                                        {suggestions.map(suggestion => {
                                                                            const className = suggestion.active
                                                                                ? 'suggestion-item--active'
                                                                                : 'suggestion-item';
                                                                            // inline style for demonstration purpose
                                                                            const style = suggestion.active
                                                                                ? { backgroundColor: '#fafafa', cursor: 'pointer', display: 'flex' }
                                                                                : { backgroundColor: '#ffffff', cursor: 'pointer', display: 'flex' };
                                                                            return (
                                                                                <div
                                                                                    {...getSuggestionItemProps(suggestion, {
                                                                                        className,
                                                                                        style,
                                                                                    })}
                                                                                >
                                                                                    <span>{suggestion.description}</span>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </PlacesAutocomplete>
                                                    </div>
                                                    <div className="my-2 ml-3">
                                                        <Input size='large' value={flat_no} placeholder="Enter Flat No" onChange={(event) => { setflat_no(event.target.value) }} />
                                                    </div>
                                                    <div className="my-2 ml-3">
                                                        <Input size='large' value={landmark} placeholder="Enter LandMark" onChange={(event) => { setlandmark(event.target.value) }} />
                                                    </div>
                                                    <div className={title !== "Home" && title !== "Work" ? "my-2 d-flex" : "d-none"}>
                                                        <span className='m-1 primary_error'>*</span>
                                                        <Input size='large' value={title} placeholder="Enter title" onChange={(event) => { settitle(event.target.value) }} />
                                                    </div>
                                                    <div className="my-2 d-flex justify-content-around">
                                                        <Button className={title === 'Home' ? "d-flex primary_color" : "d-flex no_color"} type="link" onClick={() => { settitle("Home") }} >
                                                            <Icon type="home" /> Home
                                                        </Button>
                                                        <Button className={title === 'Work' ? "d-flex primary_color" : "d-flex no_color"} type="link" onClick={() => { settitle('Work') }} >
                                                            <Icon type="shop" />Work
                                                        </Button>
                                                        <Button className={title !== "Home" && title !== "Work" ? "d-flex primary_color" : "d-flex no_color"} type="link" onClick={() => { settitle('Others') }} >
                                                            <Icon type="security-scan" />Others
                                                        </Button>
                                                    </div>
                                                    <div className="my-2">
                                                        {edit === true ?
                                                            <Button type="primary" block onClick={() => { edit_data(value) }}>
                                                                Update & Proceed
                                                            </Button>
                                                            :
                                                            <Button type="primary" block onClick={() => { add_data(value) }}>
                                                                Save & Proceed
                                                            </Button>
                                                        }
                                                    </div>
                                                </div>
                                            </>
                                    }
                                >
                                    {add === false ? <div className="d-block map_modal">
                                        <SetAddress user_id={user_id} address_id={address_id}/>
                                    </div> :
                                        <div className="d-block maps_modal">
                                            <div style={{ height: '30vh', width: '100%' }}>
                                                <GoogleMapReact
                                                    draggable={draggable}
                                                    onChange={_onChange}
                                                    center={center}
                                                    zoom={zoom}
                                                    onChildMouseDown={onCircleInteraction}
                                                    onChildMouseUp={onCircleInteraction3}
                                                    onChildMouseMove={onCircleInteraction}
                                                >
                                                    <div
                                                        className="place"
                                                        lat={lat}
                                                        lng={lng}>
                                                        <img src={require("../../../image/pin_location.png")} alt="your Place" />
                                                    </div>
                                                </GoogleMapReact>
                                            </div>
                                            {/* <AddressMap center={center} lat={lat} lng={lng}  onChange={child_data}/> */}
                                        </div>
                                    }

                                    {/* <AddAddress /> */}
                                </Modal>
                            </div>
                        </EditLocationContext.Provider>
                    )
                }
            }
        </LocationContext.Consumer>
    )
}

export default Address;

