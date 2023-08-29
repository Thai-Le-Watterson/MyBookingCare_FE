import React from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

import HomeHeader from "./HomeHeader";
import SpecialtySection from "./Section/SpecialtySection";
import MedicalFacilitySection from "./Section/MedicalFacilitySection";
import OutstandingDoctorSection from "./Section/OutstandingDoctorSection";
import HandBookSection from "./Section/HandBookSection";
import MediaSection from "./Section/MediaSection";
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
    constructor(props) {
        super(props);
        this.state = {
            screenWidth: window.innerWidth,
            settings: {
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 4,
                slidesToScroll: 1,
                nextArrow: <SampleNextArrow />,
                prevArrow: <SamplePrevArrow />,
            },
        };
    }

    componentDidMount = () => {
        window.onresize = (e) => {
            this.handleResponsiveSection(e.target.innerWidth);
            // console.log("check screenWidth window: ", { e });
            // console.log("check window: ", { window });
        };

        this.handleResponsiveSection(window.innerWidth);
    };

    handleResponsiveSection = (screenWidth) => {
        const copyState = { ...this.state };
        copyState.screenWidth = screenWidth;

        if (screenWidth >= 1200) {
            copyState.settings.slidesToShow = 4;
        } else if (screenWidth >= 992) {
            copyState.settings.slidesToShow = 3;
        } else if (screenWidth >= 768) {
            copyState.settings.slidesToShow = 3;
        } else if (screenWidth >= 576) {
            copyState.settings.slidesToShow = 2;
        } else if (screenWidth < 576) {
            copyState.settings.slidesToShow = 1;
        }

        this.setState({ ...copyState });
    };

    render() {
        // console.log("check screenWidth: ", this.state.screenWidth);

        return (
            <div>
                <HomeHeader screenWidth={this.state.screenWidth} />
                <HomeBanner />
                <SpecialtySection settings={{ ...this.state.settings }} />
                <MedicalFacilitySection settings={{ ...this.state.settings }} />
                <OutstandingDoctorSection
                    settings={{ ...this.state.settings }}
                />
                <HandBookSection
                    bg={true}
                    settings={{
                        ...this.state.settings,
                        slidesToShow: this.state.screenWidth >= 768 ? 2 : 1,
                    }}
                    arrowPositionRemote={
                        this.state.screenWidth <= 992 ? false : true
                    }
                    isShowContentHead={
                        this.state.screenWidth < 768 ? false : true
                    }
                />
                <MediaSection />
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
