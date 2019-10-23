class MaskEffect {
  constructor(app, children) {
    this.elApp = app && document.querySelector(app);
    this.elProducts = children && this.elApp && this.elApp.querySelectorAll(children);
    this.product = 0;
    /* ---------------------------------- */

    this.elProducts && (this.elProducts[this.product].dataset.active = true);
    this.elApp && (this.elApp.dataset.product = this.product + 1);
    this.elApp && (this.elApp.dataset.productCount = this.elProducts.length);
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
    this.elProducts && this.elApp && this.changeProduct();
  }

}
/* ---------------------------------- */


const onMousePosition = e => {
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
    this.cb = callback ? callback.bind(callback) : d => {
      console.log(d);
    };

    if (multiple) {
      [].slice.call(this.elm).map(elm => {
        elm.addEventListener('wheel', e => this.wheel(e), false);
      });
    } else {
      this.elm.addEventListener('wheel', e => this.wheel(e), false);
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
      target: e.target
    });
    this.marker = true;
    this.counter1 = 0;
    this.counter2 = false;
    this.counter3 = false;
    this.counter4 = false;
  }

}
/* ---------------------------------- */


const maskEffectOnBetsknate = new MaskEffect('#betsknate', '.product');
const maskEffectOnOrca = new MaskEffect('#orca', '.product');
/* ---------------------------------- */

class AddEvent {
  constructor(elm, typeEvent, callback) {
    this.elm = elm;
    this.event = typeEvent;
    this.cb = callback ? callback.bind(callback) : d => {
      console.log(d, this.elm, this.event);
    };
    this.init();
  }

  init() {
    [].slice.call(document.querySelectorAll(this.elm)).map(el => {
      el.addEventListener(this.event, e => this.cb({
        event: e,
        target: el
      }));
    });
  }

}
/* ---------------------------------- */


document.getElementById('betsknate') && new AddEvent('#betsknate', 'click', e => maskEffectOnBetsknate.changeProduct());
document.getElementById('orca') && new AddEvent('#orca', 'click', e => maskEffectOnOrca.changeProduct());
document.addEventListener('mousemove', onMousePosition);
document.addEventListener('touchmove', onMousePosition);
/* ---------------------------------- */

const mouseTrackerStatus = e => {
  const type = e.event.type;
  const target = e.event.target;
  const mouse = document.querySelector('.mouse-tracker');
  let onTheme = target.dataset && target.dataset.theme;

  if (type == 'mouseenter') {
    if (onTheme) {
      onTheme == 'gold' && (mouse.dataset.theme = 'on-gold');
      onTheme == 'light' && (mouse.dataset.theme = 'on-light');
      onTheme == 'gray' && (mouse.dataset.theme = 'on-gray');
      onTheme == 'dark' && (mouse.dataset.theme = 'on-dark');
    } else {
      mouse.classList.add('on-link');
    }
  }

  if (type == 'mouseleave') {
    if (onTheme) {
      delete mouse.dataset.theme;
    } else {
      mouse.classList.remove('on-link');
    }
  }
};
/* ---------------------------------- */


const mouseTrackStatusOnDOM = (arrStringsDOMSelectors => {
  arrStringsDOMSelectors.map(elm => {
    new AddEvent(elm, 'mouseenter', mouseTrackerStatus);
    new AddEvent(elm, 'mouseleave', mouseTrackerStatus);
  });
})(['.js-mask', '.js-menu', '.js-logo', '.js-link', '[data-theme]']);
/* ---------------------------------- */


const mouseHoverStatus = e => {
  const type = e.event.type;
  const target = e.event.target;
  const leaveClass = 'on-leave';
  const enterClass = 'on-hover';

  if (type == 'mouseenter') {
    target.classList.add(enterClass);
    target.classList.remove(leaveClass);
  }

  if (type == 'mouseleave') {
    target.classList.remove(enterClass);
    target.classList.add(leaveClass);
  }
};
/* ---------------------------------- */


const mouseHovertatusOnDOM = (arrStringsDOMSelectors => {
  arrStringsDOMSelectors.map(elm => {
    new AddEvent(elm, 'mouseenter', mouseHoverStatus);
    new AddEvent(elm, 'mouseleave', mouseHoverStatus);
  });
})(['.c-card', '.c-btn', '.js-mouseStatus']);
/* ---------------------------------- */
// const classOnWheelEnd = new WheelEnd(
//     (cb) => {
//         //onMaskEffect.init(cb.event);
//         // console.log(cb);
//     },
//     document,
//     false
// );


function isAnyPartOfElementInViewport(el) {
  if (el) {
    const rect = el && el.getBoundingClientRect(); // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }

    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth; // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap

    const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
    const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;
    return vertInView && horInView;
  }
}

const isElmOnViewport = (el, callback, partOfElm = 0.6) => {
  if (el) {
    document.querySelectorAll(el).forEach(elm => {
      const elmTop = elm.getBoundingClientRect().top;
      const wh = window.innerHeight * partOfElm;
      callback && callback({
        wh,
        elmTop,
        el: elm
      });
      return {
        wh,
        elmTop,
        el: elm
      };
    });
  }
};

const isHeaderOverThemeElm = (scroll, arrStringsDOMSelectors) => {
  const header = js_o_header;
  const html = document.body.parentElement;
  arrStringsDOMSelectors.map(element => {
    element && document.querySelectorAll(element).forEach(_this => {
      const activeElm = isAnyPartOfElementInViewport(_this);

      if (activeElm) {
        const theme = _this.dataset.theme;

        if (scroll + header.offsetHeight >= _this.offsetTop) {
          switch (theme) {
            case 'dark':
              header.dataset.over = `on-${theme}`;
              html.dataset.theme = `${theme}`;
              break;

            case 'gold':
              header.dataset.over = `on-${theme}`;
              html.dataset.theme = `${theme}`;
              break;

            case 'gray':
              header.dataset.over = `on-${theme}`;
              html.dataset.theme = `${theme}`;
              break;

            case 'light':
              header.dataset.over = `on-${theme}`;
              html.dataset.theme = `${theme}`;
              break;

            default:
              break;
          }
        }
      }
    });
  });
};

document.addEventListener('scroll', e => {
  const mega_heading = document.querySelector('.js-mega_headding');
  let scrollSize = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const header = js_o_header; //    isElmOnViewport(
  //        '.blog-slider',
  //        (baz) => {
  //            console.log('TCL: baz', baz);
  //            //    baz.elmTop <= baz.wh && baz.el.classList.add('on-hover');
  //            //    isAnyPartOfElementInViewport;
  //        },
  //        0.85
  //    );

  isHeaderOverThemeElm(scrollSize, ['[data-theme="gold"]', '[data-theme="gray"]', '[data-theme="light"]', '[data-theme="dark"]']); // let themeGoldIsVisible = isAnyPartOfElementInViewport(document.querySelector('.blog-slider'));
  // console.log('TCL: themeGoldIsVisible', themeGoldIsVisible);

  scrollSize >= windowHeight / 3 ? header.classList.add('is-scrolled') : header.classList.remove('is-scrolled');
  setTimeout(() => {
    mega_heading ? mega_heading.style.left = `-${scrollSize / 2}px` : null;
  }, 90);
}, true);

function sgParallax(stringElms) {
  if (!stringElms) {
    return;
  }

  const slides = stringElms;

  const processScroll = () => {
    let scrt = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    let win_h = window.innerHeight;
    let win_w = window.innerWidth;
    let d_h = document.body.offsetHeight;
    [...slides].map((slide, i) => {
      let p = slide;
      let elm = slide;
      let top = scrt + elm.getBoundingClientRect().top;
      let h = elm.clientHeight || elm.offsetHeight || elm.scrollHeight;
      let x = i % 2 ? '-15%' : '15%'; // Selector Inner Elements

      let startY = top;
      let stopY = top + h + 50;
      let totalY = stopY - startY;

      function prefixCss_transform(value) {
        return `-webkit-transform: ${value} ;
						-moz-transform: ${value} ;
						transform: ${value};`;
      }

      function prefixCss_transform3D(value) {
        return `-webkit-translate3d: ${value} ;
						-moz-translate3d: ${value} ;
						translate3d: ${value};`;
      }

      if (win_w < 1200) {
        x = '0px';
      }

      if (scrt + win_h >= startY && scrt + win_h <= stopY) {
        let percentage = (scrt + win_h - startY) / totalY;
        let pTop = 100 * (1 - percentage);
        let pTranslation = 'translate3d(0,' + pTop + 'px' + ',0)';
        p.style.cssText = prefixCss_transform(pTranslation);
      }
    });
  };

  if (typeof window.orientation == 'undefined') {
    window.addEventListener('scroll', processScroll, false);
    window.addEventListener('resize', processScroll, false);
    processScroll();
  }
}

sgParallax(document.querySelectorAll('.js-scrollUp'));

function setIntersectionTo(DOMElmString, thold = 0, callback = () => {}) {
  if (DOMElmString) {
    const options = {
      threshold: thold
    };

    const fn = entries => {
      const data = [...entries][0];
      const {
        isIntersecting: onViewport,
        target,
        intersectionRect: rect
      } = data;
      const {
        top,
        height
      } = rect;

      if (onViewport) {
        top >= height && callback({
          target,
          status: 'fadeInDown'
        });
        top <= height && callback({
          target,
          status: 'fadeInUp'
        });
      } else {
        top >= height && callback({
          target,
          status: 'fadeOutDown'
        });
        top <= height && callback({
          target,
          status: 'fadeOutUp'
        });
      }
    };

    const intObserver = new IntersectionObserver(fn, options);
    document.querySelectorAll(DOMElmString).forEach((elm, i) => {
      const isVisible = isAnyPartOfElementInViewport(elm);
      isVisible ? delete elm.dataset.view : elm.dataset.view = 'fade-outDown';
      intObserver.observe(elm);
    });
  }
}
//# sourceMappingURL=script.js.map
