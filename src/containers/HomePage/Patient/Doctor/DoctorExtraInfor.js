import React from "react";
import { connect } from "react-redux";
import { languages } from "../../../../utils";
import _ from "lodash";
import * as userService from "../../../../services/userService";

import { FormattedMessage } from "react-intl";
import { NumericFormat } from "react-number-format";

import "./DoctorExtraInfor.scss";

class DoctorExtraInfor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetail: false,
            doctorInfor: {},
        };
    }

    componentDidMount = async () => {
        const doctor = await userService.getDoctorDetail(this.props.doctorId);

        this.setState({
            doctorInfor: doctor,
        });
    };

    componentDidUpdate = async (prevProps) => {
        if (prevProps.doctorId !== this.props.doctorId) {
            const doctor = await userService.getDoctorDetail(
                this.props.doctorId
            );

            this.setState({
                doctorInfor: doctor,
            });
        }
    };

    changeShowDetail = (action) => {
        this.setState({
            isShowDetail: action.toUpperCase() === "SHOW" ? true : false,
        });
    };

    render() {
        const doctorInfor = this.state.doctorInfor?.doctorInforData;
        const price =
            doctorInfor?.priceData &&
            !_.isEmpty(doctorInfor.priceData) &&
            doctorInfor.priceData[
                this.props.language === languages.VI ? "valueVi" : "valueEn"
            ];
        console.log("check doctorInfor: ", doctorInfor);
        return (
            <>
                <div className="extra-infor_container">
                    <div className="address">
                        <div className="address-title">
                            {" "}
                            <FormattedMessage id="doctor-detail.extra-infor.address-clinic" />
                        </div>
                        <div className="clinic-name">
                            {doctorInfor?.clinicData?.name}
                        </div>
                        <div className="clinic-address">
                            {doctorInfor?.clinicData?.address}
                        </div>
                    </div>
                    <div className="price-container">
                        {(!this.state.isShowDetail && (
                            <>
                                <span className="price-title">
                                    <FormattedMessage id="doctor-detail.extra-infor.price-title" />
                                    {":"}
                                </span>
                                <span className="price">
                                    <NumericFormat
                                        value={price}
                                        allowLeadingZeros
                                        thousandSeparator=","
                                        displayType="text"
                                        prefix={
                                            this.props.language === languages.VI
                                                ? "VND"
                                                : "$"
                                        }
                                    />
                                </span>
                                <span
                                    className="detail show"
                                    onClick={() =>
                                        this.changeShowDetail("show")
                                    }
                                >
                                    {" "}
                                    <FormattedMessage id="doctor-detail.extra-infor.show-detail" />
                                </span>
                            </>
                        )) || (
                            <>
                                <span className="price-title">
                                    <FormattedMessage id="doctor-detail.extra-infor.price-title" />
                                    {":"}
                                </span>
                                <div className="price-container">
                                    <div className="price-infor">
                                        <FormattedMessage id="doctor-detail.extra-infor.price-title" />

                                        <span className="price">
                                            <NumericFormat
                                                value={price}
                                                allowLeadingZeros
                                                displayType="text"
                                                thousandSeparator=","
                                                suffix={
                                                    this.props.language ===
                                                    languages.VI
                                                        ? "VND"
                                                        : "$"
                                                }
                                            />
                                        </span>
                                    </div>
                                    <div className="note">
                                        {doctorInfor?.note}
                                    </div>
                                </div>
                                <div className="payment-infor">
                                    <FormattedMessage id="doctor-detail.extra-infor.payment-intro" />
                                    {": "}
                                    {doctorInfor?.paymentData?.valueVi}
                                </div>
                                <span
                                    className="detail hide"
                                    onClick={() =>
                                        this.changeShowDetail("hide")
                                    }
                                >
                                    <FormattedMessage id="doctor-detail.extra-infor.hide-detail" />
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
