import { google } from 'googleapis';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.token' });

const CALENDAR_ID = process.env.CALENDAR_ID;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function deleteEvents() {
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  try {
    const response = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: '2024-01-01T00:00:00Z',
      timeMax: '2024-03-31T23:59:59Z',
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items;

    if (events && events.length > 0) {
      for (const event of events) {
        try {
          await calendar.events.delete({
            calendarId: CALENDAR_ID,
            eventId: event.id!,
          });
          console.log(`Event with ID ${event.id} has been deleted.`);
        } catch (error) {
          console.error(`Error deleting event with ID ${event.id}:`, error);
        }
      }
    } else {
      console.log('No events found.');
    }
  } catch (error) {
    console.error('Error retrieving events:', error);
  }
}

deleteEvents();
