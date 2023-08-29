import React from "react";
import * as actions from "../../../../store/actions/index";
import { connect } from "react-redux";

import HomeHeader from "../../HomeHeader";
import HomeFooter from "../../HomeFooter";
import HandBookSection from "../../Section/HandBookSection";
import HandBookFourSection from "../../Section/HandBookFourSection";
import CategoryHandbookSection from "../../Section/CategoryHandbookSection";

import "./HandbookPage.scss";

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

class HandbookPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handbookCategories: [],
            isLoadContent: false,
            screenWidth: 0,
            settings: {
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 2,
                slidesToScroll: 1,
                nextArrow: <SampleNextArrow />,
                prevArrow: <SamplePrevArrow />,
            },
        };
    }

    componentDidMount = async () => {
        window.onresize = (e) =>
            this.handleResponsiveSection(e.target.innerWidth);

        this.handleResponsiveSection(window.innerWidth);
    };

    handleResponsiveSection = (screenWidth) => {
        if (screenWidth < 768) {
            const copyState = { ...this.state };
            copyState.screenWidth = screenWidth;
            copyState.settings.slidesToShow = 1;

            this.setState({ ...copyState });
        } else if (screenWidth >= 768) {
            const copyState = { ...this.state };
            copyState.screenWidth = screenWidth;
            copyState.settings.slidesToShow = 2;

            this.setState({ ...copyState });
        }
    };

    render() {
        return (
            <div>
                <HomeHeader />
                <div className="handbook-page_overlay">
                    <HandBookFourSection newHandbook={true} />
                    <HandBookSection
                        settings={{ ...this.state.settings }}
                        outstandingHandbook={true}
                        isShowContentHead={
                            this.state.screenWidth < 768 ? false : true
                        }
                        height={true}
                        arrowPositionRemote={
                            this.state.screenWidth <= 992 ? false : true
                        }
                    />
                    <CategoryHandbookSection onlyHaveImg={true} />
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandbookPage);
