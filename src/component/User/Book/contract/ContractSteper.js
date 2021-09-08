import React, { useState } from 'react'
import { Icon, Button, message, Steps } from 'antd';
import { Alert_msg } from '../../../Comman/alert_msg';
import step0 from '../../../../image/step0.png';
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

const customDot = (dot, { status, index }) => (
    <Icon type="info-circle" />
);

function ContractSteper(props) {
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(0);
    const [stepsdetail, setSteps] = useState(original_steps);

    const next = (id) => {
        const newItems = [...stepsdetail];
        let index = findIndex(newItems, ['id', id]);
        newItems[index]['status'] = "finish";
        setSteps(newItems)
        setCurrent(current + 1);
    }

    const prev = (id) => {
        const newItems = [...stepsdetail];
        let index = findIndex(newItems, ['id', id]);
        newItems[index]['status'] = "wait";
        setSteps(newItems)
        setCurrent(current - 1);
    }
    const done = () => {
        const newItems = [...stepsdetail];
        newItems[size(newItems)-1]['status'] = "finish";
        setSteps(newItems)
        message.success('Processing complete!')
    }

    return (
        <>
            <Steps size="large" className="contract_steper" labelPlacement="vertical" current={current}>
                {stepsdetail && stepsdetail.map(item =>
                    <Step key={item.title} status={item.status} icon={<img src={step0} />} title={item.content} />
                )}
            </Steps>
            <div className="steps-content">{stepsdetail[current].content}</div>
            <div className="steps-action">
                {current < stepsdetail.length - 1 && (
                    <Button type="primary" onClick={() => next(stepsdetail[current]['id'])}>
                        Next
                    </Button>
                )}
                {current === stepsdetail.length - 1 && (
                    <Button type="primary" onClick={() => done()}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ marginLeft: 8 }} onClick={() => prev(stepsdetail[current]['id'])}>
                        Back
                    </Button>
                )}
            </div>
        </>

    )
}

export default ContractSteper;
