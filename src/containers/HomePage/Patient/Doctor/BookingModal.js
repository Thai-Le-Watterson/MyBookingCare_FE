import React from "react";
import { connect } from "react-redux";
import * as userService from "../../../../services/userService";
import { languages } from "../../../../utils";
import _ from "lodash";
import avatarDefault from "../../../../assets/avatar/avatar_default.jpg";
import moment from "moment";
import * as actions from "../../../../store/actions/index";
import { history } from "../../../../redux";
import { createBooking } from "../../../../services/userService";
import { toast } from "react-toastify";
import { dateFormat } from "../../../../utils";

import Select from "react-select";
import DatePicker from "../../../../components/Input/DatePicker";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { NumericFormat } from "react-number-format";
import { FormattedMessage } from "react-intl";

import "./BookingModal.scss";

class BookingModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctor: {},
            bookingType: "",
            fullName: "",
            gender: "",
            reason: "",
            dateBirth: "",
        };
    }

    componentDidMount = () => {
        this.props.fetchGender();
    };

    componentDidUpdate = async (prevProps) => {
        if (prevProps.doctorId !== this.props.doctorId) {
            const doctor = await userService.getDoctorDetail(
                this.props.doctorId
            );
            this.setState({
                doctor,
            });
        }
    };

    closeBtn = () => {
        return (
            <button className="close-btn close" onClick={this.props.toggle}>
                &times;
            </button>
        );
    };

    handleChangeBookingType = (type) => {
        if (type === "self") {
            if (this.props.userInfor === null) {
                const isLogin = this.handleRequiredLogin();
                isLogin && history.push("/login");
                return isLogin;
            }
            this.setState({
                fullName: this.props.userInfor.fullName,
            });
        }
        this.setState({
            bookingType: type,
        });
    };

    handleChangeInput = (e, type) => {
        this.setState({
            [type]: e.target.value,
        });
    };

    handleChangeGender = (selectedItem) => {
        this.setState({
            gender: selectedItem.value,
        });
    };

    handleChangeDatePicker = (arg) => {
        const date = moment(arg[0]).format(dateFormat.SEND_TO_SERVER);
        this.setState({
            dateBirth: date,
        });
    };

    handleBookingSchedule = async () => {
        if (this.props.userInfor === null) {
            const isLogin = this.handleRequiredLogin();
            isLogin && history.push("/login");
            return isLogin;
        }
        const { doctor, bookingType, fullName, gender, reason, dateBirth } =
            this.state;
        const { schedule, userInfor, language } = this.props;
        let date = moment(schedule.date).format("DD/MM/YYYY");
        // console.log("check date: ", date);
        // date = moment
        //     .utc(date, dateFormat.SEND_TO_SERVER)
        //     .startOf("day")
        //     .valueOf();
        // console.log("check date: ", date);
        const dataRequest = {
            statusId: "R1",
            doctorId: doctor.id,
            doctorName: doctor.fullName,
            patientEmail: userInfor.email,
            fullName,
            gender,
            dateBirth,
            date,
            timeType: schedule.timeType,
            timeData:
                schedule.timeData[
                    language === languages.VI ? "valueVi" : "valueEn"
                ],
            reason,
            language,
        };

        const isNotValid = this.checkEmptyData(dataRequest);
        console.log(dataRequest);
        if (!isNotValid) {
            try {
                const res = await createBooking(dataRequest);
                if (res.errCode === 0) {
                    this.setState({
                        bookingType: "",
                        fullName: "",
                        gender: "",
                        reason: "",
                        dateBirth: "",
                    });
                    toast.success(res.message);
                } else {
                    toast.error(res.message);
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            toast.error("Missing parameter");
        }
    };

    handleRequiredLogin = () => {
        const result = window.confirm(
            "Xin lỗi! Bạn chưa đăng nhập nên không thể dùng chứ năng này. Bạn có muốn đăng nhập không ?"
        );
        return result;
    };

    buildOptionGenderSelect = () => {
        return this.props.genders.map((gender) => {
            return {
                value: gender.keyMap,
                label:
                    this.props.language === languages.VI
                        ? gender.valueVi
                        : gender.valueEn,
            };
        });
    };

    checkEmptyData = (obj) => {
        return Object.keys(obj).find((item) => {
            return !obj[item];
        });
    };

    render() {
        const { language, schedule } = this.props;
        const { doctor } = this.state;
        const position =
            !_.isEmpty(doctor.positionData) &&
            doctor.positionData[
                language === languages.VI ? "valueVi" : "valueEn"
            ];
        const time =
            !_.isEmpty(schedule.timeData) &&
            schedule.timeData[
                language === languages.VI ? "valueVi" : "valueEn"
            ];
        const date = moment(schedule.date)
            .locale(language)
            .format("dddd - DD/MM/YYYY");
        const avatar =
            (doctor.image && Buffer.from(doctor.image).toString()) ||
            avatarDefault;
        const price =
            doctor.doctorInforData?.priceData?.valueVi &&
            doctor.doctorInforData.priceData[
                language === languages.VI ? "valueVi" : "valueEn"
            ];
        return (
            <div className="booking-modal_container">
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={this.props.toggle}
                    fullscreen="lg"
                    size="lg"
                    centered
                >
                    <ModalHeader
                        toggle={this.props.toggle}
                        close={this.closeBtn()}
                        className="booking-modal_header"
                    >
                        <FormattedMessage id="booking-modal.title" />
                    </ModalHeader>
                    <ModalBody className="booking-modal_body">
                        <div className="container">
                            <div className="row">
                                <div className="col-3">
                                    <div
                                        className="avatar"
                                        style={{
                                            backgroundImage: `url(${avatar})`,
                                        }}
                                    ></div>
                                    <p className="price">
                                        <FormattedMessage id="booking-modal.price" />
                                        {": "}
                                        <NumericFormat
                                            value={price}
                                            displayType="text"
                                            thousandSeparator=","
                                            suffix={
                                                this.props.language ===
                                                languages.VI
                                                    ? "VND"
                                                    : "$"
                                            }
                                        />
                                    </p>
                                </div>
                                <div className="col-9">
                                    <h3>{`${position}, ${doctor.fullName}`}</h3>
                                    {(this.props.isShowDescription && (
                                        <p className="description">
                                            {doctor.MarkdownData?.description}
                                        </p>
                                    )) || (
                                        <>
                                            <p className="time">
                                                {time} - {date}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 my-2 book-type_container">
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="for-self"
                                            className="form-check-input"
                                            name="booking-for"
                                            onChange={() =>
                                                this.handleChangeBookingType(
                                                    "self"
                                                )
                                            }
                                        />
                                        <label
                                            className="form-label"
                                            htmlFor="for-self"
                                        >
                                            Đặt cho bản thân
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="for-relative"
                                            className="form-check-input"
                                            name="booking-for"
                                            onChange={() =>
                                                this.handleChangeBookingType(
                                                    "relative"
                                                )
                                            }
                                        />
                                        <label
                                            className="form-label"
                                            htmlFor="for-relative"
                                        >
                                            Đặt cho người thân
                                        </label>
                                    </div>
                                </div>
                                <div className="col-6 my-2">
                                    <label className="form-label">Họ tên</label>
                                    <input
                                        type="text"
                                        value={this.state.fullName}
                                        className="form-control"
                                        disabled={
                                            this.state.bookingType === "self"
                                                ? true
                                                : false
                                        }
                                        onChange={(e) =>
                                            this.handleChangeInput(
                                                e,
                                                "fullName"
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-6 my-2">
                                    <label className="form-label">
                                        Giới tính
                                    </label>
                                    <Select
                                        options={this.buildOptionGenderSelect()}
                                        onChange={this.handleChangeGender}
                                    />
                                </div>
                                <div className="col-6 my-2">
                                    <label className="form-label">
                                        Ngày sinh
                                    </label>
                                    <DatePicker
                                        onChange={(arg) =>
                                            this.handleChangeDatePicker(arg)
                                        }
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-6 my-2">
                                    <label className="form-label">
                                        Lý do khám
                                    </label>
                                    <input
                                        value={this.state.reason}
                                        type="text"
                                        className="form-control"
                                        onChange={(e) =>
                                            this.handleChangeInput(e, "reason")
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="booking-modal_footer">
                        <Button
                            color="primary"
                            onClick={() => {
                                this.props.toggle();
                                this.handleBookingSchedule();
                            }}
                        >
                            <FormattedMessage id="booking-modal.book" />
                        </Button>{" "}
                        <Button color="secondary" onClick={this.props.toggle}>
                            <FormattedMessage id="booking-modal.cancel" />
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
    userInfor: state.user.userInfo,
    genders: state.admin.genders,
});

const mapDispatchToProps = (dispatch) => ({
    fetchGender: () => dispatch(actions.fetchGenderStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
