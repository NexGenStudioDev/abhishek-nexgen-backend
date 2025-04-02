import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

// Convert exec to return a promise
const execPromise = promisify(exec);

async function generateKeys() {
  try {

    const keysDir = path.basename('./keys');
    const privateKeyPath = path.join(keysDir, "privatekey.pem");
    const publicKeyPath = path.join(keysDir, "publickey.pem");


    if (!fs.existsSync(keysDir)) {
      fs.mkdirSync(keysDir, { recursive: true });
    }


    const privateKeyCommand = `openssl genrsa -out ${privateKeyPath} 2048`;


    await execPromise(privateKeyCommand);
    console.log("Private key generated at:", privateKeyPath);


    const publicKeyCommand = `openssl rsa -in ${privateKeyPath} -pubout -out ${publicKeyPath}`;


    await execPromise(publicKeyCommand);

  } catch (error) {
    console.error("Error generating keys:", error);
  }
}

// Generate the keys when the script is run
generateKeys();
