import { get, RequestOptions } from 'https';
import dotenv from 'dotenv';
dotenv.config();

const getTotalTimePlayed = (membershipId: string) => {
  const options: RequestOptions = {
    hostname: process.env.HOST_NAME,
    headers: { 'X-API-KEY': process.env.API_KEY },
    path: `/Platform/Destiny2/2/Profile/${membershipId}/?components=200`,
  };

  get(options, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      const parsed = JSON.parse(data);
      const characters = Object.values(parsed.Response.characters.data);

      // TODO: Assign type to character param
      characters.forEach((character: any) => {
        const minutes = parseInt(character.minutesPlayedTotal);
        const hours = Math.round(minutes / 60);

        if (character.classType == 0) {
          console.log(`Titan: ${hours} hours`);
        } else if (character.classType == 1) {
          console.log(`Hunter: ${hours} hours`);
        } else if (character.classType == 2) {
          console.log(`Warlock: ${hours} hours`);
        }
      });
    });
  }).on('error', (e) => {
    console.error(e);
  });
};

getTotalTimePlayed(process.env.MEMBERSHIP_ID as string);
