var React = require('react');
var ReactDOM = require('react-dom');
var Hammer = require('hammerjs');

var Temp = React.createClass({
    propTypes: {
        temp: React.PropTypes.number.isRequired,
        unitName: React.PropTypes.string.isRequired,
        inc: React.PropTypes.func.isRequired,
        dec: React.PropTypes.func.isRequired
    },

    panTempChange: function(ev, changeTemp) {
        if (Math.abs(ev.center.y - this.panY) >= 30) {
            changeTemp();
            this.panY = ev.center.y;
        }
    },

    onPanStart: function(ev) {
        this.panY = ev.center.y;
    },

    onPanUp: function(ev) {
        this.panTempChange(ev, this.props.inc);
    },

    onPanDown: function(ev) {
        this.panTempChange(ev, this.props.dec);
    },

    swipeTempChange: function(ev, changeTemp) {
        changeTemp();
        var delay = 150 / (Math.abs(ev.velocity) + 1);
        var timeoutFunc = function() {
	        this.hammer.get('pan').set({
	            enable: false
	        });
            if (delay < 250) {
                changeTemp();
                delay += delay/4;
                this.timeout = setTimeout(timeoutFunc.bind(this), delay)
            } else {
		        this.hammer.get('pan').set({
		            enable: true
		        });
                clearTimeout(this.timeout);
            }
        };

        this.timeout = setTimeout(timeoutFunc.bind(this), delay);
    },

    onSwipeUp: function(ev) {
    	clearTimeout(this.timeout);
        this.swipeTempChange(ev, this.props.inc);
    },

    onSwipeDown: function(ev) {
    	clearTimeout(this.timeout);
        this.swipeTempChange(ev, this.props.dec);
    },


    onPinchStart: function(ev) {
        this.lastDist = ev.distance;
        this.lastScale = ev.scale;
        this.hammer.get('swipe').set({
            enable: false
        });
        this.hammer.get('pan').set({
            enable: false
        });
    },

    onPinchMove: function(ev) {
        if (this.lastScale < ev.scale && Math.abs(this.lastDist - ev.distance) > 4) {
            this.props.inc();
            this.lastScale = ev.scale;
            this.lastDist = ev.distance;
        }

        if (this.lastScale > ev.scale && Math.abs(this.lastDist - ev.distance) > 4) {
            this.props.dec();
            this.lastScale = ev.scale;
            this.lastDist = ev.distance;
        }
    },

    onPinchEnd: function(ev) {
        this.hammer.get('swipe').set({
            enable: true
        });
        this.hammer.get('pan').set({
            enable: true
        });
    },

    componentDidMount: function() {
        var domNode = ReactDOM.findDOMNode(this);
        this.hammer = Hammer(domNode);
        this.hammer.get('swipe').set({
            direction: Hammer.DIRECTION_VERTICAL
        });
        this.hammer.get('pan').set({
            threshold: 20
        });
        this.hammer.get('press').set({
            time: 10
        });
        this.hammer.get('pinch').set({
            enable: true
        });
        this.hammer.on('tap press', function() {
	        this.hammer.get('pan').set({
	            enable: true
	        });
        	clearTimeout(this.timeout);
        }.bind(this));
        this.hammer.on('panstart', this.onPanStart);
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
        clearTimeout(this.timeout);
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