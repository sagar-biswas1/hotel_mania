
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of your application code into the container
COPY . .
# Set environment variables
# ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5433/user_db?schema=public"
# ENV DATABASE_URL="postgresql://postgres:postgres@72.17.0.1:5433/auth_db?schema=public"
# ENV DATABASE_URL="postgresql://postgres:postgres@172.20.0.2:5433/auth_db?schema=public"

# ENV JWT_SECRET="My_Secret_Key"
ENV ALLOWED_ORIGINS="http://localhost:8081,http://127.0.0.1:8081,http://localhost:4003,http://localhost:4000,http://localhost:4008,http://localhost:4010,http://localhost:8001"
# ENV BASE_URL_AUTH="http://localhost:4003"
ENV PORT 4000

# Expose the port your service uses
EXPOSE 4000

# Start the service with the compiled code
CMD ["sh", "-c", "yarn migrate:dev && yarn dev"]
