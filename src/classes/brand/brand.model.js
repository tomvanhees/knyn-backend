export class BrandModel{
    id = 0;
    name = "";

    serialize() {
        return {
            'id': this.id,
            'name': this.name
        }
    }

    deserialize(input) {
        this.id = input.id;
        this.name = input.name;
        return this;
    }
}
