import 'dotenv/config';
import axios from 'axios';

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
  receipient = [
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
  ],
}: {
  receipient?: string[];
  message: string;
}) {
  let indexValue = 0;

  const intervalId = setInterval(async () => {
    if (indexValue >= receipient.length) {
      clearInterval(intervalId);
      return;
    }

    const currentReceipient = receipient[indexValue];
    console.log({ currentReceipient, indexValue });

    try {
      const response = await axiosInstance.post('/', {
        chatId: `${currentReceipient}@c.us`,
        message: `This message is from discord: ${message ?? 'Hello'}`,
      });
      console.log(response.data);
      indexValue++;
    } catch (error) {
      console.error(error.response.data);
      clearInterval(intervalId);
      return;
    }
  }, 20000); // 20 seconds
}
