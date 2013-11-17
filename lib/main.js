(function() {
  var ANALYZER, TYPES, color_code, color_name, effect_name, effect_names, effect_off, effect_on, isa_text, lines_from_stdout, rainbow_color_names, rainbow_idx, sh, _fn, _fn1, _ref, _rpr,
    __slice = [].slice,
    _this = this;

  this.constants = require('./constants');

  this.separator = ' ';

  this.depth_of_inspect = 20;

  TYPES = require('coffeenode-types');

  isa_text = TYPES.isa_text.bind(TYPES);

  _rpr = (require('util')).inspect;

  ANALYZER = require('./vt100-analyzer');

  /* https://github.com/mgutz/execSync
  NB `execSync` compiles with warnings under NodeJS 0.11.7 on my OSX box but appears to work, so let's
  pretend it won't be a problem for most people:
  */


  sh = require('execSync');

  this.rpr = function(x) {
    return _rpr(x, {
      depth: this.depth_of_inspect
    });
  };

  this.get_output_method = function(target, options) {
    var _this = this;
    return function() {
      var P;
      P = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return target.write(_this.pen.apply(_this, P));
    };
  };

  this.pen = function() {
    var P;
    P = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    /* Given any number of arguments, return a text representing the arguments as seen fit for output
    commands like `log`, `echo`, and the colors.
    */

    return (this._pen.apply(this, P)).concat('\n');
  };

  this._pen = function() {
    var P, R, p;
    P = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    /* ...*/

    R = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = P.length; _i < _len; _i++) {
        p = P[_i];
        _results.push(isa_text(p) ? p : this.rpr(p));
      }
      return _results;
    }).call(this);
    return R.join(this.separator);
  };

  this.log = this.get_output_method(process.stderr);

  this.echo = this.get_output_method(process.stdout);

  this.dir = function() {
    var P, arity, idx, name, p, x, _i, _len;
    P = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    switch (arity = P.length) {
      case 0:
        throw new Error("called TRM.dir without arguments");
        break;
      case 1:
        x = P[0];
        break;
      default:
        x = P[P.length - 1];
        for (idx = _i = 0, _len = P.length; _i < _len; idx = ++_i) {
          p = P[idx];
          if (idx < P.length - 1) {
            this.log(this.rainbow(p));
          }
        }
    }
    return this.log(this.pink(((function() {
      var _results;
      _results = [];
      for (name in x) {
        _results.push('  '.concat(name));
      }
      return _results;
    })()).sort().join('\n')));
  };

  this.execute = function(command, handler) {
    var code, stdout, _ref,
      _this = this;
    if (handler == null) {
      _ref = sh.exec(command), code = _ref.code, stdout = _ref.stdout;
      if (code !== 0) {
        throw new Error(stdout);
      }
      return lines_from_stdout(stdout);
    }
    njs_cp.exec(O['on-change'], function(error, stdout, stderr) {
      if (error != null) {
        return handler(error);
      }
      if ((stderr != null) && stderr.length !== 0) {
        return handler(new Error(stderr));
      }
      return handler(null, lines_from_stdout(stdout));
    });
    return null;
  };

  lines_from_stdout = function(stdout) {
    var R;
    R = stdout.split('\n');
    if (R[R.length - 1].length === 0) {
      R.length -= 1;
    }
    return R;
  };

  this.clear_line_right = this.constants.clear_line_right;

  this.clear_line_left = this.constants.clear_line_left;

  this.clear_line = this.constants.clear_line;

  this.clear_below = this.constants.clear_below;

  this.clear_above = this.constants.clear_above;

  this.clear = this.constants.clear;

  this.goto = function(line_nr, column_nr) {
    if (line_nr == null) {
      line_nr = 1;
    }
    if (column_nr == null) {
      column_nr = 1;
    }
    return "\x1b[" + line_nr + ";" + column_nr + "H";
  };

  this.goto_column = function(column_nr) {
    if (column_nr == null) {
      column_nr = 1;
    }
    return "\x1b[" + column_nr + "G";
  };

  this.up = function(count) {
    if (count == null) {
      count = 1;
    }
    return "\x1b[" + count + "A";
  };

  this.down = function(count) {
    if (count == null) {
      count = 1;
    }
    return "\x1b[" + count + "B";
  };

  this.right = function(count) {
    if (count == null) {
      count = 1;
    }
    return "\x1b[" + count + "C";
  };

  this.left = function(count) {
    if (count == null) {
      count = 1;
    }
    return "\x1b[" + count + "D";
  };

  this.move = function(line_count, column_count) {
    return (line_count < 0 ? this.up(line_count) : this.down(line_count)) + (column_count < 0 ? this.left(column_count) : this.right(column_count));
  };

  this.ring_bell = function() {
    return process.stdout.write("\x07");
  };

  effect_names = {
    blink: 1,
    bold: 1,
    reverse: 1,
    underline: 1
  };

  _fn = function(effect_name, effect_on, effect_off) {
    return _this[effect_name] = function() {
      var P, R, idx, last_idx, p, _i, _len;
      P = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      R = [effect_on];
      last_idx = P.length - 1;
      for (idx = _i = 0, _len = P.length; _i < _len; idx = ++_i) {
        p = P[idx];
        R.push(isa_text(p) ? p : _this.rpr(p));
        if (idx !== last_idx) {
          R.push(effect_on);
          R.push(_this.separator);
        }
      }
      R.push(effect_off);
      return R.join('');
    };
  };
  for (effect_name in effect_names) {
    effect_on = this.constants[effect_name];
    effect_off = this.constants['no_' + effect_name];
    _fn(effect_name, effect_on, effect_off);
  }

  _ref = this.constants['colors'];
  _fn1 = function(color_name, color_code) {
    return _this[color_name] = function() {
      var P, R, idx, last_idx, p, _i, _len;
      P = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      R = [color_code];
      last_idx = P.length - 1;
      for (idx = _i = 0, _len = P.length; _i < _len; idx = ++_i) {
        p = P[idx];
        R.push(isa_text(p) ? p : _this.rpr(p));
        if (idx !== last_idx) {
          R.push(color_code);
          R.push(_this.separator);
        }
      }
      R.push(_this.constants['reset']);
      return R.join('');
    };
  };
  for (color_name in _ref) {
    color_code = _ref[color_name];
    _fn1(color_name, color_code);
  }

  this.remove_colors = function(text) {
    return text.replace(this.color_matcher, '');
  };

  this.color_matcher = /\x1b\[[^m]*m/g;

  rainbow_color_names = "red orange yellow green blue pink".split(/\s+/);

  rainbow_idx = -1;

  this.rainbow = function() {
    var P;
    P = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    rainbow_idx = (rainbow_idx + 1) % rainbow_color_names.length;
    return this[rainbow_color_names[rainbow_idx]].apply(this, P);
  };

  this.route = function() {
    var P;
    P = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return this.lime(this.underline.apply(this, P));
  };

  this.truth = function() {
    var P, p;
    P = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return ((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = P.length; _i < _len; _i++) {
        p = P[_i];
        _results.push(p ? this.green("✔  " + (this._pen(p))) : this.red("✗  " + (this._pen(p))));
      }
      return _results;
    }).call(this)).join('');
  };

  this.get_logger = function(category, badge) {
    var R, colorize, pointer, prefix,
      _this = this;
    if (badge == null) {
      badge = null;
    }
    switch (category) {
      case 'plain':
        colorize = null;
        pointer = this.grey(' ▶ ');
        break;
      case 'info':
        colorize = this.steel.bind(this);
        pointer = this.grey(' ▶ ');
        break;
      case 'whisper':
        colorize = this.grey.bind(this);
        pointer = this.grey(' ▶ ');
        break;
      case 'debug':
        colorize = this.pink.bind(this);
        pointer = this.grey(' ⚙ ');
        break;
      case 'alert':
        colorize = this.red.bind(this);
        pointer = this.blink(this.red(' ⚠ '));
        break;
      case 'warn':
        colorize = this.red.bind(this);
        pointer = ' ❗ ';
        break;
      case 'help':
        colorize = this.lime.bind(this);
        pointer = this.gold(' ☛ ');
        break;
      default:
        throw new Error("unknown logger category " + (_rpr(category)));
    }
    prefix = badge != null ? (this.darkgrey(badge)).concat(' ', pointer) : pointer;
    if (colorize != null) {
      R = function() {
        var P;
        P = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return _this.log(prefix, colorize.apply(null, P));
      };
    } else {
      R = function() {
        var P;
        P = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return _this.log.apply(_this, [prefix].concat(__slice.call(P)));
      };
    }
    return R;
  };

}).call(this);
/****generated by https://github.com/loveencounterflow/larq****/