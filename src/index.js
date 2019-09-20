class MaskEffect {
    constructor(app, children) {
        this.elApp = document.querySelector(app);
        this.elProducts = this.elApp.querySelectorAll(children);
        this.product = 0;
        /* ---------------------------------- */
        this.elProducts[this.product].dataset.active = true;
        this.elApp.dataset.product = this.product + 1;
        this.elApp.dataset.productCount = this.elProducts.length;
    }
    /* ---------------------------------- */
    changeProduct() {
        delete this.elProducts[this.product].dataset.active;
        this.product = (this.product + 1) % this.elProducts.length;
        this.elApp.dataset.product = this.product + 1;
        this.elProducts[this.product].dataset.active = true;
    }
    /* ---------------------------------- */
    init(e) {
        this.changeProduct();
    }
}
/* ---------------------------------- */
const onMousePosition = (e) => {
    const type = e.type;
    let x, y;

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
class WheelEnd {
    constructor(callback, elmTarget = document, multiple = false) {
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
            : (d) => {
                  console.log(d);
              };
        if (multiple) {
            [].slice.call(this.elm).map((elm) => {
                elm.addEventListener('wheel', (e) => this.wheel(e), false);
            });
        } else {
            this.elm.addEventListener('wheel', (e) => this.wheel(e), false);
        }
    }
    wheel(e) {
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
    wheelStart(e) {
        this.marker = false;
        this.wheelAct(e);
        this.counter3 = new Date();
    }
    wheelAct(e) {
        this.counter2 = this.counter1;
        setTimeout(() => {
            if (this.counter2 == this.counter1) {
                this.wheelEnd(e);
            } else {
                this.wheelAct(e);
            }
        }, this.interval);
    }
    wheelEnd(e) {
        this.counter4 = new Date();
        this.cb({
            duration: this.counter4 - this.counter3,
            event: e,
            target: e.target,
        });
        this.marker = true;
        this.counter1 = 0;
        this.counter2 = false;
        this.counter3 = false;
        this.counter4 = false;
    }
}
/* ---------------------------------- */
const maskEffectOnBesknate = new MaskEffect('#besknate', '.product');
const maskEffectOnOrca = new MaskEffect('#orca', '.product');
/* ---------------------------------- */
class AddEvent {
    constructor(elm, typeEvent, callback) {
        this.elm = elm;
        this.event = typeEvent;
        this.cb = callback
            ? callback.bind(callback)
            : (d) => {
                  console.log(d, this.elm, this.event);
              };
        this.init();
    }
    init() {
        [].slice.call(document.querySelectorAll(this.elm)).map((el) => {
            el.addEventListener(this.event, (e) => this.cb({ event: e, target: el }));
        });
    }
}
/* ---------------------------------- */
besknate.addEventListener('click', (e) => maskEffectOnBesknate.changeProduct());
orca.addEventListener('click', (e) => maskEffectOnOrca.changeProduct());
document.addEventListener('mousemove', onMousePosition);
document.addEventListener('touchmove', onMousePosition);
/* ---------------------------------- */
const mouseTrackerStatus = (e) => {
    const type = e.event.type;
    const mouse = document.querySelector('.mouse-tracker');
    type == 'mouseenter' && mouse.classList.add('on-link');
    type == 'mouseleave' && mouse.classList.remove('on-link');
};
/* ---------------------------------- */
const mouseTrackStatusOnDOM = ((arrStringsDOMSelectors) => {
    arrStringsDOMSelectors.map((elm) => {
        new AddEvent(elm, 'mouseenter', mouseTrackerStatus);
        new AddEvent(elm, 'mouseleave', mouseTrackerStatus);
    });
})(['.js-mask', '.js-menu', '.js-logo', '.js-link']);
/* ---------------------------------- */
const classOnWheelEnd = new WheelEnd(
    (cb) => {
        //onMaskEffect.init(cb.event);
        // console.log(cb);
    },
    document,
    false
);
