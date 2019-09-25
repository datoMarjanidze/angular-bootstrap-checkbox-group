class AttributeTypeError extends Error {
  constructor(args: any) {
    super(args);
    this.name = 'CheckboxGroupAttributeTypeError';
  }
}

export { AttributeTypeError };
