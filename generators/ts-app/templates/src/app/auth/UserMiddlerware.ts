export function UserMiddlerware(schema, options): void {
  // tslint:disable-next-line:only-arrow-functions
  schema.pre('validate', (next) => {
    console.log(this);
    next();
  });

  // tslint:disable-next-line:only-arrow-functions
  schema.pre('save', (next) => {
    console.log(this);
    next();
  });
}
