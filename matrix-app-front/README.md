[![Build](https://github.com/MATRIXMVP/matrix-app-front/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/MATRIXMVP/matrix-app-front/actions/workflows/main.yml)

# App Matrix App

# Matrix - A React Native app for BCP

## Getting Started 🚀

- Make sure to use your gmail matrix account for coding.

### Prerequisites

The dependency to run the project is to have installed **[node](https://nodejs.org/en/)** (>=v15), **yarn** and the following configurations:

- Use React Native Command Line Interface.
- [Setting up the development environment](https://reactnative.dev/docs/0.66/environment-setup).
- Make sure to prepare the Android and iOS for using physical and virtual device.

### Quick Start

#### Usage

After cloning the project you have to install all the dependencies.

`$ yarn install`

and then run the project with two steps:

#### Step 1: Start Metro in a terminal

`$ yarn start`

#### Step 2: Start your application in another terminal

`$ yarn android`

or

`$ yarn ios`

### Android

#### Build scripts

- Run the app in a release mode in all connected devices: `$ yarn android:release`
- Create apk file: `$ yarn android:apk`
- Create aab file: `$ yarn android:aab`

#### How to use install an apk in your phone locally

- Create an apk file and you can use the script: `$ yarn android:apk` to get it.
- Go where the apk is. e.g. `$ cd android/app/build/outputs/apk/release`
- Get the connected devices with the command `$ adb devices` to watch the device id.
- Once you get the device id from the previous step. Please run this command `$ adb -s DEVICE_ID install name.apk`. e.g. `$ adb -s SS-1245 install app-release.apk`

### iOS

TBD

## Tech Stack

Matrix app includes the following rock-solid technical decisions out of the box:

- React Native 0.71.1
- React Navigation 6
- Redux with Saga
- TypeScript
- And more!

## Development Guidelines

### Commit messages

Make sure your commit message looks like:

- {TAG}: {ITEM_ID} - {SHORT_DESCRIPTION} {ITEM_ID_LINK}

e.g. `$ git commit -m "TAG: ITEM_ID - SHORT_DESCRIPTION [ITEM_ID_LINK]"`

Where **{TAG}** => Any of the following:

- BLD: change related to build scripts
- FIX: hotfixes.
- BUG: alias for bugfixes.
- DOC: documentation
- FEAT: features new features
- ENH: Performance enhancements, refactors, not captured in features
- REF: maintenance commit (refactoring, etc.)
- STY: style fix (whitespaces, typos)
- TST: addition or modification of tests

Definition:

- **ITEM_ID**: Useful to identify commits related to a given feature/bug.
- **SHORT_DESCRIPTION**: A very short description
- **ITEM_ID_LINK**: It is the link where the specification is.

**Examples**:

- **PR title**: FEAT: MTX2-108 - Persona/Validate: Add loading to request service

  `$ git commit -m "FEAT: MTX2-108 - Person/Validate: Add loading to request service [https://matrixmvp.atlassian.net/browse/MTX2-108]"`

- **PR title**: FEAT: MTX2-109 - Banking/Home: Create the bottom menu

  `$ git commit -m "FEAT: MTX2-109 - Banking/Home: Create the bottom menu [https://matrixmvp.atlassian.net/browse/MTX2-109]"`

### Branching model

Make sure the follow the Gitflow Workflow which is a Local tracking branch. We must have at least three branches:

- **main**: this should reflect the current state of what is in the production environment. Every new commit on master should comprise a new release only.
- **develop**: this branch should contain the completed (and tested) upcoming features. It is common to create a separate branch for each feature and then merge it to develop when the feature is ready.
- **feature**: user requirement during the development timespan.
- **bug**: reported by the user in STG/UAT and tester during their testing
- **hotfix**: reported by the user in production

Let’s use a simple pattern like this.

- bug/[TICKET_ID]\_bug_title
- hotfix/[TICKET_ID]\_hotfix_title
- feature/[TICKET_ID]\_user_story_title

**Examples:**

- feature/MTX2-101_update_references_the_new_card_component
- bug/MTX2-99_remove_location_host_in_dev
- hotfix/MTX2-100_update_server_var_to_support_xyz

### Testing

- [Confluence Doc Testing](https://matrixmvp.atlassian.net/wiki/spaces/FRONTEND/pages/283574848/Unit+Testing)

### Guidelines for correct  

- [Confluence Doc Code writing](https://matrixmvp.atlassian.net/wiki/spaces/FRONTEND/pages/343769108/Lineamientos+para+la+Escritura+de+C+digo+Efectiva)


### Project Architecture Documentation

- [Confluence Doc Architecture Documentation](https://matrixmvp.atlassian.net/wiki/spaces/FRONTEND/pages/314081418/New+Architecture+IO+-+App+Mobile+-+TODO)


### Credentials

- User DNI: 00000110
- Password: Test1234.

