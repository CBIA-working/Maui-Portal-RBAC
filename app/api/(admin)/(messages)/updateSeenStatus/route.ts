import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { messageIds } = await req.json();
        console.log('Received message IDs:', messageIds);

        // Validate messageIds: ensure it's an array and has at least one valid ID
        if (!Array.isArray(messageIds) || messageIds.length === 0) {
            return new NextResponse(JSON.stringify({ error: 'No valid message IDs provided' }), { status: 400 });
        }

        // Log messages that will be targeted for update before executing the query
        const messagesToBeUpdated = await prisma.message.findMany({
            where: {
                id: { in: messageIds },
                sender: 'student',
                seen: false,  // Only select messages where 'seen' is currently false
            },
        });

        console.log('Messages to be updated:', messagesToBeUpdated);

        // Proceed with the update query only if there are messages to update
        if (messagesToBeUpdated.length === 0) {
            return new NextResponse(JSON.stringify({ error: 'No messages to update' }), { status: 404 });
        }

        const result = await prisma.message.updateMany({
            where: {
                id: { in: messageIds },
                sender: 'student',
                seen: false,  // Ensure only messages with seen: false are updated
            },
            data: { seen: true },
        });

        console.log('Update result:', result);

        return new NextResponse(JSON.stringify({ success: true, updatedCount: result.count }), { status: 200 });
    } catch (error) {
        console.error('Failed to update messages:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
