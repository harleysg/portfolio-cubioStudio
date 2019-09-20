var MaskEffect = /** @class */ (function () {
    function MaskEffect(app, children) {
        this.elApp = document.querySelector(app);
        this.elProducts = this.elApp.querySelectorAll(children);
        this.product = 0;
        /* ---------------------------------- */
        this.elProducts[this.product].dataset.active = true;
        this.elApp.dataset.product = this.product + 1;
        this.elApp.dataset.productCount = this.elProducts.length;
        /* ---------------------------------- */
    }
    /* ---------------------------------- */
    MaskEffect.prototype.changeProduct = function () {
        delete this.elProducts[this.product].dataset.active;
        this.product = (this.product + 1) % this.elProducts.length;
        this.elApp.dataset.product = this.product + 1;
        this.elProducts[this.product].dataset.active = true;
    };
    MaskEffect.prototype.mousePosition = function (e) {
        document.documentElement.style.setProperty("--mouse-x", e.clientX + "px");
        document.documentElement.style.setProperty("--mouse-y", e.clientY + "px");
        /* ---------------------------------- */
        //console.log(window.innerHeight / 2, window.innerWidth / 2);
    };
    /* ---------------------------------- */
    MaskEffect.prototype.init = function (e) {
        this.changeProduct();
        this.mousePosition(e);
    };
    return MaskEffect;
}());
var onMousePosition = function (e) {
    document.documentElement.style.setProperty("--mouse-x", e.clientX + "px");
    document.documentElement.style.setProperty("--mouse-y", e.clientY + "px");
};
var WheelEnd = /** @class */ (function () {
    function WheelEnd(callback, elmTarget, multiple) {
        if (elmTarget === void 0) { elmTarget = document; }
        if (multiple === void 0) { multiple = false; }
        var _this = this;
        this.elm = elmTarget;
        this.marker = true;
        this.delta = null;
        this.direction = null;
        this.interval = 90;
        this.counter1 = 0;
        this.counter2 = null;
        this.counter3 = null;
        this.counter4 = null;
        this.cb = callback
            ? callback.bind(callback)
            : function (d) {
                console.log(d);
            };
        if (multiple) {
            [].slice.call(this.elm).map(function (elm) {
                elm.addEventListener("wheel", function (e) { return _this.wheel(e); }, false);
            });
        }
        else {
            this.elm.addEventListener("wheel", function (e) { return _this.wheel(e); }, false);
        }
    }
    WheelEnd.prototype.wheel = function (e) {
        this.counter1 += 1;
        this.delta = e.deltaY;
        if (this.delta > 0) {
            this.direction = "up";
        }
        else {
            this.direction = "down";
        }
        this.marker && this.wheelStart(e);
        return false;
    };
    WheelEnd.prototype.wheelStart = function (e) {
        this.marker = false;
        this.wheelAct(e);
        this.counter3 = new Date();
        //console.log(`Start event. Direction: ${this.direction}`);
    };
    WheelEnd.prototype.wheelAct = function (e) {
        var _this = this;
        this.counter2 = this.counter1;
        setTimeout(function () {
            if (_this.counter2 == _this.counter1) {
                _this.wheelEnd(e);
            }
            else {
                _this.wheelAct(e);
            }
        }, this.interval);
    };
    WheelEnd.prototype.wheelEnd = function (e) {
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
    };
    return WheelEnd;
}());
/* ---------------------------------- */
var maskEffectOnBesknate = new MaskEffect("#besknate", ".product");
var maskEffectOnOrca = new MaskEffect("#orca", ".product");
/* ---------------------------------- */
var AddEvent = /** @class */ (function () {
    function AddEvent(elm, typeEvent, callback) {
        var _this = this;
        this.elm = elm;
        this.event = typeEvent;
        this.cb = callback
            ? callback.bind(callback)
            : function (d) {
                console.log(d, _this.elm, _this.event);
            };
        this.init();
    }
    AddEvent.prototype.init = function () {
        var _this = this;
        [].slice.call(document.querySelectorAll(this.elm)).map(function (el) {
            el.addEventListener(_this.event, function (e) {
                return _this.cb({ event: e, target: el });
            });
        });
    };
    return AddEvent;
}());
/* ---------------------------------- */
besknate.addEventListener("click", function (e) { return maskEffectOnBesknate.changeProduct(); });
orca.addEventListener("click", function (e) { return maskEffectOnOrca.changeProduct(); });
document.addEventListener("mousemove", onMousePosition);
var mouseTrackerStatus = function (e) {
    var type = e.event.type;
    var mouse = document.querySelector(".mouse-tracker");
    type == "mouseenter" && mouse.classList.add("on-link");
    type == "mouseleave" && mouse.classList.remove("on-link");
};
var titleProductsOnEnterMouse = new AddEvent(".title h2", "mouseenter", mouseTrackerStatus);
var titleProductsOnLeaveMouse = new AddEvent(".title h2", "mouseleave", mouseTrackerStatus);
var classOnWheelEnd = new WheelEnd(function (cb) {
    //onMaskEffect.init(cb.event);
    // console.log(cb);
}, document, false);