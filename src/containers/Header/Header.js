import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import { languages } from "../../utils/constant";
import "./Header.scss";

class Header extends Component {
    handleChangeLanguage = (language) => {
        this.props.changeLanguage(language);
    };

    render() {
        const { processLogout } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
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
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
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
