import React from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { languages } from "../../utils/constant";
import * as actions from "../../store/actions";
import { history } from "../../redux";

import "./HomeHeader.scss";

class HomeHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
        };
    }

    componentDidMount = () => {
        this.setState({
            userInfo: this.props.userInfo,
        });
    };

    componentDidUpdate = (prevProps) => {};

    handleChangeLanguage = (language) => {
        this.props.changeLanguage(language);
    };

    render() {
        let language = this.props.language;
        return (
            <>
                <div className="home-header_container">
                    <div className="home-header_content">
                        <div className="logo-container">
                            <i className="fa-solid fa-bars"></i>
                            <div className="logo"></div>
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
                        <div className="contact-container">
                            <div className="contact">
                                <i className="fa-solid fa-circle-question"></i>
                                <FormattedMessage id={"homeHeader.support"} />
                            </div>
                            <div className="language">
                                <span
                                    className={
                                        language === languages.VI
                                            ? "language_vi active"
                                            : "language_vi"
                                    }
                                    onClick={(e) => {
                                        this.handleChangeLanguage(languages.VI);
                                    }}
                                >
                                    VN
                                </span>
                                <span
                                    className={
                                        language === languages.EN
                                            ? "language_en active"
                                            : "language_en"
                                    }
                                    onClick={(e) => {
                                        this.handleChangeLanguage(languages.EN);
                                    }}
                                >
                                    EN
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="user-container">
                        {this.props.isLoggedIn ? (
                            <div
                                className="btn btn-logout"
                                onClick={() => this.props.processLogout()}
                            >
                                <i className="fas fa-sign-out-alt"></i>
                            </div>
                        ) : (
                            <div className="btn btn-login">
                                <i
                                    className="fa-solid fa-circle-user"
                                    onClick={() => history.push("/login")}
                                ></i>
                            </div>
                        )}
                    </div>
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
