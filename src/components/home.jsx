import React from 'react';
import axios from 'axios';
import { Picker } from 'emoji-mart';

require('emoji-mart/css/emoji-mart.css');

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.addEmoji = this.addEmoji.bind(this);
    this.generateAnother = this.generateAnother.bind(this);
    this.onChangeSmart = this.onChangeSmart.bind(this);
    this.onCustomize = this.onCustomize.bind(this);
    this.onClipboard = this.onClipboard.bind(this);
    this.urlChange = this.urlChange.bind(this);
    this.state = { url: '', smart: '', isProcessing: false, isCustomize: false };
  }

  addEmoji(emoji) {
    this.setState({ smart: this.state.smart + emoji.native });
  }

  onChangeSmart(e) {
    this.setState({ smart: e.target.value });
  }

  onCustomize() {
    // TODO: save or customize
    if (this.state.isCustomize) console.log(this.state.smart);
    this.setState({ isCustomize: !this.state.isCustomize });
  }

  generateAnother() {
    this.setState({ smart: this.state.smart + '-new' });
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

  backgroundImageFn(set, sheetSize) {
    return `/assets/emojis/${sheetSize}.png`;
  }

  onClipboard(event){
      event.preventDefault();
      console.log(this.state.smart);
  }

  render() {
    const processing = <div>
                          <div className="processing">Processing...</div>
                          <div className="preloader ani_1 easing">
                              <div className="item">🍞</div>
                              <div className="item">🏀</div>
                              <div className="item">🏄</div>
                              <div className="item">🐟</div>
                              <div className="item">💀</div>
                              <div className="item">🐥</div>
                              <div className="item">🎺</div>
                              <div className="item">🎩</div>
                              <div className="item">💋</div>
                              <div className="item">🍑</div>
                              <div className="item">🍕</div>
                              <div className="item">🎧</div>
                          </div>
                        </div>;
    const smartUrl = (
      <div>
        <h1>Your smart url</h1>
        <input className="fild big" onChange={this.onChangeSmart} value={this.state.smart} disabled={!this.state.isCustomize} />
        <div className="info"><a href="#" className="link" onClick={this.onClipboard}>Click it</a> or CMD+C to copy</div>
        <div className="button-wrap justify">
          <button className="blue" onClick={this.generateAnother}>GENERATE ANOTHER</button>
          <span className="text">or</span>
          <button className="blue" onClick={this.onCustomize}>{this.state.isCustomize ? 'SAVE' : 'CUSTOMIZE'}</button>
        </div>
      </div>
    );


    const startUrl = (
      <div>
        <h1>Your url</h1>
        <input className="fild" onChange={this.urlChange} value={this.state.url} placeholder="Place your link here…" />
      </div>
    );
    const process = this.state.isProcessing ? processing : this.state.smart ? smartUrl : startUrl;
    return (
      <div className="container">
        {process}
        {!this.state.isCustomize ? '' : (
          <Picker onClick={this.addEmoji} emojiSize={26} perLine={16} sheetSize={32} backgroundImageFn={this.backgroundImageFn} autoFocus={true} />
        )}
      </div>
    );
  }
}

HomeComponent.displayName = 'HomeComponent';

// Uncomment properties you need
// HomeComponent.propTypes = {};
// HomeComponent.defaultProps = {};

export default HomeComponent;
