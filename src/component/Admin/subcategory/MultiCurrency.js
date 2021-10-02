import React, { useState, useEffect, Suspense } from 'react'
import { Collapse, Form, Typography, Skeleton, Icon, Button, Modal,Popconfirm } from 'antd';
import { UPDATE_CATEGORY_CURRENCY,REMOVE_CATEGORY_CURRENCY } from "../../../graphql/Admin/sub_category";
import { useMutation, useQuery } from '@apollo/react-hooks';
import useReactRouter from 'use-react-router';
import { Alert_msg } from "../../Comman/alert_msg";
import { GET_CATEGORY_CURRENCY } from '../../../graphql/Admin/sub_category';

const { Panel } = Collapse;
const { Title } = Typography;
const title = "Currency"
const MultiCurrencyFrom = React.lazy(() => import('./MultiCurrencyFrom'));
const MultiCurrency = (props) => {
    const { form } = props;
    const { history, match } = useReactRouter();
    const [currency_data, set_currency_data] = useState([]);
    const [UpdateCategoryCurrency, { loading: updateLoading }] = useMutation(UPDATE_CATEGORY_CURRENCY)
    const [DeleteCategoryCurrency, { loading: removeLoading }] = useMutation(REMOVE_CATEGORY_CURRENCY)
    const [add_currency_visible, set_add_currency_visible] = useState(false);
    const GetCategoryCurrency = useQuery(GET_CATEGORY_CURRENCY);

    useEffect(() => {
        if (match.params.id) {
            getCurrencyResponse()
        }
    }, [])

    const getCurrencyResponse = async () => {
        let input_data = { pagination: false, category_id: match.params.id }
        console.log("getCurrencyResponse -> input_data", input_data)
        let finaldata = await GetCategoryCurrency.refetch(input_data)
        set_currency_data(finaldata.data?.GetCategoryCurrency?.data)
    }

    const genExtra = async(event,id) => {
        let input_data ={
            _id:id
        }
        let remove_data = await DeleteCategoryCurrency({ variables: input_data });
        Alert_msg(remove_data.data.DeleteCategoryCurrency)
        if (remove_data.data.DeleteCategoryCurrency.status === "success") {
            getCurrencyResponse()
        }
        event.stopPropagation();
    }
    const udpateCurrency = (id) => {
        form.validateFields(async (err, values) => {
            if (!err) {
                values['category_id'] = match.params.id
                let input_data = {
                    _id: id,
                    data: values
                }
                let final_data = await UpdateCategoryCurrency({ variables: input_data });
                Alert_msg(final_data.data.UpdateCategoryCurrency)
                if (final_data.data.UpdateCategoryCurrency.status === "success") {
                    getCurrencyResponse()
                    set_add_currency_visible(false)
                }
            }
        })
    }
    return (<>
        <div className="d-flex justify-content-between mb-3">
            <Title level={4} className={""}>
                {title}
            </Title>
            <Button className="align-items-center d-flex" type="primary" icon="plus" onClick={() => { set_add_currency_visible(!add_currency_visible) }}>
                Add Currency
            </Button>
        </div>
        <Collapse className="mb-3" accordion >
            {currency_data && currency_data.length && currency_data.map((cdata, i) =>
            (
                <Panel Panel className="multi_currency_panel" header={
                    <div className="d-flex justify-content-between">
                        <div>{cdata?.get_parent_currency?.name}</div>
                        <div>
                        </div>
                    </div>}
                    key={i} extra={<div>
                        <Popconfirm title="Sure to delete because may be under some more bookings ?" onConfirm={(e) => {genExtra(e,cdata._id)}}>
                            <Icon type="delete" theme="twoTone" twoToneColor="#52c41a" className='f_25' />
                        </Popconfirm>
                    </div>
                    }>
                    <Form name="multicurrency-from" className="">
                        <Suspense fallback={<Skeleton active />}>
                            <MultiCurrencyFrom form={form} data={cdata} currency_disable={true} />
                        </Suspense>
                        <div className="d-flex justify-content-end">
                            <Button className="align-items-center d-flex" type="primary" icon="plus" onClick={() => { udpateCurrency(cdata._id) }}>
                                Update
                            </Button>
                        </div>
                    </Form>
                </Panel>
            )
            )}
        </Collapse>

        <Modal
            visible={add_currency_visible}
            title="Add new currency"
            onCancel={() => { set_add_currency_visible(!add_currency_visible) }}
            footer={null}
        >
            <Form name="multicurrency-from" className="">
                <Suspense fallback={<Skeleton active />}>
                    <MultiCurrencyFrom form={form} currency_data={currency_data}/>
                </Suspense>
                <div className="d-flex justify-content-end">
                    <Button className="align-items-center d-flex" type="primary" icon="plus" onClick={() => { udpateCurrency() }}>
                        Add
                    </Button>
                </div>
            </Form>
        </Modal>
    </>);
};
export default Form.create()(React.memo(MultiCurrency));


