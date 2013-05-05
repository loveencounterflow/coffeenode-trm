
TRM = require './main'
rpr = ( require 'util' ).inspect
log = console.log


show_color_gamut = ->
  _esc                      = "\x1b"        # ESCape
  _csi                      = _esc + "["   # Command Sequence Initializer
  _sgr                      = "m"           # Select Graphic Rendition
  reset                    = _csi + "0"            + _sgr

  for green in [ 0 .. 5 ]
    for blue in [ 0 .. 5 ]
      R = []
      for red in [ 0 .. 5 ]
        color_code = red * 36 + green * 6 + blue + 16
        R.push "#{red} #{green} #{blue} #{color_code} #{_csi}38;05;#{color_code}#{_sgr}██████#{reset}"
      log R.join ' '
  for color_nr in [ 232 .. 255 ]
    log "#{_csi}38;05;#{color_nr}#{_sgr} #{color_nr}██████#{reset}"


log rpr TRM.red 'helo world', ( TRM.olive 'abc' ), [ 1, 2, 3, ]
log TRM.red 'helo world', ( TRM.olive 'abc' ), ( TRM.olive TRM.underline [ 1, 2, 3, ] ), 'ooops'


# log "A", @constants[ 'red' ], "B", @constants[ 'reset' ], "C"
# log "A", @constants[ 'red' ], "B", @constants[ 'olive' ], "C", @constants[ 'red' ], "C"

# log @constants[ 'reset' ]


# show_color_gamut()
log "helo"
process.stdout.write ( TRM.goto 10, 1 ) + 'ABCD'
process.stdout.write ( TRM.right 5 ) + "X" + TRM.up( 3 ) + '---'
process.stdout.write ( TRM.goto_column 50 ) + 'HERE'
process.stdout.write ( TRM.move 2, 3 ) + 'THERE'
process.stdout.write TRM.clear_above
# process.stdout.write TRM.clear_to_bottom
log TRM.underline 'lore', ( TRM.blue 'ipsum' ), 'dolores'
log TRM.orange 'lore', ( TRM.green TRM.underline 'ipsum' ), 'dolores'
process.stdout.write ( TRM.down 15 )
show_color_gamut()
log()
log()
log()
