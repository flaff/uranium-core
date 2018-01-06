# uranium-core

Backend for raspberry-pi

## quick deploy with dependencies installed
Git, nodejs and forever are needed.
```bash
cd /usr/share
git pull https://github.com/flaff/uranium-core.git
cd uranium-core
npm install
forever start index.js
```


## environmental gpio dependencies

Skip if using other service for handling GPIO (e.g. webiopi)

### pigpio library

> pigpio is a library for the Raspberry which allows control of the General Purpose Input Outputs (GPIO).  pigpio works on all versions of the Pi.

using apt:

`sudo apt-get pigpio`

alternatively from [pigpio official website](http://abyz.me.uk/rpi/pigpio/download.html):

```bash
rm pigpio.zip
sudo rm -rf PIGPIO
wget abyz.co.uk/rpi/pigpio/pigpio.zip
unzip pigpio.zip
cd PIGPIO
make
sudo make install
```

### pigpio [node package](https://www.npmjs.com/package/pigpio)
> A wrapper for the pigpio C library to enable fast GPIO, PWM, servo control, state change notification and interrupt handling with Node.js on the Raspberry Pi Zero, 1, 2 or 3.

requirements:
 - nodejs
 - pigpio library
 - python
 - gcc and g++ 4.8 or higher
 
 Checking gcc and g++ version:
 ```bash
gcc --version
g++ --version
```
 
 Updating gcc and g++ (if < 4.8):
 ```bash
 sudo apt-get install python-software-properties
 sudo apt-get update
 
 sudo apt-get install gcc-4.8
 sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.8 50
 
 sudo apt-get install g++-4.8
 sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.8 50
 ```
 
 Exporting environmental variables (if fails to use c++11 compiler):
 ```bash
 export CC=/opt/rh/devtoolset-3/root/usr/bin/gcc CXX=/opt/rh/devtoolset-3/root/usr/bin/g++ npm install
 ```
 
 Installing pigpio node package:
 ```bash
 npm install --unsafe-perm -g pigpio
 ```
 
 ## Setup
 
 ### Installing rest node packages
 ```bash
 npm install
 ```
 
 ### Development
 Installing nodemon:
  ```bash
  npm install -g nodemon
  ```
 Running nodemon:
 ```bash
 nodemon index.js
 ```
 
 Alternatively without nodemon (needs manual restarting):
 ```bash
 node index.js
 ```
 
 
 ### Running server
 Server will run at all times using [forever](https://www.npmjs.com/package/forever) node module.

Installing forever:
 ```bash
 npm install -g forever
 ```
 
 Starting/stopping manually using forever:
 ```bash
 forever start index.js
 forever stop index.js
 ```