# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the Docker image to /app
WORKDIR /chat-socket

# Copy the current directory contents (on your machine) into the container at /app
COPY . /chat-socket/

# If you have a package.json file, install any dependencies
RUN npm install

# Make the container's port 8080 available to the outside world
EXPOSE 8080

# Run index.js when the container launches
CMD ["node", "index.js"]
