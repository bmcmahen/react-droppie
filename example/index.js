var React = require('react');
var Droppie = require('../index');

var Example = React.createClass({
  
  getInitialState() {
    return {
      image: null
    };
  },

  render() {
    return (
      <div>
        Profile pic
        <Droppie 
          onChange={this.onChange}
          image={this.state.image}
          alt='Awesome profile picture'
          showButton='Upload new Image'
        />
      </div>
    );
  },

  onChange(uri, file) {
    this.setState({ image: uri });

    // upload this later?
    this._file = file;
  }
})

React.render(<Example />, document.body);