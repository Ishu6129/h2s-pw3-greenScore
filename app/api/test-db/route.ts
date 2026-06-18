/* eslint-disable no-console */
import { NextResponse } from 'next/server';
import {
  testSupabaseConnection,
  testChallengesData,
  testMarketplaceData,
} from '@/lib/test-connection';

export async function GET() {
  try {
    console.log('='.repeat(50));
    console.log('🧪 SUPABASE CONNECTION TEST');
    console.log('='.repeat(50));

    const connectionTest = await testSupabaseConnection();
    const challengesTest = await testChallengesData();
    const marketplaceTest = await testMarketplaceData();

    console.log('\n' + '='.repeat(50));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(50));

    const summary = {
      connection: connectionTest.success ? '✅ Connected' : '❌ Failed',
      existingTables: connectionTest.existingCount || 0,
      totalTables: connectionTest.totalTables || 14,
      challenges: challengesTest.success ? `✅ ${challengesTest.count} found` : '❌ Not accessible',
      marketplace: marketplaceTest.success
        ? `✅ ${marketplaceTest.count} found`
        : '❌ Not accessible',
    };

    console.log(JSON.stringify(summary, null, 2));

    return NextResponse.json({
      success: connectionTest.success,
      timestamp: new Date().toISOString(),
      connection: {
        status: connectionTest.success ? 'connected' : 'failed',
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      },
      database: {
        existingTables: connectionTest.existingTables || [],
        missingTables: connectionTest.missingTables || [],
        totalExpected: connectionTest.totalTables || 14,
        totalExisting: connectionTest.existingCount || 0,
      },
      data: {
        challenges: {
          accessible: challengesTest.success,
          count: challengesTest.count || 0,
          sample: challengesTest.data?.[0] || null,
        },
        marketplace: {
          accessible: marketplaceTest.success,
          count: marketplaceTest.count || 0,
          sample: marketplaceTest.data?.[0] || null,
        },
      },
      recommendations: connectionTest.missingTables?.length
        ? [
            'Some tables are missing. Please run the database migrations:',
            '1. Go to Supabase SQL Editor',
            '2. Run migrations in order: 001, 002, 003, 004',
            '3. Optionally run seed.sql for sample data',
          ]
        : [
            '✅ All tables exist!',
            'Your database is fully set up and ready to use.',
            'You can now implement authentication and connect real data.',
          ],
    });
  } catch (error) {
    console.error('❌ Test failed with error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Made with Bob
