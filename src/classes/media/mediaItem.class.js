export class MediaItemClass{
    id;
    name;
    order;
    path;

    /**
     * @param input
     * @return {MediaItemClass}
     */
    deserialize(input) {
        this.id = input.id;
        this.name = input.name;
        this.order = input.order;
        this.path = input.path
        return this;
    }
}
