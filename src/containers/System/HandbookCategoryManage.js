import React from "react";
import { connect } from "react-redux";
import avatar from "../../assets/avatar/avatar_default.jpg";
import { CommonUtils } from "../../utils";
import { CRUD } from "../../utils";
import * as userService from "../../services/userService";
import { toast } from "react-toastify";
import * as actions from "../../store/actions/appActions";

import ContentLoader from "react-content-loader";
import { FormattedMessage } from "react-intl";
import Lightbox from "react-image-lightbox";

import "./HandbookCategoryManage.scss";

class HandbookCategoryManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            image: "",
            reviewImage: "",
            isOpenLightBox: false,
            isLoadingContent: false,
            crud: CRUD.CREATE,
            allCategory: [],
        };
    }

    componentDidMount = async () => {
        this.props.setLoadingStatePage(false);
        this.handleGetCategories();
    };

    handleGetCategories = async () => {
        this.setState({
            isLoadingContent: true,
        });

        const categories = await userService.getAllCategoryHandbook();

        if (categories) {
            this.setState({
                allCategory: categories,
            });
        }
        this.setState({
            isLoadingContent: false,
        });
    };

    componentDidUpdate = (prevProps, prevState) => {};

    handleOnnchangeImg = async (file) => {
        if (file) {
            const base64 = await CommonUtils.toBase64(file);

            const copState = { ...this.state };
            copState.image = base64;
            copState.reviewImage = base64;

            this.setState({
                ...copState,
            });
        }
    };

    handleOpenLightBox = () => {
        this.setState({
            isOpenLightBox: true,
        });
    };

    handleOnChangeInput = (e, key) => {
        const copyState = { ...this.state };
        copyState[key] = e.target.value;

        this.setState({
            ...copyState,
        });
    };

    handleEditCategory = (category) => {
        // console.log("check category: ", category);
        this.setState({
            name: category.name,
            image: category.image || avatar,
            reviewImage:
                (category.image && Buffer.from(category.image).toString()) ||
                avatar,
            crud: CRUD.UPDATE,
        });
    };

    handleDeleteCategory = async (categoryId) => {
        const res = await userService.deleteCategoryHandbook(categoryId);

        if (res.errCode === 0) {
            toast.success(res.message);
            await this.handleGetCategories();
        } else {
            toast.error(res.message);
        }
    };

    handleSaveCategoryHandbook = async () => {
        const dataRequest = {
            name: this.state.name,
            image: this.state.image,
        };
        // console.log("check dataRequest: ", dataRequest);
        const emptyData = this.checkValueData(dataRequest);

        if (!emptyData || emptyData === "image") {
            this.props.setLoadingStatePage(true);
            let res = {};

            if (this.state.crud === CRUD.CREATE)
                res = await userService.createCategoryHandbook(dataRequest);
            else if (this.state.crud === CRUD.UPDATE)
                res = await userService.updateCategoryHandbook(dataRequest);

            if (res?.errCode === 0) {
                toast.success(res.message);
                this.handleGetCategories();
            } else {
                toast.error(res.message);
            }

            this.setState({
                crud: CRUD.CREATE,
                name: "",
                image: "",
                reviewImage: avatar,
            });
            this.props.setLoadingStatePage(false);
        } else {
            toast.error(`${emptyData} is empty`);
        }
    };

    checkValueData = (obj) => {
        if (obj) {
            return Object.keys(obj).find((item) => {
                return !obj[item];
            });
        }
    };

    contentLoader = () => {
        return (
            <ContentLoader
                width={"100%"}
                height={200}
                viewBox="0 0 1200 400"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="27" y="139" rx="4" ry="4" width="20" height="20" />
                <rect x="67" y="140" rx="10" ry="10" width="85" height="19" />
                <rect x="188" y="141" rx="10" ry="10" width="169" height="19" />
                <rect x="402" y="140" rx="10" ry="10" width="85" height="19" />
                <rect x="523" y="141" rx="10" ry="10" width="169" height="19" />
                <rect x="731" y="139" rx="10" ry="10" width="85" height="19" />
                <rect x="852" y="138" rx="10" ry="10" width="85" height="19" />

                <rect x="26" y="196" rx="4" ry="4" width="20" height="20" />
                <rect x="66" y="197" rx="10" ry="10" width="85" height="19" />
                <rect x="187" y="198" rx="10" ry="10" width="169" height="19" />
                <rect x="401" y="197" rx="10" ry="10" width="85" height="19" />
                <rect x="522" y="198" rx="10" ry="10" width="169" height="19" />
                <rect x="730" y="196" rx="10" ry="10" width="85" height="19" />
                <rect x="851" y="195" rx="10" ry="10" width="85" height="19" />

                <rect x="26" y="258" rx="4" ry="4" width="20" height="20" />
                <rect x="66" y="259" rx="10" ry="10" width="85" height="19" />
                <rect x="187" y="260" rx="10" ry="10" width="169" height="19" />
                <rect x="401" y="259" rx="10" ry="10" width="85" height="19" />
                <rect x="522" y="260" rx="10" ry="10" width="169" height="19" />
                <rect x="730" y="258" rx="10" ry="10" width="85" height="19" />
                <rect x="851" y="257" rx="10" ry="10" width="85" height="19" />

                <rect x="26" y="316" rx="4" ry="4" width="20" height="20" />
                <rect x="66" y="317" rx="10" ry="10" width="85" height="19" />
                <rect x="187" y="318" rx="10" ry="10" width="169" height="19" />
                <rect x="401" y="317" rx="10" ry="10" width="85" height="19" />
                <rect x="522" y="318" rx="10" ry="10" width="169" height="19" />
                <rect x="730" y="316" rx="10" ry="10" width="85" height="19" />
                <rect x="851" y="315" rx="10" ry="10" width="85" height="19" />

                <rect x="26" y="379" rx="4" ry="4" width="20" height="20" />
                <rect x="66" y="380" rx="10" ry="10" width="85" height="19" />
                <rect x="187" y="381" rx="10" ry="10" width="169" height="19" />
                <rect x="401" y="380" rx="10" ry="10" width="85" height="19" />
                <rect x="522" y="381" rx="10" ry="10" width="169" height="19" />
                <rect x="730" y="379" rx="10" ry="10" width="85" height="19" />
                <rect x="851" y="378" rx="10" ry="10" width="85" height="19" />

                <rect x="978" y="138" rx="10" ry="10" width="169" height="19" />
                <rect x="977" y="195" rx="10" ry="10" width="169" height="19" />
                <rect x="977" y="257" rx="10" ry="10" width="169" height="19" />
                <rect x="977" y="315" rx="10" ry="10" width="169" height="19" />
                <rect x="977" y="378" rx="10" ry="10" width="169" height="19" />

                <circle cx="37" cy="97" r="11" />
                <rect x="26" y="23" rx="5" ry="5" width="153" height="30" />
                <circle cx="77" cy="96" r="11" />
            </ContentLoader>
        );
    };

    render() {
        // console.log("check state: ", this.state);
        const { allCategory, isOpenLightBox } = this.state;

        return (
            <>
                {isOpenLightBox && (
                    <Lightbox
                        mainSrc={this.state.reviewImage || avatar}
                        onCloseRequest={() =>
                            this.setState({ isOpenLightBox: false })
                        }
                    />
                )}
                <div className="handbook-category-manage_container">
                    <div className="category-manage_title text-center mb-4">
                        <FormattedMessage id="manage-handbook-category.title" />
                    </div>

                    <div className="form-container container">
                        <div className="row">
                            <div className="col-8 table-container">
                                <table
                                    style={{ boxShadow: "1px 1px 4px #ccc" }}
                                >
                                    <thead>
                                        <tr>
                                            <th style={{ width: "150px" }}>
                                                <FormattedMessage id="manage-handbook-category.number" />
                                            </th>
                                            <th style={{ width: "250px" }}>
                                                <FormattedMessage id="manage-handbook-category.name" />
                                            </th>
                                            <th>
                                                <FormattedMessage id="manage-handbook-category.image" />
                                            </th>
                                            <th style={{ width: "230px" }}>
                                                <FormattedMessage id="manage-handbook-category.update" />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.isLoadingContent ? (
                                            <tr className="no-hover text-center">
                                                <td colSpan={4}>
                                                    {this.contentLoader()}
                                                </td>
                                            </tr>
                                        ) : allCategory &&
                                          allCategory.length > 0 ? (
                                            allCategory.map(
                                                (category, index) => {
                                                    return (
                                                        <tr key={category.id}>
                                                            <td width={"150px"}>
                                                                {index + 1}
                                                            </td>
                                                            <td width={"250px"}>
                                                                {category.name}
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        category.image
                                                                            ? true
                                                                            : false
                                                                    }
                                                                />
                                                            </td>
                                                            <td width={"230px"}>
                                                                <button
                                                                    className="btn_edit"
                                                                    onClick={() =>
                                                                        this.handleEditCategory(
                                                                            category
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fa-solid fa-pencil"></i>
                                                                </button>
                                                                <button
                                                                    className="btn_delete"
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        this.handleDeleteCategory(
                                                                            category.id
                                                                        );
                                                                    }}
                                                                >
                                                                    <i className="fa-solid fa-trash"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={4}
                                                    className="text-center"
                                                >
                                                    <h4>
                                                        Không có danh mục nào
                                                    </h4>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-4">
                                <div className="col-12 mt-4">
                                    <p className="form-label text-center">
                                        <FormattedMessage id="manage-handbook-category.image" />
                                    </p>
                                    <div className="img-container">
                                        <label
                                            className="img-label"
                                            htmlFor="avatar"
                                            style={{
                                                backgroundImage: `url(${
                                                    (this.state.reviewImage &&
                                                        this.state
                                                            .reviewImage) ||
                                                    avatar
                                                })`,
                                                boxShadow:
                                                    "1px 1px 4px #393939",
                                            }}
                                        ></label>
                                        <i
                                            className="fa-solid fa-expand icon-fullsize"
                                            onClick={() =>
                                                this.handleOpenLightBox()
                                            }
                                        ></i>
                                    </div>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="avatar"
                                        id="avatar"
                                        hidden
                                        accept="image/*"
                                        onChange={(e) =>
                                            this.handleOnnchangeImg(
                                                e.target.files[0]
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-12">
                                    <label
                                        className="form-label"
                                        htmlFor="password"
                                    >
                                        <FormattedMessage id="manage-handbook-category.name" />
                                    </label>
                                    <input
                                        type="name"
                                        className="form-control"
                                        name="name"
                                        id="name"
                                        value={this.state.name}
                                        onChange={(e) =>
                                            this.handleOnChangeInput(e, "name")
                                        }
                                    />
                                </div>

                                <button
                                    type="button"
                                    className={`btn ${
                                        (this.state.crud === CRUD.CREATE &&
                                            "btn-primary") ||
                                        "btn-warning"
                                    } mt-4`}
                                    onClick={() =>
                                        this.handleSaveCategoryHandbook()
                                    }
                                >
                                    <FormattedMessage id="manage-handbook-category.save" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLoadingStatePage: (isLoading) =>
            dispatch(actions.setLoadingStatePage(isLoading)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HandbookCategoryManage);
