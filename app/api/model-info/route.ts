import { NextResponse } from 'next/server';
import { getModelInfo } from './model-info-handler';

// Disable caching for this API route
export const dynamic = 'force-dynamic';

export async function GET() {
  const result = getModelInfo();

  if (result.error) {
    return NextResponse.json(
      { error: result.error },
      { status: result.status || 500 },
    );
  }

  return NextResponse.json(result.data);
}
