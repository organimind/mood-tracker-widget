import { parseUrlConfig, updateUrlParams } from '../src/utils/urlConfig';

// Mock window.location and window.history for Node environment
const mockLocation = { pathname: '/', search: '' };
(global as any).window = {
  location: mockLocation,
  history: {
    replaceState: (_data: any, _title: string, url: string) => {
      mockLocation.search = url.includes('?') ? url.substring(url.indexOf('?')) : '';
    },
  },
};

console.log('--- Testing Live Customizer URL Sync ---');

// Test 1: Yellow Theme Preset
updateUrlParams({
  theme: 'yellow',
  bg: '#FBF3DB',
  card: '#FFFFFF',
  text: '#DFAB01',
  accent: '#CB912F',
  style: 'organic',
  layout: 'centered',
});
console.log('Test 1 Yellow Theme URL:', mockLocation.search);
if (mockLocation.search !== '?theme=yellow') {
  console.error('❌ Test 1 failed! Expected ?theme=yellow, got', mockLocation.search);
  process.exit(1);
} else {
  console.log('✅ Test 1 Passed!');
}

// Test 2: Yellow Theme + Zen Style + Wide Layout
updateUrlParams({
  theme: 'yellow',
  bg: '#FBF3DB',
  card: '#FFFFFF',
  text: '#DFAB01',
  accent: '#CB912F',
  style: 'zen',
  layout: 'wide',
});
console.log('Test 2 Yellow + Zen + Wide URL:', mockLocation.search);
if (mockLocation.search !== '?theme=yellow&style=zen&layout=wide') {
  console.error('❌ Test 2 failed! Expected ?theme=yellow&style=zen&layout=wide, got', mockLocation.search);
  process.exit(1);
} else {
  console.log('✅ Test 2 Passed!');
}

// Test 3: Explicit Custom Colors without Theme Preset
updateUrlParams({
  theme: 'default',
  bg: '#FBF3DB',
  card: '#FFFFFF',
  text: '#DFAB01',
  accent: '#FF0000',
  style: 'organic',
  layout: 'centered',
});
console.log('Test 3 Custom Colors URL:', mockLocation.search);
if (mockLocation.search !== '?bg=%23FBF3DB&text=%23DFAB01&accent=%23FF0000') {
  console.error('❌ Test 3 failed! Expected ?bg=%23FBF3DB&text=%23DFAB01&accent=%23FF0000, got', mockLocation.search);
  process.exit(1);
} else {
  console.log('✅ Test 3 Passed!');
}

console.log('\n🎉 ALL LIVE CUSTOMIZER URL SYNC TESTS PASSED!');
