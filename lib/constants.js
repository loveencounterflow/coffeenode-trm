(function() {
  this.blink = "\x1b[5m";

  this.bold = "\x1b[1m";

  this.reverse = "\x1b[7m";

  this.underline = "\x1b[4m";

  this.no_blink = "\x1b[25m";

  this.no_bold = "\x1b[22m";

  this.no_reverse = "\x1b[27m";

  this.no_underline = "\x1b[24m";

  this.reset = "\x1b[0m";

  this.colors = {
    black: "\x1b[38;05;16m",
    blue: "\x1b[38;05;27m",
    green: "\x1b[38;05;34m",
    cyan: "\x1b[38;05;51m",
    sepia: "\x1b[38;05;52m",
    indigo: "\x1b[38;05;54m",
    steel: "\x1b[38;05;67m",
    brown: "\x1b[38;05;94m",
    olive: "\x1b[38;05;100m",
    lime: "\x1b[38;05;118m",
    red: "\x1b[38;05;124m",
    crimson: "\x1b[38;05;161m",
    plum: "\x1b[38;05;176m",
    pink: "\x1b[38;05;199m",
    orange: "\x1b[38;05;208m",
    gold: "\x1b[38;05;214m",
    tan: "\x1b[38;05;215m",
    yellow: "\x1b[38;05;226m",
    grey: "\x1b[38;05;240m",
    darkgrey: "\x1b[38;05;234m",
    white: "\x1b[38;05;255m",
    BASE03: "\x1b[38;05;234m",
    BASE02: "\x1b[38;05;235m",
    BASE01: "\x1b[38;05;240m",
    BASE00: "\x1b[38;05;241m",
    BASE0: "\x1b[38;05;244m",
    BASE1: "\x1b[38;05;245m",
    BASE2: "\x1b[38;05;254m",
    BASE3: "\x1b[38;05;230m",
    YELLOW: "\x1b[38;05;136m",
    ORANGE: "\x1b[38;05;166m",
    RED: "\x1b[38;05;124m",
    MAGENTA: "\x1b[38;05;125m",
    VIOLET: "\x1b[38;05;61m",
    BLUE: "\x1b[38;05;33m",
    CYAN: "\x1b[38;05;37m",
    GREEN: "\x1b[38;05;64m"
  };

  this.cr = "\x1b[1G";

  this.clear_line_right = "\x1b[0K";

  this.clear_line_left = "\x1b[1K";

  this.clear_line = "\x1b[2K";

  this.clear_below = "\x1b[0J";

  this.clear_above = "\x1b[1J";

  this.clear = "\x1b[2J";

}).call(this);
/****generated by https://github.com/loveencounterflow/larq****/