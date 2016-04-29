var React = require('react');

var CommonSelectItem = React.createClass({
    render: function(){
    	console.log('CommonSelectItem this.props', this.props);
        return(
          <option value={this.props.value}>{this.props.name}</option>
        );      
    }
});

module.exports = CommonSelectItem;