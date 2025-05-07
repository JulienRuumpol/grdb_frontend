export class GameDto {
    id!: Number
    name: String
    description: String
    imageRef: String

    constructor(id: Number, name: String, description: String, imageRef: String) {
        this.id = id;
        this.name = name
        this.description = description
        this.imageRef = imageRef
    }
}