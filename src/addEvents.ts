import { google, calendar_v3 } from 'googleapis';
import dotenv from 'dotenv';
import fs from 'fs-extra';
import path from 'path';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.token' });

const CALENDAR_ID = process.env.CALENDAR_ID;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function addEvents() {
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  const events: calendar_v3.Schema$Event[] = JSON.parse(await fs.readFile('events.json', 'utf8'));
  const addedEvents: calendar_v3.Schema$Event[] = [];

  for (const event of events) {
    try {
      const response = await calendar.events.insert({
        calendarId: CALENDAR_ID,
        requestBody: event,
      });
      addedEvents.push(response.data);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  }

  const outputDir = 'output';
  await fs.ensureDir(outputDir);
  const timestamp = new Date().toISOString().replace(/[-:T]/g, '').split('.')[0];
  const outputFilePath = path.join(outputDir, `events-${timestamp}.json`);
  await fs.writeFile(outputFilePath, JSON.stringify(addedEvents, null, 2));
}

addEvents();
