var React = require('react');

var Temp = require('./temp.react');
var TempUpButton = require('./tempUpButton.react');
var TempDownButton = require('./tempDownButton.react');

var TempWidget = React.createClass({
	propTypes: {
		temperatureSetPoint: React.PropTypes.number.isRequired,
		unitName: React.PropTypes.string.isRequired,
		min: React.PropTypes.number.isRequired,
		max: React.PropTypes.number.isRequired
	},

	getInitialState: function() {
		return {
			temp: this.props.temperatureSetPoint,
		};
	},

	inc: function() {
		if (this.state.temp < this.props.max) {
			this.setState({temp: this.state.temp + 1});
		}
	},

	dec: function() {
		if (this.state.temp > this.props.min) {
			this.setState({temp: this.state.temp - 1});
		}
	},

	bgColorGradient: function() {
		return 	'-webkit-linear-gradient(135deg, ' + 
				'rgb(' + (-20 + this.state.temp * 8) + 
					',' + (220 - this.state.temp) + 
					',' + (230 - this.state.temp * 5) + ')' + ' 0%, ' + 
				'rgb(' + (-20 + this.state.temp * 8) + 
					',' + (320 - this.state.temp * 8) + 
					',' + (350 - this.state.temp * 8) + ')' + ' 100%)';
	},

	hideUpBtn: function() {
		return this.state.temp < this.props.max ? {} : { visibility: 'hidden' };	
	},

	hideDownBtn: function() {
		return this.state.temp > this.props.min ? {} : { visibility: 'hidden' };
	},

	render: function() {
		var widgetStyle = {
			background: this.bgColorGradient()
		};
		return (
			<div className="container" style={widgetStyle}>
				<TempUpButton inc={this.inc} style={this.hideUpBtn()} />
				<Temp temp={this.state.temp} unitName={this.props.unitName} inc={this.inc} dec={this.dec}/>
				<TempDownButton dec={this.dec} style={this.hideDownBtn()} />
			</div>
		);

	}

});

module.exports = TempWidget;