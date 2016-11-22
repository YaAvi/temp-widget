var React = require('react');
var ReactDOM = require('react-dom');

var TempWidget = require('./components/temp.widget.react');

ReactDOM.render(
    <TempWidget unitName="Living Room" temperatureSetPoint={21} min={12} max={40}/>,
    document.getElementById('root')
);