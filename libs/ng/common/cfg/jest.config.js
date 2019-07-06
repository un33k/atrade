module.exports = {
  name: 'ngagx-cfg',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/ng/common/cfg',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
