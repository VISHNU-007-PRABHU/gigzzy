import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Input, Card } from 'antd';
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { UPDATE_CONTRACT_FILE, GET_CONTRACT_FILES } from '../../../../graphql/User/contract';
const { TextArea } = Input;
const FileUpload = React.lazy(() => import('../../../Comman/FileUpload'));


const ProjectImages = (props) => {
    let history = useHistory();
    const [img_url, setimg_url] = useState("");
    const [user_data, setuser_data] = useState("");
    const [get_all_images_data, set_get_all_images] = useState([])
    const [loading, setloading] = useState(false);
    const [ContractJobFileUpload, { }] = useMutation(UPDATE_CONTRACT_FILE)
    const get_contract_files = useQuery(GET_CONTRACT_FILES)
    const form = props.customform;

    useEffect(() => {
        fetch_data();
    }, [props])

    const fetch_data = async () => {
        let data = await get_contract_files.refetch({ contract_id: localStorage.getItem('current_contract_id') })
        if (data && data.data && data.data.get_contract_files && data.data.get_contract_files.length) {
            set_get_all_images(data && data.data.get_contract_files)
        }
    }
    const onFileUpload = async (files) => {
        let input_data = {
            contract_id: localStorage.getItem('current_contract_id'),
            file: [files],
        }
        let final_data = await ContractJobFileUpload({ variables: input_data })

    }
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
                                onFileUpload={onFileUpload}
                                custom_sub_content="eg Documents, Pictures"
                                custom_class="avatar-uploader d-flex justify-content-center px_view"> </FileUpload>
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 40]}>
                <Col span={24}>
                    {
                        get_all_images_data.length ? get_all_images_data.map(all_image_items => {
                            return (
                                <Card headStyle={{"padding":"0px 10px"}} title={<div className="d-flex justify-content-between align-items-center">
                                    <div>{all_image_items['_id']}</div>
                                    <div>
                                        <FileUpload custom_content="" custom_class="contract_header_images"
                                        ></FileUpload>
                                    </div>
                                </div>
                                }>
                                    {all_image_items.images.map(image_data => {
                                        return (
                                            <Card.Grid className="imgHolder position-relative p-0 w-25">
                                                <img loading="lazy" className="img-fluid loading h-100" src={image_data.small_image} />
                                                <span className="bold">text</span>
                                            </Card.Grid>)
                                    })}
                                </Card>
                            )
                        }) : <></>
                    }
                </Col>
            </Row>

        </>
    )
};
export default Form.create()(ProjectImages);
