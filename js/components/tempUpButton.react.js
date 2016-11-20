var React = require('react');

var TempUpButton = React.createClass({

	propTypes: {
		inc: React.PropTypes.func.isRequired
	},
	
	render: function() {
		var inc = this.props.inc;

		return (
			<button onClick={inc} className="temp-button" style={this.props.style}>
				<i className="material-icons">keyboard_arrow_up</i>
			</button>
		);

	}

});

module.exports = TempUpButton;