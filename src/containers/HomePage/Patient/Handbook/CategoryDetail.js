import React from "react";
import * as userService from "../../../../services/userService";
import _ from "lodash";
import moment from "moment/moment";

import HomeHeader from "../../HomeHeader";
import HomeFooter from "../../HomeFooter";
import HandBookFour from "../../Section/HandBookFour";
import { FormattedMessage } from "react-intl";
import { BeatLoader } from "react-spinners";
import ContentLoader from "react-content-loader";

import "./CategoryDetail.scss";

class CategoryDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handbooks: [],
            category: {},
            page: 1,
            isLastPage: false,
            limitHandbook: 5,
            isLoading: false,
        };
    }

    componentDidMount = async () => {
        const categories = await userService.getAllCategoryHandbook(-1, -2);
        this.setState({
            categories,
        });

        this.handleGetDataForPage();
    };

    componentDidUpdate = async (prevProps, prevState) => {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            console.log("into update");
            await this.handleGetDataForPage();
        }
    };

    handleGetDataForPage = async () => {
        this.setState({
            isLoading: true,
        });

        let { isLastPage, page, limitHandbook, categories } = this.state;

        const handbooks = await userService.getAllHandbookByCategoryPG(
            this.props.match.params.id,
            page,
            limitHandbook
        );

        isLastPage =
            !handbooks?.count || page * limitHandbook >= handbooks?.count
                ? true
                : false;

        // const categories = await userService.getAllCategoryHandbook(-1, -2);
        let category = {};

        categories.forEach((categoryItem, index) => {
            if (categoryItem.id === +this.props.match.params.id) {
                category = { ...categoryItem };
            }
        });

        this.setState({
            category: category && !_.isEmpty(category) ? category : {},
            // categories: categories && !_.isEmpty(categories) ? categories : [],
            handbooks:
                handbooks?.handbooks && !_.isEmpty(handbooks.handbooks)
                    ? handbooks.handbooks
                    : [],
            isLastPage,
            isLoading: false,
        });
    };

    handleSeeMoreHandbook = async () => {
        let { page, handbooks, limitHandbook, isLastPage } = this.state;
        page += 1;

        const handbooksMore = await userService.getAllHandbookByCategoryPG(
            this.props.match.params.id,
            page,
            limitHandbook
        );

        if (handbooksMore?.handbooks && !_.isEmpty(handbooksMore.handbooks)) {
            handbooks = handbooks.concat(handbooksMore.handbooks);
        }

        if (page * limitHandbook >= handbooksMore.count) {
            isLastPage = true;
        }

        this.setState({
            page,
            handbooks,
            isLastPage,
        });
    };

    handleClearState = () => {
        this.setState({
            handbooks: [],
            category: {},
            page: 1,
            isLastPage: false,
        });
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

    render() {
        // console.log("check props: ", this.props);
        // console.log("check state: ", this.state);
        const { handbooks, category, isLastPage, categories, isLoading } =
            this.state;

        return (
            <>
                <HomeHeader />
                <div className="content-overlay category-container">
                    {isLoading ? (
                        <div className="loading-container bg-white py-5">
                            <BeatLoader
                                color={"#00fff1"}
                                loading={isLoading}
                                size={20}
                            />
                        </div>
                    ) : (
                        <>
                            <div className="category-intro">
                                <div className="container">
                                    <h1 className="category-name">
                                        {category.name}
                                    </h1>
                                </div>
                            </div>
                            <div className="category-handbook">
                                <div className="container">
                                    {handbooks && !_.isEmpty(handbooks) ? (
                                        handbooks.map((handbook, index) => {
                                            const img =
                                                handbook.image &&
                                                Buffer.from(
                                                    handbook.image
                                                ).toString();
                                            const name =
                                                handbook?.name.replaceAll(
                                                    " ",
                                                    "-"
                                                );
                                            return (
                                                <div
                                                    className="category-handbook_item"
                                                    key={index}
                                                    onClick={() =>
                                                        this.props.history.push(
                                                            `/detail-handbook/${handbook.id}/${name}`
                                                        )
                                                    }
                                                >
                                                    <img
                                                        className="category-handbook_item-img"
                                                        src={img}
                                                        width={"200px"}
                                                    />
                                                    <p className="category-handbook_item-name">
                                                        {handbook.name}
                                                    </p>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <h2 className="text-center m-5">
                                            <FormattedMessage id="category.no-handbook" />
                                        </h2>
                                    )}
                                    {!isLastPage && (
                                        <div
                                            className="see-more"
                                            onClick={() =>
                                                this.handleSeeMoreHandbook()
                                            }
                                        >
                                            <p className="text">
                                                <FormattedMessage id="category.more" />{" "}
                                                <i className="fa-solid fa-caret-down"></i>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                    <div className="category-list">
                        <div className="container">
                            <p className="list-title">
                                <FormattedMessage id="category.category" />
                            </p>
                            <div className="list row">
                                {categories &&
                                    !_.isEmpty(categories) &&
                                    categories.map((category, index) => {
                                        return (
                                            <div
                                                className="col-3 item"
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
                                                {category.name}
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
                <HomeFooter />
            </>
        );
    }
}

export default CategoryDetail;
