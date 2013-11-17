

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
log TRM.gold [ 1, 2, 3, ] # goes to stderr
echo 'redirect only this part with `>`' # goes to stdout

```

## tl;dr

TRM is a library to do

