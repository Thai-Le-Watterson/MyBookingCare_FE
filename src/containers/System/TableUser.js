import React from "react";
import { FormattedMessage } from "react-intl";

class TableUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    componentDidMount = () => {
        this.setState({
            users: this.props.users,
        });
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.users !== this.props.users) {
            this.setState({
                users: this.props.users,
            });
        }
    };

    handleEditUser = (user) => {
        this.props.handleEditUser(user);
    };
    handleDeleteUser = (userId) => {
        this.props.handleDeleteUser(userId);
    };

    render() {
        return (
            <>
                <div className="users-container container my-5">
                    <table>
                        <tbody>
                            <tr>
                                <th>
                                    <FormattedMessage id="manage-user-redux.fullname" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-user-redux.email" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-user-redux.address" />
                                </th>
                                <th>
                                    <FormattedMessage id="manage-user-redux.phonenumber" />
                                </th>
                                {this.props.isEdit && (
                                    <th>
                                        <FormattedMessage id="manage-user-redux.update" />
                                    </th>
                                )}
                            </tr>
                            {this.state.users &&
                                this.state.users.map((user) => {
                                    return (
                                        <tr key={user.id}>
                                            <td>{user.email}</td>
                                            <td>{user.fullName}</td>
                                            <td>{user.address}</td>
                                            <td>{user.phonenumber}</td>
                                            {this.props.isEdit && (
                                                <td>
                                                    <button
                                                        className="btn_edit"
                                                        onClick={() =>
                                                            this.handleEditUser(
                                                                user
                                                            )
                                                        }
                                                    >
                                                        <i className="fa-solid fa-pencil"></i>
                                                    </button>
                                                    <button
                                                        className="btn_delete"
                                                        onClick={(e) => {
                                                            this.handleDeleteUser(
                                                                user.id
                                                            );
                                                        }}
                                                    >
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default TableUser;
