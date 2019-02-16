#!/usr/bin/env bash

cp $TRAVIS_BUILD_DIR/.travis/.supercollider.yaml $TRAVIS_BUILD_DIR/.supercollider.yaml
echo "sclang_conf: $TRAVIS_BUILD_DIR/.travis/sclang_conf.yaml" >> $TRAVIS_BUILD_DIR/.supercollider.yaml

echo ".supercollider.yaml:"
cat $TRAVIS_BUILD_DIR/.supercollider.yaml

echo "Quarks.install(\"$TRAVIS_BUILD_DIR/quarks/supercollider-redux\");" >> $TRAVIS_BUILD_DIR/install_quark.sc
echo "thisProcess.shutdown();" >> $TRAVIS_BUILD_DIR/install_quark.sc
echo "0.exit();" >> $TRAVIS_BUILD_DIR/install_quark.sc
sclang $TRAVIS_BUILD_DIR/install_quark.sc
exit 0
