import React from "react";

export default class Form extends React.Component {
  state = {
    ccsip: "",
    deveui: "",
    bytes: "",
    status: -1,
    status_desc: ""
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
        .then(data => {
          if(data.response == "ok")
          {
            this.setState((state)=>
            {
              return{ status : 1, status_desc:"Data enqueue success!"}
            })
          }
          else if(data.response == "error")
          {
            this.setState((state)=>
            {
              return{ status : 0, status_desc:data.desc.toString() }
            })
          }
          else 
          {
            this.setState((state)=>
            {
              return{ bytes : 2, status_desc:data.desc }
            })
          }
        });
  };

  handleClick(e) {
    this.setState((state)=>
    {
      return{ bytes : e }
    })    
  }

  render() {
    return ( 
      <div> 
        <form classname="form-horizontal">
          <div className="form-group">
            <label for="inputEmail3" className="col-sm-5 control-label">Network Server Address</label>
            <div className="col-sm-7">
              <input className="form-control"
                name="ccsip"
                placeholder="localhost:8000"
                id="inputEmail3"
                value={this.state.ccsip}
                onChange={e => this.change(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label for="inputEmail4" className="col-sm-5 control-label">Device EUI</label>
            <div className="col-sm-7">
              <input className="form-control"
                name="deveui"
                placeholder="0x00, 0x00, 0x00, 0x00"
                id="inputEmail4"
                value={this.state.deveui}
                onChange={e => this.change(e)}
              />
            </div>
          </div>

          <div className="form-group">
            <label for="inputEmail5" className="col-sm-5 control-label">MAC Command Data</label>
            <div className="col-sm-7">
              <div className="input-group">
                <input className="form-control"
                  name="bytes"
                  id="inputEmail5"
                  placeholder="0x03, 0x57, 0x1F, 0x00, 0x02"
                  value={this.state.bytes}
                  onChange={e => this.change(e)}
                />
                <div className="input-group-btn">
                  <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select <span className="caret"></span></button>
                  <ul className="dropdown-menu dropdown-menu-right">
                    <li onClick={()=>{this.handleClick("0x06")}}
                    ><a>devStatusReq</a></li>
                    <li onClick={()=>{this.handleClick("0x07, 0x0A, 0xD0, 0xA7, 0x8C, 0x50")}}
                    ><a>newChannelReq</a></li>
                    <li onClick={()=>{this.handleClick("0x0A,  0x03, 0xD0, 0xA7, 0x8C")}}
                    ><a>dlChannelReq</a></li>
                    <li onClick={()=>{this.handleClick("0x05, 0x02, 0x30, 0x98, 0x8C")}}
                    ><a>RXParamSetupReq</a></li>
                    <li onClick={()=>{this.handleClick( "0x08, 0x01")}}
                    ><a>RXTimingSetupReq</a></li>
                    <li onClick={()=>{this.handleClick("0x03, 0x57, 0x1F, 0x00, 0x02")}}
                    ><a>linkADRReq</a></li>
                    <li onClick={()=>{this.handleClick("0x09, 0x15")}}
                    ><a>TXParamSetupReq</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-5 col-sm-7">
              <button className="btn btn-default" onClick={e => this.onSubmit(e)}>Send Data</button>
            </div>
          </div>
        </form>
        <div>
          <div>
            <div className="" role="alert">.</div>
            {
              this.state.status === 1 &&
              <div className="alert alert-success" role="alert">
                {this.state.status_desc}
              </div>
            }
            {
              this.state.status === 0 &&
              <div className="alert alert-danger" role="alert">
                {this.state.status_desc}
              </div>
            }
            
          </div>
        </div>
          {/* <div className="" role="alert" ></div>
          <div className="alert alert-danger" role="alert">
            This is a danger alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.
          </div> */}
      </div>
    );
  }
}
