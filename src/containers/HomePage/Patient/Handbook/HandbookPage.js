import React from "react";
import * as actions from "../../../../store/actions/index";
import { connect } from "react-redux";

import HomeHeader from "../../HomeHeader";
import HomeFooter from "../../HomeFooter";
import HandBook from "../../Section/HandBook";
import HandbookFour from "../../Section/HandBookFour";
import CategoryHandbook from "../../Section/CategoryHandbook";

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
                <div className="handbook-page_overlay">
                    <HandbookFour newHandbook={true} />
                    <HandBook
                        settings={{ ...this.settings, slidesToShow: 2 }}
                        outstandingHandbook={true}
                        isShowContentHead={true}
                        height={true}
                        arrowPositionRemote={true}
                    />
                    <CategoryHandbook onlyHaveImg={true} />
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
