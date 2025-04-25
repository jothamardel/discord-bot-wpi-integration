import data from './config/participants.json';

// extract phone numbers from group data
export function getParticipants() {
  const recipients = data.data.data.participants.map((participant) => {
    return participant.id.user;
  });

  return recipients;
}
