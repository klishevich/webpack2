var React = require('react');
var ReactDOM = require('react-dom');

var listOfItems = <ul className="ul1">
                    <li className="li1" key="li1">List Element JSX 1</li>
                    <li className="li2" key="li2">List Element JSX 2</li>
                    <li className="li3" key="li3">List Element JSX 3</li>
                  </ul>;

ReactDOM.render(listOfItems, document.getElementById('react-application'));