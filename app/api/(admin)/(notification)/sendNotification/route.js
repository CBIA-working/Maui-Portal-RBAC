import { PrismaClient } from '@prisma/client';
import admin from 'firebase-admin'
import serviceAccount from '../../../../serviceAccountFile.json';

const prisma = new PrismaClient();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const getDeviceTokensForUsers = async (emails) => {
  try {
    const users = await prisma.user.findMany({
      where: { email: { in: emails } },
      select: { deviceToken: true }
    });
    return users.map(user => user.deviceToken.toString('utf-8'));
  } catch (error) {
    console.error('Error retrieving device tokens:', error);
    throw new Error('Database query failed');
  }
};

export async function POST(request) {
  try {
    const { emails, title, body, action1, action2 } = await request.json();

    if (!Array.isArray(emails) || emails.length === 0) {
      return new Response(JSON.stringify({ error: 'emails must be a non-empty array' }), { status: 400 });
    }

    const deviceTokens = await getDeviceTokensForUsers(emails);

    if (deviceTokens.length === 0) {
      return new Response(JSON.stringify({ error: 'No device tokens found for the provided emails' }), { status: 400 });
    }

    const message = {
      data: {
        title: title || 'Default Title',
        body: body || 'Default Body',
        action1: action1 || 'Accept',
        action2: action2 || 'Decline'
      },
      tokens: deviceTokens
    };
    
    const response = await admin.messaging().sendMulticast(message);
    
    // Store message IDs in NotificationLog
    await Promise.all(response.responses.map((resp, idx) => {
      if (resp.success) {
        return prisma.notificationLog.create({
          data: {
            email: emails[idx],
            deviceToken: deviceTokens[idx],
            messageId: resp.messageId,
            acknowledged: false // Default to false until the notification is acknowledged
          }
        });
      }
    }));

    return new Response(JSON.stringify({
      message: 'Notifications sent',
      responses: response.responses
    }), { status: 200 });

  } catch (error) {
    console.error('Error sending notifications:', error);
    return new Response(JSON.stringify({ error: 'Error sending notifications: ' + error.message }), { status: 500 });
  }
}
