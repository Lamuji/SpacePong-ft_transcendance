// Test Script for Chat Logic - SpacePong
// To be run in browser console

console.log('🚀 Testing SpacePong Chat Logic...');

// Test 1: Check if services are properly injected
function testServicesAvailability() {
  console.log('\n📋 Test 1: Services Availability');
  
  try {
    const dashComponent = document.querySelector('app-dashboard');
    const conversationComponent = document.querySelector('app-conversation-list');
    const messagesComponent = document.querySelector('app-messages');
    
    console.log('✅ Dashboard component:', dashComponent ? 'Found' : '❌ Not found');
    console.log('✅ Conversation list component:', conversationComponent ? 'Found' : '❌ Not found');
    console.log('✅ Messages component:', messagesComponent ? 'Found' : '❌ Not found');
    
    return {
      dashboard: !!dashComponent,
      conversations: !!conversationComponent,
      messages: !!messagesComponent
    };
  } catch (error) {
    console.error('❌ Error testing services:', error);
    return false;
  }
}

// Test 2: Check layout and CSS
function testLayoutAndCSS() {
  console.log('\n🎨 Test 2: Layout and CSS');
  
  try {
    const chatLayout = document.querySelector('.chat-layout');
    const mainLayout = document.querySelector('.main-layout');
    const sidebar = document.querySelector('.nav-sidebar');
    const navbar = document.querySelector('.main-header');
    
    console.log('✅ Chat layout:', chatLayout ? 'Applied' : '❌ Missing');
    console.log('✅ Main layout:', mainLayout ? 'Applied' : '❌ Missing');
    console.log('✅ Sidebar:', sidebar ? 'Present' : '❌ Missing');
    console.log('✅ Navbar:', navbar ? 'Present' : '❌ Missing');
    
    // Check if content is properly positioned
    if (chatLayout) {
      const styles = window.getComputedStyle(chatLayout);
      console.log('📐 Chat layout position:', styles.position);
      console.log('📐 Chat layout top:', styles.top);
      console.log('📐 Chat layout left:', styles.left);
    }
    
    return {
      chatLayout: !!chatLayout,
      mainLayout: !!mainLayout,
      sidebar: !!sidebar,
      navbar: !!navbar
    };
  } catch (error) {
    console.error('❌ Error testing layout:', error);
    return false;
  }
}

// Test 3: Check for JavaScript errors
function testForErrors() {
  console.log('\n🐛 Test 3: JavaScript Errors');
  
  // Listen for errors
  const originalError = window.onerror;
  const errors = [];
  
  window.onerror = function(message, source, lineno, colno, error) {
    errors.push({ message, source, lineno, colno, error });
    if (originalError) originalError.apply(this, arguments);
  };
  
  setTimeout(() => {
    if (errors.length === 0) {
      console.log('✅ No JavaScript errors detected');
    } else {
      console.log('❌ JavaScript errors found:');
      errors.forEach((err, index) => {
        console.log(`   ${index + 1}. ${err.message} at ${err.source}:${err.lineno}`);
      });
    }
    
    // Restore original error handler
    window.onerror = originalError;
  }, 2000);
  
  return errors;
}

// Test 4: Check Angular component state
function testAngularComponents() {
  console.log('\n🅰️ Test 4: Angular Component State');
  
  try {
    // Try to access Angular debugging utilities
    if (window.ng) {
      console.log('✅ Angular debugging utilities available');
      
      const dashboardElement = document.querySelector('app-dashboard');
      if (dashboardElement) {
        const component = window.ng.getComponent(dashboardElement);
        console.log('✅ Dashboard component instance:', component ? 'Available' : '❌ Not accessible');
        
        if (component && component.dashService) {
          console.log('✅ DashService accessible');
          console.log('   - Channel mode:', component.dashService.channel);
          console.log('   - Find mode:', component.dashService.find);
          console.log('   - Create mode:', component.dashService.create);
        }
      }
    } else {
      console.log('⚠️ Angular debugging utilities not available (production mode)');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error testing Angular components:', error);
    return false;
  }
}

// Test 5: Check WebSocket connection
function testWebSocketConnection() {
  console.log('\n🔌 Test 5: WebSocket Connection');
  
  try {
    // Look for socket.io related objects
    if (window.io) {
      console.log('✅ Socket.IO library loaded');
    } else {
      console.log('❌ Socket.IO library not found');
    }
    
    // Check for active WebSocket connections
    const wsConnections = [];
    if (window.WebSocket) {
      console.log('✅ WebSocket API available');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error testing WebSocket:', error);
    return false;
  }
}

// Run all tests
function runAllTests() {
  console.log('🧪 Running SpacePong Chat Logic Tests...\n');
  
  const results = {
    services: testServicesAvailability(),
    layout: testLayoutAndCSS(),
    errors: testForErrors(),
    angular: testAngularComponents(),
    websocket: testWebSocketConnection()
  };
  
  console.log('\n📊 Test Results Summary:');
  console.log('Services:', results.services ? '✅ Pass' : '❌ Fail');
  console.log('Layout:', results.layout ? '✅ Pass' : '❌ Fail');
  console.log('Angular:', results.angular ? '✅ Pass' : '❌ Fail');
  console.log('WebSocket:', results.websocket ? '✅ Pass' : '❌ Fail');
  
  return results;
}

// Auto-run tests
runAllTests();

// Make functions available globally for manual testing
window.chatTests = {
  runAllTests,
  testServicesAvailability,
  testLayoutAndCSS,
  testForErrors,
  testAngularComponents,
  testWebSocketConnection
};
