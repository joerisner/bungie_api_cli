import { get, RequestOptions } from 'https';
import dotenv from 'dotenv';
dotenv.config();

const getClanMembers = (clanId: string) => {
  const options: RequestOptions = {
    hostname: process.env.HOST_NAME,
    headers: { 'X-API-KEY': process.env.API_KEY },
    path: `/Platform/GroupV2/${clanId}/Members/`,
  };

  get(options, (resp) => {
    let data = '';

    resp.on('data', (chunk: string) => {
      data += chunk;
    });

    resp.on('end', () => {
      const members = JSON.parse(data).Response.results;
      const offlineMembers: string[] = [];
      const onlineMembers: string[] = [];

      console.log('');
      console.log(`Total Number of Members: ${members.length}`);
      console.log('');

      // TODO: Create an interface for the response
      members.forEach((member: any) => {
        if (member.isOnline) {
          onlineMembers.push(member.destinyUserInfo.LastSeenDisplayName);
        } else {
          offlineMembers.push(member.destinyUserInfo.LastSeenDisplayName);
        }
      });
      onlineMembers.sort();
      offlineMembers.sort();

      // Online Members
      console.log('||| Online Members |||');
      onlineMembers.forEach((member) => {
        console.log(member);
      });
      console.log('');

      // Offline Members
      console.log('||| Offline Members |||');
      offlineMembers.forEach((member) => {
        console.log(member);
      });
    });
  }).on('error', (e) => {
    console.error(e);
  });
};

getClanMembers(process.env.CLAN_ID as string);
