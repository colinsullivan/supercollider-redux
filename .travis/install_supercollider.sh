#!/usr/bin/env bash

# Need to build SC without GUI
cd $TRAVIS_BUILD_DIR/supercollider
mkdir build && cd build
cmake -DSC_EL=OFF -DSC_QT=OFF -DSC_IDE=OFF -DCMAKE_BUILD_TYPE=Release $TRAVIS_BUILD_DIR/supercollider
make
sudo make install

# Builds sc3-plugins
cd $TRAVIS_BUILD_DIR/sc3-plugins
mkdir build && cd build
cmake -DSC_PATH=$TRAVIS_BUILD_DIR/supercollider -DCMAKE_BUILD_TYPE=Release ..
make
sudo make install
