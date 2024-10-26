class Stream {

    #value;
    #nextValue;
    static #count = 0;

    constructor(value, next) {
        this.#value = value;
        this.#nextValue = next;
        Stream.#count++;
    }

    get value() {
        return this.#value;
    }

    get next() {
        this.#value = this.#nextValue(this.#value)
        return this.#value
    }

    static get count() {
        return Stream.#count;
    }

}

class ConstantStream extends Stream {
    constructor(value) {
        super(value, value => value)
    }
}


class NextIntegerStream extends Stream {
    constructor() {
        super(0, value => value + 1);
    }
}

const constant = new ConstantStream(5);
const nextInt = new NextIntegerStream();

for (let i = 0; i < 10; i++) {
    console.log(`const[${i}] = ${constant.next}`);
    console.log(`nextInteger[${i}] = ${nextInt.next}`);
}
console.log('count is: ', Stream.count);
