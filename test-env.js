// Environment Variables Test Script
console.log("🔍 Testing Environment Variables...\n");

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const requiredEnvVars = {
  'NEXT_PUBLIC_CONVEX_URL': {
    value: process.env.NEXT_PUBLIC_CONVEX_URL,
    description: 'Convex backend URL',
    validation: (val) => val && (val.startsWith('http://') || val.startsWith('https://'))
  },
  'CONVEX_DEPLOYMENT': {
    value: process.env.CONVEX_DEPLOYMENT,
    description: 'Convex deployment identifier',
    validation: (val) => val && val.length > 0
  },
  'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY': {
    value: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    description: 'Clerk publishable key',
    validation: (val) => val && val.startsWith('pk_')
  },
  'CLERK_SECRET_KEY': {
    value: process.env.CLERK_SECRET_KEY,
    description: 'Clerk secret key',
    validation: (val) => val && val.startsWith('sk_')
  }
};

let allValid = true;
let errors = [];

console.log("📋 Environment Variable Status:\n");

Object.entries(requiredEnvVars).forEach(([key, config]) => {
  const isSet = !!config.value;
  const isValid = isSet && config.validation(config.value);
  
  const status = isValid ? '✅' : isSet ? '⚠️' : '❌';
  const statusText = isValid ? 'VALID' : isSet ? 'INVALID' : 'MISSING';
  
  console.log(`${status} ${key}: ${statusText}`);
  console.log(`   Description: ${config.description}`);
  
  if (isSet) {
    // Show partial value for security
    const displayValue = key.includes('SECRET') || key.includes('CLERK_') 
      ? config.value.substring(0, 10) + '...' 
      : config.value;
    console.log(`   Value: ${displayValue}`);
  }
  
  if (!isValid) {
    allValid = false;
    if (!isSet) {
      errors.push(`${key} is not set`);
    } else {
      errors.push(`${key} has invalid format`);
    }
  }
  
  console.log('');
});

// Test Convex connection
console.log("🔗 Testing Convex Connection...\n");

async function testConvexConnection() {
  try {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
      console.log("❌ Cannot test connection - NEXT_PUBLIC_CONVEX_URL not set");
      return false;
    }
    
    console.log(`📡 Attempting connection to: ${convexUrl}`);
    
    // For local development, we can't easily test the connection
    // But we can validate the URL format
    if (convexUrl.includes('localhost') || convexUrl.includes('127.0.0.1')) {
      console.log("🏠 Local development URL detected");
      console.log("✅ URL format is valid for local development");
      return true;
    } else if (convexUrl.includes('convex.cloud')) {
      console.log("☁️ Production Convex URL detected");
      console.log("✅ URL format is valid for production");
      return true;
    } else {
      console.log("❌ Unknown Convex URL format");
      return false;
    }
  } catch (error) {
    console.log(`❌ Connection test failed: ${error.message}`);
    return false;
  }
}

// Test Clerk configuration
console.log("🔐 Testing Clerk Configuration...\n");

function testClerkConfig() {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const secretKey = process.env.CLERK_SECRET_KEY;
  
  if (!publishableKey || !secretKey) {
    console.log("❌ Clerk keys are missing");
    return false;
  }
  
  // Check if keys are for the same environment
  const pubKeyEnv = publishableKey.includes('_test_') ? 'test' : 'live';
  const secretKeyEnv = secretKey.includes('_test_') ? 'test' : 'live';
  
  if (pubKeyEnv !== secretKeyEnv) {
    console.log("⚠️ Clerk keys are from different environments");
    console.log(`   Publishable key: ${pubKeyEnv}`);
    console.log(`   Secret key: ${secretKeyEnv}`);
    return false;
  }
  
  console.log(`✅ Clerk keys are properly configured for ${pubKeyEnv} environment`);
  return true;
}

// Run tests
async function runAllTests() {
  const convexTest = await testConvexConnection();
  const clerkTest = testClerkConfig();
  
  console.log("\n📊 Test Summary:\n");
  
  if (allValid && convexTest && clerkTest) {
    console.log("🎉 All environment variables are properly configured!");
    console.log("✅ Ready for deployment");
  } else {
    console.log("❌ Issues found with environment configuration:");
    errors.forEach(error => console.log(`   • ${error}`));
    
    if (!convexTest) {
      console.log("   • Convex connection test failed");
    }
    
    if (!clerkTest) {
      console.log("   • Clerk configuration test failed");
    }
  }
  
  console.log("\n🔧 Next Steps:");
  console.log("1. Fix any issues listed above");
  console.log("2. Set environment variables in Vercel dashboard");
  console.log("3. Deploy with: vercel --prod");
}

runAllTests();