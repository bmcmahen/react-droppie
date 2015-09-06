/**
 * Module dependencies
 */

var React = require('react');
var Filepicker = require('component-file-picker');
var File = require('component-file');
var ClassSet = require('react-classset');
var noop = function(){};

/**
 * Toggle Image
 */

var Droppie = React.createClass({

  propTypes: {
    image: React.PropTypes.string,
    alt: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    onError: React.PropTypes.func,
    showButton: React.PropTypes.string,
    filetypes: React.PropTypes.string,
    error: React.PropTypes.string,
    style: React.PropTypes.object,
    buttonStyle: React.PropTypes.object,
    errorStyle: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      filetypes: 'image/*',
      onError: noop,
      style: {},
      buttonStyle: {},
      errorStyle: {}
    };
  },

  getInitialState: function() {
    return {
      onDragOver: false,
      error: false
    };
  },

  render: function() {
    var {className, image, title, style, ...other} = this.props;
    var styles = {}

    var classes = ClassSet({
      'Droppie': true,
      'on-drag-over': this.state.onDragOver,
      'has-image': image
    });

    if (image) {
      styles = Object.assign(
        {},
        style,
        { backgroundImage: `url(${image})` }
      )
    }

    // TODO: accessibility. Not sure how to handle this
    // with a screenreader.
    return (
      <div>
        {this.props.error &&
          <div style={this.props.errorStyle} className='error'>
            {this.props.error}
          </div>
        }
        <div {...other}
          className={classes}
          role='image'
          aria-label={this.props.alt || 'Image dropzone'}
          style={styles}
          onDragEnter={this.onDragEnter}
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          onDrop={this.onDrop}
        />
        {this.props.showButton ?
          <button style={this.props.buttonStyle} className='btn btn-small' onClick={this.onClick}>
            {this.props.showButton}
          </button>
        : null }
      </div>
    );
  },

  onDragEnter: function(e){
    e.preventDefault();
    this.setState({ onDragOver: true });
  },

  onDragOver: function(e){
    e.preventDefault();
  },

  onDragLeave: function(e){
    this.setState({ onDragOver: false });
  },

  remove: function(e){
    this.props.onChange(null);
  },

  onDrop: function(e){
    this.setState({ onDragOver: false });
    e.preventDefault();
    this.getFile(e.dataTransfer.files[0]);
  },

  onClick: function(e){
    e.preventDefault();
    Filepicker(files => this.getFile(files[0]));
  },

  getFile: function(file){
    var image = new File(file);

    if (!image.is(this.props.filetypes)) {
      this.props.onError('This file type is not supported.');
      return;
    }

    image.toDataURL((err, str) => {
      if (err) {
        this.props.onError('Error loading image.', err);
        return;
      }

      this.props.onChange(str, file);
    });
  }

});

module.exports = Droppie;
