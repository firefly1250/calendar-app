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

Run the following command to authenticate and obtain the access token and refresh token:

```sh
npm run auth
```

## Add Events

Submit the following prompt to ChatGPT and paste the output into `events.json`:

```
以下の日程を下に示す 出力形式 (json)に変換してください。

### 条件

- start は 記載された時間
- end は start の3時間後
- 年は 2025年

### 日程

・1/1 1:00

### 出力形式 (json)

[
  {
    "summary": "🏀Fortuna小杉",
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
