# Project Name --> Hotel mania

## Description

Brief description of your project, what it does, and any other relevant information.

## For details about the project

For more detailed documentation and project updates, visit the [Hotel Booking System Notion Page](https://chambray-pancake-282.notion.site/Hotel_mania-909decc561fd4c93b617a57be9630871).

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



### Initially this project is deployed to the vercel
## Deployment guide
- Add vercel token as VERCEL_TOKEN in github ation secret.
- Add vercel team name as VERCEL_TEAM in github ation secret.
- Add  env of your services in github ation secret followed by workflows yml files.

You just push or marge to main branch services will be automatically deployed .


[note: This project is under continuous development]

