// import { NextResponse, NextRequest } from "next/server";
// import withAuth  from '@/lib/withAuth'
// export async function GET(req: Request) {
  
//   const res = [{
//     id: 1,
//     name: "Sample PDF 1",
//     description: "This is a sample PDF file for testing purposes.",
//     path: "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf"
//   },{
//     id: 2,
//     name: "Sample PDF 2",
//     description: "This is a sample PDF file for testing purposes.",
//     path: "https://css4.pub/2015/icelandic/dictionary.pdf"
//   },
//   {
//     id: 3,
//     name: "Sample PDF 3",
//     description: "This is a sample PDF file for testing purposes.",
//     path: "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf"
//   }]
//   return NextResponse.json(res);
// }

// export default withAuth(GET, 'read', 'OrientaionFiles');


import { NextResponse, NextRequest } from "next/server";
import withAuth from '@/lib/withAuth';

async function handler(req: Request) {
  const res = [{
    id: 1,
    name: "Sample PDF 1",
    description: "This is a sample PDF file for testing purposes.",
    path: "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf"
  },{
    id: 2,
    name: "Sample PDF 2",
    description: "This is a sample PDF file for testing purposes.",
    path: "https://css4.pub/2015/icelandic/dictionary.pdf"
  },
  {
    id: 3,
    name: "Sample PDF 3",
    description: "This is a sample PDF file for testing purposes.",
    path: "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf"
  }];
  return NextResponse.json(res);
}

export const GET = withAuth(handler, 'read', 'OrientationFiles');
