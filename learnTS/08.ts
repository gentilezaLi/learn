interface Bird {
    fly(): void;
    layEggs(): void;
}
interface Fish {
    swim(): void;
    layEggs(): void;
}
const getPet: () => Bird | Fish= () => {
    return {} as Bird | Fish
}
const Pet=getPet()
Pet.layEggs()