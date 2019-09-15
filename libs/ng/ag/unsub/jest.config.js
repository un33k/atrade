module.exports = {
  name: 'ngag-unsub',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/ng/ag/unsub',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
