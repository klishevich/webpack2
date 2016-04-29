var React = require('react');

var CommonSelectItem = React.createClass({
    render: function(){
        return(
          <option value={this.props.value}>{this.props.name}</option>
        );      
    }
});

module.exports = CommonSelectItem;