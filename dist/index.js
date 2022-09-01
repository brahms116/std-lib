"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Opt = exports.None = exports.Some = exports.RsOption = exports.Err = exports.Ok = exports.RsResult = void 0;
class RsResult {
    /** SHOULD NOT CALL CONSTRUCTOR, use Ok or Err instead, if it is unknown,
     * create an RsOption then map it to a RsResult
     */
    constructor(n) {
        if (typeof n.value === "undefined" && typeof n.err === "undefined") {
            throw new Error("Tried to create error with both undefined fields");
        }
        if (typeof n.value !== "undefined" && typeof n.err !== "undefined") {
            throw new Error("Tried to create error with both valid fields");
        }
        if (typeof n.value !== "undefined") {
            this.error = undefined;
            this.value = n.value;
        }
        else {
            this.error = n.err;
            this.value = undefined;
        }
    }
    isValid(checkee) {
        return checkee !== undefined && checkee !== null;
    }
    isOk() {
        return this.isValid(this.value);
    }
    isErr() {
        return !this.isValid(this.value);
    }
    unwrap() {
        if (this.isOk()) {
            return this.value;
        }
        throw new Error("Unwrap called on an error");
    }
    unwrapErr() {
        if (this.isErr()) {
            return this.error;
        }
        throw new Error("Unwrap Error called on a Ok value");
    }
    unwrapOr(alt) {
        if (this.isOk()) {
            return this.value;
        }
        return alt;
    }
    expect(msg) {
        if (this.isOk()) {
            return this.value;
        }
        throw new Error(msg);
    }
    expectErr(msg) {
        if (this.isErr()) {
            return this.error;
        }
        throw new Error(msg);
    }
    ok() {
        if (this.isOk()) {
            return Some(this.value);
        }
        return None();
    }
    err() {
        if (this.isErr()) {
            return Some(this.error);
        }
        return None();
    }
    map(f) {
        if (this.isOk()) {
            return Ok(f(this.value));
        }
        return Err(this.error);
    }
    mapErr(f) {
        if (this.isErr()) {
            return Err(f(this.error));
        }
        return Ok(this.value);
    }
}
exports.RsResult = RsResult;
function Ok(n) {
    return new RsResult({ value: n });
}
exports.Ok = Ok;
function Err(e) {
    return new RsResult({ err: e });
}
exports.Err = Err;
class RsOption {
    constructor(value) {
        this.value = value;
    }
    isValid(checkee) {
        return checkee !== undefined && checkee !== null;
    }
    isSome() {
        return this.isValid(this.value);
    }
    isNone() {
        return !this.isValid(this.value);
    }
    unwrap() {
        if (this.isSome()) {
            return this.value;
        }
        throw new Error("Unwrap called on a null/undefined value");
    }
    expect(msg) {
        if (this.isSome()) {
            return this.value;
        }
        throw new Error(msg);
    }
    unwrapOr(alt) {
        if (this.isSome()) {
            return this.value;
        }
        return alt;
    }
    map(func) {
        if (this.isSome()) {
            return new RsOption(func(this.value));
        }
        return new RsOption();
    }
    unwrapOrNull() {
        if (this.isSome()) {
            return this.value;
        }
        return null;
    }
    okOr(e) {
        if (this.isSome()) {
            return Ok(this.value);
        }
        return Err(e);
    }
    unwrapOrUndefined() {
        if (this.isSome()) {
            return this.value;
        }
        return undefined;
    }
}
exports.RsOption = RsOption;
function Some(value) {
    return new RsOption(value);
}
exports.Some = Some;
function None() {
    return new RsOption();
}
exports.None = None;
function Opt(n) {
    return new RsOption(n);
}
exports.Opt = Opt;
