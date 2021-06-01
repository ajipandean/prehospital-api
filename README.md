<p align="center" style="margin-top: 32px;margin-bottom: 16px;">
  <img src="https://trello-attachments.s3.amazonaws.com/6090d4246149261a17b24089/60911a77064d92878e158b34/4dfc89d87d9160a3b35e6fa2f36eb0b4/Logo.png" alt="G-One Logo" />
</p>

# G-One Prehospital
> Repository for G-One Prehospital API

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#api-endpoints">API Endpoints</a></li>
    <li><a href="#references">References</a></li>
  </ol>
</details>

## Getting Started
This project is built using Javascript with NodeJS as runtime and NestJS as framework. The database that we use to store data is MySQL.

### Prerequisites
Please make sure you have these programs installed on your computer/laptop.

* NodeJS v12.22.1 or later
* NPM v6.14.12 or later
* Yarn v1.22.10 or later
* XAMPP v8.0.1 or later

### Installation
Follow these steps to replicate this project to your local computer/laptop.

1. Clone this project
   ```bash
   # Using HTTPS
   git clone https://github.com/g-one-capstone/prehospital-api.git

   # Using SSH
   git clone git@github.com:g-one-capstone/prehospital-api.git
   ```
2. Install dependencies
   ```bash
   $ cd prehospital-api
   $ yarn
   ```
3. Duplicate ```.env.example``` and rename to ```.env.development``` for development purpose
   ```bash
   $ cp .env.example .env
   ```
4. Edit file ```.env.development```
   ```bash
   # .env.development
   PORT=8080
   HOST=localhost

   DB_TYPE=mysql
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=
   DB_DATABASE=db_prehospital
   DB_SYNC=true # set to false for production
   ```
5. Create database with the name ```db_prehospital``` in your local MySQL using phpmyadmin or mysql-client
   ```mysql
   CREATE DATABASE db_prehospital;
   ```
6. Import database from [here](https://trello-attachments.s3.amazonaws.com/6090d4246149261a17b24089/6097c919cb0433356fbee3d0/0a11cb6cd435e79dedf2b950e7d04db4/new_db_prehospital.sql) to ```db_prehospital``` database that you've just created in step 5
7. Run locally
   ```bash
   # for development
   $ NODE_ENV=development yarn start:dev
   ```
8. Enjoy!

## API Endpoints
Visit file [api-enpoints.http]() to see all available endpoints.

Please make sure you use VS Code and have installed REST Client extension to run that file or you can use that file as reference and use another REST Client testing application.

## References
1. NodeJS download link [here](https://nodejs.org/en/download/).
2. XAMPP download link [here](https://www.apachefriends.org/download.html).