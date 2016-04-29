var React = require('react');
var CommonSelect = require('./CommonSelect.react');
var Dropzone = require('react-dropzone');

var FilesUpload = React.createClass({
    getInitialState: function() {
        return {fileTypeSelect: [], IdValue: ''};
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
                    console.log('currentDictSelect', currentDictSelect);
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
        console.log('this.state', this.state);
    }, 
    onDrop: function (files) {
        console.log('Received files: ', files);
        var IdValue = this.state.IdValue;
        console.log('IdValue: ', IdValue);
        var postdata = new FormData();
        postdata.append('IdValue', IdValue);
        files.forEach(function(file) {
            postdata.append(file.name, file);
            // file['IdFileType'] = IdFileType;
            // console.log(file);
        });
        this.handleUploadFile(postdata);
    },
    handleUploadFile: function (postdata) {
        //  console.log('postdata', postdata.get('IdFileType'));
        $.ajax({
            url: '/File/Create',
            dataType: 'json',
            type: 'POST',
            data: postdata,
            success: function(data) {
                console.log('Success', data);
                // this.setState({data: data});
                // focusAndBlinkOnElement(item, '#'+Constants.ClassName, 'IdCourtCaseSession', false);
            }.bind(this),
            error: function(xhr, status, err) {
                console.log('xhr', xhr);
                console.log('status', status);
                console.log('Error', err);
                // console.error('/File/Create', status, err.toString());
            }.bind(this),
            processData: false,
            contentType: false
        });
    },
    render: function() {
      console.log('FilesUpload this.props', this.props);
        return (
            <div className="view-content-container filesUpload">
                <h3>Загрузка файлов</h3>
                <div className="row">
                    <div className="col-xs-4 filesUpload-fileTypeSelect"> 
                        <label htmlFor="IdFileType">Тип файла</label>
                        <CommonSelect selectId={this.state.IdFileType} 
                            onSelectChange={this.handleSelectChange} 
                            idname={this.props.idname}
                            selectName="IdValue"
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

module.exports = FilesUpload;
