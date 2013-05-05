


#-----------------------------------------------------------------------------------------------------------
# Effects On
#...........................................................................................................
@blink                    = "\x1b[5m"
@bold                     = "\x1b[1m"
@reverse                  = "\x1b[7m"
@underline                = "\x1b[4m"

#-----------------------------------------------------------------------------------------------------------
# Effects Off
#...........................................................................................................
@no_blink                 = "\x1b[25m"
@no_bold                  = "\x1b[22m"
@no_reverse               = "\x1b[27m"
@no_underline             = "\x1b[24m"
@reset                    = "\x1b[0m"

#-----------------------------------------------------------------------------------------------------------
# Colors
#...........................................................................................................
@colors =
  black:                    "\x1b[38;05;16m"
  blue:                     "\x1b[38;05;19m"
  gold:                     "\x1b[38;05;220m"
  green:                    "\x1b[38;05;28m"
  grey:                     "\x1b[38;05;240m"
  olive:                    "\x1b[38;05;100m"
  orange:                   "\x1b[38;05;214m"
  plum:                     "\x1b[38;05;183m"
  red:                      "\x1b[38;05;124m"

#-----------------------------------------------------------------------------------------------------------
# Moves etc
#...........................................................................................................
@cr                       = "\x1b[1G"       # Carriage Return; move to first column
@clear_line_right         = "\x1b[0K"       # Clear to end   of line
@clear_line_left          = "\x1b[1K"       # Clear to start of line
@clear_line               = "\x1b[2K"       # Clear all line content
@clear_below              = "\x1b[0J"       # Clear to the bottom
@clear_above              = "\x1b[1J"       # Clear to the top (including current line)
@clear                    = "\x1b[2J"       # Clear entire screen




