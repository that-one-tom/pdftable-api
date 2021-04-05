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
![Insomnia Screenshot](/img/screenshot.png)

## Use Case
I am currently using this in my [n8n](https://n8n.io/) environment to read and parse numeric data published by my local county council (who themselves don't provide data through easily machine-readable files or an API but upload PDF files generated using Microsoft Word).

My n8n workflow first stores new PDFs it finds, uploads them to this REST API and then transforms and stores the extracted data:
![n8n Screenshot](/img/n8n.png)

There are a couple of commercial solutions providing a REST API for this particular data parsing job too. However, I found they either aren't a good fit for n8n environments because they don't work synchronously or are too expensive.