# Music Magic
The place that makes finding related artists simple!

# Local Development
## Install the API Server Dependencies
In a terminal at the root-level:
```
#Initial setup   
npm install
```

## Install the React UI dependencies
The React app is configured to proxy backend requests to the local Node server.

In a separate terminal from the API server, start the UI:
```
#Always change directory, first
cd react-ui/

#Initial setup
npm install
```

## Run the React UI and API Server 
```
#Use concurrently to run both
npm run dev
```
