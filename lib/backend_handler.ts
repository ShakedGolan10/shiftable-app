import { TableShifts } from '@/types/user/types.server';
import { NextRequest } from 'next/server';

interface CustomHeaders extends Headers {
  get(name: 'uid'): string | null;
  get(name: string): string | null;
}

export interface AuthenticatedRequest extends NextRequest {
  headers: CustomHeaders;
  json: () => Promise<any>
}

export interface ApplyShiftsRequest extends AuthenticatedRequest {
  json: () => Promise<{appliedShifts: TableShifts, forDate: Date}>
}
