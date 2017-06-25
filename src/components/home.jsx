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
      <div>
        <h1>Welcome to Smart-Links!</h1>
        <input onChange={this.urlChange} value={this.state.url} />
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
