# Reviews
Reviews Component Repo

************* DEPENDENCIES *************
This component requires NPM and Node.

To start, run `npm install`.


************* DATABASE *************
This component uses MLABs to create a MONGO database (not local Mongo), so you will 
need to set up a .env file with your MLABs account in order to seed the database.

example of mongo shell in .env file: 
MONGO = mongodb://<userName>:<password>@ds249418.mlab.com:49418/foodi-go-reviews

If you need to run the tests, you will need an additional database for the test environment,
use MONGOTEST as variable in .env file.

************* NPM Scripts *************
test: Will run all Jest tests 
dev: Will run compiler in development environment
prod: Will run compiler in production environment
start-server: Will start the server
seed-db: Will seed the MLAB database with mockdata (Between 300-400 reviews)
