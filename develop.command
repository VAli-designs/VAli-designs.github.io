#!/bin/bash

cd "$(dirname "$0")";
yarn develop & npx netlify-cms-proxy-server;