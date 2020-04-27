#!/bin/bash

cd "$(dirname "$0")";
NODE_ENV=production gatsby clean && NODE_ENV=production gatsby build && gh-pages -d public -b master;