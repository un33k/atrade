module.exports = {
  name: 'ng-ag-menu',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/ng/ag/menu',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
