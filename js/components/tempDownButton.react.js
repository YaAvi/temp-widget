var React = require('react');

var TempDownButton = React.createClass({

	propTypes: {
		dec: React.PropTypes.func.isRequired
	},

	render: function() {
		var dec = this.props.dec;

		return (
			<button onClick={dec} className="temp-button" style={this.props.style}>
				<i className="material-icons">keyboard_arrow_down</i>
			</button>
		);

	}

});

module.exports = TempDownButton;