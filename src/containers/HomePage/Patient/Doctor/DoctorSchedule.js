import React from "react";

import "./DoctorSchedule.scss";

class DoctorSchedule extends React.Component {
    render() {
        return (
            <>
                <div className="schedule-container container">
                    <div className="row">
                        <div className="content-left col">
                            <div className="select-container">
                                <select className="select-date form-select w-10">
                                    <option value={"mon"}>Thứ Hai</option>
                                    <option value={"thu"}>Thứ Ba</option>
                                    <option value={"wed"}>Thứ Tư</option>
                                </select>
                            </div>
                            <div className="schedule_title">
                                <i className="fa-solid fa-calendar-days icon"></i>
                                <span className="schedule-title">
                                    Lịch khám
                                </span>
                            </div>
                        </div>
                        <div className="content-right col"></div>
                    </div>
                </div>
            </>
        );
    }
}

export default DoctorSchedule;
