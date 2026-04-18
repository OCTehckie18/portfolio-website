// Heavy/Fun command builders - lazy loaded to reduce initial bundle

export function buildMatrix() {
  return [
    { text: '  Entering the Matrix...', cls: 'green' },
    { text: '  There is no spoon. Only good code.', cls: 'dim' },
  ];
}

export function buildCoffee() {
  return [
    { text: 'Fuel Status', cls: 'heading' },
    { text: '' },
    { text: '  >> Coffee: CRITICAL -- reserves below 20%', cls: 'red' },
    { text: '  >> Focus: OPTIMAL -- 4h deep work streak', cls: 'green' },
    { text: '  >> Music: lo-fi hip hop -- beats to code to', cls: 'cyan' },
    { text: '' },
    { text: '  Warning: Do not approach before first coffee.', cls: 'yellow' },
  ];
}
