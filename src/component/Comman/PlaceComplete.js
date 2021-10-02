import React, { useState } from "react";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
const PlaceComplete = (props) => {
    const [home_page_city, set_home_page_city] = useState('kenya')
    const [address, set_address] = useState("")

    const handleChange = async value => {
        set_address(value);
    };
    const handleSelect = async address => {
        set_address(address);
        geocodeByAddress(address)
            .then(async results => {
                await getLatLng(results[0]).then(latLng => {
                    results[0].address_components.map((value, index) => {
                        if (value.types[0] === "locality") {
                            props.PlaceCompleteFunction({ home_page_city: value.long_name, center: [latLng.lat, latLng.lng] });
                        }
                    });

                })
            }).catch(error => console.error('Error', error));
    };

    return (
        <>

            <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className="position-relative">
                        <input
                            {...getInputProps({
                                placeholder: 'Location',
                                className: 'location-search-input jiffy_input place_input',
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
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
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
        </>
    )
}
export default PlaceComplete;
