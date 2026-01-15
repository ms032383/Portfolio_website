
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("Checking credentials:");
console.log("URL:", url ? "Found" : "Missing");
console.log("KEY:", key ? "Found" : "Missing");

if (!url || !key) {
    console.error("❌ Credentials missing. Check .env.local");
    process.exit(1);
}

const supabase = createClient(url, key);

async function testConnection() {
    console.log("\nTesting connection to 'projects' table...");
    const { data, error } = await supabase.from('projects').select('*').limit(1);

    if (error) {
        console.error("❌ Connection Failed or Table Missing.");
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        if (error.code === '42P01') { // undefined_table
            console.log("\n💡 DIAGNOSIS: The 'projects' table does not exist.");
            console.log("👉 ACTION REQUIRED: Run the schema.sql in your Supabase Dashboard.");
        }
    } else {
        console.log("✅ Connection Successful!");
        console.log("Data found:", data.length, "rows");
        console.log("\nIf the app is still failing, check the browser console for CORS or network errors.");
    }
}

testConnection();
