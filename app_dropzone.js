var React = require('react');
var Dropzone = require('react-dropzone');

var DropzoneDemo = React.createClass({
    onDrop: function (files) {
      console.log('Received files: ', files);
    },

    render: function () {
      var innerDiv = React.createElement('div', {key: 'innerDiv'}, 'Try dropping some files here, or click to select files to upload.');
      var dropzoneEl = React.createElement(Dropzone, { key: 'dropzoneEl'}, innerDiv);
      var outerDiv = React.createElement('div', {key: 'outerDiv'}, dropzoneEl);
      return outerDiv;
    }
});

React.render(DropzoneDemo, document.getElementById('react-application'));