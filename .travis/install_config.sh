#!/usr/bin/env bash

#cp $TRAVIS_BUILD_DIR/.travis/.supercollider.yaml $TRAVIS_BUILD_DIR/.supercollider.yaml
#cp .travis/sclang_conf.yaml ./sclang_conf.yaml
#echo "sclang_conf: $TRAVIS_BUILD_DIR/sclang_conf.yaml" >> $TRAVIS_BUILD_DIR/.supercollider.yaml
#echo "sclang_conf.yaml:"
#cat sclang_conf.yaml

#echo ".supercollider.yaml:"
#cat $TRAVIS_BUILD_DIR/.supercollider.yaml

echo "Quarks.install(\"$TRAVIS_BUILD_DIR/quarks/supercollider-redux\");" >> $TRAVIS_BUILD_DIR/install_quark.sc
echo "0.exit();" >> $TRAVIS_BUILD_DIR/install_quark.sc
