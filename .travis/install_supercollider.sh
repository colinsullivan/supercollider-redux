#!/usr/bin/env bash
sudo apt-get install -y build-essential libsndfile1-dev libasound2-dev libavahi-client-dev libicu-dev libreadline6-dev libfftw3-dev libxt-dev libudev-dev pkg-config git cmake qt5-default qt5-qmake qttools5-dev qttools5-dev-tools qtdeclarative5-dev qtpositioning5-dev libqt5sensors5-dev libqt5opengl5-dev qtwebengine5-dev libqt5svg5-dev libqt5websockets5-dev libjack-jackd2-dev
git clone --recursive https://github.com/supercollider/supercollider.git
mkdir supercollider/build && cd supercollider/build
cmake -DSC_QT=OFF -DCMAKE_BUILD_TYPE=Release ..
make
sudo make install

