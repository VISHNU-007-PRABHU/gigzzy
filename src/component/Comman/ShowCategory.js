import React, { useState, useEffect } from 'react'
import { Typography } from 'antd';
const { Title } = Typography;
const ShowCatgeory = (props) => {
    console.log("ShowCatgeory -> props", props)
    const [catgeory_name, set_category_name] = useState("");
    useEffect(() => {
        if (props.parent_catgeory && props.parent_catgeory.category_type === 1) {
            set_category_name(props.parent_catgeory.catgeory_name)
        } else if (props.parent_catgeory && props.parent_catgeory.category_type === 2) {
            set_category_name(props.parent_catgeory.subCategory_name)
        }
    }, [props])
    return (<>
        <Title level={4} className="font-weight-light m-0 text-success">
            {catgeory_name}
        </Title>
    </>);
};
export default React.memo(ShowCatgeory);