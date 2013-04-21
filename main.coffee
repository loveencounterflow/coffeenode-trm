


############################################################################################################
$                         = exports ? @
# log                       = console.log
xrpr                      = require 'COFFEENODE/ENGINE/xrpr'
Σ                         = require 'COFFEENODE/Σ/implementation'
if Σ.emit?
  rpr = ( P... ) -> return Σ.emit '!Δ/call/specific/rpr', P...
else
  rpr = xrpr
#-----------------------------------------------------------------------------------------------------------
isa_text                  = ( x ) -> return ( Object.prototype.toString.call x ) == '[object String]'
reset_sequence            = "\x1B[0m"

#-----------------------------------------------------------------------------------------------------------
wrap  = ( color_code ) ->
  return ( P... ) ->
    for idx in [ 0 ... P.length ]
      p         = P[ idx ]
      # P[ idx ]  = xrpr p unless isa_text p # ###OBS### should be rpr signal emitter, not xrpr
      P[ idx ]  = rpr p unless isa_text p
    message   = P.join '\t'
    return color_code + message + reset_sequence

#-----------------------------------------------------------------------------------------------------------
$.dim_grey              = dim_grey              = wrap "\x1b[0;30m"
$.dim_red               = dim_red               = wrap "\x1b[0;31m"
$.dim_green             = dim_green             = wrap "\x1b[0;32m"
$.dim_yellow            = dim_yellow            = wrap "\x1b[0;33m"
$.dim_blue              = dim_blue              = wrap "\x1b[0;34m"
$.dim_magenta           = dim_magenta           = wrap "\x1b[0;35m"
$.dim_cyan              = dim_cyan              = wrap "\x1b[0;36m"
$.dim_white             = dim_white             = wrap "\x1b[0;37m"
$.grey                  = grey                  = wrap "\x1b[1;30m"
$.red                   = red                   = wrap "\x1b[1;31m"
$.green                 = green                 = wrap "\x1b[1;32m"
$.yellow                = yellow                = wrap "\x1b[1;33m"
$.blue                  = blue                  = wrap "\x1b[1;34m"
$.magenta               = magenta               = wrap "\x1b[1;35m"
$.cyan                  = cyan                  = wrap "\x1b[1;36m"
$.white                 = white                 = wrap "\x1b[1;37m"
$.orange                = orange                = wrap "\x1b[38;05;214m"
$.olive                 = olive                 = wrap "\x1b[38;05;100m"
$.plum                  = plum                  = wrap "\x1b[38;05;183m"
$.gold                  = gold                  = wrap '\x1b[38;05;220m'

#-----------------------------------------------------------------------------------------------------------
$.length_of_ansi_text = ( text ) ->
  return ( text.replace /\x1b[^m]m/, '' ).length

#-----------------------------------------------------------------------------------------------------------
$.truth = ( P... ) ->
  return ( ( ( if p == true then green else if p == false then red else white ) p ) for p in P ).join ''

#-----------------------------------------------------------------------------------------------------------
rainbow_colors  = [ red, green, yellow, blue, magenta, cyan, orange, olive, plum, gold, ]
rainbow_idx     = -1

#-----------------------------------------------------------------------------------------------------------
$.rainbow = ( P... ) ->
  rainbow_idx += 1
  rainbow_idx = 0 if rainbow_idx >= rainbow_colors.length
  return rainbow_colors[ rainbow_idx ] P...


