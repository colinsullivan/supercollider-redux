#!/usr/bin/env bash
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys FABAEF95
sudo add-apt-repository -y ppa:supercollider/ppa
sudo apt-get update
sudo apt-get install -y supercollider
