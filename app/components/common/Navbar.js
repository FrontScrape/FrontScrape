import React, {Component} from "react";
import { Link } from "react-router";
import API from '../../utils/API';
// "import Auth from '../../Auth';"

class Navbar extends Component {
    constructor() {
      super();
      this.state = {
        email: ''
      }
    }
    componentWillMount() {
      API.getUser().then(res => {
        this.setState({email: res.data.email});
        this.props.setParentEmail(res.data.email);
      });
    }
    // componentWillReceiveProps() {

    // }
    render() {

      if (this.state.email) {
        return (
          <div className="navbar container-fluid">

            <div className="modal fade" id="accountModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Account Settings</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <br/>
                    <form action={'/delete/' + this.state.email} method="post">
                      <div className="text-center">
                        <button type="submit" className="btn btn-danger">Delete Account</button>
                      </div>
                    </form>
                    <br/>
                  </div>
                </div>
              </div>
            </div>

            <nav className="navbar navbar-toggleable-md navbar-light bg-primary">
              <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <a className="navbar-brand" href="/">
                <img src="/images/redesigned_MI.jpg" id="mainLogo" className="d-inline-block align-top" alt="MI"/>
                &nbsp;Moose Industries
              </a>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                  <br/>

                  <li className="nav-item">
                    <a type="button" className="nav-link btn bg-warning text-white" title="Access Your Account" data-toggle="modal" data-target="#accountModal">{this.state.email}</a>
                  </li>

                  &nbsp;
                  <li className="nav-item">
                    <a type="button" className="nav-link btn bg-danger text-white" title="Click to Log Out" href="/logout">Log Out</a>
                  </li>

                  &nbsp;
                </ul>
              </div>
            </nav>
          </div>
        );
      } else {
        return (
          <div className="navbar container-fluid">

            <div className="modal fade" id="signUpModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Sign Up</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form action="/signup" method="post">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Please enter email address!" required/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password (we encrypt passwords to protect users)</label>
                        <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Please enter password!" required/>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                      </div>
                    </form>
                    <br/>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal fade" id="logInModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Log In</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form action="/login" method="post">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Please enter email address!" required/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Please enter password!" required/>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                      </div>
                    </form>
                    <br/>
                  </div>
                </div>
              </div>
            </div>

            <nav className="navbar navbar-toggleable-md navbar-light bg-primary">
              <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <a className="navbar-brand" href="/">
                <img src="./images/redesigned_MI.jpg" id="mainLogo" className="d-inline-block align-top" alt="MI"/>
                &nbsp;Moose Industries
              </a>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                  <br/>

                  <li className="nav-item">
                    <a type="button" className="nav-link btn bg-success text-white" title="Click to Sign Up" data-toggle="modal" data-target="#signUpModal">Sign Up</a>
                  </li>

                  &nbsp;
                  <li className="nav-item">
                    <a type="button" className="nav-link btn bg-info text-white" title="Click to Log In" data-toggle="modal" data-target="#logInModal">Log In</a>
                  </li>

                  &nbsp;
                </ul>
              </div>
            </nav>
          </div>
        );
      }
    }
}

export default Navbar;

  // <nav style={{ marginBottom: 0 }} className="navbar navbar-inverse">
  //   <div className="container-fluid">
  //     <div className="navbar-header">
  //       <Link className="navbar-brand" to="/">Quotes App</Link>
  //     </div>
  //     <ul className="nav navbar-nav">
  //       <li className={location.pathname === "/" && "active"}>
  //         <Link to="/">Home</Link>
  //       </li>
  //       <li className={location.pathname === "/favorites" && "active"}>
  //         <Link to="/favorites">Favorites</Link>
  //       </li>
  //     </ul>
  //   </div>
  // </nav>

      // <ul className="navbar-nav mr-auto">
      //   <li className="nav-item">
      //     <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
      //   </li>
      // </ul>

      // Auth.login();

        // <li className="nav-item">
        //   <a type="button" className="nav-link btn bg-success text-white" title="Click to View Account" href="/account">Account</a>
        // </li>
        // <li className="nav-item">
        //   <a type="button" className="nav-link btn bg-info text-white" title="Click to Log Out" href="/logout">Log Out</a>
        // </li>

                  // <li className="nav-item">
                  //   <Link type="button" className="nav-link btn bg-warning text-white" title="Account (temporary button here)" to="/account" onClick={() => this.props.setParent('')}>A (temp)</Link>
                  // </li>

                  // &nbsp;

 // onClick={() => this.props.setParent('')}

                      //  <div className="form-group">
                      //   <label htmlFor="exampleInputPassword2">Confirm Password (we encrypt passwords to protect users)</label>
                      //   <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Please confirm password (not working yet)!" required/>
                      // </div>