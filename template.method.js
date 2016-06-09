

export const {{apiName}}Method = new ValidatedMethod({
  name: '{{apiName}}.method',
  validate: new SimpleSchema({
    /*argument: { type: String },*/
  }).validator(),
  run({ /*arg*/ }) {
    // your code here
  }
});