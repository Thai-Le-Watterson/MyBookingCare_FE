import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";

import {
    userIsAuthenticated,
    userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
import Login from "../containers/Auth/Login.js";
import System from "../routes/System";
import HomePage from "./HomePage/HomePage";
import DoctorDetail from "./HomePage/Patient/Doctor/DoctorDetail";
import SpecialtyDetail from "./HomePage/Patient/Specialty/SpecialtyDetail";
import ClinicDetail from "./HomePage/Patient/Clinic/ClinicDetail";
import HandbookDetail from "./HomePage/Patient/Handbook/HandbookDetail";
import CategoryDetail from "./HomePage/Patient/Handbook/CategoryDetail";
import HandbookPage from "./HomePage/Patient/Handbook/HandbookPage";
import CategoryPage from "./HomePage/Patient/Handbook/CategoryPage";
import VerifySchedule from "./HomePage/Patient/Doctor/VerifySchedule";
import SpecialtyPage from "./HomePage/Patient/Specialty/SpecialtyPage";
import DoctorPage from "./HomePage/Patient/Doctor/DoctorPage";
import ClinicPage from "./HomePage/Patient/Clinic/ClinicPage";
import Page404 from "./HomePage/Page404";

import CustomScrollbars from "../components/CustomScrollbars";
// import { CustomToastCloseButton } from "../components/CustomToast";
import ConfirmModal from "../components/ConfirmModal";
import { RingLoader } from "react-spinners";

class App extends Component {
    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <Router history={history}>
                    <div className="main-container">
                        <ConfirmModal />

                        <div className="content-container">
                            {/* <CustomScrollbars> */}
                            <Switch>
                                <Route
                                    path={path.HOME}
                                    exact
                                    component={Home}
                                />
                                <Route
                                    path={path.HOMEPAGE}
                                    exact
                                    component={HomePage}
                                />
                                <Route
                                    path={path.CATEGORY_PAGE}
                                    exact
                                    component={CategoryPage}
                                />
                                <Route
                                    path={path.SPECIALTY_PAGE}
                                    exact
                                    component={SpecialtyPage}
                                />
                                <Route
                                    path={path.DOCTOR_PAGE}
                                    exact
                                    component={DoctorPage}
                                />
                                <Route
                                    path={path.HANDBOOK_PAGE}
                                    exact
                                    component={HandbookPage}
                                />
                                <Route
                                    path={path.CLINIC_PAGE}
                                    exact
                                    component={ClinicPage}
                                />
                                <Route
                                    path={path.DETAIL_DOCTOR}
                                    exact
                                    component={DoctorDetail}
                                />
                                <Route
                                    path={path.DETAIL_SPECIALTY}
                                    exact
                                    component={SpecialtyDetail}
                                />
                                <Route
                                    path={path.DETAIL_CLINIC}
                                    exact
                                    component={ClinicDetail}
                                />
                                <Route
                                    path={path.DETAIL_HANDBOOK}
                                    exact
                                    component={HandbookDetail}
                                />
                                <Route
                                    path={path.DETAIL_CATEGORY}
                                    exact
                                    component={CategoryDetail}
                                />
                                <Route
                                    path={path.VERIFY_SCHEDULE}
                                    exact
                                    component={VerifySchedule}
                                />
                                <Route
                                    path={path.LOGIN}
                                    component={userIsNotAuthenticated(Login)}
                                />
                                <Route
                                    path={path.SYSTEM}
                                    component={userIsAuthenticated(System)}
                                />
                                <Route component={Page404} />
                            </Switch>
                            {/* </CustomScrollbars> */}
                        </div>

                        {/* <ToastContainer
                            className="toast-container"
                            toastClassName="toast-item"
                            bodyClassName="toast-item-body"
                            autoClose={false}
                            hideProgressBar={true}
                            pauseOnHover={false}
                            pauseOnFocusLoss={true}
                            closeOnClick={false}
                            draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}

                        {this.props.isLoading && (
                            <div className="loader">
                                <RingLoader
                                    color={"#00fff1"}
                                    loading={this.props.isLoading}
                                    size={150}
                                />
                            </div>
                        )}
                    </div>
                </Router>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        started: state.app.started,
        isLoading: state.app.isLoading,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
