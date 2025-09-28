import { NextRequest, NextResponse } from 'next/server';
import { handleChatCompletion } from './chat-handler';

export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json();

    const result = await handleChatCompletion(body);

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status || 500 },
      );
    }

    return NextResponse.json(result.data);
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
