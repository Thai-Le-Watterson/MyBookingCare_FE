import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import { languages, ROLETYPE } from "../../utils/constant";

import UserOption from "../HomePage/Patient/User/UserOption";

import "./Header.scss";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        };
    }

    componentDidMount = () => {
        this.setState({
            menuApp:
                this.props.userInfo.roleId === ROLETYPE.ADMIN
                    ? adminMenu
                    : this.props.userInfo.roleId === ROLETYPE.DOCTOR
                    ? doctorMenu
                    : [],
        });
    };

    handleChangeLanguage = (language) => {
        this.props.changeLanguage(language);
    };

    render() {
        const { processLogout, userInfo, language } = this.props;
        const image = userInfo?.image && Buffer.from(userInfo.image).toString();

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                {/* nút logout */}
                <div className="content-right-container">
                    <div className="languages">
                        <span
                            onClick={() =>
                                this.handleChangeLanguage(languages.VI)
                            }
                            className={
                                this.props.language === languages.VI
                                    ? "language-vi active"
                                    : "language-vi"
                            }
                        >
                            VN
                        </span>
                        <span
                            onClick={() =>
                                this.handleChangeLanguage(languages.EN)
                            }
                            className={
                                this.props.language === languages.EN
                                    ? "language-en active"
                                    : "language-en"
                            }
                        >
                            EN
                        </span>
                    </div>
                    <UserOption
                        color="white"
                        isAminPage={true}
                        className="top-40"
                    />
                    {/* <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div> */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguage: (language) =>
            dispatch({
                type: "CHANGE_LANGUAGE",
                language,
            }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
