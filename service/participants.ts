import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

// fetch group members
export async function getParticipants() {
  const axiosInstance = axios.create({
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.WAAPI_TOKEN}`,
    },
    baseURL: `https://waapi.app/api/v1/instances/${process.env.WAAPI_INSTANCE}/client/action/get-group-participants`,
  });
  try {
    const response = await axiosInstance.get('', {
      params: { chatId: '120363040840469865@g.us' },
    });
    const recipients = response.data.data.participants.map((participant) => {
      return participant.id.user;
    });

    return recipients;
  } catch (error) {
    throw error;
  }
}
