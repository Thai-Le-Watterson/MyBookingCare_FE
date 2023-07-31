import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Select from "react-select";
import moment from "moment";
import { dateFormat } from "../../utils";
import { languages } from "../../utils";
import { toast } from "react-toastify";
import _ from "lodash";

import { FormattedMessage } from "react-intl";
import DatePicker from "../../components/Input/DatePicker";

import "./ScheduleManage.scss";

class ScheduleManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
            times: [],
            date: moment(new Date()).format(dateFormat.SEND_TO_SERVER),
            selectDoctorId: "",
        };
    }

    componentDidMount = () => {
        this.props.getAllDoctor();
        this.props.getAllTime();
    };

    componentDidUpdate = (prevProps) => {
        if (prevProps.doctors !== this.props.doctors) {
            this.setState({
                doctors: this.props.doctors,
            });
        }
        if (prevProps.times !== this.props.times) {
            this.setState({
                times: this.props.times.map((time) => {
                    time.isSelected = false;
                    return time;
                }),
            });
        }
    };

    handleOnChangeSelect = (selectDoctor) => {
        this.setState({
            selectDoctorId: selectDoctor.value,
        });
    };

    handleChangeDatePicker = (arg) => {
        this.setState({
            date: moment(arg[0]).format(dateFormat.SEND_TO_SERVER),
        });
    };

    handleClickTime = (timeKeyMap) => {
        const copyTimes = [
            ...this.state.times.map((time) => {
                timeKeyMap === time.keyMap &&
                    (time.isSelected = !time.isSelected);
                return time;
            }),
        ];

        this.setState({
            times: [...copyTimes],
        });
    };

    handleSaveSchedule = () => {
        let { selectDoctorId, date } = this.state;
        const selectedTimes = [...this.state.times].filter((time) => {
            return time.isSelected;
        });

        if (
            !selectDoctorId ||
            !date ||
            !selectedTimes ||
            _.isEmpty(selectedTimes)
        ) {
            toast.error("Missing parameter");
        } else {
            // date = moment(date, dateFormat.SEND_TO_SERVER).unix() * 1000;
            date = moment(date, dateFormat.SEND_TO_SERVER).valueOf();
            const dataSchedules = {
                scheduleDatas: selectedTimes.map((time) => {
                    const copyTimes = {};
                    copyTimes.timeType = time.keyMap;
                    copyTimes.doctorId = selectDoctorId;
                    copyTimes.date = date;
                    return copyTimes;
                }),
                doctorId: selectDoctorId,
                dateString: date,
            };

            this.props.bulkCreateSchedule(dataSchedules);
            // console.log("check data: ", dataSchedules);
        }
    };

    render() {
        const options = this.state.doctors.map((doctor) => {
            return { value: doctor.id, label: doctor.fullName };
        });

        return (
            <>
                <div className="manage-schedule_container">
                    <div className="title">
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <label className="form-label">
                                    <FormattedMessage id="manage-schedule.choose-doctor" />
                                </label>
                                <Select
                                    value={this.state.doctorId}
                                    options={options}
                                    onChange={this.handleOnChangeSelect}
                                />
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
                        <div className="time-container">
                            {this.state.times &&
                                this.state.times.length > 0 &&
                                this.state.times.map((time, index) => {
                                    return (
                                        <button
                                            className={`btn btn-time ${
                                                time.isSelected ? "active" : ""
                                            }`}
                                            key={index}
                                            onClick={() =>
                                                this.handleClickTime(
                                                    time.keyMap
                                                )
                                            }
                                        >
                                            {this.props.language ===
                                            languages.VI
                                                ? time.valueVi
                                                : time.valueEn}
                                        </button>
                                    );
                                })}
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={() => this.handleSaveSchedule()}
                        >
                            <FormattedMessage id="manage-schedule.save" />
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        doctors: state.admin.allDoctors,
        times: state.admin.times,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctor: () => dispatch(actions.fetchAllDoctorStart()),
        getAllTime: () => dispatch(actions.fetchTimeStart()),
        bulkCreateSchedule: (data) =>
            dispatch(actions.bulkCreateScheduleStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleManage);
