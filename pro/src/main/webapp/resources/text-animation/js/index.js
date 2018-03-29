var curry = function curry(f) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return args.length >= f.length ? f.apply(undefined, args) : curry(f.bind.apply(f, [f].concat(args)));
  };
};

var compose = function compose(f, g) {
  return function (x) {
    return f(g(x));
  };
};
var composeN = function composeN() {
  for (var _len2 = arguments.length, fns = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }

  return function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return fns.reverse().reduce(function (x, f) {
      return f.apply(f, [].concat(x));
    }, args);
  };
};