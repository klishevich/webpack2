var React = require('react');
var CommonSelect = require('./CommonSelect.react');
var Dropzone = require('react-dropzone');

var FilesUpload = React.createClass({
    getInitialState: function() {
        return {fileTypeSelect: [], IdValue: '', Comment: '', Error: null};
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
        console.log('this.state', this.state);
    }, 
    onDrop: function (files) {
        console.log('Received files: ', files);
        var postdata = new FormData();
        postdata.append('IdValue', this.state.IdValue);
        postdata.append('Comment', this.state.Comment);
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
                if (data.error == true){
                    this.setState({Error: data.errorMessage});
                }
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
    handleChange: function(e) {
        this.setState({ Comment: e.target.value });
    },
    renderError: function () {
        if (this.state.Error) {
            return (
                <div className="row">
                    <div className="col-xs-4 filesUpload-error"> 
                        <div className="alert alert-danger" role="alert">{this.state.Error}</div>
                    </div>
                </div>
            );
        }
        return (null);
    },
    render: function() {
        return (
            <div className="view-content-container filesUpload">
                <h3>Загрузка файлов</h3>
                {this.renderError()}
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
                <div className="row">
                    <div className="col-xs-4 filesUpload-comment"> 
                        <label htmlFor="IdFileType">Комментарий</label>
                        <textarea className="form-control input-sm" rows="5" name="Comment" id="Comment" 
                            style={{width: '100%'}} value={this.state.Comment} placeholder="Введите комментарий"
                              onChange={this.handleChange} />
                    </div>
                </div>
            </div>
      );
    }
});

module.exports = FilesUpload;
