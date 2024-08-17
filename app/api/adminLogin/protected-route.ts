// import { NextRequest, NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

// export async function GET(req: NextRequest) {
//   const authorization = req.headers.get('authorization');

//   if (!authorization) {
//     return NextResponse.json({ error: 'No token provided' }, { status: 401 });
//   }

//   const token = authorization.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
//     return NextResponse.json({ message: 'Protected content', user: decoded });
//   } catch (err) {
//     return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
//   }
// }
