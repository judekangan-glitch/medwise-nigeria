// Vercel Serverless Function: api/send-sms.js
// Securely sends medication reminders via Twilio SMS

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { medication, time } = req.body;

  // Validate input
  if (!medication || !time) {
    return res.status(400).json({ error: 'Missing medication or time' });
  }

  // Load Twilio credentials from environment variables
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;
  const toNumber = process.env.TWILIO_VERIFIED_TO_NUMBER;

  // Safeguard: Ensure we have all necessary configuration
  if (!accountSid || !authToken || !fromNumber || !toNumber) {
    console.error('Twilio configuration is missing in environment variables');
    return res.status(500).json({ error: 'Messaging service is misconfigured' });
  }

  // Twilio API details
  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

  // Prepare the SMS body
  // We hardcode the To number to the verified demo number for safety
  const smsBody = new URLSearchParams({
    From: fromNumber,
    To: toNumber,
    Body: `MedWise Nigeria Reminder 💊: It's time for your ${medication} (${time}). Please stay healthy!`
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: smsBody.toString()
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Twilio API Error:', data);
      throw new Error(data.message || 'Failed to send SMS');
    }

    console.log(`SMS sent successfully to ${toNumber}. SID: ${data.sid}`);
    return res.status(200).json({ success: true, sid: data.sid });
  } catch (error) {
    console.error('SMS Send Error:', error.message);
    return res.status(500).json({ error: 'Failed to send medication reminder' });
  }
}
