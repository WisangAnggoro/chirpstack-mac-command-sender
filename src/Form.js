import React from "react";

export default class Form extends React.Component {
  state = {
    ccsip: "",
    deveui: "",
    bytes: "",
  };

  change = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    // this.props.onSubmit(this.state);
    
    let deveui = this.state.deveui.split(',').map(Number)
    let bytes = this.state.bytes.split(',').map(Number)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ccsip: this.state.ccsip, deveui:deveui, bytes:bytes})
    };
    fetch('http://127.0.0.1:8000/', requestOptions)
        .then(response => response.json())

    // this.setState({
    //   ccsip: "",
    //   deveui: "",
    //   bytes: "",
    // });
    // this.props.onChange({
    //   ccsip: "",
    //   deveui: "",
    //   bytes: "",
    // });

  };

  render() {
    return (
      <form>
        <input
          name="ccsip"
          placeholder="ccsip"
          value={this.state.ccsip}
          onChange={e => this.change(e)}
        />
        <br />
        <input
          name="deveui"
          placeholder="deveui"
          value={this.state.deveui}
          onChange={e => this.change(e)}
        />
        <br />
        <input
          name="bytes"
          placeholder="bytes"
          value={this.state.bytes}
          onChange={e => this.change(e)}
        />
        <br />
        <button onClick={e => this.onSubmit(e)}>Submit</button>
      </form>
    );
  }
}
