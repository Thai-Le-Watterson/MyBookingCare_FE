import React from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

import HomeHeader from "./HomeHeader";
import Speciallty from "./Section/Speciallty";
import MedicalFacility from "./Section/MedicalFacility";
import OutstandingDoctor from "./Section/OutstandingDoctor";
import HandBook from "./Section/HandBook";
import Media from "./Section/Media";
import HomeFooter from "./HomeFooter";
import HomeBanner from "./HomeBanner";

import "./HomePage.scss";

class SampleNextArrow extends React.Component {
    // { className, style, onClick } = this.props;
    render() {
        return (
            <div className={this.props.className} onClick={this.props.onClick}>
                <i className="fa-solid fa-angle-right"></i>
            </div>
        );
    }
}

class SamplePrevArrow extends React.Component {
    // { className, style, onClick } = this.props;
    render() {
        return (
            <div className={this.props.className} onClick={this.props.onClick}>
                <i className="fa-solid fa-angle-left"></i>
            </div>
        );
    }
}

class HomePage extends React.Component {
    settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    render() {
        return (
            <div>
                <HomeHeader />
                <HomeBanner />
                <Speciallty settings={this.settings} />
                <MedicalFacility settings={this.settings} />
                <OutstandingDoctor settings={this.settings} />
                <HandBook settings={{ ...this.settings, slidesToShow: 2 }} />
                <Media />
                <HomeFooter />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
