import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  const { messageId, acknowledged } = await request.json();

  if (!messageId) {
    return new Response(JSON.stringify({ error: 'messageId is required' }), { status: 400 });
  }

  try {
    // Update the acknowledgment status in NotificationLog
    const result = await prisma.notificationLog.update({
      where: { messageId: messageId },
      data: { acknowledged: acknowledged }
    });

    if (result) {
      return new Response(JSON.stringify({ message: 'Acknowledgment updated successfully' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Notification not found' }), { status: 404 });
    }
  } catch (error) {
    console.error('Error updating acknowledgment status:', error);
    return new Response(JSON.stringify({ error: 'Error updating acknowledgment status: ' + error.message }), { status: 500 });
  }
}
