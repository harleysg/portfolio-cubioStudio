'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MaskEffect = function () {
    function MaskEffect(app, children) {
        _classCallCheck(this, MaskEffect);

        this.elApp = document.querySelector(app);
        this.elProducts = this.elApp.querySelectorAll(children);
        this.product = 0;
        /* ---------------------------------- */
        this.elProducts[this.product].dataset.active = true;
        this.elApp.dataset.product = this.product + 1;
        this.elApp.dataset.productCount = this.elProducts.length;
    }
    /* ---------------------------------- */


    _createClass(MaskEffect, [{
        key: 'changeProduct',
        value: function changeProduct() {
            delete this.elProducts[this.product].dataset.active;
            this.product = (this.product + 1) % this.elProducts.length;
            this.elApp.dataset.product = this.product + 1;
            this.elProducts[this.product].dataset.active = true;
        }
        /* ---------------------------------- */

    }, {
        key: 'init',
        value: function init(e) {
            this.changeProduct();
        }
    }]);

    return MaskEffect;
}();
/* ---------------------------------- */


var onMousePosition = function onMousePosition(e) {
    var type = e.type;
    var x = void 0,
        y = void 0;

    switch (type) {
        case 'touchmove':
            x = e.changedTouches[0].clientX;
            y = e.changedTouches[0].clientY;
            break;
        case 'mousemove':
            x = e.clientX;
            y = e.clientY;
    }
    document.documentElement.style.setProperty('--mouse-x', x + 'px');
    document.documentElement.style.setProperty('--mouse-y', y + 'px');
};
/* ---------------------------------- */

var WheelEnd = function () {
    function WheelEnd(callback) {
        var _this = this;

        var elmTarget = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
        var multiple = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        _classCallCheck(this, WheelEnd);

        this.elm = elmTarget;
        this.marker = true;
        this.delta = null;
        this.direction = null;
        this.interval = 90;
        this.counter1 = 0;
        this.counter2 = null;
        this.counter3 = null;
        this.counter4 = null;
        this.cb = callback ? callback.bind(callback) : function (d) {
            console.log(d);
        };
        if (multiple) {
            [].slice.call(this.elm).map(function (elm) {
                elm.addEventListener('wheel', function (e) {
                    return _this.wheel(e);
                }, false);
            });
        } else {
            this.elm.addEventListener('wheel', function (e) {
                return _this.wheel(e);
            }, false);
        }
    }

    _createClass(WheelEnd, [{
        key: 'wheel',
        value: function wheel(e) {
            this.counter1 += 1;
            this.delta = e.deltaY;
            if (this.delta > 0) {
                this.direction = 'up';
            } else {
                this.direction = 'down';
            }
            this.marker && this.wheelStart(e);
            return false;
        }
    }, {
        key: 'wheelStart',
        value: function wheelStart(e) {
            this.marker = false;
            this.wheelAct(e);
            this.counter3 = new Date();
        }
    }, {
        key: 'wheelAct',
        value: function wheelAct(e) {
            var _this2 = this;

            this.counter2 = this.counter1;
            setTimeout(function () {
                if (_this2.counter2 == _this2.counter1) {
                    _this2.wheelEnd(e);
                } else {
                    _this2.wheelAct(e);
                }
            }, this.interval);
        }
    }, {
        key: 'wheelEnd',
        value: function wheelEnd(e) {
            this.counter4 = new Date();
            this.cb({
                duration: this.counter4 - this.counter3,
                event: e,
                target: e.target
            });
            this.marker = true;
            this.counter1 = 0;
            this.counter2 = false;
            this.counter3 = false;
            this.counter4 = false;
        }
    }]);

    return WheelEnd;
}();
/* ---------------------------------- */


var maskEffectOnBesknate = new MaskEffect('#betsknate', '.product');
var maskEffectOnOrca = new MaskEffect('#orca', '.product');
/* ---------------------------------- */

var AddEvent = function () {
    function AddEvent(elm, typeEvent, callback) {
        var _this3 = this;

        _classCallCheck(this, AddEvent);

        this.elm = elm;
        this.event = typeEvent;
        this.cb = callback ? callback.bind(callback) : function (d) {
            console.log(d, _this3.elm, _this3.event);
        };
        this.init();
    }

    _createClass(AddEvent, [{
        key: 'init',
        value: function init() {
            var _this4 = this;

            [].slice.call(document.querySelectorAll(this.elm)).map(function (el) {
                el.addEventListener(_this4.event, function (e) {
                    return _this4.cb({ event: e, target: el });
                });
            });
        }
    }]);

    return AddEvent;
}();
/* ---------------------------------- */


betsknate.addEventListener('click', function (e) {
    return maskEffectOnBesknate.changeProduct();
});
orca.addEventListener('click', function (e) {
    return maskEffectOnOrca.changeProduct();
});
document.addEventListener('mousemove', onMousePosition);
document.addEventListener('touchmove', onMousePosition);
/* ---------------------------------- */
var mouseTrackerStatus = function mouseTrackerStatus(e) {
    var type = e.event.type;
    var mouse = document.querySelector('.mouse-tracker');
    type == 'mouseenter' && mouse.classList.add('on-link');
    type == 'mouseleave' && mouse.classList.remove('on-link');
};
/* ---------------------------------- */
var mouseTrackStatusOnDOM = function (arrStringsDOMSelectors) {
    arrStringsDOMSelectors.map(function (elm) {
        new AddEvent(elm, 'mouseenter', mouseTrackerStatus);
        new AddEvent(elm, 'mouseleave', mouseTrackerStatus);
    });
}(['.js-mask', '.js-menu', '.js-logo', '.js-link']);
/* ---------------------------------- */
var classOnWheelEnd = new WheelEnd(function (cb) {
    //onMaskEffect.init(cb.event);
    // console.log(cb);
}, document, false);