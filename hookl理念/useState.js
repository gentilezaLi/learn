//首次render时是mount
let isMount = true
let workInProgressHook = null

const fiber = {
    stateNode: App,
    memoizedState: null
}

function useState(initalState) {
    // 当前useState使用的hook会被赋值该该变量
    let hook

    if (isMount) {
        // ...mount时需要生成hook对象
        hook = {
            memoizedState: initalState,
            next: null,
            queue: {
                pending: null
            }
        }
        // 将hook插入fiber.memoizedState链表末尾
        if (!fiber.memoizedState) {
            fiber.memoizedState = hook
        } else {
            workInProgressHook.next = hook
        }
        // 移动workInProgressHook指针
        workInProgressHook = hook
    } else {
        // ...update时从workInProgressHook中取出该useState对应的hook
        // update时找到对应hook
        hook = workInProgressHook
        // 移动workInProgressHook指针
        workInProgressHook = workInProgressHook.next
    }
    // update执行前的初始state
    let baseState = hook.memoizedState

    if (hook.queue.pending) {
        // ...根据queue.pending中保存的update更新state
        // 获取update环状单向链表中第一个update
        let firstUpdate = hook.queue.pending.next

        do {
            // 执行update action
            const action = firstUpdate.action
            baseState = action(baseState)
            firstUpdate = firstUpdate.next

            // 最后一个update执行完后跳出循环
        } while (firstUpdate !== hook.queue.pending.next)

        // 清空queue.pending
        hook.queue.pending = null
    }

    // 将update action执行完后的state作为memoizedState
    hook.memoizedState = baseState
    return [baseState, dispatchAction.bind(null, hook.queue)]
}

function dispatchAction(queue, action) {
    const update = {
        action,
        next: null
    }

    if (queue.pending === null) {
        //u0->u0->u0
        update.next = update
    } else {
        //u0->u0
        //u1->u0->u1
        update.next = queue.pending.next
        queue.pending.next = update
    }
    queue.pending = update

    // 模拟React开始调度更新
    schedule()
}

function schedule() {
    // 更新前将workInProgressHook重置为fiber保存的第一个Hook
    workInProgressHook = fiber.memoizedState
    // 触发组件render
    const app = fiber.stateNode()
    isMount = false
    return app
}

function App() {
    const [num, updateNum] = useState(0)

    console.log('[ isMount ] >', isMount)
    console.log('[ num ] >', num)

    return () => updateNum(num + 1)

}

export default App;
