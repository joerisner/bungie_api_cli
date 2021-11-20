import { get, RequestOptions } from 'https';
import * as fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const options: RequestOptions = {
  hostname: process.env.HOST_NAME,
  headers: { 'X-API-KEY': process.env.API_KEY },
  path: '/common/destiny2_content/json/en/DestinyLoreDefinition-518fc4dd-cf15-4276-954d-4a16992d2eaa.json',
};

const getLoreDefinition = () => {
  get(options, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      const entries = JSON.parse(data);

      Object.values(entries).forEach((entry: any) => {
        const entryHash = entry.hash;
        const entryName = entry.displayProperties.name;
        console.log(`${entryHash}: ${entryName}`);
      });
    });
  });
};

const writeJsonFile = () => {
  get(options, (resp) => {
    const file = fs.createWriteStream('./src/reference/loredef.json');

    resp.on('data', (data) => file.write(data));
    resp.on('end', () => file.end());
  }).on('error', (e) => console.error(e));
};

getLoreDefinition();
