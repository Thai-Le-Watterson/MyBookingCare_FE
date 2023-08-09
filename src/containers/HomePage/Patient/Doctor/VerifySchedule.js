import React from "react";
import axios from "../../../../axios";

import HomeHeader from "../../HomeHeader";
import { upperCase } from "lodash";

class VerifySchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
        };
    }
    componentDidMount = async () => {
        const doctorId = new URLSearchParams(this.props.location.search).get(
            "doctorId"
        );
        const token = new URLSearchParams(this.props.location.search).get(
            "token"
        );

        const res = await axios.get(
            `/api/verify-schedule?doctorId=${doctorId}&token=${token}`
        );

        this.setState({
            message: res.message,
        });
    };

    render() {
        return (
            <>
                <HomeHeader />
                <div
                    className="message"
                    style={{
                        textAlign: "center",
                        textTransform: "upperCase",
                        fontSize: 23,
                        marginTop: "20px",
                    }}
                >
                    {this.state.message}
                </div>
            </>
        );
    }
}

export default VerifySchedule;
