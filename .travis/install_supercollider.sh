#!/usr/bin/env bash

# Need to build SC without GUI
mkdir -p $HOME/supercollider-build && cd $HOME/supercollider-build
cmake -DSC_EL=OFF -DSC_QT=OFF -DSC_IDE=OFF -DCMAKE_BUILD_TYPE=Release $HOME/supercollider
make
sudo make install

# Builds sc3-plugins
mkdir -p $HOME/sc3-plugins-build && cd $HOME/sc3-plugins-build
cmake -DSC_PATH=$HOME/supercollider -DCMAKE_BUILD_TYPE=Release $HOME/sc3-plugins
make
sudo make install
