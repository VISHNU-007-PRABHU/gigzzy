import React from "react";
import 'antd/dist/antd.css';
import { withRouter } from "react-router-dom";
import { Result, Button } from 'antd';
class NotAccess extends React.Component {
    render() {
        return (
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="primary" onClick={() => { this.props.history.push("/admin"); }}>Back Home</Button>}
            />
        );
    }
}
export default withRouter(NotAccess);