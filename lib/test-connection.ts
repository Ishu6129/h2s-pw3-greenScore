import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function testSupabaseConnection() {
  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log('🔍 Testing Supabase Connection...');
  console.log('URL:', supabaseUrl);
  console.log('Key:', supabaseKey ? '✅ Present' : '❌ Missing');

  try {
    // Test 1: Check if we can connect
    const { error: healthError } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (healthError) {
      console.error('❌ Connection Error:', healthError.message);
      return {
        success: false,
        error: healthError.message,
        tables: [],
      };
    }

    console.log('✅ Connection successful!');

    // Test 2: Check which tables exist
    const tables = [
      'users',
      'activities',
      'challenges',
      'user_challenges',
      'marketplace_items',
      'user_inventory',
      'ai_recommendations',
      'leaderboard_cache',
      'friendships',
      'admin_broadcasts',
      'user_notifications',
      'daily_ai_suggestions',
      'user_activity_logs',
      'system_settings',
    ];

    const tableStatus = await Promise.all(
      tables.map(async (table) => {
        try {
          const { error } = await supabase.from(table).select('count').limit(1);
          return {
            table,
            exists: !error,
            error: error?.message,
          };
        } catch (e) {
          return {
            table,
            exists: false,
            error: 'Unknown error',
          };
        }
      })
    );

    console.log('\n📊 Table Status:');
    tableStatus.forEach(({ table, exists, error }) => {
      if (exists) {
        console.log(`✅ ${table}`);
      } else {
        console.log(`❌ ${table} - ${error}`);
      }
    });

    const existingTables = tableStatus.filter((t) => t.exists).map((t) => t.table);
    const missingTables = tableStatus.filter((t) => !t.exists).map((t) => t.table);

    return {
      success: true,
      existingTables,
      missingTables,
      totalTables: tables.length,
      existingCount: existingTables.length,
    };
  } catch (error) {
    console.error('❌ Unexpected Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      tables: [],
    };
  }
}

// Test challenges data
export async function testChallengesData() {
  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log('\n🎯 Testing Challenges Data...');

  try {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .limit(5);

    if (error) {
      console.error('❌ Error fetching challenges:', error.message);
      return { success: false, error: error.message };
    }

    console.log(`✅ Found ${data?.length || 0} challenges`);
    if (data && data.length > 0) {
      console.log('Sample challenge:', data[0].title);
    }

    return { success: true, count: data?.length || 0, data };
  } catch (error) {
    console.error('❌ Unexpected Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Test marketplace items
export async function testMarketplaceData() {
  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log('\n🛍️ Testing Marketplace Data...');

  try {
    const { data, error } = await supabase
      .from('marketplace_items')
      .select('*')
      .limit(5);

    if (error) {
      console.error('❌ Error fetching marketplace items:', error.message);
      return { success: false, error: error.message };
    }

    console.log(`✅ Found ${data?.length || 0} marketplace items`);
    if (data && data.length > 0) {
      console.log('Sample item:', data[0].name);
    }

    return { success: true, count: data?.length || 0, data };
  } catch (error) {
    console.error('❌ Unexpected Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Made with Bob
