// Production Environment Variables Test Script
console.log("🔍 Testing Production Environment Variables...\n");

// Load production environment variables
require('dotenv').config({ path: '.env.production' });

const prodEnvVars = {
  'NEXT_PUBLIC_CONVEX_URL': {
    value: process.env.NEXT_PUBLIC_CONVEX_URL,
    expected: 'https://accomplished-okapi-366.convex.cloud',
    description: 'Production Convex backend URL'
  },
  'CONVEX_DEPLOYMENT': {
    value: process.env.CONVEX_DEPLOYMENT,
    expected: 'accomplished-okapi-366',
    description: 'Production Convex deployment identifier'
  },
  'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY': {
    value: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    expected: 'pk_test_c3VwZXItYmVhci00OC5jbGVyay5hY2NvdW50cy5kZXYk',
    description: 'Clerk publishable key'
  },
  'CLERK_SECRET_KEY': {
    value: process.env.CLERK_SECRET_KEY,
    expected: 'sk_test_5acCMN264cOPyR2SWnuqY0HmoK41jYG4MQGVYJjlY0',
    description: 'Clerk secret key'
  }
};

console.log("📋 Production Environment Variable Status:\n");

let allValid = true;
let errors = [];

Object.entries(prodEnvVars).forEach(([key, config]) => {
  const isSet = !!config.value;
  const isCorrect = config.value === config.expected;
  
  const status = isCorrect ? '✅' : isSet ? '⚠️' : '❌';
  const statusText = isCorrect ? 'CORRECT' : isSet ? 'MISMATCH' : 'MISSING';
  
  console.log(`${status} ${key}: ${statusText}`);
  console.log(`   Description: ${config.description}`);
  
  if (isSet) {
    // Show partial value for security
    const displayValue = key.includes('SECRET') || key.includes('CLERK_') 
      ? config.value.substring(0, 15) + '...' 
      : config.value;
    console.log(`   Current: ${displayValue}`);
    
    if (!isCorrect) {
      const expectedDisplay = key.includes('SECRET') || key.includes('CLERK_') 
        ? config.expected.substring(0, 15) + '...' 
        : config.expected;
      console.log(`   Expected: ${expectedDisplay}`);
    }
  }
  
  if (!isCorrect) {
    allValid = false;
    if (!isSet) {
      errors.push(`${key} is not set`);
    } else {
      errors.push(`${key} value doesn't match expected production value`);
    }
  }
  
  console.log('');
});

// Validate production URLs
console.log("🌐 Validating Production URLs...\n");

function validateProductionUrls() {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  
  if (!convexUrl) {
    console.log("❌ NEXT_PUBLIC_CONVEX_URL not set");
    return false;
  }
  
  if (!convexUrl.startsWith('https://')) {
    console.log("❌ Production Convex URL must use HTTPS");
    return false;
  }
  
  if (!convexUrl.includes('convex.cloud')) {
    console.log("❌ Production Convex URL must be from convex.cloud domain");
    return false;
  }
  
  console.log("✅ Production Convex URL is valid");
  return true;
}

// Check deployment consistency
console.log("🔄 Checking Deployment Consistency...\n");

function checkDeploymentConsistency() {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  const deployment = process.env.CONVEX_DEPLOYMENT;
  
  if (!convexUrl || !deployment) {
    console.log("❌ Missing Convex configuration");
    return false;
  }
  
  // Extract deployment name from URL
  const urlMatch = convexUrl.match(/https:\/\/([^.]+)\.convex\.cloud/);
  if (!urlMatch) {
    console.log("❌ Cannot extract deployment name from URL");
    return false;
  }
  
  const urlDeployment = urlMatch[1];
  
  if (urlDeployment !== deployment) {
    console.log(`❌ Deployment mismatch:`);
    console.log(`   URL deployment: ${urlDeployment}`);
    console.log(`   CONVEX_DEPLOYMENT: ${deployment}`);
    return false;
  }
  
  console.log(`✅ Deployment consistency verified: ${deployment}`);
  return true;
}

// Run production tests
async function runProductionTests() {
  const urlTest = validateProductionUrls();
  const consistencyTest = checkDeploymentConsistency();
  
  console.log("\n📊 Production Test Summary:\n");
  
  if (allValid && urlTest && consistencyTest) {
    console.log("🎉 All production environment variables are properly configured!");
    console.log("✅ Ready for Vercel deployment");
    
    console.log("\n🚀 Vercel Environment Variables to Set:");
    console.log("Run these commands to set Vercel environment variables:");
    console.log("");
    
    Object.entries(prodEnvVars).forEach(([key, config]) => {
      const value = key.includes('SECRET') || key.includes('CLERK_') 
        ? '[REDACTED - Use actual value]' 
        : config.expected;
      console.log(`vercel env add ${key} production`);
      console.log(`# Value: ${value}`);
      console.log("");
    });
    
  } else {
    console.log("❌ Issues found with production environment configuration:");
    errors.forEach(error => console.log(`   • ${error}`));
    
    if (!urlTest) {
      console.log("   • Production URL validation failed");
    }
    
    if (!consistencyTest) {
      console.log("   • Deployment consistency check failed");
    }
  }
}

runProductionTests();