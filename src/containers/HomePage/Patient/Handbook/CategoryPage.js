import React from "react";
import * as userService from "../../../../services/userService";
import _ from "lodash";
// import moment from "moment/moment";

import HomeHeader from "../../HomeHeader";
import HomeFooter from "../../HomeFooter";
// import HandBookFourSection from "../../Section/HandBookFourSection";
// import { FormattedMessage } from "react-intl";

import "./CategoryPage.scss";

class CategoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
    }

    componentDidMount = async () => {
        const categories = await userService.getAllCategoryHandbook("-1");

        this.setState({
            categories: categories && !_.isEmpty(categories) ? categories : [],
        });
    };

    componentDidUpdate = async (prevProps, prevState) => {
        // if (this.props.match.params.id !== prevProps.match.params.id) {
        //     const categories = await userService.getAllCategoryHandbook("-1");
        //     this.setState({
        //         categories:
        //             categories && !_.isEmpty(categories) ? categories : [],
        //     });
        // }
    };

    handleClickCharList = (e, char) => {
        const elementActived = document.querySelector(".item.active");
        elementActived?.classList.remove("active");
        e.target.classList.add("active");

        const [elementChar, ...rest] = document.querySelectorAll(
            `#char-list-${char.toUpperCase()}`
        );
        document.body.scroll({
            left: 0,
            top: elementChar?.parentElement?.offsetTop - 90 || 0,
            behavior: "smooth",
        });
    };

    render() {
        // console.log("check props: ", this.props);
        // console.log("check state: ", this.state);
        const { categories } = this.state;
        const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        const listCategory = {};

        categories.forEach((category, index) => {
            let char = category.name.charAt(0).toUpperCase();

            if (!/[a-z]/i.test(char)) char = "other";

            if (Array.isArray(listCategory[char])) {
                listCategory[char].push(category);
            } else {
                listCategory[char] = [category];
            }
        });

        // console.log("check categories: ", categories);
        // console.log("check listCategory: ", listCategory);

        return (
            <>
                <HomeHeader />
                <div className="category_container">
                    <div className="container">
                        <div className="head">
                            <h2 className="search-title">
                                Tìm kiếm theo chữ cái
                            </h2>
                            <div className="list-char">
                                {alphabet.map((char, index) => {
                                    return (
                                        <a
                                            className="item"
                                            key={`char-${index}`}
                                            // href={`#char-list-${char.toUpperCase()}`}
                                            onClick={(e) =>
                                                this.handleClickCharList(
                                                    e,
                                                    char
                                                )
                                            }
                                        >
                                            {char.toUpperCase()}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="body">
                            {Object.keys(listCategory)
                                .sort()
                                .map((char, index) => {
                                    return (
                                        <div
                                            className="list-category"
                                            key={index}
                                        >
                                            <div
                                                className="char"
                                                id={`char-list-${char}`}
                                            >
                                                {char}
                                            </div>
                                            <div className="list-item row">
                                                {listCategory[char].map(
                                                    (category, index) => {
                                                        return (
                                                            <div
                                                                className="item col-6 col-sm-4 col-md-3"
                                                                key={index}
                                                                onClick={() =>
                                                                    this.props.history.push(
                                                                        `/category/${
                                                                            category.id
                                                                        }/${category.name.replaceAll(
                                                                            " ",
                                                                            "-"
                                                                        )}`
                                                                    )
                                                                }
                                                            >
                                                                <span className="text">
                                                                    {
                                                                        category.name
                                                                    }
                                                                </span>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
                <HomeFooter />
            </>
        );
    }
}

export default CategoryPage;
