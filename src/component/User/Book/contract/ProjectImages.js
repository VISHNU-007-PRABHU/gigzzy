import React, { useState, useEffect, Suspense } from 'react'
import { Row, Col, Form, Input, Card, Icon, Popconfirm, Modal, Skeleton } from 'antd';
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { UPDATE_CONTRACT_FILE, GET_CONTRACT_FILES, DELETE_CONTRACT_FILE } from '../../../../graphql/User/contract';
const { TextArea } = Input;
const FileUpload = React.lazy(() => import('../../../Comman/FileUpload'));
const ProjectImagesCategoryModel = React.lazy(() => import('./ProjectImageCategoryModel'));

const ProjectImages = (props) => {
    let history = useHistory();
    const [hide_common_upload, set_hide_common_upload] = useState(false);
    const [user_data, setuser_data] = useState("");
    const [VisibleImageCategory, set_VisibleImageCategory] = useState(false);

    const [get_all_images_data, set_get_all_images] = useState([])
    const [image_comman_data, set_image_comman_data] = useState({})
    const [loading, setloading] = useState(false);
    const [ContractJobFileUpload, { }] = useMutation(UPDATE_CONTRACT_FILE)
    const [DeleteContractJobFile, { }] = useMutation(DELETE_CONTRACT_FILE)
    const get_contract_files = useQuery(GET_CONTRACT_FILES)
    const form = props.customform;

    useEffect(() => {
        if (props.hide_common_upload) {
            set_hide_common_upload(props.hide_common_upload)
        }
        fetch_data();
    }, [props])

    const fetch_data = async () => {
        let data = await get_contract_files.refetch({ contract_id: localStorage.getItem('current_contract_id') })
        if (data && data.data && data.data.get_contract_files && data.data.get_contract_files.length) {
            set_get_all_images(data && data.data.get_contract_files)
        }
    }
    const onFileUpload = async (files, category = "others") => {
        let input_data = {
            contract_id: localStorage.getItem('current_contract_id'),
            file: [files],
        }
        if (category) {
            input_data['category'] = category
        }
    
        let final_data = await ContractJobFileUpload({ variables: input_data })
        if (final_data.data.ContractJobFileUpload.status === "success") {
            fetch_data()
        }
    }
    const showImageModel = async (data) => {
        set_image_comman_data(data)
        set_VisibleImageCategory(true)
    }
    const modelReturnFuncion = async () => {
        set_VisibleImageCategory(false)
        fetch_data()
    }
    const delete_contract_images = async (_id) => {
        let input_data = { _id }
        let remove_data = await DeleteContractJobFile({ variables: input_data })
        console.log("delete_contract_images -> input_data", input_data)
        fetch_data()
    }
    return (
        <>
            <Row className={hide_common_upload ? "d-none" : ""}>
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
                                <Card className="mb-2 bg-light" headStyle={{ "padding": "0px 10px" }} title={<div className="d-flex justify-content-between align-items-center">
                                    <div>{all_image_items['_id']}</div>
                                    <div>
                                        <FileUpload onFileUpload={onFileUpload} custom_category={all_image_items['_id']} custom_class="contract_header_images"
                                        ></FileUpload>
                                    </div>
                                </div>
                                }>
                                    {all_image_items.images.map(image_data => {
                                        return (
                                            <Card.Grid className="imgHolder position-relative p-0 w-25 " onClick={() => { showImageModel(image_data) }}>
                                                <img loading="lazy" className="img-fluid loading h-100" src={image_data.small_image} />
                                                <span className="tags bold">{image_data.image_tag}</span>
                                                <Popconfirm title="Sure to delete this image ?" onConfirm={() => delete_contract_images(image_data._id)}>
                                                    <span className="delete"><Icon type="delete" theme="twoTone" twoToneColor="#52c41a" className='f_25' /></span>
                                                </Popconfirm>
                                            </Card.Grid>)
                                    })}
                                </Card>
                            )
                        }) : <></>
                    }
                </Col>
            </Row>
            <Modal footer={null} centered visible={VisibleImageCategory} onCancel={() => { set_VisibleImageCategory(false) }}>
                <Suspense fallback={<Skeleton active />}>
                    <ProjectImagesCategoryModel modelReturnFuncion={modelReturnFuncion} image_comman_data={image_comman_data} />
                </Suspense>
            </Modal>
        </>
    )
};
export default Form.create()(ProjectImages);
