import React from 'react';
import axios from 'axios';
import EmojiPicker from 'emojione-picker';

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.urlChange = this.urlChange.bind(this);
    this.state = { url: '', smart: '', isProcessing: false };
  }

  urlChange(e) {
    // TODO: validate url
    this.setState({ url: e.target.value, isProcessing: true });
    axios.get(`/stats/${e.target.value}`)
      .then((res) => {
        console.log(res);
        const data = res.data;
        this.setState({ smart: data.Link.url, isProcessing: false });
      });
  }

  render() {
    const processing = <div>Processing...</div>;
    const smartUrl = <h2>{this.state.smart}</h2>;
    const process = this.state.isProcessing && this.state.smart ? processing : smartUrl;
    return (
      <div className="container">
        <h1>Your url:</h1>
        <input className="fild" onChange={this.urlChange} value={this.state.url} placeholder="Place your link here…" />
        <div className="info">Click it or CMD+C to copy</div>
        <div className="button-wrap justify">
          <button className="blue">GENERATE ANOTHER</button>
          <span className="text">or</span>
          <button className="blue">CUSTOMIZE</button>
        </div>
        {process}
        <EmojiPicker onChange={(data) => {
          console.log('Emoji chosen', data);
        }} />
      </div>
    );
  }
}

HomeComponent.displayName = 'HomeComponent';

// Uncomment properties you need
// HomeComponent.propTypes = {};
// HomeComponent.defaultProps = {};

export default HomeComponent;
