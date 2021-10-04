import React, { useState, useEffect } from 'react'
import { Typography } from 'antd';
const { Title } = Typography;
const ShowCatgeory = (props) => {
    const [catgeory_name, set_category_name] = useState("");
    const [class_name, set_class_name] = useState("");
    const [font_level, set_font_level] = useState(6);
    useEffect(() => {
        if(props.custom_class){
            set_class_name(props.custom_class)
        }
        if(props.custom_font){
            set_font_level(props.custom_font)
        }
        if (props.parent_catgeory && props.parent_catgeory.category_type === 1) {
            set_category_name(props.parent_catgeory.category_name)
        } else if (props.parent_catgeory && props.parent_catgeory.category_type === 2) {
            set_category_name(props.parent_catgeory.subCategory_name)
        }
    }, [props])
    return (<>
        <Title level={font_level} className={class_name}>
            {catgeory_name}
        </Title>
    </>);
};
export default React.memo(ShowCatgeory);