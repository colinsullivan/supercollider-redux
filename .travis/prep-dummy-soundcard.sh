sudo cat << EOF > /home/travis/.asoundrc
       pcm.dummy {
          type hw
          card 0
       }
       
       ctl.dummy {
          type hw
          card 0
       }
EOF
sudo chmod go+r /home/travis/.asoundrc
sudo cat << EOF >> /etc/modules.conf
# OSS/Free portion - card #1
alias sound-slot-0 snd-card-0
alias sound-service-0-0 snd-mixer-oss
alias sound-service-0-1 snd-seq-oss
alias sound-service-0-3 snd-pcm-oss
alias sound-service-0-8 snd-seq-oss
alias sound-service-0-12 snd-pcm-oss
EOF
sudo modprobe snd-dummy 
# ; modprobe snd-pcm-oss ; modprobe snd-mixer-oss ; modprobe snd-seq-oss
sudo mkdir -p tmp && chmod 777 tmp

jackd