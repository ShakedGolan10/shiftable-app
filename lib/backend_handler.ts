import { NextRequest } from 'next/server';

interface CustomHeaders extends Headers {
  get(name: 'uid'): string | null;
  get(name: string): string | null;
}

export interface AuthenticatedRequest extends NextRequest {
  headers: CustomHeaders;
}
