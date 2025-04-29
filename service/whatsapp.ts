import axios from 'axios';
import * as dotenv from 'dotenv';
import { getParticipants } from './participants';
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

const recipients = getParticipants();
console.log(recipients);

export async function sendWhatsappMessage({
  message,
  recipient = recipients,
}: {
  recipient?: string[];
  message: string;
}) {
  // TODO: find better way to get recipients
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
      clearInterval(intervalId);
      throw error;
      return;
    }
  }, 5000); // 5 seconds
}
