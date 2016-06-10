

export const {{methodName}} = new ValidatedMethod({
  name: '{{methodName}}.method',
  validate: new SimpleSchema({
    /*argument: { type: String },*/
  }).validator(),
  run({ /*arg*/ }) {
    // your code here
  }
});