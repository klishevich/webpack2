var React = require('react');
var ReactDOM = require('react-dom');
var li1 = React.createElement('li', {className: 'li1', key: 'li1'}, 'List Element JSX 1');
var li2 = React.createElement('li', {className: 'li2', key: 'li2'}, 'List Element JSX 2');
var li3 = React.createElement('li', {className: 'li3', key: 'li3'}, 'List Element JSX 3');
var reactFragment = [li1, li2, li3];
var listOfItems = React.createElement('ul', {className: 'ul1'}, reactFragment);

ReactDOM.render(listOfItems, document.getElementById('react-application'));