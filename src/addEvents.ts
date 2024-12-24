import { google, calendar_v3 } from 'googleapis';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.token' });

const CALENDAR_ID = process.env.CALENDAR_ID;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function addEvent() {
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  const event: calendar_v3.Schema$Event = {
    summary: 'Google Calendar API Test with TypeScript',
    description: 'Adding an event using Google Calendar API',
    start: {
      dateTime: '2024-12-25T10:00:00+09:00',
      timeZone: 'Asia/Tokyo',
    },
    end: {
      dateTime: '2024-12-25T11:00:00+09:00',
      timeZone: 'Asia/Tokyo',
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: event,
    });
    console.log('Event has been added:', response.data.htmlLink);
  } catch (error) {
    console.error('Error adding event:', error);
  }
}

addEvent();
