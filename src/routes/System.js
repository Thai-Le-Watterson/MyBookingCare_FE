import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import RegisterPackageGroupOrAcc from "../containers/System/RegisterPackageGroupOrAcc";
import { ROLETYPE } from "../utils";

import UserManage from "../containers/System/UserManage";
import UserReduxManager from "../containers/System/UserReduxManager";
import Header from "../containers/Header/Header";
import DoctorManage from "../containers/System/DoctorManage";
import ScheduleManage from "../containers/System/ScheduleManage";

class System extends Component {
    render() {
        console.log(this.props.userInfo.roleId);
        if (
            this.props.userInfo.roleId !== ROLETYPE.ADMIN &&
            this.props.userInfo.roleId !== ROLETYPE.DOCTOR
        ) {
            this.props.history.push("/home");
        }
        const { systemMenuPath } = this.props;
        return (
            <>
                <Header />

                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route
                                path="/system/user-manage"
                                component={UserManage}
                            />
                            <Route
                                path="/system/user-redux-manage"
                                component={UserReduxManager}
                            />
                            <Route
                                path="/system/manage-doctor"
                                component={DoctorManage}
                            />
                            <Route
                                path="/system/schedule-manage"
                                component={ScheduleManage}
                            />
                            <Route
                                path="/system/register-package-group-or-account"
                                component={RegisterPackageGroupOrAcc}
                            />
                            <Route
                                component={() => {
                                    return <Redirect to={systemMenuPath} />;
                                }}
                            />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
