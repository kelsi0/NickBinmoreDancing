const { google } = require('googleapis');
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const CREDENTIALS_PATH = path.join(__dirname, '..', 'oauth-credentials.json');

async function getRefreshToken() {
    // Read OAuth credentials
    if (!fs.existsSync(CREDENTIALS_PATH)) {
        console.error('❌ oauth-credentials.json not found!');
        console.log('\nPlease:');
        console.log('1. Go to https://console.cloud.google.com/apis/credentials');
        console.log('2. Create OAuth client ID (Desktop app)');
        console.log('3. Download the JSON and save as oauth-credentials.json in project root');
        process.exit(1);
    }

    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'));
    const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;

    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris ? redirect_uris[0] : 'http://localhost'
    );

    // Generate auth URL
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent',
    });

    console.log('\n🔐 Authorize this app by visiting this URL:\n');
    console.log(authUrl);
    console.log('\n');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question('📋 Paste the code from that page here: ', async (code) => {
        rl.close();

        try {
            const { tokens } = await oAuth2Client.getToken(code);

            console.log('\n✅ Success! Add these to your .env.local file:\n');
            console.log('# Replace the GOOGLE_SERVICE_ACCOUNT_* variables with these:');
            console.log(`GOOGLE_OAUTH_CLIENT_ID=${client_id}`);
            console.log(`GOOGLE_OAUTH_CLIENT_SECRET=${client_secret}`);
            console.log(`GOOGLE_OAUTH_REFRESH_TOKEN=${tokens.refresh_token}`);
            console.log(`# Keep your existing GOOGLE_DRIVE_PARQS_FOLDER_ID\n`);

        } catch (error) {
            console.error('❌ Error getting tokens:', error.message);
            process.exit(1);
        }
    });
}

getRefreshToken().catch(console.error);
