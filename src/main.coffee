



############################################################################################################
@constants                = require './constants'
@separator                = ' '
@depth_of_inspect         = 20
TYPES                     = require 'coffeenode-types'
isa_text                  = TYPES.isa_text.bind TYPES
_rpr                      = ( require 'util' ).inspect

#-----------------------------------------------------------------------------------------------------------
@rpr = ( x ) ->
  return _rpr x, depth: @depth_of_inspect

#-----------------------------------------------------------------------------------------------------------
@get_output_method = ( target, options ) ->
  R = ( P... ) =>
    last_idx = P.length - 1
    for p, idx in P
      target.write if isa_text p then p else @rpr p
      target.write @separator unless idx is last_idx
    target.write '\n'
  #.........................................................................................................
  return R

#-----------------------------------------------------------------------------------------------------------
@log                      = @get_output_method process.stderr
@echo                     = @get_output_method process.stdout

#-----------------------------------------------------------------------------------------------------------
@clear_line_right         = @constants.clear_line_right
@clear_line_left          = @constants.clear_line_left
@clear_line               = @constants.clear_line
@clear_below              = @constants.clear_below
@clear_above              = @constants.clear_above
@clear                    = @constants.clear

#-----------------------------------------------------------------------------------------------------------
@goto                     = ( line_nr = 1, column_nr = 1 )  -> return "\x1b[#{line_nr};#{column_nr}H"
@goto_column              = ( column_nr = 1 )  -> return "\x1b[#{column_nr}G"
#...........................................................................................................
@up                       = ( count = 1 ) -> return "\x1b[#{count}A"
@down                     = ( count = 1 ) -> return "\x1b[#{count}B"
@right                    = ( count = 1 ) -> return "\x1b[#{count}C"
@left                     = ( count = 1 ) -> return "\x1b[#{count}D"
#...........................................................................................................
@move = ( line_count, column_count ) ->
  return ( ( if   line_count < 0 then @up     line_count else @down    line_count ) +
           ( if column_count < 0 then @left column_count else @right column_count ) )

#-----------------------------------------------------------------------------------------------------------
@ring_bell = ->
  process.stdout.write "\x07"

#-----------------------------------------------------------------------------------------------------------
effect_names =
  blink:        1
  bold:         1
  reverse:      1
  underline:    1
#...........................................................................................................
for effect_name of effect_names
  effect_on       = @constants[         effect_name ]
  effect_off      = @constants[ 'no_' + effect_name ]
  do ( effect_name, effect_on, effect_off ) =>
    @[ effect_name ] = ( P... ) =>
      R         = [ effect_on, ]
      last_idx  = P.length - 1
      for p, idx in P
        R.push if isa_text p then p else @rpr p
        if idx isnt last_idx
          R.push effect_on
          R.push @separator
      R.push effect_off
      return R.join ''
#...........................................................................................................
for color_name, color_code of @constants[ 'colors' ]
  do ( color_name, color_code ) =>
    @[ color_name ] = ( P... ) =>
      R         = [ color_code, ]
      last_idx  = P.length - 1
      for p, idx in P
        R.push if isa_text p then p else @rpr p
        if idx isnt last_idx
          R.push color_code
          R.push @separator
      R.push @constants[ 'reset' ]
      return R.join ''

# #-----------------------------------------------------------------------------------------------------------
# $.length_of_ansi_text = ( text ) ->
#   return ( text.replace /\x1b[^m]m/, '' ).length

# #-----------------------------------------------------------------------------------------------------------
# $.truth = ( P... ) ->
#   return ( ( ( if p == true then green else if p == false then red else white ) p ) for p in P ).join ''

#-----------------------------------------------------------------------------------------------------------
rainbow_color_names = """blue tan cyan sepia indigo steel brown red olive lime crimson green plum orange pink
                        gold yellow""".split /\s+/
rainbow_idx         = -1

#-----------------------------------------------------------------------------------------------------------
@rainbow = ( P... ) ->
  rainbow_idx = ( rainbow_idx + 1 ) % rainbow_color_names.length
  return @[ rainbow_color_names[ rainbow_idx ] ] P...


