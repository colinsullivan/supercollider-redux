#!/usr/bin/env bash
npm install -g lintspaces-cli
sudo add-apt-repository --yes ppa:ubuntu-toolchain-r/test
sudo add-apt-repository --yes ppa:beineri/opt-qt591-trusty
sudo apt-get update
sudo apt-get install --yes build-essential gcc-4.9 g++-4.9 cmake pkg-config libjack-jackd2-dev libsndfile1-dev libasound2-dev libavahi-client-dev libreadline6-dev libfftw3-dev libicu-dev libxt-dev libudev-dev
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.9 60 --slave /usr/bin/g++ g++ /usr/bin/g++-4.9
sudo update-alternatives --auto gcc
git clone --recursive https://github.com/supercollider/supercollider.git
mkdir supercollider/build && cd supercollider/build
cmake -DSC_QT=OFF -DCMAKE_BUILD_TYPE=Release ..
make
sudo make install

