#!/bin/bash

if [ "$1" != "dev" ] && [ "$1" != "qa" ] && [ "$1" != "uat" ] && [ "$1" != "prod" ] 
then
  echo "'$1' is not one of the allowed environments: dev, qa, uat and prod"
else
  echo "Copying setup files $1"
  cp -R "./setup/$1/android/icons/" ./android/app/src/main/res
  cp -R "./setup/$1/ios/ssl/" ./ios
  cp -R "./setup/$1/android/google-services/" ./android/app
  cp -R "./setup/$1/ios/google-services/" ./ios
fi