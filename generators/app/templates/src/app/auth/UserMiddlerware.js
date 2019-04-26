export function UserMiddlerware (schema, options) {
  schema.pre('validate', function (next) {
    // console.log(this);
    next();
  });

  schema.pre('save', function (next) {
    // console.log(this);
    next();
  });
}
