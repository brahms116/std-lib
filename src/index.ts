export interface ToJSON {
  toJSON(): string
}

export interface Collection<T extends {}> {
  collect(): T[];
  get(index: number): RsOption<T>;
}

export class RsResult<T extends {}, E extends {}> {
  private value: T | null | undefined;
  private error: E | null | undefined;

  /** SHOULD NOT CALL CONSTRUCTOR, use Ok or Err instead, if it is unknown,
   * create an RsOption then map it to a RsResult
   */
  constructor(n: { value?: T; err?: E }) {
    if (typeof n.value === "undefined" && typeof n.err === "undefined") {
      throw new Error("Tried to create error with both undefined fields");
    }
    if (typeof n.value !== "undefined" && typeof n.err !== "undefined") {
      throw new Error("Tried to create error with both valid fields");
    }
    if (typeof n.value !== "undefined") {
      this.error = undefined;
      this.value = n.value;
    } else {
      this.error = n.err;
      this.value = undefined;
    }
  }
  private isValid(checkee: T | null | undefined): checkee is T {
    return checkee !== undefined && checkee !== null;
  }

  isOk() {
    return this.isValid(this.value);
  }

  isErr() {
    return !this.isValid(this.value);
  }

  unwrap(): T {
    if (this.isOk()) {
      return this.value!;
    }
    throw new Error("Unwrap called on an error");
  }

  unwrapErr(): E {
    if (this.isErr()) {
      return this.error!;
    }
    throw new Error("Unwrap Error called on a Ok value");
  }

  unwrapOr(alt: T): T {
    if (this.isOk()) {
      return this.value!;
    }
    return alt;
  }

  expect(msg: string): T {
    if (this.isOk()) {
      return this.value!;
    }
    throw new Error(msg);
  }

  expectErr(msg: string): E {
    if (this.isErr()) {
      return this.error!;
    }
    throw new Error(msg);
  }

  ok(): RsOption<T> {
    if (this.isOk()) {
      return Some(this.value!);
    }
    return None();
  }

  err(): RsOption<E> {
    if (this.isErr()) {
      return Some(this.error!);
    }
    return None();
  }

  map<K extends {}>(f: (value: T) => K): RsResult<K, E> {
    if (this.isOk()) {
      return Ok<K>(f(this.value!));
    }
    return Err(this.error!);
  }

  mapErr<K extends {}>(f: (value: E) => K): RsResult<T, K> {
    if (this.isErr()) {
      return Err(f(this.error!));
    }
    return Ok(this.value!);
  }
}

export function Ok<T extends {}>(n: T) {
  return new RsResult<T, any>({ value: n });
}

export function Err<E extends {}>(e: E) {
  return new RsResult<any, E>({ err: e });
}

export class RsOption<T extends {}> {
  private value: T | null | undefined;
  constructor(value?: T | null | undefined) {
    this.value = value;
  }
  private isValid(checkee: T | null | undefined): checkee is T {
    return checkee !== undefined && checkee !== null;
  }

  isSome() {
    return this.isValid(this.value);
  }

  isNone() {
    return !this.isValid(this.value);
  }

  unwrap(): T {
    if (this.isSome()) {
      return this.value!;
    }
    throw new Error("Unwrap called on a null/undefined value");
  }

  expect(msg: string): T {
    if (this.isSome()) {
      return this.value!;
    }
    throw new Error(msg);
  }

  unwrapOr(alt: T): T {
    if (this.isSome()) {
      return this.value!;
    }
    return alt;
  }

  map<K extends {}>(func: (value: T) => K): RsOption<K> {
    if (this.isSome()) {
      return new RsOption(func(this.value!));
    }
    return new RsOption();
  }

  unwrapOrNull(): T | null {
    if (this.isSome()) {
      return this.value!;
    }
    return null;
  }

  okOr<E extends {}>(e: E): RsResult<T, E> {
    if (this.isSome()) {
      return Ok(this.value!);
    }
    return Err(e);
  }

  unwrapOrUndefined(): T | undefined {
    if (this.isSome()) {
      return this.value!;
    }
    return undefined;
  }
}

export function Some<T extends {}>(value: T) {
  return new RsOption(value);
}

export function None<T extends {}>() {
  return new RsOption<T>();
}

export function Opt<T extends {}>(n: T | null | undefined) {
  return new RsOption<T>(n);
}
