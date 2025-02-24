export class GameDto {
    id: Number
    name: String
    description: String

    constructor(id: Number, name: String, description: String) {
        this.id = id;
        this.name = name
        this.description = description
    }
}