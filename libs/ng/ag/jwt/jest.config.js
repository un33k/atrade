module.exports = {
  name: 'ngag-jwt',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/ng/ag/jwt',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
