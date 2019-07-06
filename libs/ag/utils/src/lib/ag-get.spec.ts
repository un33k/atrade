import { tryGet } from './ag-get';

interface D {
  name: string;
}
interface C {
  name: string;
  d: D;
}
interface B {
  name: string;
  c?: C;
}
interface A {
  name: string;
  b: B;
}

const fullData: A = {
  name: 'A',
  b: {
    name: 'B',
    c: {
      name: 'C',
      d: {
        name: 'D'
      }
    }
  }
};

const partialData: A = {
  name: 'A',
  b: {
    name: 'B'
  }
};

describe('Agnostic Utils - tryGet', function() {
  it('should return an existing prop', function() {
    const name = tryGet(() => fullData.b.c.d.name);
    expect(name).toBe('D');
  });

  it('should return null for a non-existing prop', function() {
    const name = tryGet(() => partialData.b.c.d.name);
    expect(name).toBe(null);
  });

  it('should return a specified default value for a non-existing prop ', function() {
    const defaultName = 'MyDefaultName';
    const name = tryGet(() => partialData.b.c.d.name, defaultName);
    expect(name).toBe(defaultName);
  });
});
