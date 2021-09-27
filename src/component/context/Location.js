import React from 'react';
const LocationContext = React.createContext({});
const EditLocationContext = React.createContext({});
const settingContext = React.createContext({});
const HomeContext = React.createContext({
    comman_data: {},
    on_book:()=>{},
    set_comman_data: () => {},
});
export  {
    LocationContext,
    EditLocationContext,
    settingContext,
    HomeContext
}