import { RtcTokenBuilder, RtcRole } from 'agora-access-token';

const appID = process.env.AGORA_APP_ID;
const appCertificate = process.env.AGORA_CERTIFY;

// token expire time, hardcode to 3600 seconds = 1 hour
const expirationTimeInSeconds = process.env.AGORA_VOICE_EXPIRE_TIME
    ? parseInt(process.env.AGORA_VOICE_EXPIRE_TIME)
    : 60;
const role = RtcRole.PUBLISHER;

export const generateRtcToken = (req, res) => {
    if (!appID || !appCertificate) {
        return;
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
    const channelName: string = req.query.channelName;
    // use 0 if uid is not specified
    const uid = req.query.uid || 0;

    if (!channelName) {
        return res.status(400).json({ error: 'error' }).send();
    }

    const key = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);

    res.header('Access-Control-Allow-Origin', '*');
    //res.header("Access-Control-Allow-Origin", "http://ip:port")
    return res.json({ key: key }).send();
};
