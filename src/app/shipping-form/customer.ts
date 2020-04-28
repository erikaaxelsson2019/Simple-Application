export class Customer {

    constructor(
      public firstName = '',
      public lastName = '',
      public email = '',
      public address = '',
      public city?: string,
      public state = '',
      public zip?: string,
      public phone = '',) { }
  }