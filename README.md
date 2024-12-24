## Setup

```sh
npm install
```

Create a `.env` file with the following content:

```
CALENDAR_ID=
CLIENT_ID=
CLIENT_SECRET=
```

Create an `events.json` file with the events you want to add:

```json
[
  {
    "summary": "test event",
    "start": {
      "dateTime": "2024-12-25T10:00:00+09:00",
      "timeZone": "Asia/Tokyo"
    },
    "end": {
      "dateTime": "2024-12-25T11:00:00+09:00",
      "timeZone": "Asia/Tokyo"
    }
  }
]
```

## Run

### Authenticate

Run the following command to authenticate and obtain the access token and refresh token:

```sh
npm run auth
```

### Add Events

Run the following command to add events to your Google Calendar:

```sh
npm run addEvents
```

### For Developers

#### Lint

```sh
npm run lint
```

#### Format

```sh
npm run format
```
