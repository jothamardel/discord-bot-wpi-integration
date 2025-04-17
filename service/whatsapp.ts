import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

console.log('Token: ', process.env.WAAPI_TOKEN);
console.log('Instance: ', process.env.WAAPI_INSTANCE);

const axiosInstance = axios.create({
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: `Bearer ${process.env.WAAPI_TOKEN}`,
  },
  baseURL: `https://waapi.app/api/v1/instances/${process.env.WAAPI_INSTANCE}/client/action/send-message`,
});

export async function sendWhatsappMessage({
  message,
  recipient = ['2349015537247', '2348150247631', '2348105742280'],
}: {
  recipient?: string[];
  message: string;
}) {
  let indexValue = 0;

  const intervalId = setInterval(async () => {
    if (indexValue >= recipient.length) {
      clearInterval(intervalId);
      return;
    }

    const currentRecipient = recipient[indexValue];
    console.log({ currentRecipient, indexValue });

    try {
      const response = await axiosInstance.post('/', {
        chatId: `${currentRecipient}@c.us`,
        message: `This message is from discord: ${message ?? 'Hello'}`,
      });
      console.log(response.data);
      indexValue++;
    } catch (error) {
      console.error(error.response);
      clearInterval(intervalId);
      return;
    }
  }, 20000); // 20 seconds
}
/*
recipient = [
  '2347033680280',
  '2348064581905',
  '2347089898766',
  '2347074068911',
  '2347060727649',
  '2347062883534',
  '2348065844484',
  '2347036088996',
  '2348069672917',
  '2347018084869',
]
*/
