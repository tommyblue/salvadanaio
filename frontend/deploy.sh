#!/bin/bash

# Deploy on surge.sh. You need to have surge installed with `npm install -g surge`

if [ $# -ne 1 ]; then
    echo -e "USAGE: ./deploy.sh <domain>"
    exit 1
fi

if [ -d ./build ]; then
    rm -rf ./build/
fi

yarn build && surge build "${1}"
