import React, { useState } from 'react'
import { Row, Col, Form, Input } from 'antd';
import { useHistory } from "react-router-dom";
const { TextArea } = Input;
const FileUpload = React.lazy(() => import('../../../Comman/FileUpload'));


const ProjectImages = (props) => {
    let history = useHistory();
    const [img_url, setimg_url] = useState("");
    const [user_data, setuser_data] = useState("");
    const [get_all_images, set_get_all_images] = useState([])
    const [loading, setloading] = useState(false);
    const form = props.customform;
    return (
        <>
            <Row>
                <Col span={24}>
                    <Form.Item label="">
                        {form.getFieldDecorator('file', {
                            rules: [],
                            valuePropName: 'fileList',
                        })(
                            <FileUpload
                                custom_content="Upload document"
                                custom_sub_content="eg Documents, Pictures"
                                custom_class="avatar-uploader d-flex justify-content-center px_view"> </FileUpload>
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 40]}>
                <Col span={24}>
                    {
                        get_all_images.length ? get_all_images.map(all_image_items => {
                            return (
                                <div className="pb-3">
                                    <div className='pb-1'>{all_image_items['name']}</div>
                                    <div className="d-flex fileList">
                                        <FileUpload></FileUpload>
                                    </div>
                                </div>
                            )
                        }) : <></>
                    }
                </Col>
            </Row>
        </>
    )
};
export default Form.create()(ProjectImages);
