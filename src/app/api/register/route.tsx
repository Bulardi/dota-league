import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);  // Logs the form data
  return NextResponse.json({ message: 'Success', data });
}