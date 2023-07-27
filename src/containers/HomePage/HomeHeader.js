import React from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { languages } from "../../utils/constant";
import "./HomeHeader.scss";

class HomeHeader extends React.Component {
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
                </div>
                <div className="home-header_banner">
                    <div className="search-container">
                        <h1>
                            <FormattedMessage id={"homeBanner.title1"} />
                            <p>
                                <FormattedMessage id={"homeBanner.title2"} />
                            </p>
                        </h1>
                        <div className="search">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input
                                type="text"
                                name="user-search"
                                placeholder="Tìm kiếm"
                            />
                        </div>
                    </div>
                    <ul className="option-container">
                        <li className="option">
                            <i className="fa-solid fa-hospital"></i>
                            <FormattedMessage id={"homeBanner.option1"} />
                        </li>
                        <li className="option">
                            <i className="fa-solid fa-mobile-screen-button"></i>
                            <FormattedMessage id={"homeBanner.option2"} />
                        </li>
                        <li className="option">
                            <i className="fa-regular fa-clipboard"></i>
                            <FormattedMessage id={"homeBanner.option3"} />
                        </li>
                        <li className="option">
                            <i className="fa-solid fa-vial-virus"></i>
                            <FormattedMessage id={"homeBanner.option4"} />
                        </li>
                        <li className="option">
                            <i className="fa-solid fa-brain"></i>
                            <FormattedMessage id={"homeBanner.option5"} />
                        </li>
                        <li className="option">
                            <i className="fa-solid fa-tooth"></i>
                            <FormattedMessage id={"homeBanner.option6"} />
                        </li>
                        <li className="option">
                            <i className="fa-solid fa-bed-pulse"></i>
                            <FormattedMessage id={"homeBanner.option7"} />
                        </li>
                        <li className="option">
                            <i className="fa-solid fa-suitcase-medical"></i>
                            <FormattedMessage id={"homeBanner.option8"} />
                        </li>
                        <li className="option">
                            <i className="fa-solid fa-list-check"></i>
                            <FormattedMessage id={"homeBanner.option9"} />
                        </li>
                    </ul>
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
    return {
        changeLanguage: (language) =>
            dispatch({
                type: "CHANGE_LANGUAGE",
                language,
            }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
