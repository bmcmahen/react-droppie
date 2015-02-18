# React Droppie

Easy drag and drop image previewer/renderer thingy named after my favourite candy.

![react-droppie-demo-image](demo.gif)

## Install

```
$ npm install react-droppie
```

## Usage

```javascript
var Droppie = require('react-droppie');

var Example = React.createClass({
  
  getInitialState() {
    return {
      image: null,
      error: null
    };
  },

  render() {
    return (
      <div>
        Profile pic
        <Droppie 
          onChange={this.onChange}
          onError={this.onError}
          image={this.state.image}
          alt='Awesome profile picture'
          showButton='Upload new Image'
          error={this.state.error}
        />
      </div>
    );
  },

  onChange(uri, file) {
    this.setState({ image: uri });

    // upload this later?
    this._file = file;
  },

  onError(message, err) {
    // do something custom, or simply pass the message
    // back into Droppie, which will render it for you.
    this.setState({ error: message });
  }

});

React.render(<Example />, document.body);
```