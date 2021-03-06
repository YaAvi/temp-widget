var React = require('react');
var Howl = require('howler').Howl;

var Temp = require('./temp.react');
var TempButton = require('./tempButton.react');

var TempWidget = React.createClass({
    propTypes: {
        temperatureSetPoint: React.PropTypes.number.isRequired,
        unitName: React.PropTypes.string.isRequired,
        min: React.PropTypes.number.isRequired,
        max: React.PropTypes.number.isRequired
    },

    tickSound: new Howl({
        src: ['sound/tick.mp3'],
        volume: 0.1
    }),

    getInitialState: function() {
        return {
            temp: this.props.temperatureSetPoint
        };
    },

    componentWillReceiveProps: function(nextProps) {
        if (this.state.temp != nextProps.temperatureSetPoint) {
            this.setState({
                temp: this.props.temperatureSetPoint
            });
        }
    },

    inc: function() {
        if (this.state.temp < this.props.max) {
            this.setState({
                temp: this.state.temp + 1
            });
            this.tickSound.play();
        }
    },

    dec: function() {
        if (this.state.temp > this.props.min) {
            this.setState({
                temp: this.state.temp - 1
            });
            this.tickSound.play();
        }
    },

    bgColorGradient: function() {
        return '-webkit-linear-gradient(135deg, ' +
            'rgb(' + (-20 + this.state.temp * 8) +
            ',' + (220 - this.state.temp) +
            ',' + (230 - this.state.temp * 5) + ')' + ' 0%, ' +
            'rgb(' + (-20 + this.state.temp * 8) +
            ',' + (320 - this.state.temp * 8) +
            ',' + (350 - this.state.temp * 8) + ')' + ' 100%)';
    },

    hideUpBtn: function() {
        return this.state.temp < this.props.max ? {} : {
            visibility: 'hidden'
        };
    },

    hideDownBtn: function() {
        return this.state.temp > this.props.min ? {} : {
            visibility: 'hidden'
        };
    },

    render: function() {
        var widgetStyle = {
            background: this.bgColorGradient()
        };
        return (
            <div className="container" style={widgetStyle}>
                <TempButton onClick={this.inc} disabled={this.state.temp >= this.props.max} icon="keyboard_arrow_up"/>
                <Temp temp={this.state.temp} unitName={this.props.unitName} inc={this.inc} dec={this.dec}/>
                <TempButton onClick={this.dec} disabled={this.state.temp <= this.props.min} icon="keyboard_arrow_down"/>
            </div>
        );

    }

});

module.exports = TempWidget;