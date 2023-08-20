import React from "react";
import * as userService from "../../../services/userService";
import _ from "lodash";

import Slider from "react-slick";
import ContentLoader from "react-content-loader";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HandBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handbooks: [],
            isLoadContent: false,
        };
    }

    componentDidMount = async () => {
        if (this.props.outstandingHandbook === true) {
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
        } else {
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

    handleGetContentHeader = (handbook) => {
        const contentHTML = handbook.contentHTML;
        let contentHeader = contentHTML.slice(
            contentHTML.search("<h1>"),
            contentHTML.search("</h1>")
        );
        contentHeader = contentHeader.replace("<h1>", "").replace("</h1>", "");
        // console.log(contentHeader);
        return contentHeader;
    };

    render() {
        // console.log("check state: ", this.state);
        console.log("check props: ", this.props);
        const { handbooks, isLoadContent } = this.state;

        return (
            <>
                <div
                    className={`section-overlay ${
                        (this.props.bg && "section-bg") || ""
                    } style-flex`}
                >
                    <div
                        className={`section-container ${
                            this.props.height === true ? "height-fit" : ""
                        } ${
                            this.props.arrowPositionRemote &&
                            "arrow-position-remote"
                        }`}
                    >
                        <div className="section-title">
                            <h1 className="title">
                                {(this.props.outstandingHandbook === true && (
                                    <FormattedMessage id="handbook-detail.featured" />
                                )) || (
                                    <FormattedMessage id="homepage.handbook" />
                                )}
                            </h1>
                            {this.props.outstandingHandbook !== true && (
                                <button
                                    className="button"
                                    onClick={() =>
                                        this.props.history.push("/handbook")
                                    }
                                >
                                    <FormattedMessage id="homepage.all" />
                                </button>
                            )}
                        </div>
                        <Slider {...this.props.settings}>
                            {isLoadContent ? (
                                this.contentLoader(
                                    this.props.settings?.slidesToShow
                                )
                            ) : handbooks && !_.isEmpty(handbooks) ? (
                                handbooks.map((handbook, index) => {
                                    const image =
                                        handbook.image &&
                                        Buffer.from(handbook.image).toString();
                                    const handbookName =
                                        handbook.name.replaceAll(" ", "-");
                                    return (
                                        <div
                                            className="section-item"
                                            key={index}
                                            onClick={() =>
                                                this.props.history.push(
                                                    `/detail-handbook/${handbook.id}/${handbookName}`
                                                )
                                            }
                                        >
                                            <div className="margin-box">
                                                {/* <div className="img img1"></div> */}
                                                <img src={image} />
                                                <div className="handbook-content">
                                                    <span className="title">
                                                        {handbook.name}
                                                    </span>
                                                    {this.props
                                                        .isShowContentHead && (
                                                        <p>
                                                            {this.handleGetContentHeader(
                                                                handbook
                                                            )}
                                                        </p>
                                                    )}
                                                </div>
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

export default withRouter(HandBook);
