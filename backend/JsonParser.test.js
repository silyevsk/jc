const {JsonParser} = require('./JsonParser');

let mock_fs_readFileSyncMockData;
jest.mock('fs', () => ({
    readFileSync: function () {
      return mock_fs_readFileSyncMockData;
    }
}));

test('string', () => {
  mock_fs_readFileSyncMockData = '"a string"';
  const parser = new JsonParser();
  parser.parse();
  expect(parser.root).toEqual({
    type: 'string',
    value: 'a string',
    hash: '69e288cfb555c6cce67802db415659a063bf3da08e96f6f5bc579b062837dd77'
  });
});

test('number', () => {
  mock_fs_readFileSyncMockData = '28';
  const parser = new JsonParser();
  parser.parse();
  expect(parser.root).toEqual({
    type: 'number',
    value: 28,
    hash: 'b09d5aaa1ff68e59f003aeca719691a457de2b8dcc0569949f3feaafc432c53e'
  });
});

test('boolean', () => {
  mock_fs_readFileSyncMockData = 'true';
  const parser = new JsonParser();
  parser.parse();
  expect(parser.root).toEqual({
    type: 'boolean',
    value: true,
    hash: '49e42d482854b8a6710fed3b82a2dd3278e9a3a3f7f1d87309cced700bb714ee'
  });
});

test('null', () => {
  mock_fs_readFileSyncMockData = 'null';
  const parser = new JsonParser();
  parser.parse();
  expect(parser.root).toEqual({
    type: 'null',
    value: null,
    hash: '0462cd60f698a575a09015e9d9e16d73ea124ce378ec074e000df98f2aaad467'
  });
});

test('array', () => {
  mock_fs_readFileSyncMockData = '[1, "str", true, false, null, {"a": 12}, [2, "4"]]';
  const parser = new JsonParser();
  parser.parse();
  expect(parser.root).toEqual({
    type: 'array',
    hash: '20e521d0e0661c09a30d8d618c3b8b56bd7cad26f94100309d24f997267f724f',
    children: [
      {
        type: 'number',
        value: 1,
        hash: 'c1918af55c87b4f199d5142f8cc665bf4f08e147f6b88bbbe842660e74dbb8c8'
      },
      {
        type: 'string',
        value: 'str',
        hash: 'cd9676fcc5f24b144c98eca6d2fb9aeeeefecedc7b65463755423a71985b3a38'
      },
      {
        type: 'boolean',
        value: true,
        hash: '49e42d482854b8a6710fed3b82a2dd3278e9a3a3f7f1d87309cced700bb714ee'
      },
      {
        type: 'boolean',
        value: false,
        hash: '3809e2ab6bdd72b54c0285dfdcb8869c46909eb7272077a1323eb3f258924283'
      },
      {
        type: 'null',
        value: null,
        hash: '0462cd60f698a575a09015e9d9e16d73ea124ce378ec074e000df98f2aaad467'
      },
      {
        type: 'object',
        hash: '112243c93c1116530305200e826474e26d03dbea11fdbe7f8c786bbfff467eea',
        children: {
          a: {
            type: 'number',
            value: 12,
            hash: 'fcef0ee2bcead433c52995380b54e4d529c46256f59adc4b7dff7d1dadb5aafc'
          }
        }
      },
      {
        type: 'array',
        hash: '8133a9be76d89fd8981b73ec9945b1a44c14291d0ef11dce6c48752248961a0d',
        children: [
          {
            type: 'number',
            value: 2,
            hash: 'ab6e749e180f2c5edd81455b4fe65f46d25db154d15da4675eae7108a7fbe4fb'
          },
          {
            type: 'string',
            value: '4',
            hash: '717eaa709c36441492169223f45f2b18b79f3eaf273e31ea3c27e454cf3ffaa9'
          },

        ]
      },
    ]
  });
});

test('object', () => {
  mock_fs_readFileSyncMockData = '{"a": 1, "b": true, "c": null, "d": {"a": 12}, "e": [2, "4"]}';
  const parser = new JsonParser();
  parser.parse();
  expect(parser.root).toEqual({
    type: 'object',
    hash: '285f269696009ff594d23e249372c792584fcf823653a58a4017cacf1d08e781',
    children: {
      a: {
        type: 'number',
        value: 1,
        hash: 'c1918af55c87b4f199d5142f8cc665bf4f08e147f6b88bbbe842660e74dbb8c8'
      },
      b: {
        type: 'boolean',
        value: true,
        hash: '49e42d482854b8a6710fed3b82a2dd3278e9a3a3f7f1d87309cced700bb714ee'
      },
      c: {
        type: 'null',
        value: null,
        hash: '0462cd60f698a575a09015e9d9e16d73ea124ce378ec074e000df98f2aaad467'
      },
      d: {
        type: 'object',
        hash: '112243c93c1116530305200e826474e26d03dbea11fdbe7f8c786bbfff467eea',
        children: {
          a: {
            type: 'number',
            value: 12,
            hash: 'fcef0ee2bcead433c52995380b54e4d529c46256f59adc4b7dff7d1dadb5aafc'
          }
        }
      },
      e: {
        type: 'array',
        hash: '8133a9be76d89fd8981b73ec9945b1a44c14291d0ef11dce6c48752248961a0d',
        children: [
          {
            type: 'number',
            value: 2,
            hash: 'ab6e749e180f2c5edd81455b4fe65f46d25db154d15da4675eae7108a7fbe4fb'
          },
          {
            type: 'string',
            value: '4',
            hash: '717eaa709c36441492169223f45f2b18b79f3eaf273e31ea3c27e454cf3ffaa9'
          },
        ]
      }
    }
  });
});
