import React from "react";
import * as userService from "../../../services/userService";
import _ from "lodash";
import moment from "moment";
import { withRouter } from "react-router-dom";

import Slider from "react-slick";
import ContentLoader from "react-content-loader";
import { FormattedMessage } from "react-intl";

import "./CategoryHandbook.scss";
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

class CategoryHandbook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handbookCategories: [],
            isLoadContent: false,
            settings: {
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 6,
                slidesToScroll: 2,
                nextArrow: <SampleNextArrow />,
                prevArrow: <SamplePrevArrow />,
            },
        };
    }

    componentDidMount = async () => {
        window.onresize = (e) =>
            this.handleResponsiveSection(e.target.innerWidth);

        this.handleResponsiveSection(window.innerWidth);

        if (this.props.onlyHaveImg === true) {
            this.setState({
                isLoadContent: true,
            });

            const handbookCategories = await userService.getAllCategoryHandbook(
                6,
                "1"
            );

            if (handbookCategories && !_.isEmpty(handbookCategories)) {
                this.setState({
                    handbookCategories,
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
            const handbookCategories =
                await userService.getAllHandbookByCategory(
                    this.props.categoryId
                );
            if (handbookCategories && !_.isEmpty(handbookCategories)) {
                this.setState({
                    handbookCategories,
                });
            }
            this.setState({
                isLoadContent: false,
            });
        }
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
        if (screenWidth >= 1400) {
            const copyState = { ...this.state };
            copyState.screenWidth = screenWidth;
            copyState.settings.slidesToShow = 6;

            this.setState({ ...copyState });
        } else if (screenWidth >= 1200) {
            const copyState = { ...this.state };
            copyState.screenWidth = screenWidth;
            copyState.settings.slidesToShow = 5;

            this.setState({ ...copyState });
        } else if (screenWidth >= 992) {
            const copyState = { ...this.state };
            copyState.screenWidth = screenWidth;
            copyState.settings.slidesToShow = 4;

            this.setState({ ...copyState });
        } else if (screenWidth >= 768) {
            const copyState = { ...this.state };
            copyState.screenWidth = screenWidth;
            copyState.settings.slidesToShow = 3;

            this.setState({ ...copyState });
        } else if (screenWidth >= 576) {
            const copyState = { ...this.state };
            copyState.screenWidth = screenWidth;
            copyState.settings.slidesToShow = 3;

            this.setState({ ...copyState });
        } else if (screenWidth < 576) {
            const copyState = { ...this.state };
            copyState.screenWidth = screenWidth;
            copyState.settings.slidesToShow = 2;

            this.setState({ ...copyState });
        }
    };

    render() {
        // console.log("check props new: ", this.props);
        // console.log("check state: ", this.state);
        const { handbookCategories, isLoadContent, settings } = this.state;
        // console.log("check handbookCategories: ", handbookCategories);

        return (
            <>
                <div className="section-overlay section-bg style-flex">
                    <div className="section-container section-handbook-container">
                        <div className="section-title border-b">
                            <h1 className="title">
                                <FormattedMessage id="handbook-detail.category" />
                            </h1>
                            <button
                                className="button"
                                onClick={() =>
                                    this.props.history.push("/category")
                                }
                            >
                                <FormattedMessage id="homepage.more" />
                            </button>
                        </div>
                        <Slider {...settings}>
                            {isLoadContent ? (
                                this.contentLoader(settings?.slidesToShow)
                            ) : handbookCategories &&
                              !_.isEmpty(handbookCategories) ? (
                                handbookCategories.map((category, index) => {
                                    const image =
                                        category.image &&
                                        Buffer.from(category.image).toString();
                                    return (
                                        <div
                                            className="section-category_item"
                                            key={index}
                                            onClick={() =>
                                                this.props.history.push(
                                                    `/detail-category/${
                                                        category.id
                                                    }/${category.name.replaceAll(
                                                        " ",
                                                        "-"
                                                    )}`
                                                )
                                            }
                                        >
                                            <div
                                                className="img"
                                                style={{
                                                    backgroundImage: `url(${image})`,
                                                }}
                                            ></div>
                                            <p className="category-name">
                                                {category.name}
                                            </p>
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

export default withRouter(CategoryHandbook);
