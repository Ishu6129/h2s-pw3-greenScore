import { POST } from '../app/api/demo-login/route';
import { createClient } from '../lib/supabase/server';

// Mock the Supabase server client
jest.mock('../lib/supabase/server', () => {
  const mockSingle = jest.fn();
  const mockSelect = jest.fn();
  const mockEq = jest.fn();
  const mockInsert = jest.fn();

  const mockFrom = jest.fn((table: string) => {
    if (table === 'users') {
      return {
        select: mockSelect,
        insert: mockInsert,
      };
    }
    return {};
  });

  // Setup relations
  mockSelect.mockReturnValue({ eq: mockEq });
  mockEq.mockReturnValue({ single: mockSingle });

  return {
    createClient: jest.fn(() => ({
      from: mockFrom,
    })),
    // Export mock helpers for tests to configure
    _mockSingle: mockSingle,
    _mockInsert: mockInsert,
  };
});

describe('Demo Login API Route', () => {
  const { _mockSingle, _mockInsert } = require('../lib/supabase/server') as {
    _mockSingle: jest.Mock;
    _mockInsert: jest.Mock;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns 401 for invalid credentials', async () => {
    const req = new Request('http://localhost/api/demo-login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'wrong@email.com',
        password: 'wrongpassword',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(401);

    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.error).toBe('Invalid credentials');
  });

  test('successfully logs in and creates user if not existing', async () => {
    // User does not exist, return null data
    _mockSingle.mockResolvedValue({ data: null, error: { message: 'Not found' } });
    _mockInsert.mockResolvedValue({ error: null });

    const req = new Request('http://localhost/api/demo-login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'demo@greenscore.com',
        password: 'demo123456',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.message).toBe('Demo login successful');
    expect(body.user.email).toBe('demo@greenscore.com');

    expect(createClient).toHaveBeenCalled();
    expect(_mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'demo@greenscore.com',
        full_name: 'Demo User',
      })
    );
  });

  test('successfully logs in without creating user if already exists', async () => {
    // User already exists
    _mockSingle.mockResolvedValue({
      data: { id: '00000000-0000-0000-0000-000000000001', email: 'demo@greenscore.com' },
      error: null,
    });

    const req = new Request('http://localhost/api/demo-login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'demo@greenscore.com',
        password: 'demo123456',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
    expect(_mockInsert).not.toHaveBeenCalled();
  });

  test('returns 500 on unexpected errors', async () => {
    // Force a JSON parsing failure or similar error by sending invalid JSON body
    const req = new Request('http://localhost/api/demo-login', {
      method: 'POST',
      body: 'invalid-json',
    });

    const res = await POST(req);
    expect(res.status).toBe(500);

    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.error).toBe('Login failed');
  });
});
