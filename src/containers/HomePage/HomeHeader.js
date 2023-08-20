import React from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { languages } from "../../utils/constant";
import * as actions from "../../store/actions";
import { history } from "../../redux";

import UserOption from "./Patient/User/UserOption";

import "./HomeHeader.scss";

class HomeHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenWidth: 0,
            userInfo: {},
        };
    }

    componentDidMount = () => {
        window.onresize = (e) =>
            this.handleResponsiveSection(e.target.innerWidth);

        this.handleResponsiveSection(window.innerWidth);

        this.setState({
            userInfo: this.props.userInfo,
            // screenWidth: this.props.screenWidth,
        });
    };

    componentDidUpdate = (prevProps) => {
        if (this.props.screenWidth !== prevProps.screenWidth) {
            this.setState({
                screenWidth: this.props.screenWidth,
            });
        }
    };

    handleResponsiveSection = (screenWidth) => {
        this.setState({ screenWidth });
    };

    handleChangeLanguage = (language) => {
        this.props.changeLanguage(language);
    };

    handleRedirectToHome = () => {
        history.push("/home");
    };

    handleShowContactOnMobile = (e) => {
        if (e.target.checked) {
            document.querySelector(".contact-overlay.hide");
        }
    };

    handleHideContactOnMobile = (e) => {
        e.stopPropagation();
        const element = document.querySelector("#show-contact");
        element.checked = false;
        console.log("Hide");
    };

    render() {
        let { language, userInfo } = this.props;
        // console.log("check userInfo: ", userInfo);
        return (
            <>
                <div className="home-header_container">
                    <div className="home-header_content">
                        <div className="logo-container">
                            <label htmlFor="show-contact">
                                <i className="fa-solid fa-bars"></i>
                            </label>
                            <div
                                className="logo"
                                onClick={() => this.handleRedirectToHome()}
                            ></div>
                        </div>
                        <ul className="menu">
                            <li>
                                <a href="#">
                                    <FormattedMessage
                                        id={"homeHeader.specialty"}
                                    />
                                    <span>
                                        <FormattedMessage
                                            id={"homeHeader.findDoctor"}
                                        />
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <FormattedMessage
                                        id={"homeHeader.healthFacilities"}
                                    />
                                    <span>
                                        <FormattedMessage
                                            id={"homeHeader.chooseHospital"}
                                        />
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <FormattedMessage
                                        id={"homeHeader.doctor"}
                                    />
                                    <span>
                                        <FormattedMessage
                                            id={"homeHeader.chooseDoctor"}
                                        />
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <FormattedMessage
                                        id={"homeHeader.examinationPackage"}
                                    />
                                    <span>
                                        <FormattedMessage
                                            id={"homeHeader.healthCheck"}
                                        />
                                    </span>
                                </a>
                            </li>
                        </ul>
                        <input
                            id="show-contact"
                            type="checkbox"
                            style={{ display: "none" }}
                            onClick={(e) => this.handleShowContactOnMobile(e)}
                        />
                        <div
                            className="contact-overlay"
                            onClick={(e) => this.handleHideContactOnMobile(e)}
                        >
                            <div
                                className="contact-container"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="contact">
                                    <i className="fa-solid fa-circle-question"></i>
                                    <FormattedMessage
                                        id={"homeHeader.support"}
                                    />
                                </div>
                                <div className="language">
                                    <label
                                        className="language-title"
                                        htmlFor="show-language"
                                    >
                                        <FormattedMessage
                                            id={"homeHeader.language"}
                                        />
                                        <i className="fa-solid fa-caret-down"></i>
                                    </label>
                                    <input
                                        id="show-language"
                                        type="checkbox"
                                        style={{ display: "none" }}
                                    />
                                    <ul className="list-language">
                                        <span
                                            className={
                                                language === languages.VI
                                                    ? "language_vi active"
                                                    : "language_vi"
                                            }
                                            onClick={(e) => {
                                                this.handleChangeLanguage(
                                                    languages.VI
                                                );
                                            }}
                                        >
                                            {this.state.screenWidth <= 567 ? (
                                                <FormattedMessage id="homeHeader.vietnamese" />
                                            ) : (
                                                "VN"
                                            )}
                                        </span>
                                        <span
                                            className={
                                                language === languages.EN
                                                    ? "language_en active"
                                                    : "language_en"
                                            }
                                            onClick={(e) => {
                                                this.handleChangeLanguage(
                                                    languages.EN
                                                );
                                            }}
                                        >
                                            {this.state.screenWidth <= 567 ? (
                                                <FormattedMessage id="homeHeader.english" />
                                            ) : (
                                                "EN"
                                            )}
                                        </span>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <UserOption />
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguage: (language) =>
            dispatch({
                type: "CHANGE_LANGUAGE",
                language,
            }),
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
