#!/usr/bin/env bash

# Need to build SC without GUI
mkdir $TRAVIS_BUILD_DIR/supercollider-build && cd $TRAVIS_BUILD_DIR/supercollider-build
cmake -DSC_EL=OFF -DSC_QT=OFF -DSC_IDE=OFF -DCMAKE_BUILD_TYPE=Release $TRAVIS_BUILD_DIR/supercollider
make
sudo make install

# Builds sc3-plugins
mkdir $TRAVIS_BUILD_DIR/sc3-plugins-build && cd $TRAVIS_BUILD_DIR/sc3-plugins-build
cmake -DSC_PATH=$TRAVIS_BUILD_DIR/supercollider -DCMAKE_BUILD_TYPE=Release $TRAVIS_BUILD_DIR/sc3-plugins
make
sudo make install
