#!/bin/bash
# TARGET_DIR=`pwd`/build_ngspice

#check if static library exists
TARGET_FILE=`pwd`/src/libraries/verilator/bin/verilator_bin.a
if test -f "$TARGET_FILE"; then
    echo "$FILE exists."
else
    echo "Entering verilator source folder..."
    cd ./src/libraries/verilator/

    # #run autogen to generate configure
    # echo "Run autoconf..."
    # autoconf

    # run configure to generate Makefile
    # echo "Run configure..."
    # ./configure

    # compile static lib
    echo "Compile verilator static lib..."
    make -j `nproc`
fi


# if [[ "$OSTYPE" == "linux-gnu"* ]]; then
#     echo "Compile linux static..."
#     # Linux
#     make clean
#     ../configure  --with-ngshared --with-readline=no --disable-debug --prefix=${TARGET_DIR}
#     make
#     make install    
# elif [[ "$OSTYPE" == "darwin"* ]]; then
#     echo "Compile macos static..."
#     # Mac OSX
#     make clean
#     ../configure  --with-ngshared --with-readline=no --disable-debug --prefix=${TARGET_DIR}
#     make
#     make install
# fi