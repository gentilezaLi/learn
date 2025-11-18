function debounce(fn, delay = 1000, immediate = false) {
  let timer = null;
  if (timer) {
    clearTimeout(timer);
  }
  if (immediate && !timer) {
    fn.apply(this, arguments);
  }
  timer = setTimeout(() => {
    fn.apply(this, arguments);
  }, delay);
}

function throttle(fn, delay = 1000) {
  let lastTime = 0;
  return function () {
    let _this = this;
    let _arguments = arguments;
    let now = new Date().getTime();
    if (now - lastTime > delay) {
      fn.apply(_this, _arguments);
      lastTime = now;
    }
  };
}
