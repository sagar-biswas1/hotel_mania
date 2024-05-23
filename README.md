# Project Name --> Hotel mania

## Description

Brief description of your project, what it does, and any other relevant information.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Docker installed on your machine.
- Yarn installed globally.

## Setup Instructions

Follow these steps to set up and run the project.

### Step 1: Bring up the Docker containers

Run the following command to start the Docker containers:

```sh
docker compose up -d 
```

### Step 2: Install all the necessary dependencies by running:

``` sh
yarn install
```

### Step 3: Run Prisma migrations
For the first time setup, run the Prisma migrations with:

```sh
yarn dev:prisma-migrate-all
```

### Step 4: Start all services
Finally, start all services with:

```sh
yarn dev:all
```

### Troubleshooting
If you encounter issues, try the following steps:

- Ensure Docker is running and properly configured.
- Verify that Yarn is installed and accessible from your command line.
- Check for any error messages during the yarn install or migration steps and address them accordingly.
- Make sure that env files are done properly followed by .env.examples in each services.

### Contributing
If you wish to contribute to the project, please follow these steps:

### Fork the repository.
Create a new branch (git checkout -b feature-branch).
- Make your changes and commit them (git commit -m 'Add some feature').
- Push to the branch (git push origin feature-branch).
- Open a Pull Request.
