# API Automation using Mocha and Axios on DMoney

## Overview

This repository demonstrates API automation based on a series of API calls in the DMoney API collection. It performs a set of actions including logging in as an admin, creating users (customers and an agent), transferring funds between users, and verifying account balances.

## Implemented Work

The automated test script performs the following steps:

1. **Login**
    - Log in as an admin using credentials:
2. **Create Users**
    - Create 2 new customers
    - Create 1 new agent
3. **Transfer Funds**
    - Transfer **2000 tk** from the System account to the newly created agent
    - **Deposit:** 1500 tk is deposited to a customer from the agent account
    - **Withdraw:** 500 tk is withdrawn by the customer to the agent
    - **Send Money:** 500 tk is sent from one customer to another
    - **Payment:** 100 tk is paid to a merchant by the recipient customer
4. **Check Balance**
    - Verify the balance of the recipient customer

## Project Structure

```
├── test
│   └── dmoney.test.js         // Contains the API tests
├── testRunner
│   ├── reportGenerator.js     // Generates the Mochawesome report
│   └── testrunner.js          // Script to run the tests
├── utils
│   └── myUtils.js             // Utility functions used across tests
├── user-list.json             // JSON file to store created users' info
├── .env                     // Environment variables (baseUrl, partnerKey, token)
├── package.json
└── .gitignore               // Should include node_modules & package-lock.json

```

## Setup and Installation

1. **Clone the Repository**
    
    ```bash
    git clone https://github.com/nafizkamal11/APIAutomation-using-Mocha-and-Axios-on-DMoney.git
    cd APIAutomation-using-Mocha-and-Axios-on-DMoney
    
    ```
    
2. **Install Dependencies**
    
    Make sure you have [Node.js](https://nodejs.org/) installed, then run:
    
    ```bash
    npm install
    
    ```

## Running the Tests

To run the automated tests, use the following command:

```bash
npm test file test/dmoney.test.js
```

This command executes the test runner located at `testRunner/testrunner.js`, which in turn runs the API tests in `test/dmoney.test.js`.

## Generating the Report

After running the tests, generate the Mochawesome report with:

```bash
 npm start file test/dmoney.test.js
```

This script (`testRunner/reportGenerator.js`) creates a detailed report of your test runs.

## Screenshot

Below is a screenshot of the generated Mochawesome report:

![image](https://github.com/user-attachments/assets/285d9460-10c4-43e8-b7b6-42fb3049316a)

## Dependencies

- [Mocha](https://mochajs.org/) – Testing framework
- [Chai](https://www.chaijs.com/) – Assertion library
- [Axios](https://axios-http.com/) – Promise-based HTTP client
- [Mochawesome](https://www.npmjs.com/package/mochawesome) – Reporting tool
- [dotenv](https://www.npmjs.com/package/dotenv) – Environment variable loader
- [faker](https://www.npmjs.com/package/@faker-js/faker) – For generating random test data
- [shelljs](https://www.npmjs.com/package/shelljs) – For executing shell commands
