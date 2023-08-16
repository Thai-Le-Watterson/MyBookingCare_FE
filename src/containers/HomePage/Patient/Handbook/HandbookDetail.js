import React from "react";
import * as userService from "../../../../services/userService";
import _ from "lodash";
import moment from "moment/moment";

import HomeHeader from "../../HomeHeader";
import HomeFooter from "../../HomeFooter";
import HandBookFour from "../../Section/HandBookFour";
import { FormattedMessage } from "react-intl";

import "./HandbookDetail.scss";

class HandbookDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handbook: {},
        };
    }

    componentDidMount = async () => {
        const handbook = await userService.getHandbook(
            this.props.match.params.id,
            "1"
        );

        this.setState({
            handbook: handbook && !_.isEmpty(handbook) ? handbook : {},
        });

        this.buildNavContent();
    };

    componentDidUpdate = async (prevProps, prevState) => {};

    buildNavContent = () => {
        const hanbookContent =
            document.querySelectorAll(".handbook-content")[0];

        if (hanbookContent?.children) {
            const navList = Array.from(hanbookContent.children).map(
                (child, index) => {
                    if (child.localName === "h3") {
                        const id = `h3-${index}`;
                        child.setAttribute("id", id);
                        return (
                            <li className="nav-item_container">
                                <a className="nav-item" href={`#${id}`}>
                                    {child.innerText}
                                </a>
                            </li>
                        );
                    } else if (child.localName === "h2") {
                        const id = `h2-${index}`;
                        child.setAttribute("id", id);
                        return (
                            <p className="nav-item_container">
                                <a className="nav-item" href={`#${id}`}>
                                    {child.innerText}
                                </a>
                            </p>
                        );
                    } else return <></>;
                }
            );

            this.setState({
                navList,
            });
        }
    };

    render() {
        // console.log("check state: ", this.state);
        const {
            image,
            name,
            publicationDate,
            updateDate,
            contentHTML,
            categoryId,
            categoryData,
        } = this.state?.handbook;
        const publicationDateOnView =
            moment(publicationDate).format("DD/MM/YYYY");
        const updateDateOnView = moment(updateDate).format("DD/MM/YYYY");
        const reviewImage = image && Buffer.from(image).toString();

        return (
            <>
                <HomeHeader />
                <div className="handbook-banner">
                    <div className="bg-overlay">
                        <p className="navigate">
                            <span
                                onClick={() => this.props.history.push("/home")}
                            >
                                Trang chủ
                            </span>{" "}
                            &gt; <span>Cẩm nang</span> &gt;{" "}
                            <span>{categoryData?.name}</span>
                        </p>
                        <p className="handbook-name">{name}</p>
                    </div>
                </div>
                <div className="content-overlay">
                    <div className="container">
                        <div className="row">
                            <div className="handbook-content_container">
                                <img src={reviewImage} width={"100%"} />
                                <p className="handbook-name">{name}</p>
                                <span className="fw-bold">
                                    <FormattedMessage id="handbook-detail.product" />{" "}
                                    <span className="main-color fw-normal">
                                        <FormattedMessage id="handbook-detail.name" />{" "}
                                    </span>
                                </span>
                                <p className="fw-bold my-2">
                                    <FormattedMessage id="handbook-detail.date" />{" "}
                                    <span className="fw-normal">
                                        {publicationDateOnView} |{" "}
                                        <FormattedMessage id="handbook-detail.update-date" />
                                        : {updateDateOnView}
                                    </span>
                                </p>
                                <p
                                    className="handbook-content"
                                    dangerouslySetInnerHTML={{
                                        __html: contentHTML,
                                    }}
                                ></p>
                            </div>
                            <div className="handbook-navigate">
                                <p className="handbook-navigate_title main-color">
                                    <FormattedMessage id="handbook-detail.main-content" />
                                </p>
                                <div className="nav-list">
                                    {this.state?.navList}
                                </div>
                            </div>
                        </div>
                    </div>
                    <HandBookFour categoryId={categoryId} />
                </div>
                <HomeFooter />
            </>
        );
    }
}

export default HandbookDetail;
