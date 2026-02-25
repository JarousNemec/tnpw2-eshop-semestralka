import { createInitialState } from '../src/app/state.js';

/*
 * Pomocná funkce
 */
function assert(condition, message) {
  if (!condition) {
    console.error('❌ TEST FAILED:', message);
  } else {
    console.log('✅', message);
  }
}

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
  } catch (e) {
    console.error(`❌ ${name}:`, e.message);
  }
}

/*
 * Test 1 – počáteční stav
 */
test('Výchozí stav: auth je ANONYMOUS', () => {
  const state = createInitialState();
  assert(state.auth.role === 'ANONYMOUS', 'auth.role === ANONYMOUS');
  assert(state.auth.userId === null, 'auth.userId === null');
});

test('Výchozí stav: ui.status je LOADING', () => {
  const state = createInitialState();
  assert(state.ui.status === 'LOADING', 'ui.status === LOADING');
});

test('Výchozí stav: ui.view je HOME', () => {
  const state = createInitialState();
  assert(state.ui.view === 'HOME', 'ui.view === HOME');
});

// TODO: Přidejte testy své části systému
// test('Příklad: výchozí stav', () => { ... });
