# ninstall

[![Build Status](https://travis-ci.org/joeyism/node-ninstall.svg?branch=master)](https://travis-ci.org/joeyism/node-ninstall)

A CLI tool to install the same npm modules that you always install

Do you always install the same npm modules on your project every time? ninstall can help you with that. You can save multiple configurations, for different types of projects you save. So if you have saved a configuration, you can npm install the same modules on new projects.

## Installation

    > npm install -g ninstall

## Usage

### New Configuration

#### Input Installation Files
When running to install for the first time, or to get a new configuration, run

    > ninstall new

First, you will be prompted for node module that you're saving. These are the modules that you would `npm install --save`.

    Please input the files you would like to save for your module's use. Seperate your files with a space.
    ? Input your --save files:  

If you want to save multiple files, input them with a space
    
    ? Input your --save files: kontains xcept git-lib

The next prompt is for the node modules you are using for your development. These are modules that you would `npm install --save-dev`

    Please input the files you would like to save for your module's development use. Seperate your files with a space.
    ? Input your --save-dev files:  

You will be prompted for a confirmation next. Selecting `Y` will install the modules. 

#### Saving Configuration
After installation is complete, you will be prompted for if you want to save the configuration. If you selected to save it, it means the next time, the same modules and dev modules will be saved as well.

    ? Would you like to save this configuration? (Y/n) 

If you select `Y`, you will be prompted for a configuration name. 

    ? Please input the name you want to save in this configuration:

The name you input for the configuration will be the one you refer to if you want to install the same configuration next time. 

**For Example:** If your configuration is name `testConfig01`, then running `ninstall testConfig0` next time will install the same modules and development modules you installed this time.

### Installation from Saved Configuration
If you have ran `ninstall new` previously and saved the configuration, then can use these configurations to install onto new node projects. This is handy when you create multiple types of node modules, but many of them share similar node modules. That way, you can `ninstall` it once, save the configuration, then run it again so you can install the same modules on a new module.

#### Selecting Previous Config
To run from a saved configuration, you can run 

    > ninstall

and you will be prompted to select a list of configurations that you have previously saved.

    ? Please select the configuration you would like to install:  (Use arrow keys)
    ❯ normalNpm
      npmServer

#### Input Previous Configuration Name
If you know the previous configuration name, you can run

    > ninstall [config name]

**Example**

    > ninstall normalNpm

## Version
**1.0.0**
* First working publish
