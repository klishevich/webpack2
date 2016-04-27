var React = require('react');
var ReactDOM = require('react-dom');
var CourtCaseFilesUpload = require('./components/FilesUpload.react');

ReactDOM.render(
	<CourtCaseFilesUpload 
	dropdownurl={document.getElementById('filesUpload').getAttribute("dropdownurl") }
	category={document.getElementById('filesUpload').getAttribute("category") }/>, 
	document.getElementById('filesUpload')
);