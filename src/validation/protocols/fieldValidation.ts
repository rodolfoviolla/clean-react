export interface FieldValidation {
  name: string

  validate: (input: object) => Error
}
