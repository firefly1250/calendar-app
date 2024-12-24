import { google } from 'googleapis';
import * as dotenv from 'dotenv';
import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.token' });

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

async function getAccessToken() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);

  http
    .createServer(async (req, res) => {
      if (req.url && req.url.startsWith('/oauth2callback')) {
        const query = new url.URL(req.url, 'http://localhost:3000').searchParams;
        const code = query.get('code');
        res.end('Authentication successful! You can close this tab.');

        if (code) {
          oAuth2Client.getToken(code, (err, token) => {
            if (err) {
              console.error('Error retrieving access token', err);
              process.exit(1);
            }
            if (!token) {
              console.error('Error invalid token');
              process.exit(1);
            }
            oAuth2Client.setCredentials(token);
            console.log('Token acquired:', token);

            const envVars = `ACCESS_TOKEN=${token.access_token}\nREFRESH_TOKEN=${token.refresh_token}\n`;
            fs.writeFileSync('.token', envVars);
            process.exit(0);
          });
        }
      }
    })
    .listen(3000, () => {
      console.log('Server is listening on port 3000');
    });
}

getAccessToken();