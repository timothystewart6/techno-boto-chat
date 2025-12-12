import { NextRequest, NextResponse } from 'next/server';
import {
  handleChatCompletion,
  handleChatCompletionStream,
  ChatResponse,
} from './chat-handler';

export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json();

    // Check if streaming is requested
    if (body.stream) {
      const result = await handleChatCompletionStream(body);

      // Check if result is an error response
      if (result && typeof result === 'object' && 'error' in result) {
        const errorResult = result as ChatResponse;
        return NextResponse.json(
          { error: errorResult.error },
          { status: errorResult.status || 500 },
        );
      }

      // Return the streaming response
      return new NextResponse(result as ReadableStream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    }

    // Non-streaming response
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
