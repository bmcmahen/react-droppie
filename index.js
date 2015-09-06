/**
 * Module dependencies
 */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var Filepicker = require('component-file-picker');
var File = require('component-file');
var ClassSet = require('react-classset');
var noop = function noop() {};

/**
 * Toggle Image
 */

var Droppie = React.createClass({
  displayName: 'Droppie',

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

  getDefaultProps: function getDefaultProps() {
    return {
      filetypes: 'image/*',
      onError: noop,
      style: {},
      buttonStyle: {},
      errorStyle: {}
    };
  },

  getInitialState: function getInitialState() {
    return {
      onDragOver: false,
      error: false
    };
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var image = _props.image;
    var title = _props.title;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['className', 'image', 'title', 'style']);

    var styles = {};

    var classes = ClassSet({
      'Droppie': true,
      'on-drag-over': this.state.onDragOver,
      'has-image': image
    });

    if (image) {
      styles = Object.assign({}, style, { backgroundImage: 'url(' + image + ')' });
    }

    // TODO: accessibility. Not sure how to handle this
    // with a screenreader.
    return React.createElement(
      'div',
      null,
      this.props.error && React.createElement(
        'div',
        { style: this.props.errorStyle, className: 'error' },
        this.props.error
      ),
      React.createElement('div', _extends({}, other, {
        className: classes,
        role: 'image',
        'aria-label': this.props.alt || 'Image dropzone',
        style: styles,
        onDragEnter: this.onDragEnter,
        onDragOver: this.onDragOver,
        onDragLeave: this.onDragLeave,
        onDrop: this.onDrop
      })),
      this.props.showButton ? React.createElement(
        'button',
        { style: this.props.buttonStyle, className: 'btn btn-small', onClick: this.onClick },
        this.props.showButton
      ) : null
    );
  },

  onDragEnter: function onDragEnter(e) {
    e.preventDefault();
    this.setState({ onDragOver: true });
  },

  onDragOver: function onDragOver(e) {
    e.preventDefault();
  },

  onDragLeave: function onDragLeave(e) {
    this.setState({ onDragOver: false });
  },

  remove: function remove(e) {
    this.props.onChange(null);
  },

  onDrop: function onDrop(e) {
    this.setState({ onDragOver: false });
    e.preventDefault();
    this.getFile(e.dataTransfer.files[0]);
  },

  onClick: function onClick(e) {
    var _this = this;

    e.preventDefault();
    Filepicker(function (files) {
      return _this.getFile(files[0]);
    });
  },

  getFile: function getFile(file) {
    var _this2 = this;

    var image = new File(file);

    if (!image.is(this.props.filetypes)) {
      this.props.onError('This file type is not supported.');
      return;
    }

    image.toDataURL(function (err, str) {
      if (err) {
        _this2.props.onError('Error loading image.', err);
        return;
      }

      _this2.props.onChange(str, file);
    });
  }

});

module.exports = Droppie;
