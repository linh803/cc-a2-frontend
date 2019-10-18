# YouTube Trending Videos Map

## About
This is the front end of the YouTube Trending Videos Map, which shows and keeps track of all trending videos of every country in the world.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The backend repo can be found [here](https://github.com/s3688394/cc-ass2-yt-api).

## Local Development Instructions
### `npm start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Google Cloud Deployment Instructions
Before starting, ensure that you have a Google account and have created a billing account for the Google Cloud services. Also ensure that you have the [Google Cloud SDK](https://cloud.google.com/sdk/) installed on your computer.

### Create New Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com).
2. Create a new Google Cloud project.
3. Keep note of the project-id for this new project.

### Initialise App Engine
1. Go to the [App Engine](https://console.cloud.google.com/appengine) dashboard.
     - Navigation menu -> App Engine
2. Create a new App Engine app.
     - We will be deploying an app using the Flexible environment, so make sure you have connected a billing account.

### Enable Google Cloud APIs and setup API Key
1. Go to the [API](https://console.cloud.google.com/apis) dashboard.
     - Navigation Menu -> API & Services
2. Click on **Enable APIs and Services**.
3. Search for and enable the **Google Maps API**.
5. Go to the [API credentials](https://console.cloud.google.com/apis/credentials) page.
     - Navigation Menu -> API & Service -> Credentials
6. Click on **Create Credentials** drop down menu and then **API Key**.
7. Keep note of the API Key generated.

### Setup and Deploy YouTube Trending Videos Map
1. Clone this repo.
    - In a terminal (Unix) or Git Bash (Windows): `git clone https://github.com/s3688394/cc-ass2-yt-api.git`
2. Navigate to the **cc-a2-frontend** folder.
3. Rename every file ending in `.template` and remove the `template` extension. There are two such files to rename:
    - `src/resources/Keys.js.template` -> `src/resources/Keys.js`
    - `src/resources/Url.js.template` -> `src/resources/Url.js`
4. In the above files, go through and replace the placeholders with the required values from the previous sections above:
    - `<API_KEY>` = API key from step 6 of **Enable Google Cloud APIs and setup API Key**.
    - `<ENDPOINTS_API_SERVICE>` = URL to the endpoints API service, obtained by deploying the backend (see the link in **About**).
5. Configure the project ID by running the following in a terminal:
    - `gcloud config set project <PROJECT_ID>`
6. Deploy the project to App Engine by running the following in a terminal:
    - `gcloud app deploy`

The map is now deployed. The website's URL can be found in the Project's Dashboard.
