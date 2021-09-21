import React, { Suspense } from 'react'
import { withRouter } from "react-router-dom";
import { Layout, Icon, Form, Input, Button, message, Typography, Row, Col, Select, Checkbox, Radio, Tag, Drawer } from 'antd';
import { GET_CURRENCY,UPDATE_CURRENCY} from '../../../graphql/Admin/currency';
import AdminSider from '../Layout/AdminSider';
import AdminHeader from '../Layout/AdminHeader';
import { client } from "../../../apollo";
import '../../../scss/template.scss';
import '../../../scss/Category.scss';
import { Alert_msg } from '../../Comman/alert_msg';
import size from 'lodash/size'
const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;
class AddCurrency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: "",
            visibleAddress: false,
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
            visible: false,
            company_address: []
        };

    }
    componentDidMount() {
        const { form } = this.props;
        form.resetFields();
        if (this.props.match.params.id !== undefined) {
            this.fetch_find_currency();
        }
    }

    fetch_find_currency = async () => {
        await client.query({
            query: GET_CURRENCY,
            variables: { _id: this.props.match.params.id },
            fetchPolicy: 'no-cache',
        }).then(result => {
            console.log(result);
            this.setState({
                update: 1,
                update_data: result.data.get_currency,
            });
        });
    }

    update_currency = () => {
        const { form, history } = this.props;
        form.validateFields(async (err, values) => {
            if (!err) {
                let currency_data = {}
                if (values['name']) {
                    currency_data['name'] = values['name']
                }
                if (values['code']) {
                    currency_data['code'] = values['code']
                }
                if (values['symbol']) {
                    currency_data['symbol'] = values['symbol']
                }

                if (values['location']) {
                    currency_data['location'] = values['location']
                }
                if (values['country_code']) {
                    currency_data['country_code'] = values['country_code']
                }
                if (values['rate']) {
                    currency_data['rate'] = values['rate']
                }
                let update_data = {}
                if (this.props.match.params.id) {
                    update_data['_id'] = this.props.match.params.id
                }
                if (size(currency_data)) {
                    update_data['currency_data'] = currency_data
                }
               
                await client.mutate({
                    mutation: UPDATE_CURRENCY,
                    variables: update_data
                }).then((result, loading, error) => {
                    this.setState({
                        loading: true
                    })
                    Alert_msg(result.data.update_currency);
                    if (result.data.update_currency.status === "success") {
                        history.push('/admin-currency');
                    }
                });
            }
        });
    };

    render() {
        const { form } = this.props;
        return (
            <>

                <Layout style={{ height: '100vh' }}>
                    <AdminSider update_collapsed={this.state.collapsed} />
                    <Layout>
                        <AdminHeader />
                        <Content className="main_frame">
                            <Row gutter={[24, 24]}>
                                <Col span={24}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Title level={3}>Add Currency</Title>
                                    </div>
                                </Col>
                            </Row>
                            <Form>
                                <Row>
                                    <Col span={12} className="px-3">
                                        {/* left side */}
                                        <Row gutter={12}>
                                            <Col span={24}>
                                                <Form.Item label="Name">
                                                    {form.getFieldDecorator("name", {
                                                        initialValue: this.state.update_data?.name,
                                                        rules: [{ required: true }]
                                                    })(<Input placeholder="Name" />)}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={12}>
                                            <Col span={24}>
                                                <Form.Item label="Location">
                                                    {form.getFieldDecorator("location", {
                                                        initialValue: this.state.update_data?.location,
                                                        rules: [{ required: true }]
                                                    })(<Input placeholder="location" />)}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={12}>
                                            <Col span={24}>
                                                <Form.Item label="Country Code">
                                                    {form.getFieldDecorator("country_code", {
                                                        initialValue: this.state.update_data?.country_code,
                                                        rules: [{ required: true }]
                                                    })(<Input placeholder="Country code" />)}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={12} className="px-3">
                                        <Row gutter={12}>
                                            <Col span={24}>
                                                <Form.Item label="Currency Code">
                                                    {form.getFieldDecorator("code", {
                                                        initialValue: this.state.update_data?.code,
                                                        rules: [{ required: true }]
                                                    })(<Input placeholder="Currency code" />)}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={12}>
                                            <Col span={24}>
                                                <Form.Item label="Currency Rate">
                                                    {form.getFieldDecorator("rate", {
                                                        initialValue: this.state.update_data?.rate,
                                                        rules: [{ required: true }]
                                                    })(<Input placeholder="Currency Rate" />)}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={12}>
                                            <Col span={24}>
                                                <Form.Item label="Currency Symbol">
                                                    {form.getFieldDecorator("symbol", {
                                                        initialValue: this.state.update_data?.symbol,
                                                        rules: [{ required: true }]
                                                    })(<Input placeholder="Currency Symbol" />)}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Form>
                            <Row className="py-3" gutter={12}>
                                <Col span={24} className="justify-content-end d-flex">
                                    <Button type="primary" htmlType="submit" className="mx-3" onClick={() => { this.props.history.push('/admin-currency') }}>
                                        Cancel
                                    </Button>
                                    <Button type="primary" className={this.state.update ? 'd-none' : ''} htmlType="submit" onClick={this.update_currency}>
                                        Submit
                                    </Button>
                                    <Button type="primary" className={this.state.update ? '' : 'd-none'} htmlType="submit" onClick={this.update_currency}>
                                        Update
                                    </Button>
                                </Col>
                            </Row>
                        </Content>
                    </Layout>
                </Layout >
            </>
        );
    }
}

export default Form.create()(AddCurrency);
