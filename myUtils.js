import fs from 'fs';
import path from 'path';

import userList from "./user-list.json" assert {type: "json"};

const saveUser = (newUser) => {
    let added = false;
    for (let key in userList) {
        if (userList[key].role === newUser.role) {
            userList[key] = newUser;
            added = true;
            break;
        }else if(userList[key].role === "Customer1" && newUser.role === "Customer1") {
            userList[key] = newUser;
            added = true;
            break;
        }else if(userList[key].role === "Customer2" && newUser.role === "Customer2") {
            userList[key] = newUser;
            added = true;
            break;
        }
    }
    if(!added) {
        userList.push(newUser);
    }
    fs.writeFileSync('./user-list.json', JSON.stringify(userList, null, 2));
};

const setEnv = (key, value) => {
    const filePath = path.join(process.cwd(), '.env');
    const file = fs.readFileSync(filePath, 'utf8');

    const lines = file.split('\n');
    let newLines = [];
    let found = false;

    for (let line of lines) {
        if (line.startsWith(`${key}=`)) {
            found = true;
            newLines.push(`${key}=${value}`);
        } else {
            newLines.push(line);
        }
    }

    if (!found) {
        newLines.push(`${key}=${value}`);
    }

    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
    // console.log(`Key-value pair '${key}=${value}' has been stored in .env.`);
};

const phoneNumber = ()=>{
    let prefix = "0123"
    let max = 9999999;
    let min = 1000000;
    let randomDigits = Math.round(Math.random() * (max - min) + min);
    return prefix + randomDigits;
}

export default {phoneNumber, setEnv, saveUser};