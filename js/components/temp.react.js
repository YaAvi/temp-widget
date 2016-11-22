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

    calcIntervalDelay: function(distance, velocity) {
        var delay = Math.abs(distance / velocity);
        return delay != Infinity && delay > 70 ? delay : 70;
    },

    swipeTempChange: function(ev, changeTemp) {
        var counter = 0;
        this.interval = setInterval(function() {
            if (counter < 5) {
                changeTemp();
                counter++;
            } else {
                clearInterval(this.interval);
            }
        }, this.calcIntervalDelay(ev.distance, ev.velocity));
    },

    onSwipeUp: function(ev) {
    	clearInterval(this.interval);
        this.swipeTempChange(ev, this.props.inc);
    },

    onSwipeDown: function(ev) {
    	clearInterval(this.interval);
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
            threshold: 2
        });
        this.hammer.get('pinch').set({
            enable: true
        });
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
        clearInterval(this.interval);
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