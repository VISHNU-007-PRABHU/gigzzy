import React from 'react';
import { Input } from 'antd';

const CommonSearch = props => {
    const [in_data, setin_data] = React.useState('');
    const onChange = async e => {
        console.log("value", e.target.value)
        setin_data(e.target.value);
        var pass_value = {}
        pass_value[props.value] = { $regex: e.target.value, $options: 'i' };
        props.passedFunction(pass_value);
    }
    return (
        <div>
            <Input
                placeholder={props.placeholder}
                value={in_data}
                className="border"
                allowClear
                onChange={onChange}
            />
        </div>
    )
}

export default CommonSearch;
