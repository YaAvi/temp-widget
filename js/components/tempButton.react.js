var React = require('react');

var TempButton =  function(props) {

		return (
		<button className="temp-button" onClick={props.onClick} disabled={props.disabled}>
			<i className="material-icons">{props.icon}</i>
		</button>
		);

};

module.exports = TempButton;