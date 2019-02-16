#!/usr/bin/env bash

cp $TRAVIS_BUILD_DIR/.travis/.supercollider.yaml $TRAVIS_BUILD_DIR/.supercollider.yaml
echo "sclang_conf: $TRAVIS_BUILD_DIR/.travis/sclang_conf.yaml" >> $TRAVIS_BUILD_DIR/.supercollider.yaml

echo ".supercollider.yaml:"
cat $TRAVIS_BUILD_DIR/.supercollider.yaml


