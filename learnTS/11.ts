//类型守卫

const convertToUpperCase = (strOrArray: string | string[]) => {
    if (typeof strOrArray === 'string') {
        return strOrArray.toUpperCase();
    } else if (Array.isArray(strOrArray)) {
        return strOrArray.map(item => item.toUpperCase());
    }
}

const convert = (c: 'a' | 1) => {
    switch (c) {
        case 1:
            return c.toFixed(); // c is 1
        case 'a':
            return c.toLowerCase(); // c is 'a'
    }
}
const feat = (c: { animal: 'panda'; name: 'China' } | { feat: 'video'; name: 'Japan' }) => {
    switch (c.name) {
        case 'China':
            return c.animal; // c is "{ animal: 'panda'; name: 'China' }"
        case 'Japan':
            return c.feat; // c is "{ feat: 'video'; name: 'Japan' }"
    }
};


class Dog {
    wang = 'wangwang';
}
class Cat {
    miao = 'miaomiao';
}
const getName = (animal: Dog | Cat) => {
    if (animal instanceof Dog) {
        return animal.wang;
    } else if (animal instanceof Cat) {
        return animal.miao;
    }
}

interface Dog {
    wang: string;
}
interface Cat {
    miao: string;
}

const getName1 = (animal: Dog | Cat) => {
    if (typeof animal.wang == 'string') { // ts(2339)
        return animal.wang; // ts(2339)
    } else if (animal.miao) { // ts(2339)
        return animal.miao; // ts(2339)
    }
}

const getName2 = (animal: Dog | Cat) => {
    if ('wang' in Dog) {
        return animal.wang;
    } else if ('miao' in Cat) {
        return animal.miao;
    }
}

// 自定义类型守卫   类型谓词 is
const isDog = function (animal: Dog | Cat): animal is Dog {
    return 'wang' in animal
}
const getName3 = (animal: Dog | Cat) => {
    if (isDog(animal)) {
        return Dog.wang
    }
}





