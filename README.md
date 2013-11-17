

- [CoffeeNode Terminal (TRM)](#coffeenode-terminal-trm)
	- [Installation & Usage](#installation-&-usage)
	- [tl;dr](#tl;dr)

> **Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*


# CoffeeNode Terminal (TRM)

## Installation & Usage

On the command line:

    npm install coffeenode-trm

In your scripts:

```coffeescript
TRM       = require 'coffeenode-trm'
rpr       = TRM.rpr.bind TRM
echo      = TRM.echo.bind TRM
badge     = 'any ID text you like'
log       = TRM.get_logger 'plain', badge
info      = TRM.get_logger 'info',  badge
alert     = TRM.get_logger 'alert', badge
debug     = TRM.get_logger 'debug', badge
warn      = TRM.get_logger 'warn',  badge
help      = TRM.get_logger 'help',  badge

info "colors!"
alert "something went wrong"
TRM.dir ( new Date() )

# goes to stderr:
log TRM.gold [ 1, 2, 3, ]

# goes to stdout:
echo 'redirect only this part with `>`'

message = TRM.pen 'do you like', ( TRM.green 'colorful' ), ( TRM.pink 'outputs' ), '?'
log message
log rpr message

# convert those colors to spans:
log TRM.as_html message

```

## tl;dr

TRM is a library to do simplify doing colorful stuff and meaningful outputs on the command line.

