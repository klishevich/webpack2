var React = require('react');

var CommonSelectItem = React.createClass({
    render: function(){
        return(
          <option value={this.props.selectId}>{this.props.name}</option>
        );      
    }
});

module.exports = CommonSelectItem;