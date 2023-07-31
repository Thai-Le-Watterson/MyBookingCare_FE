import React from "react";
import { FormattedMessage } from "react-intl";

import "./HomeBanner.scss";

class HomeBanner extends React.Component {
    render() {
        return (
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
        );
    }
}

export default HomeBanner;
