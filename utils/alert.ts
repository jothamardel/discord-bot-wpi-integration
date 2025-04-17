import { SlashCommandBuilder } from 'discord.js';
import { sendWhatsappMessage } from 'service';
import axios from 'axios';

const alertData = new SlashCommandBuilder();
alertData.setName('alert').setDescription('Notifies recipients on whatsapp');

async function alertExecute(interaction) {
  let message = 'hello, there';
  try {
    const response = await axios.get(
      'https://api.humorapi.com/jokes/random?api-key=f0698251fe074e7e86738856d10bf9f9&include-tags=clean&max-length=150',
    );
    message = response.data.joke;
  } catch (error) {
    console.error(error);
  }

  try {
    await sendWhatsappMessage({ message });
    await interaction.reply('Message sent successfully');
  } catch (error) {
    await interaction.reply('Problem sending messages');
    console.error(error);
  }
}

export { alertData, alertExecute };
