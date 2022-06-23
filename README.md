# Aireum - Web App Client

> A webapp to browse and play audio/video media files, provides main functions like user login/register, user preference and locale settings, media files real time search/filter and play, watching list and history management.

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Testing](#testing)
- [Project Status](#project-status)
<!-- * [Acknowledgements](#acknowledgements) -->
- [Contact](#contact)
<!-- * [License](#license) -->

## General Information

> This repo is the client side codes, including login/register and landing pages, media browse/search page, media info and playing pages, and settings page, etc.

## Technologies Used

- react - version 17.0.2
- firebase - version 9.1.1
- firebaseui - version 6.0.0
- axios - version 0.25.0
- crypto-js - version 4.1.1
- i18next - version 21.6.6
- algoliasearch - version 4.12.1
- @material-ui - version 4.12.3
- jsonwebtoken - version 8.5.1
- lodash - version 4.17.21

## Features

List the ready features here:

- User login/register/update, including email/Google/Facebook/phone login
- Media files browse/play, real time search, filter and sorting.
- Send logs to Google Logging.
- Using Agolia to provide indexing and searching functions
- Using materialUI for UI functions including dark theme, multi-lingual

## Setup

- Before you begin installing this client, you should have installed the [server]("https://github.com/Diting-Lab/Aireum_01_Server") and it is up and running.

- Clone this repo to your desktop.

- Update Firebase. To create a new firebase project, please follow the video instructions [here]("https://www.youtube.com/watch?v=6juww5Lmvgo"). Update `.env` REACT_APP_FIREBASE_API_KEY. Load sample data from a dev copy by following the instruction [here]("https://docs.google.com/document/d/1o7YByBRTI8xCGXIXwd3HKZ55gvsg0yFSsjSnfJJSdDI/edit?usp=sharing").

- Update AgoliaSearch. Update `.env` the fields: `REACT_APP_ALGOLIA_APP_ID, REACT_APP_ALGOLIA_API_KEY, REACT_APP_ALGOLIA_INDEX_NAME`, with your own.

## Usage

- After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

- Once the dependencies are installed, you can run `npm start` to start the application. You will then be able to access it at localhost:3000.

## Testing

- Once have both client and [server]("https://github.com/Diting-Lab/Aireum_01_Server") side codes cloned and set up correctly, please follow the [testing guide]("https://docs.google.com/document/d/1xepbCo5pPROmnnxAJuL6T3_z86CJXICfyPDbyZI7irQ/edit?usp=sharing") to test if all the pages and functions are working well.

## Project Status

Project is: _in progress_ , more features will be added, including manage watching history and list, social functions like chat and sharing, etc.

<!-- ## Acknowledgements
Give credit here.
- This project was inspired by...
- This project was based on [this tutorial](https://www.example.com).
- Many thanks to... -->

## Contact

Ditinglab (support@ditinglab.com)

<!-- Optional -->
<!-- ## License -->
<!-- This project is open source and available under the [... License](). -->

<!-- You don't have to include all sections - just the one's relevant to your project -->
