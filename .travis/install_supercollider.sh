#!/usr/bin/env bash

# Clone supercollider and sc3-plugins if not in cache
if [[ ! -d $HOME/supercollider ]]; then
  git clone --recursive https://github.com/supercollider/supercollider.git $HOME/supercollider
  cd $HOME/supercollider
  git checkout Version-3.10.2
fi
if [[ ! -d $HOME/sc3-plugins ]]; then
  git clone --recursive https://github.com/supercollider/sc3-plugins.git $HOME/sc3-plugins
  cd $HOME/sc3-plugins
  git checkout Version-3.10.0
fi

# Need to build SC without GUI
cd $HOME/supercollider
mkdir -p build && cd build
cmake -DSC_EL=OFF -DSC_QT=OFF -DSC_IDE=OFF -DCMAKE_BUILD_TYPE=Release $HOME/supercollider
make
sudo make install

# Builds sc3-plugins
cd $HOME/sc3-plugins
mkdir -p build && cd build
cmake -DSC_PATH=$HOME/supercollider -DCMAKE_BUILD_TYPE=Release $HOME/sc3-plugins
make
sudo make install
