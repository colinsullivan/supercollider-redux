#!/usr/bin/env bash

cp .travis/.supercollider.yaml ./.supercollider.yaml
#cp .travis/sclang_conf.yaml ./sclang_conf.yaml
echo "sclang_conf: $TRAVIS_BUILD_DIR/sclang_conf.yaml" >> .supercollider.yaml

echo ".supercollider.yaml:"
cat .supercollider.yaml

#echo "sclang_conf.yaml:"
#cat sclang_conf.yaml
