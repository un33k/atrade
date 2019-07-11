module.exports = {
  name: 'ngag-i18n',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/ng/ag/i18n',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
