// Quick Chat Functionality Test Script
// Run this in browser console after logging in

console.log('🧪 Testing Chat Button Functionality...');

function testChatButtons() {
  console.log('\n📋 Testing Chat Interface Buttons:');
  
  // Test mode toggle buttons
  const channelBtn = document.querySelector('.toggle-btn[title="Channels"]');
  const usersBtn = document.querySelector('.toggle-btn[title="Users"]');
  
  if (channelBtn && usersBtn) {
    console.log('✅ Mode toggle buttons found');
    
    // Test click functionality
    try {
      channelBtn.click();
      console.log('✅ Channel button clickable');
      
      setTimeout(() => {
        usersBtn.click();
        console.log('✅ Users button clickable');
      }, 500);
      
    } catch (error) {
      console.log('❌ Error clicking toggle buttons:', error);
    }
  } else {
    console.log('❌ Mode toggle buttons not found');
  }
  
  // Test action buttons
  const searchBtn = document.querySelector('.search-btn');
  const createBtn = document.querySelector('.create-btn');
  
  if (searchBtn) {
    console.log('✅ Search button found');
    try {
      searchBtn.click();
      console.log('✅ Search button clickable');
    } catch (error) {
      console.log('❌ Error clicking search button:', error);
    }
  } else {
    console.log('❌ Search button not found');
  }
  
  if (createBtn) {
    console.log('✅ Create button found');
    try {
      createBtn.click();
      console.log('✅ Create button clickable');
    } catch (error) {
      console.log('❌ Error clicking create button:', error);
    }
  } else {
    console.log('❌ Create button not found');
  }
  
  // Test conversation items
  const conversationItems = document.querySelectorAll('.conversation-item');
  console.log(`📊 Found ${conversationItems.length} conversation items`);
  
  if (conversationItems.length > 0) {
    try {
      conversationItems[0].click();
      console.log('✅ Conversation item clickable');
    } catch (error) {
      console.log('❌ Error clicking conversation item:', error);
    }
  }
}

// Test Angular component state
function testAngularState() {
  console.log('\n🅰️ Testing Angular Component State:');
  
  try {
    const dashboardElement = document.querySelector('app-dashboard');
    if (dashboardElement && window.ng) {
      const component = window.ng.getComponent(dashboardElement);
      if (component && component.dashService) {
        console.log('✅ DashService accessible');
        console.log('   - Channel mode:', component.dashService.channel);
        console.log('   - Find mode:', component.dashService.find);
        console.log('   - Create mode:', component.dashService.create);
        
        // Test state changes
        component.dashService.find = !component.dashService.find;
        console.log('✅ State change test successful');
        
        return true;
      }
    }
    console.log('⚠️ Angular debugging not available');
    return false;
  } catch (error) {
    console.log('❌ Error testing Angular state:', error);
    return false;
  }
}

// Run tests
setTimeout(() => {
  testChatButtons();
  testAngularState();
  
  console.log('\n🎯 Test completed! Check the interface to see if buttons respond.');
}, 1000);

// Make available globally
window.testChatFunctionality = testChatButtons;
