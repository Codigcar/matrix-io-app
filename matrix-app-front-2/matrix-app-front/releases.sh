#!/bin/bash

# Script para incrementar las versiones de iOS y Android
# Autor: Dambert Muñoz

# Nombres de archivos
pbxprojFile="ios/matrix.xcodeproj/project.pbxproj"
gradleFile="android/app/build.gradle"

echo "================================================================"
echo "Marketing version"
echo $1
echo "================================================================"

# Cambiar a la rama main y actualizar
git reset --hard
git checkout main
git pull

################################
## iOS
################################

# Extraer la cuarta ocurrencia de CURRENT_PROJECT_VERSION y aumentar su valor
newProjectVersion=$(awk '/CURRENT_PROJECT_VERSION/{count++; if(count==4) {sub(/.*= /,""); sub(/;/,""); print $1+1; exit}}' $pbxprojFile)

# Crear una nueva rama con nombre basado en la fecha
branchName="releases/$newProjectVersion.$newProjectVersion.$(date +%Y%m%d)"
git branch -D $branchName
git checkout -b $branchName
git switch $branchName

# Verificar que hemos obtenido un número
if ! [[ $newProjectVersion =~ ^[0-9]+$ ]]; then
    echo "Error al obtener la versión actual del proyecto."
    exit 1
fi

echo "================================================"
echo "iOS: nuevo newproject version"
echo $newProjectVersion
echo "================================================" 

# Actualizar la cuarta ocurrencia de CURRENT_PROJECT_VERSION en el archivo project.pbxproj
awk -v version=$newProjectVersion '/CURRENT_PROJECT_VERSION/ {count++; if(count==4) sub(/[0-9]+/, version)}1' $pbxprojFile > tmpfile && mv tmpfile $pbxprojFile
if [ ! -z "$1" ]; then
  awk -v version="$1" '/MARKETING_VERSION/ {count++; if(count==4) sub(/MARKETING_VERSION = .*/, "MARKETING_VERSION = " version ";");} 1' $pbxprojFile > tmpfile && mv tmpfile $pbxprojFile
fi

################################
## Android
################################

# Incrementar versionCode en build.gradle
versionCode=$(awk '/versionCode/ {print $2; exit}' $gradleFile)

# Verificar que hemos obtenido un número
if ! [[ $versionCode =~ ^[0-9]+$ ]]; then
    echo "Error al obtener el versionCode actual."
    exit 1
fi

# Incrementar el versionCode
newVersionCode=$((versionCode + 1))

echo "Android: newVersionCode"
echo $newVersionCode
echo "================================================"

# Actualizar el primer versionCode en build.gradle (específico para macOS)
awk -v newVersion="$newVersionCode" '/versionCode/ && !done {sub(/[0-9]+/, newVersion); done=1} 1' $gradleFile > temp.gradle && mv temp.gradle $gradleFile
if [ ! -z "$1" ]; then
  awk -v newVersion="$1" '/versionName/ && !done {sub(/[0-9]+/, newVersion); done=1} 1' $gradleFile > temp.gradle && mv temp.gradle $gradleFile
fi

# Crear un commit con los cambios
git add $pbxprojFile $gradleFile
git commit -m "[CROSS] - Increment version: versionCode to $newVersionCode" --no-verify
git push origin $branchName

# Crear un pull request hacia la rama principal
gh pr create --title "[CROSS] - $branchName" --body "Squads branch to $branchName" --base main --head $branchName

echo "Proceso completado. Revisar el pull request creado."