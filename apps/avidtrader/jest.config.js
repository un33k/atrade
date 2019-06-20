module.exports = {
  name: 'avidtrader',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/avidtrader',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
