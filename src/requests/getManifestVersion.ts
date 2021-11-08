import { get } from 'https';
import dotenv from 'dotenv';
dotenv.config();

const getManifest = () => {
  // Add interface
  const options: Object = {
    hostname: process.env.HOST_NAME,
    headers: { 'X-API-KEY': process.env.API_KEY },
    path: '/Platform/Destiny2/Manifest/',
  };

  get(options, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      const parsed = JSON.parse(data);
      console.log(`URL: https://www.bungie.net${parsed.Response.mobileWorldContentPaths.en}`);
    });
  }).on('error', (e) => console.error(e));
};

getManifest();
