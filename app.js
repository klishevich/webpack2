var React = require('react');
var ReactDOM = require('react-dom');
var FilesUpload = require('./components/FilesUpload.react');

ReactDOM.render(
	<FilesUpload 
	dropdownurl={document.getElementById('filesUpload').getAttribute("dropdownurl")}
	category={document.getElementById('filesUpload').getAttribute("category")}
	idname={document.getElementById('filesUpload').getAttribute("idname")}/>, 
	document.getElementById('filesUpload')
);