import {config} from "dotenv";
import axios from "axios";
import {expect} from 'chai';
import {faker} from '@faker-js/faker';

import myUtils from "../utils/myUtils.js";
import userList from "../user-list.json" assert {type: "json"};

config();
const baseUrl = process.env.baseUrl;

const agent = 0;
const customer1 = 1;
const customer2 = 2;
const merchant = 3;

describe("API automation using mocha and axios on DMoney", () => {
    it("1. Login by admin", async () => {
        let {data} = await axios.post(`${baseUrl}/user/login`, {
            "email": "admin@roadtocareer.net",
            "password": "1234"
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        expect(data.message).to.equal("Login successful");

        myUtils.setEnv("token", data.token);
    });

    it("2a. Create a agent", async () => {
        let firstName = faker.person.firstName();
        let lastName = faker.person.lastName();

        let {data} = await axios.post(`${baseUrl}/user/create`, {
            "name": firstName + " " + lastName,
            "email": `${firstName.toLowerCase()}.${lastName.toLowerCase()}@roadtocareer.net`,
            "password": "1234",
            "phone_number": myUtils.phoneNumber(),
            "nid": myUtils.phoneNumber(),
            "role": "Agent"
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.token}`,
                "X-AUTH-SECRET-KEY" : `${process.env.secretKey}`
            }
        });
        expect(data.message).to.equal("User created");

        let newUser = {
            "id": data.user.id,
            "email": data.user.email,
            "phoneNumber": data.user.phone_number,
            "role": data.user.role
        };
        myUtils.saveUser(newUser);
    });

    it("2b. Create Customer 1", async () => {
        let firstName = faker.person.firstName();
        let lastName = faker.person.lastName();

        let {data} = await axios.post(`${baseUrl}/user/create`, {
            "name": firstName + " " + lastName,
            "email": `${firstName.toLowerCase()}.${lastName.toLowerCase()}@roadtocareer.net`,
            "password": "1234",
            "phone_number": myUtils.phoneNumber(),
            "nid": myUtils.phoneNumber(),
            "role": "Customer"
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.token}`,
                "X-AUTH-SECRET-KEY" : `${process.env.secretKey}`
            }
        });
        expect(data.message).to.equal("User created");

        let newUser = {
            "id": data.user.id,
            "email": data.user.email,
            "phoneNumber": data.user.phone_number,
            "role": data.user.role + "1"
        };
        myUtils.saveUser(newUser);
    });

    it("2c. Create Customer 2", async () => {
        let firstName = faker.person.firstName();
        let lastName = faker.person.lastName();

        let {data} = await axios.post(`${baseUrl}/user/create`, {
            "name": firstName + " " + lastName,
            "email": `${firstName.toLowerCase()}.${lastName.toLowerCase()}@roadtocareer.net`,
            "password": "1234",
            "phone_number": myUtils.phoneNumber(),
            "nid": myUtils.phoneNumber(),
            "role": "Customer"
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.token}`,
                "X-AUTH-SECRET-KEY": `${process.env.secretKey}`
            }
        });
        expect(data.message).to.equal("User created");

        let newUser = {
            "id": data.user.id,
            "email": data.user.email,
            "phoneNumber": data.user.phone_number,
            "role": data.user.role + "2"
        };
        myUtils.saveUser(newUser);
    });

    it("2d. Create Merchant", async () => {
        let firstName = faker.person.firstName();
        let lastName = faker.person.lastName();

        let {data} = await axios.post(`${baseUrl}/user/create`, {
            "name": firstName + " " + lastName,
            "email": `${firstName.toLowerCase()}.${lastName.toLowerCase()}@roadtocareer.net`,
            "password": "1234",
            "phone_number": myUtils.phoneNumber(),
            "nid": myUtils.phoneNumber(),
            "role": "Merchant"
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.token}`,
                "X-AUTH-SECRET-KEY": `${process.env.secretKey}`
            }
        });
        expect(data.message).to.equal("User created");

        let newUser = {
            "id": data.user.id,
            "email": data.user.email,
            "phoneNumber": data.user.phone_number,
            "role": data.user.role
        };
        myUtils.saveUser(newUser);
    });

    it("3. Give 2000 tk from System account to the newly created agent", async () => {
        let {data} = await axios.post(`${baseUrl}/transaction/deposit`, {
            "from_account": "SYSTEM",
            "to_account": `${userList[agent].phoneNumber}`,
            "amount": 2000
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.token}`,
                "X-AUTH-SECRET-KEY": `${process.env.secretKey}`
            }
        });
        expect(data.message).to.equal("Deposit successful");
    })

    it("4. Deposit 1500 tk to customer1 from the agent account", async () => {
        let {data} = await axios.post(`${baseUrl}/transaction/deposit`, {
            "from_account": `${userList[agent].phoneNumber}`,
            "to_account": `${userList[customer1].phoneNumber}`,
            "amount": 1500
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.token}`,
                "X-AUTH-SECRET-KEY": `${process.env.secretKey}`
            }
        });
        expect(data.message).to.equal("Deposit successful");
    })

    it("5. Withdraw 500 tk by the customer1 to the agent", async () => {
        let {data} = await axios.post(`${baseUrl}/transaction/withdraw`, {
            "from_account": `${userList[customer1].phoneNumber}`,
            "to_account": `${userList[agent].phoneNumber}`,
            "amount": 500
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.token}`,
                "X-AUTH-SECRET-KEY": `${process.env.secretKey}`
            }
        });
        expect(data.message).to.equal("Withdraw successful");
    })

    it("6. Send money 500 tk to another customer", async () => {
        let {data} = await axios.post(`${baseUrl}/transaction/sendmoney`, {
            "from_account": `${userList[customer1].phoneNumber}`,
            "to_account": `${userList[customer2].phoneNumber}`,
            "amount": 500
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.token}`,
                "X-AUTH-SECRET-KEY": `${process.env.secretKey}`
            }
        });
        expect(data.message).to.equal("Send money successful");
    })

    it("7. Payment 100 tk to any merchant by the recipient customer", async () => {
        let {data} = await axios.post(`${baseUrl}/transaction/payment`, {
            "from_account": `${userList[customer2].phoneNumber}`,
            "to_account": `${userList[merchant].phoneNumber}`,
            "amount": 100
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.token}`,
                "X-AUTH-SECRET-KEY": `${process.env.secretKey}`
            }
        });
        expect(data.message).to.equal("Payment successful");
    })

    it("8. Check balance of the recipient customer", async () => {
        let {data} = await axios.get(`${baseUrl}/transaction/balance/${userList[customer2].phoneNumber}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.token}`,
                "X-AUTH-SECRET-KEY": `${process.env.secretKey}`
            }
        });
        expect(data.message).to.include("User balance");
        // console.log(data.balance);
    })
})