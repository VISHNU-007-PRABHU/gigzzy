import React, { useState, useEffect, Suspense } from 'react'
import { Icon, Button, message, Steps, Form, Skeleton, Input } from 'antd';
import { Alert_msg } from '../../../Comman/alert_msg';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { UPDATE_CONTRACT, GET_CONTRACT } from '../../../../graphql/User/contract';
import SetAddress from '../SetAddress';
import useReactRouter from 'use-react-router';
import step0 from '../../../../image/step0.png';
import { LocationContext } from '../../../context/Location'
import Address from "../Address";
import findIndex from 'lodash/findIndex';
import size from 'lodash/size';
const { Step } = Steps;
const original_steps = [
    {
        id: 1,
        title: 'First',
        content: 'Project Details',
        status: "wait"
    },
    {
        id: 2,
        title: 'Second',
        content: 'Project Location',
        status: "wait"
    },
    {
        id: 3,
        title: 'Last',
        content: 'Budget',
        status: "wait"
    },
    {
        id: 4,
        title: 'final',
        content: 'Document',
        status: "wait"
    },
];

const layout = {
    // labelCol: { span: 8 },
    // wrapperCol: { span: 16 },
    offset: 8, span: 16
};
const ProjectDetail = React.lazy(() => import('./ProjectDetail'));
const ProjectBudget = React.lazy(() => import('./ProjectBudget'));
const ProjectImages = React.lazy(() => import('./ProjectImages'));

function ContractSteper(props) {
    const { form } = props;
    const { history, match } = useReactRouter();
    const [add_address, set_add_address] = useState(false);
    const [address_id, set_address_id] = useState("");
    const [current, setCurrent] = useState(0);
    const [contract_id, set_contract_id] = useState("");
    const [user_id, set_user_id] = useState("");
    const [contract_detail_data, set_contract_detail] = useState({});
    const [stepsdetail, setSteps] = useState(original_steps);
    const [update_contract, { loading: removeLoading }] = useMutation(UPDATE_CONTRACT)
    const contract_detail = useQuery(GET_CONTRACT);

    useEffect(async () => {
        if (localStorage.getItem('user')) {
            set_user_id(JSON.parse(localStorage.getItem("user"))._id)
        }
        if (localStorage.getItem('current_contract_id')) {
            let finaldata = await contract_detail.refetch({ contract_id: localStorage.getItem('current_contract_id') })
            set_contract_detail(finaldata.data.get_contracts[0])
            set_address_id(finaldata.data.get_contracts[0]?.address_id)
        }
    }, [localStorage.getItem('current_contract_id')])
    const next = (id) => {
        const { form } = props;
        form.validateFields(async (err, values) => {
            console.log("next -> values", values)
            if (!err) {
                if(current === 2 && (!values['budget'] || !values['timeline'] || !values['timeline_type'])){
                    Alert_msg({status:'failed',msg:"Please fill all the data"})
                    return false
                }
                let input_data = {}

                if (current === 0) {
                    values["category_id"] = match.params.id
                    if (localStorage.getItem('user')) {
                        values["user_id"] = JSON.parse(localStorage.getItem("user"))._id
                    }
                }
                if (address_id) {
                    values['address_id'] = address_id
                }
                values['current_page'] = current
                if (values && size(values)) {
                    input_data['contract_data'] = [values]
                }
                if (localStorage.getItem("current_contract_id")) {
                    input_data['_id'] = localStorage.getItem("current_contract_id")
                }
                let final_data = await update_contract({ variables: input_data });
                Alert_msg(final_data.data.update_contract)
                if (final_data.data.update_contract.status === "success") {
                    localStorage.setItem("current_contract_id", final_data.data.update_contract._id)
                    const newItems = [...stepsdetail];
                    let index = findIndex(newItems, ['id', id]);
                    newItems[index]['status'] = "finish";
                    setSteps(newItems)
                    setCurrent(current + 1);
                }
            }
        })


    }

    const prev = (id) => {
        if (id === 1) {
            history.push({ pathname: `/` })
        } else {
            const newItems = [...stepsdetail];
            let index = findIndex(newItems, ['id', id]);
            newItems[index]['status'] = "wait";
            setSteps(newItems)
            setCurrent(current - 1);
        }
    }
    const done = () => {
        form.validateFields(async (err, values) => {
            console.log("next -> values", values)
        })
        const newItems = [...stepsdetail];
        newItems[size(newItems) - 1]['status'] = "finish";
        setSteps(newItems)
        message.success('Processing complete!')
    }


    const on_location_change = (item) => {
        set_address_id(item._id);
    }

    return (

        <>
            <Steps size="large" className="contract_steper" labelPlacement="vertical" current={current}>
                {stepsdetail && stepsdetail.map(item =>
                    <Step key={item.title} status={item.status} icon={<img src={step0} />} title={item.content} />
                )}
            </Steps>
            <div className="d-flex justify-content-center pt-5">
                <Form  {...layout} name="nest-messages" className="w-50">
                    <Suspense fallback={<Skeleton active />}>
                        <div className={current === 3 ? '' : 'd-none'}>
                            <ProjectImages contract_detail_data={contract_detail_data} current={current} customform={form} />
                        </div>
                        <div className={current === 2 ? '' : 'd-none'}>
                            <ProjectBudget contract_detail_data={contract_detail_data} current={current} customform={form} />
                        </div>
                        <div className={current === 0 ? '' : 'd-none'}>
                            <ProjectDetail contract_detail_data={contract_detail_data} current={current} customform={form} />
                        </div>
                        <div className={current === 1 ? '' : 'd-none'}>
                            <LocationContext.Provider value={{
                                location_change: on_location_change,
                            }}>
                                <Button type="primary" className="mb-3" onClick={() => { set_add_address(true) }}>
                                    <div className="normal_font_size d-flex justify-content-around align-items-center">
                                        <div>
                                            Add new address
                                        </div>
                                        <Icon type="plus" />
                                    </div>
                                </Button>
                                <SetAddress user_id={user_id} address_id={address_id} />
                            </LocationContext.Provider>
                            <Address visible={add_address} />
                        </div>
                    </Suspense>
                    <div className="steps-action justify-content-between d-flex">
                        {current < stepsdetail.length - 1 && (
                            <Button type="primary" className="w-50" onClick={() => next(stepsdetail[current]['id'])}>
                                <div className="normal_font_size">Next</div>
                            </Button>
                        )}
                        {current === stepsdetail.length - 1 && (
                            <Button type="primary" className="w-50" onClick={() => done()}>
                                <div className="normal_font_size">Done</div>
                            </Button>
                        )}
                        {current >= 0 && (
                            <Button style={{ marginLeft: 8 }} className="w-50" onClick={() => prev(stepsdetail[current]['id'])}>
                                <div className="normal_font_size">Back</div>
                            </Button>
                        )}
                    </div>
                </Form>
            </div>
        </>
    )
}

export default Form.create()(ContractSteper);