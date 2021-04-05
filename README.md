# pdftable-api
A simple REST API accepting PDF files and returning table data as JSON built on top of [pdf-table-extractor](https://www.npmjs.com/package/pdf-table-extractor)

I wanted to play around with Docker a bit and figured this would be a good first step to learn how to build and dockerize a Node.js application. You probably shouldn't use this in anything serious.

## Build & run
1. Clone the repository: `git clone git@github.com:that-one-tom/pdftable-api.git`
2. Change into the newly created directory: `cd pdftable-api`
3. Build the Docker image: `docker build --tag that-one-tom/pdftable-api .`
4. Run it: `docker run -p 9010:8080 -d that-one-tom/pdftable-api` (Replace 9010 with the port you want the app to be available under)

## Usage
Send the file in a multipart form POST request to the `/upload` endpoint using the field name `file`:
![Screenshot](/img/screenshot.png)