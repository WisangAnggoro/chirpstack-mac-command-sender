import React, { Component } from "react";
import logo from "./icon/logo.svg";
import "./css/App.css";
import Form from "./Form";
import Navigation from './navigation';
import Header from './header';
import About from './about';
import Contact from './contact';


class App extends Component {
  state = {
    fields: {}
  };

  onChange = updatedValue => {
    this.setState({
      fields: {
        ...this.state.fields,
        ...updatedValue
      }
    });
  };

  render() {
    return (
      <div className="App">
        <Navigation />
        <Header />
        <div className="container">
          <div className="container row">
            <div className="col-lg-6">
              <h1> How to Use </h1>
              <br/>
              <ul>
                <li><h4>Make sure the Network Server address is valid</h4></li>
                <li><h4>Make sure the Network Server port can be accessed</h4></li>
                <li><h4>Write Device EUI and Data in hex (with 0x) and separated with comma</h4></li>
                <li><h4>Device EUI and MAC Command Data written in MSB</h4></li>
              </ul>
            </div>
            <div className="col-lg-6">
              <h1> Application </h1>
              <br/>
              <Form onChange={fields => this.onChange(fields)} />
            </div>
          </div>
          <div className="container row">
            <div className="col-lg-6">
              {/* <h1> FAQ </h1>
              <br/>
              <ul>
                <li><h4>Make sure the network server address is valid and the port opened in the server</h4></li>
                <li><h4>Write Device EUI and Data in hex and separated with comma every byte</h4></li>
                <li><h4>Make sure the network server address is valid and the port opened in the server</h4></li>
              </ul> */}
            </div>
          </div>
        </div>

        <Contact />
      </div>
    );
  }
}

export default App;
