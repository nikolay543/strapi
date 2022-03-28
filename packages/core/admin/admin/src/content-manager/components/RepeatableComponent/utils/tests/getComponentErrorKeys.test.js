import getComponentErrorKeys from '../getComponentErrorKeys';

describe('getComponentErrorKeys', () => {
  test('retrieves error keys for non nested components', () => {
    const FIXTURE = {
      'repeat.0.name': 'unique-error',
    };

    expect(getComponentErrorKeys('component-name', FIXTURE, false)).toBe({});
  });

  test('retrieves error keys for nested components', () => {
    const FIXTURE = {
      'component.name.0.name': 'unique-error',
    };

    expect(getComponentErrorKeys('name', FIXTURE, true)).toBe({});
  });
});
