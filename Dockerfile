# Use the official Node.js image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port that the app will run on (default Express port is 3000)
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "run" ,"start"]


# run the following command to build the image
# docker build -t <Container Name >  .

# . means the current directory

# run the docker container
# docker run -d   -p 3000:3000   --name portfolio   -e PORT=3000   -e DB_URL=<Mongo_URI>   techgupta/portfolio
# -d means run in detached mode
# -p means port mapping
# -e means environment variable

# docker compose is used to run multiple containers at once like mongodb and nodejs`
# docker-compose up -d 
# --build means build the image again
# -d means run in detached mode (background)

# Rebuild the image
# docker-compose up -d --build
