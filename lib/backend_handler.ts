import { Credentials } from '@/types/user/types.server';
import { NextApiRequest } from 'next';
import { NextRequest } from 'next/server';
import { ReadableStream } from 'node:stream/web';

interface CustomHeaders extends Headers {
  get(name: 'uid'): string | null;
  get(name: string): string | null;
}

// interface CustomBody<T> extends ReadableStream<Uint8Array> {
//   [param: string]: any
// }

export interface AuthenticatedRequest extends NextRequest {
  headers: CustomHeaders;
}
