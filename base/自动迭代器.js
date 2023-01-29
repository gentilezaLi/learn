function getData1() {
    return new Promise((resolve) => {
        return resolve(123)
    })
}

function getResult1() {
    return getData1().then(res => {
        console.log('step1');
        // ....
    })
}

function getResult2() {
    return getData1().then(res => {
        console.log('step2');
        // ....
    })
}

function getResult3() {
    return getData1().then(res => {
        console.log('step3');
        // ....
    })
}

function* getGenerator() {
    console.log('[ start ] >', 'start')
    yield getResult1()
    yield getResult2()
    yield getResult3()
}

let hw = getGenerator();

// hw.next()
// hw.next()
// hw.next()

//自动迭代器

function runGenerator(gen) {
    var it = gen(), ret;

    // 创造一个立即执行的递归函数
    (function iterate(val){
        ret = it.next(val);

        if (!ret.done) {
            // 如果能拿到一个 promise 实例
            if ("then" in ret.value) {
                // 就在它的 then 方法里递归调用 iterate
                ret.value.then( iterate );
            }
        }
    })();
}


// runGenerator(getGenerator)

//async await

async function hww(){
    console.log('[ starthw ] >', 'starthw')
    await getResult1()
    await getResult2()
    await getResult3()
}
hww()