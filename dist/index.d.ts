export declare class WhoopsError<T extends {}> implements ToJSON {
    errType: T;
    context: string;
    reason: string;
    suggestion: string;
    constructor(errType: T, context: string, reason: string, suggestion: string);
    appendCtx(ctx: string): this;
    toJSON(): {
        errType: T;
        context: string;
        reason: string;
        suggestion: string;
    };
}
export declare class WhoopsBuilder<T extends {}> {
    private errType;
    private contextValue;
    private reasonValue;
    private suggestionValue;
    constructor(errType: T);
    context(context: string): this;
    reason(reason: string): this;
    suggestion(suggestion: string): this;
    build(): WhoopsError<T>;
}
export declare function Whoops<T extends {}>(errType: T): WhoopsBuilder<T>;
export interface ToJSON {
    toJSON(): any;
}
export interface Collection<T extends {}> {
    collect(): T[];
    get(index: number): RsOption<T>;
}
export declare class RsResult<T extends {}, E extends {}> {
    private value;
    private error;
    /** SHOULD NOT CALL CONSTRUCTOR, use Ok or Err instead, if it is unknown,
     * create an RsOption then map it to a RsResult
     */
    constructor(n: {
        value?: T;
        err?: E;
    });
    private isValid;
    isOk(): boolean;
    isErr(): boolean;
    unwrap(): T;
    unwrapErr(): E;
    unwrapOr(alt: T): T;
    expect(msg: string): T;
    expectErr(msg: string): E;
    ok(): RsOption<T>;
    err(): RsOption<E>;
    map<K extends {}>(f: (value: T) => K): RsResult<K, E>;
    mapErr<K extends {}>(f: (value: E) => K): RsResult<T, K>;
}
export declare function Ok<T extends {}>(n: T): RsResult<T, any>;
export declare function Err<E extends {}>(e: E): RsResult<any, E>;
export declare class RsOption<T extends {}> {
    private value;
    constructor(value?: T | null | undefined);
    private isValid;
    isSome(): boolean;
    isNone(): boolean;
    unwrap(): T;
    expect(msg: string): T;
    unwrapOr(alt: T): T;
    map<K extends {}>(func: (value: T) => K): RsOption<K>;
    unwrapOrNull(): T | null;
    okOr<E extends {}>(e: E): RsResult<T, E>;
    unwrapOrUndefined(): T | undefined;
}
export declare function Some<T extends {}>(value: T): RsOption<T>;
export declare function None<T extends {}>(): RsOption<T>;
export declare function Opt<T extends {}>(n: T | null | undefined): RsOption<T>;
//# sourceMappingURL=index.d.ts.map