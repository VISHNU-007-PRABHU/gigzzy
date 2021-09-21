
import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Input, Radio, Select } from 'antd';
import { useMutation, useQuery } from '@apollo/react-hooks';
import useReactRouter from 'use-react-router';
import { GET_CURRENCY_PAGINATION } from '../../../graphql/Admin/currency'
const { Option } = Select;

const MultiCurrencyFrom = (props) => {
    const form = props.form
    const { history, match } = useReactRouter();
    const [update_data, set_update_data] = useState({});
    const [currency, set_currency] = useState([]);
    const [price_type, set_price_type] = useState("hour");
    const get_currencys = useQuery(GET_CURRENCY_PAGINATION);

    useEffect(() => {
        getCurrencyResponse();
        if(props.data){
            set_update_data(props.data)
        }
    }, [])

    const getCurrencyResponse=async()=>{
        let ids=[]
        props.currency_data.forEach(element => {
            ids.push(element.currency_id)
        });
        let inputdata={}
        if(ids.length){
            inputdata['search'] = {'$ne':ids}
        }
        let finaldata = await get_currencys.refetch(inputdata)
        set_currency(finaldata.data.get_currencys.data)
    }
    const onPriceTypeChange = (e) => {
        set_price_type(e.target.value)
    }
    return (
        <>
            <Row gutter={12}>
                <Col>
                    <Form.Item label="Choose Currency">
                        {form.getFieldDecorator("currency_id", {
                            initialValue: update_data.currency_id,
                            rules: [{ required: true }]
                        })(<Select
                            disabled={props?.currency_disable}
                            style={{ width: "-webkit-fill-available" }}
                        >
                            {currency.length && currency.map(data => {
                                return (
                                    <Option key={data?._id}>{data?.country_code}</Option>
                                )
                            })}
                        </Select>)}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Radio.Group name="price_type" onChange={onPriceTypeChange} value={price_type}>
                    <Radio value={"hour"}>Per hour</Radio>
                    <Radio value={"day"}>Per day</Radio>
                    <Radio value={"job"}>Per job</Radio>
                </Radio.Group>
            </Row>
            <Row className="py-3" gutter={12}>
                <Row gutter={12} className={price_type === "hour" ? "d-flex" : "d-none"}>
                    <Col className="" lg={12}>
                        <Form.Item label="Limit (Per hour)">
                            {form.getFieldDecorator("hour_limit", {
                                initialValue: update_data.hour_limit,
                                rules: [{ required: false, message: 'Hour Limit is required' }]
                            })(<Input placeholder="Limit (Per hour)" />)}
                        </Form.Item>
                    </Col>
                    <Col className="" lg={12}>
                        <Form.Item label="Price (Per hour price)">
                            {form.getFieldDecorator("hour_price", {
                                initialValue: update_data.hour_price,
                                rules: [{ required: false }]
                            })(<Input placeholder="Price (Per hour price)" />)}
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={12} className={price_type === "day" ? "d-flex" : "d-none"}>
                    <Col className="" lg={12}>
                        <Form.Item label="Limit (Per day)">
                            {form.getFieldDecorator("day_limit", {
                                initialValue: update_data.day_limit,
                                rules: [{ required: false, message: 'Day Limit is required' }]
                            })(<Input placeholder="Limit (Per day)" />)}
                        </Form.Item>
                    </Col>
                    <Col className="" lg={12}>
                        <Form.Item label="Price (Per day price)">
                            {form.getFieldDecorator("day_price", {
                                initialValue: update_data.day_price,
                                rules: [{ required: false }]
                            })(<Input placeholder="Price (Per day price)" />)}
                        </Form.Item>
                    </Col>
                </Row>
                <Col className="" lg={12}>
                    <Form.Item label="Basic Price">
                        {form.getFieldDecorator("base_price", {
                            initialValue: update_data.base_price,
                            rules: [{ required: true }]
                        })(<Input placeholder="Basic Price" />)}
                    </Form.Item>
                </Col>
                <Col className="" lg={12}>
                    <Form.Item label="Service Fee">
                        {form.getFieldDecorator("service_fee", {
                            initialValue: update_data.service_fee,
                            rules: [{ required: true, message: 'Service Fee is required' }]
                        })(<Input placeholder="service Fee" addonAfter="%" />)}
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
};
export default Form.create()(MultiCurrencyFrom);
