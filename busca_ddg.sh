#!/bin/bash

query=$(echo "$@" | sed 's/ /+/g')

curl -s "https://duckduckgo.com/html/?q=$query"
