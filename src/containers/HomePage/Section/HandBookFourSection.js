import React from "react";
import * as userService from "../../../services/userService";
import _ from "lodash";
import moment from "moment";
import { withRouter } from "react-router-dom";

import Slider from "react-slick";
import ContentLoader from "react-content-loader";
import { FormattedMessage } from "react-intl";

import "./HandBookFourSection.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { dateFormat } from "../../../utils";

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

class HandBookFourSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handbooks: [],
            isLoadContent: false,
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

    componentDidMount = async () => {
        window.onresize = (e) =>
            this.handleResponsiveSection(e.target.innerWidth);

        this.handleResponsiveSection(window.innerWidth);

        if (this.props.newHandbook === true) {
            this.setState({
                isLoadContent: true,
            });

            const handbooks = await userService.getAllHandbook(5);

            if (handbooks && !_.isEmpty(handbooks)) {
                this.setState({
                    handbooks,
                });
            }
            this.setState({
                isLoadContent: false,
            });
        } else if (this.props.outstandingHandbook === true) {
            this.setState({
                isLoadContent: true,
            });

            const handbooks = await userService.getAllHandbook(5, "views");

            if (handbooks && !_.isEmpty(handbooks)) {
                this.setState({
                    handbooks,
                });
            }
            this.setState({
                isLoadContent: false,
            });
        }
    };

    componentDidUpdate = async (prevProps, prevState) => {
        if (prevProps.categoryId !== this.props.categoryId) {
            this.setState({
                isLoadContent: true,
            });
            const handbooks = await userService.getAllHandbookByCategory(
                this.props.categoryId
            );
            if (handbooks && !_.isEmpty(handbooks)) {
                this.setState({
                    handbooks,
                });
            }
            this.setState({
                isLoadContent: false,
            });
        } else if (prevProps.newHandbook !== this.props.newHandbook) {
            if (this.props.newHandbook === true) {
                this.setState({
                    isLoadContent: true,
                });

                const handbooks = await userService.getAllHandbook(10);

                if (handbooks && !_.isEmpty(handbooks)) {
                    this.setState({
                        handbooks,
                    });
                }
                this.setState({
                    isLoadContent: false,
                });
            }
        } else if (
            prevProps.outstandingHandbook !== this.props.outstandingHandbook
        ) {
            if (this.props.outstandingHandbook === true) {
                this.setState({
                    isLoadContent: true,
                });

                const handbooks = await userService.getAllHandbook(10, "views");

                if (handbooks && !_.isEmpty(handbooks)) {
                    this.setState({
                        handbooks,
                    });
                }
                this.setState({
                    isLoadContent: false,
                });
            }
        }
    };

    contentLoader = (quantity) => {
        const result = [];

        if (Number.isInteger(quantity) && quantity > 0)
            for (let i = 1; i <= quantity; i++) {
                result.push(
                    <ContentLoader
                        key={i}
                        viewBox="0 0 800 400"
                        height={200}
                        width={"100%"}
                        backgroundColor="#ededed"
                        foregroundColor="#dedede"
                    >
                        <circle cx="472" cy="159" r="7" />
                        <rect
                            x="487"
                            y="154"
                            rx="5"
                            ry="5"
                            width="220"
                            height="10"
                        />
                        <circle cx="472" cy="190" r="7" />
                        <rect
                            x="487"
                            y="184"
                            rx="5"
                            ry="5"
                            width="220"
                            height="10"
                        />
                        <circle cx="472" cy="219" r="7" />
                        <rect
                            x="487"
                            y="214"
                            rx="5"
                            ry="5"
                            width="220"
                            height="10"
                        />
                        <circle cx="472" cy="249" r="7" />
                        <rect
                            x="487"
                            y="244"
                            rx="5"
                            ry="5"
                            width="220"
                            height="10"
                        />
                        <rect
                            x="64"
                            y="18"
                            rx="0"
                            ry="0"
                            width="346"
                            height="300"
                        />
                        <rect
                            x="229"
                            y="300"
                            rx="0"
                            ry="0"
                            width="0"
                            height="0"
                        />
                        <rect
                            x="111"
                            y="340"
                            rx="0"
                            ry="0"
                            width="0"
                            height="0"
                        />
                        <rect
                            x="121"
                            y="342"
                            rx="0"
                            ry="0"
                            width="0"
                            height="0"
                        />
                        <rect
                            x="10"
                            y="20"
                            rx="0"
                            ry="0"
                            width="40"
                            height="44"
                        />
                        <rect
                            x="10"
                            y="80"
                            rx="0"
                            ry="0"
                            width="40"
                            height="44"
                        />
                        <rect
                            x="10"
                            y="140"
                            rx="0"
                            ry="0"
                            width="40"
                            height="44"
                        />
                        <rect
                            x="194"
                            y="329"
                            rx="0"
                            ry="0"
                            width="0"
                            height="0"
                        />
                        <rect
                            x="192"
                            y="323"
                            rx="0"
                            ry="0"
                            width="0"
                            height="0"
                        />
                        <rect
                            x="185"
                            y="323"
                            rx="0"
                            ry="0"
                            width="0"
                            height="0"
                        />
                        <rect
                            x="10"
                            y="200"
                            rx="0"
                            ry="0"
                            width="40"
                            height="44"
                        />
                        <rect
                            x="470"
                            y="18"
                            rx="0"
                            ry="0"
                            width="300"
                            height="25"
                        />
                        <rect
                            x="470"
                            y="58"
                            rx="0"
                            ry="0"
                            width="300"
                            height="6"
                        />
                        <rect
                            x="470"
                            y="68"
                            rx="0"
                            ry="0"
                            width="300"
                            height="6"
                        />
                        <rect
                            x="470"
                            y="78"
                            rx="0"
                            ry="0"
                            width="300"
                            height="6"
                        />
                        <rect
                            x="798"
                            y="135"
                            rx="0"
                            ry="0"
                            width="0"
                            height="0"
                        />
                        <rect
                            x="731"
                            y="132"
                            rx="0"
                            ry="0"
                            width="0"
                            height="0"
                        />
                        <rect
                            x="470"
                            y="99"
                            rx="0"
                            ry="0"
                            width="70"
                            height="30"
                        />
                        <rect
                            x="560"
                            y="99"
                            rx="0"
                            ry="0"
                            width="70"
                            height="30"
                        />
                    </ContentLoader>
                );
            }

        return result;
    };

    buildSettingSlider = () => {
        return {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
        };
    };

    contentLoader = (quantity) => {
        const result = [];

        if (Number.isInteger(quantity) && quantity > 0)
            for (let i = 1; i <= quantity; i++) {
                result.push(
                    <ContentLoader
                        key={i}
                        width={300}
                        height={200}
                        viewBox="0 0 450 400"
                        backgroundColor="#ededed"
                        foregroundColor="#dedede"
                    >
                        <rect
                            x="43"
                            y="304"
                            rx="4"
                            ry="4"
                            width="271"
                            height="9"
                        />
                        <rect
                            x="44"
                            y="323"
                            rx="3"
                            ry="3"
                            width="119"
                            height="6"
                        />
                        <rect
                            x="42"
                            y="77"
                            rx="10"
                            ry="10"
                            width="388"
                            height="217"
                        />
                    </ContentLoader>
                );
            }

        return result;
    };

    handleResponsiveSection = (screenWidth) => {
        if (screenWidth >= 1200) {
            const copyState = { ...this.state };
            copyState.screenWidth = screenWidth;
            copyState.settings.slidesToShow = 4;

            this.setState({ ...copyState });
        } else if (screenWidth >= 992) {
            const copyState = { ...this.state };
            copyState.screenWidth = screenWidth;
            copyState.settings.slidesToShow = 3;

            this.setState({ ...copyState });
        } else if (screenWidth >= 768) {
            const copyState = { ...this.state };
            copyState.screenWidth = screenWidth;
            copyState.settings.slidesToShow = 3;

            this.setState({ ...copyState });
        } else if (screenWidth >= 576) {
            const copyState = { ...this.state };
            copyState.screenWidth = screenWidth;
            copyState.settings.slidesToShow = 2;

            this.setState({ ...copyState });
        } else if (screenWidth < 576) {
            const copyState = { ...this.state };
            copyState.screenWidth = screenWidth;
            copyState.settings.slidesToShow = 1;

            this.setState({ ...copyState });
        }
    };

    render() {
        // console.log("check props new: ", this.props);
        // console.log("check state: ", this.state);
        const { handbooks, isLoadContent, settings } = this.state;
        // console.log("check handbooks: ", handbooks);

        return (
            <>
                <div className="section-overlay section-bg style-flex">
                    <div className="section-container section-handbook-container">
                        <div className="section-title border-b">
                            <h1 className="title">
                                <FormattedMessage id="handbook-detail.handbook-new" />
                            </h1>
                        </div>
                        <Slider {...settings}>
                            {isLoadContent ? (
                                this.contentLoader(settings?.slidesToShow)
                            ) : handbooks && !_.isEmpty(handbooks) ? (
                                handbooks.map((handbook, index) => {
                                    const image =
                                        handbook.image &&
                                        Buffer.from(handbook.image).toString();
                                    const handbookName =
                                        handbook.name.replaceAll(" ", "-");
                                    return (
                                        <div
                                            className="section-item section-handbook-item"
                                            key={index}
                                            onClick={() =>
                                                this.props.history.push(
                                                    `/handbook/${handbook.id}/${handbookName}`
                                                )
                                            }
                                        >
                                            <img src={image} width={"100%"} />
                                            <div className="handbook-title">
                                                <p className="title">
                                                    {handbook.name}
                                                </p>
                                                <p className="date">
                                                    Xuất bản{" "}
                                                    {moment(
                                                        handbook.publicationDate
                                                    ).format(
                                                        dateFormat.SEND_TO_SERVER
                                                    )}{" "}
                                                    | Cập nhật lần cuối{" "}
                                                    {moment(
                                                        handbook.updateDate
                                                    ).format(
                                                        dateFormat.SEND_TO_SERVER
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <h3 className="text-center">
                                    <FormattedMessage id="homepage.no-handbook" />
                                </h3>
                            )}
                        </Slider>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(HandBookFourSection);
