var React = require('react');
var CommonSelect = require('./CommonSelect.react');
var Dropzone = require('react-dropzone');

var CourtCaseFilesUpload = React.createClass({
    getInitialState: function() {
        return {fileTypeSelect: [], IdFileType: ''};
    },
    componentWillMount: function() {
        this.loadSelectFileType('?category=' + this.props.category);
    },
    loadSelectFileType: function (passedParams) {
        $.ajax({
            url: this.props.dropdownurl + passedParams,
            dataType: 'json',
            success: function(currentDictSelect) {
                if (this.isMounted()) {
                    this.setState({ fileTypeSelect: currentDictSelect });
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.dropdownurl + passedParams, status, err.toString());
            }.bind(this)
        });
    },
    handleSelectChange: function(item) {
        this.setState(item);
    }, 
    onDrop: function (files) {
      console.log('Received files: ', files);
      var IdFileType = this.state.IdFileType;
      console.log('IdFileType: ', IdFileType);
      this.handleUploadFile(IdFileType, files);
        // files.forEach(function(file) {
        //     file['IdFileType'] = IdFileType;
        //     console.log(file);
        // });
    },
    handleUploadFile: function (IdFileType, files) {
        var myfiles = { myfiles: files };
        console.log('myfiles', myfiles);
        $.ajax({
            url: '/File/Create',
            dataType: 'json',
            type: 'POST',
            data: myfiles,
            success: function(data) {
                console.log('Success');
                // this.setState({data: data});
                // focusAndBlinkOnElement(item, '#'+Constants.ClassName, 'IdCourtCaseSession', false);
            }.bind(this),
            error: function(xhr, status, err) {
                // console.error('/File/Create', status, err.toString());
            }.bind(this),
            processData: false,
            contentType: false
        });
    },
    render: function() {
        return (
            <div className="view-content-container filesUpload">
                <h3>Загрузка файлов</h3>
                <div className="row">
                    <div className="col-xs-4 filesUpload-fileTypeSelect"> 
                        <label htmlFor="IdFileType">Тип файла</label>
                        <CommonSelect selectId={this.state.IdFileType} onSelectChange={this.handleSelectChange} selectName="IdFileType"
                               dictcommonselect={this.state.fileTypeSelect} alwaysUpdate={true}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-4 filesUpload-dropzone">
                        <Dropzone onDrop={this.onDrop}>
                            <div>Перетащите файлы сюда.</div>
                        </Dropzone>
                    </div>
                </div>
            </div>
      );
    }
});

module.exports = CourtCaseFilesUpload;
