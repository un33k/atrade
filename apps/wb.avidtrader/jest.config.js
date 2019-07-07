module.exports = {
  name: 'wb.avidtrader',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/wb.avidtrader',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
