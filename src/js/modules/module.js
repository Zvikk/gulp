class Module {
    constructor() {
        this.x = 5;

        console.log(this)
    }
}

let module = new Module();
console.log('from module');