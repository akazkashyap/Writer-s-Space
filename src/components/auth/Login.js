import React from "react";
import LoginForm from "./LoginForm";
import { signIn } from "../../actions";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import history from "../../history";

import { showModal, hideModal } from "../../actions";

const MESSAGE = "Username or Password is not correct.";

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
  signIn: (formValues) => dispatch(signIn(formValues)),
});

class Login extends React.Component {
  onSubmit = (formValues) => {
    this.props.signIn(formValues);
  };

  componentDidMount() {
    if (this.props.cookies.get("authtoken")) {
      console.log("redirecting..");
      history.push("/diary");
    }
  }

  componentWillMount() {
    document.getElementsByTagName("body")[0].classList.add("gradient");
    document.getElementsByTagName("body")[0].classList.remove("list");
  }
  closeModal = () => {
    this.props.hideModal();
  };

  showInput = () => {
    const { address } = this.state;
    const message = address ? `Address: ${address}` : "No address entered";
    this.props.showModal(
      {
        open: true,
        title: "Prompt Modal",
        message,
        closeModal: this.closeModal,
      },
      "alert"
    );
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  openAlertModal = () => {
    this.props.showModal(
      {
        open: true,
        title: "Invalid Credentials",
        message: MESSAGE,
        closeModal: this.closeModal,
      },
      "alert"
    );
  };

  componentWillUnmount() {
    let user = this.props.user;
    if (user) {
      let { username, token } = user;
      let tokenName = token + "$" + username;
      this.props.cookies.set("authtoken", tokenName);
    }
  }
  0;
  render() {
    return (
      <div>
        <h1 className="mb-3">Login</h1>
        <LoginForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.data };
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Login));

// openConfirmModal = () => {
//   this.props.showModal(
//     {
//       open: true,
//       title: "Confirm Modal",
//       message: MESSAGE,
//       confirmAction: this.closeModal,
//       closeModal: this.closeModal,
//     },
//     "confirm"
//   );
// };

// openDeleteModal = () => {
//   this.props.showModal(
//     {
//       open: true,
//       title: "Delete Modal",
//       message: MESSAGE,
//       deleteAction: this.closeModal,
//       closeModal: this.closeModal,
//       deleteText: "delete",
//     },
//     "delete"
//   );
// };

// openPromptModal = () => {
//   this.props.showModal(
//     {
//       open: true,
//       title: "Prompt Modal",
//       fields: [
//         {
//           name: "address",
//           placeholder: "Enter your address",
//           showLabel: false,
//         },
//       ],
//       onInputChange: this.onInputChange,
//       confirmAction: this.showInput,
//     },
//     "prompt"
//   );
// };
