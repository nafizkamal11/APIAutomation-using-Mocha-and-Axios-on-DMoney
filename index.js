import {config} from "dotenv";
import axios from "axios";
import {expect} from 'chai';
import { faker } from '@faker-js/faker';

import myUtils from "./myUtils.js";

config();
const baseUrl = process.env.baseUrl;

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

    it("2. Create a agent", async () => {
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

        myUtils.setEnv("agentId", data.user.id);
        myUtils.setEnv("agentEmail", data.user.email);
        myUtils.setEnv("agentPhoneNumber", data.user.phone_number);
    });

    it("2. Create Customer 1", async () => {
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

        myUtils.setEnv("customer1Id", data.user.id);
        myUtils.setEnv("customer1Email", data.user.email);
        myUtils.setEnv("customer1PhoneNumber", data.user.phone_number);
    });

    it("2. Create Customer 2", async () => {
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

        myUtils.setEnv("customer2Id", data.user.id);
        myUtils.setEnv("customer2Email", data.user.email);
        myUtils.setEnv("customer2PhoneNumber", data.user.phone_number);
    });

    it("2. Create Merchant", async () => {
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

        myUtils.setEnv("merchantId", data.user.id);
        myUtils.setEnv("merchantEmail", data.user.email);
        myUtils.setEnv("merchantPhoneNumber", data.user.phone_number);
    });

    it("3. Give 2000 tk from System account to the newly created agent", async () => {
        let {data} = await axios.post(`${baseUrl}/transaction/deposit`, {
            "from_account": "SYSTEM",
            "to_account": `${process.env.agentPhoneNumber}`,
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
            "from_account": `${process.env.agentPhoneNumber}`,
            "to_account": `${process.env.customer1PhoneNumber}`,
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

    it("5. Withdraw 500 tk by the customer to the agent", async () => {
        let {data} = await axios.post(`${baseUrl}/transaction/withdraw`, {
            "from_account": `${process.env.customer1PhoneNumber}`,
            "to_account": `${process.env.agentPhoneNumber}`,
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
            "from_account": `${process.env.customer1PhoneNumber}`,
            "to_account": `${process.env.customer2PhoneNumber}`,
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
            "from_account": `${process.env.customer1PhoneNumber}`,
            "to_account": `${process.env.merchantPhoneNumber}`,
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

    it("8. Check balance of the recipient customer1", async () => {
        let {data} = await axios.get(`${baseUrl}/transaction/balance/${process.env.customer1PhoneNumber}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.token}`,
                "X-AUTH-SECRET-KEY": `${process.env.secretKey}`
            }
        });
        expect(data.message).to.include("User balance");
        console.log(data.balance);
    })
})