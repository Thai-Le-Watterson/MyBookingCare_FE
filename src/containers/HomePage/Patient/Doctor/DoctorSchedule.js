import React from "react";
import { connect } from "react-redux";
import moment from "moment/moment";
import { dateFormat } from "../../../../utils/constant";
import { languages } from "../../../../utils/constant";
import * as userService from "../../../../services/userService";

import { FormattedMessage } from "react-intl";

import "moment/locale/vi";
import "./DoctorSchedule.scss";

class DoctorSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dates: [],
            datesRender: [],
            schedule: [],
            selectDate: "",
        };
    }

    componentDidMount = async () => {};

    componentDidUpdate = async (prevProps) => {
        if (prevProps.language !== this.props.language) {
            const dateObj = this.getDays();
            this.setState({
                dates: dateObj.dates,
                datesRender: dateObj.datesRender,
            });
        }
        if (prevProps.doctorId !== this.props.doctorId) {
            const dateObj = this.getDays();

            this.setState({
                dates: dateObj.dates,
                datesRender: dateObj.datesRender,
            });

            const firstDate = dateObj.dates[0];
            const schedule = await userService.getSchedule(
                this.props.doctorId,
                firstDate
            );

            this.setState(
                {
                    dates: dateObj.dates,
                    selectDate: firstDate,
                    schedule: schedule || [],
                },
                () => console.log(this.state)
            );
        }
    };

    getDays = (day = 7) => {
        const result = {
            dates: [],
            datesRender: [],
        };
        for (let i = 1; i <= day; i++) {
            const date = moment(new Date())
                .startOf("day")
                .add(i, "d")
                .format(dateFormat.SEND_TO_SERVER);

            let datesRender = moment(new Date())
                .startOf("day")
                .locale(this.props.language)
                .add(i, "d")
                .format(dateFormat.RENDER_VIEW);
            if (i === 1) {
                const todayString =
                    this.props.language === languages.VI ? "Hôm nay" : "Today";
                datesRender =
                    todayString +
                    " - " +
                    moment(new Date())
                        .startOf("day")
                        .locale(this.props.language)
                        .add(i, "d")
                        .format(dateFormat.DAY_MONTH);
            }
            result.dates.push(date);
            result.datesRender.push(datesRender);
        }
        return result;
    };

    handleChangeScheduleDate = async (e) => {
        const schedule = await userService.getSchedule(
            this.props.doctorId,
            e.target.value
        );

        this.setState(
            {
                selectDate: e.target.value,
                schedule: schedule || [],
            },
            () => console.log(this.state)
        );
    };

    render() {
        return (
            <>
                <div className="schedule-container container">
                    <div className="row">
                        <div className="content-left col">
                            <div className="select-container">
                                <select
                                    className="select-date form-select w-10"
                                    onChange={(e) =>
                                        this.handleChangeScheduleDate(e)
                                    }
                                >
                                    {this.state.dates.map((date, index) => {
                                        return (
                                            <option value={date}>
                                                {this.state.datesRender &&
                                                    this.state.datesRender[
                                                        index
                                                    ]}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="schedule_title">
                                <i className="fa-solid fa-calendar-days icon"></i>
                                <span className="schedule-title">
                                    <FormattedMessage id="doctor-schedule.schedule" />
                                </span>
                            </div>
                            <div className="time-container">
                                {(this.state.schedule &&
                                    this.state.schedule.length > 0 &&
                                    this.state.schedule.map((schedule) => {
                                        return (
                                            <button
                                                className={`btn btn-time ${
                                                    this.props.language ===
                                                    languages.VI
                                                        ? "vi"
                                                        : "en"
                                                }`}
                                            >
                                                {
                                                    schedule.timeData[
                                                        this.props.language ===
                                                        languages.VI
                                                            ? "valueVi"
                                                            : "valueEn"
                                                    ]
                                                }
                                            </button>
                                        );
                                    })) || (
                                    <div className="no-schedule-mesage">
                                        <FormattedMessage id="doctor-schedule.no-schedule" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="content-right col"></div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
