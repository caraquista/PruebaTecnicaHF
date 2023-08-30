class Planet {
    constructor(id) {
        this.id = id;
    }

    async init(){
        throw new Error('To be implemented');
    }

    getName() {
        return this.name;
    }

    getGravity() {
        return this.gravity;
    }
}