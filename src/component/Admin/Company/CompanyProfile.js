import { Button, Checkbox, Col, Form, Icon, Input, Layout, message, Radio, Row, Select, Tag, Typography } from 'antd';
import Card from 'antd/es/card';
import Table from 'antd/es/table';
import Upload from 'antd/es/upload';
import size from 'lodash/size';
import React, { Suspense } from 'react';
import { withRouter } from "react-router-dom";
import { client } from "../../../apollo";
import { GET_COMPANY, UPDATE_COMPANY_DETAIL, USER_EMAIL_QUERY } from '../../../graphql/Admin/user';
import '../../../scss/Category.scss';
import '../../../scss/template.scss';
import { Alert_msg } from '../../Comman/alert_msg';
import RoleView, { RoleViewFunction } from '../../Comman/roles_permission_view';
import AdminHeader from '../Layout/AdminHeader';
import AdminSider from '../Layout/AdminSider';
const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;
let id = 0;
const CompanyWorker = React.lazy(() => import('./CompanyWorker'));
class ProfileCompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            dataSource: [],
            loading: false,
            imageUrl: '',
            profile_imageUrl: '',
            update: 0,
            update_data: {},
            file: {},
            logo_file: {},
            profile_file: {},
            previewVisible: false,
            previewImage: '',
            pagination: {
                pageSize: 5,
                current: 1,
                total: 0,
                simple: true,
            },
            selectedItems: [],
            category: [],
            emails: [],
            company_provider: [],
        };

    }
    componentDidMount() {
        const { form } = this.props;
        form.resetFields();
        // console.log(this.props.match.params.id);
        if (this.props?.match?.params?.id !== undefined) {
            this.fetch_find_company();
        }
    }

    fetch_find_company = async () => {
        await client.query({
            query: GET_COMPANY,
            variables: { company_id: this.props.match.params.id },
            fetchPolicy: 'no-cache',
        }).then(result => {
            console.log(result);
            this.setState({
                update: 1,
                update_data: result.data.get_company_detail.data[0],
                company_provider: result.data.get_company_detail.data[0].get_parent_company_provider,
            });
        });
    }
    SearchEmail = async (value) => {
        let data = { 'email': { $regex: '.*' + value + '.*', $options: 'i' }, role: 2 }
        await client.query({
            query: USER_EMAIL_QUERY,
            variables: { data },
            fetchPolicy: 'no-cache',
        }).then(result => {
            console.log(result);
            this.setState({
                emails: result.data.user_search,
            });
        });
    }

    normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }


    handle_logo_Change = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status) {
            console.log(info.file.originFileObj);
            this.setState({ logo_file: info.file.originFileObj });
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    handle_profile_Change = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status) {
            console.log(info.file.originFileObj);
            this.setState({ profile_file: info.file.originFileObj });
            this.getBase64(info.file.originFileObj, profile_imageUrl =>
                this.setState({
                    profile_imageUrl,
                    loading: false,
                }),
            );
        }
    };

    update_company = () => {
        const { form, history } = this.props;
        form.validateFields(async (err, values) => {
            if (!err) {
                let company_data = {}
                if (values['name']) {
                    company_data['name'] = values['name']
                }
                if (values['about']) {
                    company_data['about'] = values['about']
                }
                if (values['website_url']) {
                    company_data['website_url'] = values['website_url']
                }
                if (values['address']) {
                    company_data['address'] = values['address']
                }
                if (values['provider_email'] && values['provider_email'].length) {
                    company_data['provider_email'] = values['provider_email']
                }
                let update_data = {}
                if (this.props.match.params.id) {
                    update_data['_id'] = this.props.match.params.id
                }
                if (size(company_data)) {
                    update_data['company_data'] = [[company_data]]
                }
                if (this.state.logo_file && size(this.state.logo_file)) {
                    update_data['logo_file'] = this.state.logo_file
                }
                if (this.state.profile_file && size(this.state.profile_file)) {
                    update_data['profile_file'] = this.state.profile_file
                }
                await client.mutate({
                    mutation: UPDATE_COMPANY_DETAIL,
                    variables: update_data
                }).then((result, loading, error) => {
                    Alert_msg(result.data.update_company_detail);
                    if (result.data.update_company_detail.status === "success") {
                        history.push('/admin-company');
                    }
                });
            }
        });
    };


    remove = k => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { keys, names } = values;
                console.log('Received values of form: ', values);
                console.log('Merged values:', keys.map(key => names[key]));
            }
        });
    };


    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Form.Item
                label={index === 0 ? 'Passengers' : ''}
                required={false}
                key={k}
            >
                {getFieldDecorator(`names[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "Please input passenger's name or delete this field.",
                        },
                    ],
                })(<Input placeholder="passenger name" style={{ width: '100%', marginRight: 8 }} />)}
                {keys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </Form.Item>
        ));
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { form } = this.props;
        return (
            <Form onSubmit={this.handleSubmit}>
                {formItems}
                <Form.Item >
                    <Button type="dashed" onClick={this.add} style={{ width: '100%' }}>
                        <Icon type="plus" /> Add field
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

        );
    }
}

export default Form.create()(ProfileCompany);
