

export class CategoryModel {
    id = 0;
    name = "";

    deserialize(input){
        this.id = input.id;
        this.name = input.name
        return this;
    }

    serialize() {
        return {
            'id': this.id,
            'name': this.name
        }
    }
}
