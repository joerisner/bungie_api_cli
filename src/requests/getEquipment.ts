import { get } from 'https';
import dotenv from 'dotenv';
dotenv.config();

const getEquipment = (membershipId: string) => {
  // Add interface
  const options: Object = {
    hostname: process.env.HOST_NAME,
    headers: { 'X-API-KEY': process.env.API_KEY },
    path: `/Platform/Destiny2/2/Profile/${membershipId}/?components=205`,
  };

  get(options, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
      console.log(data);
    });

    resp.on('end', () => {
      const parsed = JSON.parse(data).Response.characterEquipment.data;
      const characters = Object.values(parsed);
      console.log(parsed);

      // TODO: Create interfaces for parameters specified as any
      characters.forEach((character: any) => {
        console.log('');
        console.log('||| Equipped Items |||');
        let items = character.items;
        items.forEach((item: any) => {
          console.log(item.itemHash);
        });
      });
    });
  }).on('error', (e) => console.error(e));
};

getEquipment(process.env.MEMBERSHIP_ID as string);
