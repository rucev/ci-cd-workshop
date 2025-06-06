class ContentError extends Error {
    constructor(message) {
        super(message);
    }
    get name() { return ContentError.name };
}

class FormatError extends Error {
    constructor(message) {
        super(message);
    }
    get name() { return FormatError.name };
}

class DuplicityError extends Error {
    constructor(message) {
        super(message)
    }
    get name() { return DuplicityError.name }
}

class UnknownError extends Error {
    constructor(message) {
        super(message)
    }
    get name() { return UnknownError.name }
}

class ExistenceError extends Error {
    constructor(message) {
        super(message)
    }
    get name() { return ExistenceError.name }
}

class AuthError extends Error {
    constructor(message) {
        super(message)
    }
    get name() { return AuthError.name }
}

class RegisterError extends Error {
    constructor(message) {
        super(message)
    }
    get name() { return RegisterError.name }
}



export default {
    ContentError,
    FormatError,
    DuplicityError,
    UnknownError,
    ExistenceError,
    AuthError,
    RegisterError,
    TypeError,
    RangeError
}