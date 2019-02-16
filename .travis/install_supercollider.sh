#!/usr/bin/env bash

## Note: This derived from the TravisCI setup of SuperCollider itself
npm install -g lintspaces-cli
sudo add-apt-repository --yes ppa:ubuntu-toolchain-r/test
sudo apt-get update
sudo apt-get install --yes build-essential gcc-4.9 g++-4.9 cmake pkg-config libjack-jackd2-dev libsndfile1-dev libasound2-dev libavahi-client-dev libreadline6-dev libfftw3-dev libicu-dev libxt-dev libudev-dev
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.9 60 --slave /usr/bin/g++ g++ /usr/bin/g++-4.9
sudo update-alternatives --auto gcc

# Clone supercollider and sc3-plugins if not in cache
if [[ ! -f $HOME/supercollider/CMakeLists.txt ]]; then
  git clone --recursive https://github.com/supercollider/supercollider.git $HOME/supercollider
  cd $HOME/supercollider
  git checkout Version-3.10.2
fi
if [[ ! -f $HOME/sc3-plugins/CMakeLists.txt ]]; then
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
