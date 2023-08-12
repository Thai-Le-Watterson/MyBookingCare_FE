import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Select from "react-select";
import moment from "moment";
import { dateFormat } from "../../utils";
import { languages } from "../../utils";
import { toast } from "react-toastify";
import _ from "lodash";
import * as userService from "../../services/userService";

import { FormattedMessage } from "react-intl";
import DatePicker from "../../components/Input/DatePicker";
import ConfirmScheduleModal from "./ConfirmScheduleModal";
import { RingLoader } from "react-spinners";

import "./ScheduleConfirmManage.scss";

class ScheduleConfirmManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            doctors: [],
            seletedBooking: {},
            selectDoctorId: "",
            isOpenModal: false,
            isLoading: false,
            date: moment(new Date()).format(dateFormat.SEND_TO_SERVER),
        };
    }

    componentDidMount = async () => {
        const { userInfor } = this.props;

        if (userInfor.roleId === "R2") {
            const bookings = await userService.getAllBookingByDoctor(
                userInfor.id,
                this.state.date
            );
            this.setState({
                bookings: bookings || [],
                selectDoctorId: userInfor.id,
            });
        }
    };

    componentDidUpdate = (prevProps) => {
        if (prevProps.doctors !== this.props.doctors) {
            this.setState({
                doctors: this.props.doctors,
            });
        }
    };

    handleOnChangeSelect = (selectDoctor) => {
        this.setState({
            selectDoctorId: selectDoctor.value,
        });
    };

    handleChangeDatePicker = async (arg) => {
        const date = moment(arg[0]).format(dateFormat.SEND_TO_SERVER);
        const bookings = await userService.getAllBookingByDoctor(
            this.state.selectDoctorId,
            date
        );
        this.setState({
            date,
            bookings: bookings || [],
        });
    };

    handleConfirmSchedule = async (imageBase64) => {
        this.toogleLoading();
        const dataRequest = {
            doctorId: this.state.seletedBooking.doctorId,
            doctorName: this.state.seletedBooking.doctorData.fullName,
            image: imageBase64,
            patientEmail: this.state.seletedBooking.patientEmail,
            patientName: this.state.seletedBooking.fullName,
            date: moment(this.state.seletedBooking.date).format("DD/MM/YYYY"),
            reason: this.state.seletedBooking.reason,
            time: this.state.seletedBooking.timeBookingData[
                this.props.language === languages.VI ? "valueVi" : "valueEn"
            ],
        };

        const emptyData = this.checkEmptyData(dataRequest);

        if (!emptyData) {
            // console.log("check dataRequest: ", dataRequest);
            const res = await userService.confirmBooking(dataRequest);
            if (res.errCode === 0) {
                toast.success(res.message);

                const bookings = await userService.getAllBookingByDoctor(
                    this.state.selectDoctorId,
                    this.state.date
                );
                this.setState({
                    bookings: bookings || [],
                });
            } else toast.error(res.message);
        } else {
            toast.error(`${emptyData} is empty`);
        }
        this.toogleLoading();
    };

    handleShowModal = (booking) => {
        this.setState({
            seletedBooking: booking,
            isOpenModal: true,
        });
    };

    toogleLoading = () => {
        this.setState({
            isLoading: !this.state.isLoading,
        });
    };

    toggle = () => {
        this.setState({
            isOpenModal: false,
        });
    };

    checkEmptyData = (obj) => {
        return Object.keys(obj).find((item) => {
            return !obj[item];
        });
    };

    render() {
        // console.log("check state: ", this.state);
        const options = this.state.doctors.map((doctor) => {
            return { value: doctor.id, label: doctor.fullName };
        });
        const { userInfor, language } = this.props;

        return (
            <>
                <div className="manage-schedule_container">
                    <div className="title">
                        <FormattedMessage id="manage-schedule.manage-confirm.title" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                {userInfor.roleId === "R2" ? (
                                    <>
                                        <label className="form-label">
                                            <FormattedMessage id="manage-schedule.doctor-name" />
                                        </label>
                                        <input
                                            type="text"
                                            value={userInfor?.fullName}
                                            disabled
                                            className="form-control"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <label className="form-label">
                                            <FormattedMessage id="manage-schedule.choose-doctor" />
                                        </label>
                                        <Select
                                            value={this.state.doctorId}
                                            options={options}
                                            onChange={this.handleOnChangeSelect}
                                        />
                                    </>
                                )}
                            </div>
                            <div className="date-picker_container col">
                                <label className="form-label">
                                    <FormattedMessage id="manage-schedule.choose-date" />
                                </label>
                                <DatePicker
                                    value={this.state.date}
                                    minDate={"today"}
                                    onChange={(arg) =>
                                        this.handleChangeDatePicker(arg)
                                    }
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="users-container mt-4">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>
                                            <FormattedMessage id="manage-schedule.manage-confirm.email" />
                                        </th>
                                        <th>
                                            <FormattedMessage id="manage-schedule.manage-confirm.full-name" />
                                        </th>
                                        <th>
                                            <FormattedMessage id="manage-schedule.manage-confirm.gender" />
                                        </th>
                                        <th>
                                            <FormattedMessage id="manage-schedule.manage-confirm.date" />
                                        </th>
                                        <th>
                                            <FormattedMessage id="manage-schedule.manage-confirm.time" />
                                        </th>
                                        <th>
                                            <FormattedMessage id="manage-schedule.manage-confirm.reason" />
                                        </th>
                                        <th>
                                            <FormattedMessage id="manage-schedule.manage-confirm.confirm" />
                                        </th>
                                    </tr>
                                    {this.state.bookings &&
                                    this.state.bookings.length > 0 ? (
                                        this.state.bookings.map(
                                            (booking, index) => {
                                                const date = moment(
                                                    booking.date
                                                ).format("DD/MM/YYYY");
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            {
                                                                booking.patientEmail
                                                            }
                                                        </td>
                                                        <td>
                                                            {booking.fullName}
                                                        </td>
                                                        <td>
                                                            {
                                                                booking
                                                                    .genderBookingData[
                                                                    language ===
                                                                    languages.VI
                                                                        ? "valueVi"
                                                                        : "valueEn"
                                                                ]
                                                            }
                                                        </td>
                                                        <td>{date}</td>
                                                        <td>
                                                            {
                                                                booking
                                                                    .timeBookingData[
                                                                    language ===
                                                                    languages.VI
                                                                        ? "valueVi"
                                                                        : "valueEn"
                                                                ]
                                                            }
                                                        </td>
                                                        <td>
                                                            {booking.reason}
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn_edit"
                                                                onClick={(e) =>
                                                                    this.handleShowModal(
                                                                        booking
                                                                    )
                                                                }
                                                            >
                                                                <FormattedMessage id="manage-schedule.manage-confirm.confirm-btn" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="text-center"
                                            >
                                                <FormattedMessage id="manage-schedule.manage-confirm.no-data" />
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <ConfirmScheduleModal
                    isOpen={this.state.isOpenModal}
                    toggle={this.toggle}
                    booking={this.state.seletedBooking}
                    handleConfirmSchedule={this.handleConfirmSchedule}
                />
                {this.state.isLoading && (
                    <div className="loader">
                        <RingLoader
                            color={"#00fff1"}
                            loading={this.state.isLoading}
                            size={150}
                        />
                    </div>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        doctors: state.admin.allDoctors,
        language: state.app.language,
        userInfor: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctor: () => dispatch(actions.fetchAllDoctorStart()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScheduleConfirmManage);
