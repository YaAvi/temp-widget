var React = require('react');
var ReactDOM = require('react-dom');
var Hammer = require('hammerjs');

var Temp = React.createClass({
	propTypes: {
		temp: React.PropTypes.number.isRequired,
		unitName: React.PropTypes.string.isRequired
	},

	onPan: function(ev, changeTemp) {
		if (ev.deltaY % 30 === 0) {
			changeTemp();
		}
	},

	onPanUp: function(ev) {
		this.onPan(ev, this.props.inc);
	},

	onPanDown: function(ev) {
		this.onPan(ev, this.props.dec);
	},

	calcIntervalDelay: function(distance, velocity) {
		var delay = Math.abs(distance / velocity);
		return delay != Infinity ? delay : 50;
	},

	onSwipe: function(ev, changeTemp) {
		var counter = 0;
		var interval = setInterval(function(){
			if(counter < 5){
				changeTemp();
				counter++;
			} else {
				clearInterval(interval);
			}
		}, this.calcIntervalDelay(ev.distance, ev.velocity));
	},

	onSwipeUp: function(ev) {
		this.onSwipe(ev, this.props.inc);
	},

	onSwipeDown: function(ev) {
		this.onSwipe(ev, this.props.dec);
	},


	onPinchStart: function(ev) {
		this.counter = 0;
		this.lastScale = ev.scale;
		this.hammer.get('swipe').set({ enable: false });
  		this.hammer.get('pan').set({ enable: false });
	},

	onPinchMove: function(ev) {
		if (this.lastScale != ev.scale) {
			if(this.lastScale < ev.scale && this.counter % 10 === 0) {
				this.props.inc();
			}
			if(this.lastScale > ev.scale && this.counter % 10 === 0) {
				this.props.dec();
			}
			this.lastScale = ev.scale;
			this.counter++;
		}
	},

	onPinchEnd: function(ev) {
		this.counter = 0;
		this.hammer.get('swipe').set({ enable: true });
  		this.hammer.get('pan').set({ enable: true });
	},

	componentDidMount: function() {
		var domNode = ReactDOM.findDOMNode(this);
  		this.hammer = Hammer(domNode);
  		this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
  		this.hammer.get('pan').set({ threshold: 5 });
  		this.hammer.get('pinch').set({ enable: true });
		this.hammer.on('panup', this.onPanUp);
		this.hammer.on('pandown', this.onPanDown);
		this.hammer.on('swipeup', this.onSwipeUp);
		this.hammer.on('swipedown', this.onSwipeDown);
		this.hammer.on('pinchstart', this.onPinchStart);
		this.hammer.on('pinchmove', this.onPinchMove);
		this.hammer.on('pinchend', this.onPinchEnd);
	},
	
	componentWillUnmount: function() {
		this.hammer.stop();
        this.hammer.destroy();
        this.hammer = null;
	},

	render: function() {
		var temp = this.props.temp;
		var unitName = this.props.unitName;

		return (
			<div className="unit-name-temp">
				<div className="unit-name">
					{unitName}
				</div>
				<div className="temp">
					{temp}
				</div>
			</div>
		);

	}

});

module.exports = Temp;