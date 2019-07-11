module.exports = {
  name: 'ngag-cfg',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/ng/ag/cfg',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
