// import { PrismaClient } from '@prisma/client';
// import type { NextApiRequest, NextApiResponse } from 'next';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     // Handle non-POST requests immediately
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//     return;
//   }

//   // Ensure there is a body and it has the correct format
//   if (!req.body || !Array.isArray(req.body.orderedIds)) {
//     res.status(400).json({ error: "Invalid input format, expected an array of ordered IDs" });
//     return;
//   }

//   const { orderedIds }: { orderedIds: number[] } = req.body as { orderedIds: number[] };

//   try {
//     // A transaction to update the sortOrder based on the array index
//     await prisma.$transaction(
//       orderedIds.map((id, index) => prisma.faq.update({
//         where: { id },
//         data: { sortOrder: index + 1 }
//       }))
//     );

//     // Success response
//     res.status(200).json({ message: 'Order updated successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to update order" });
//   }
// }
