#!/usr/bin/env bash

sudo apt-get update -qq
sudo usermod -a -G audio travis
sudo apt-get install -y portaudio19-dev
sudo apt-get install -y libasound2-dev alsa-utils alsa-oss
sudo apt-get install -y jack-tools
