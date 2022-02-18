import {readable, Writable, writable} from "svelte/store";

export function isFunction(functionToCheck) {
    const getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

const stores = new WeakMap()

function update<T>(store: Writable<T>, newPartialStore:Partial<T>)
function update<T>(store: Writable<T>, action: (prevStore: T) => Partial<T>)
function update<T>(store: Writable<T>, action: Partial<T> | ((prevStore: T) => Partial<T>)) {
    const prevStore = stores.get(store)
    const ps = JSON.parse(JSON.stringify(prevStore))
    const result = isFunction(action) ? (action as (prevStore: T) => Partial<T>)(prevStore) : action as Partial<T>
    const ns = {
        ...prevStore, ...result
    }
    const err = new Error();
    const stack = err.stack;
    const functionName = stack.split("at ")[2].split(" ")[0]
    log(functionName, ps, ns)
    store.set(ns)
}

export function createStore<T>(initialStore: T) {
    let prevStore: T = initialStore
    const writableStore = writable<T>(initialStore)
    stores.set(writableStore, prevStore)
    writableStore.subscribe(s => {
        prevStore = s
        stores.set(writableStore, prevStore)
    })
    return {store: prevStore, writable: writableStore, update}
}


function log<T>(functionName: string, prevState: T, nextState: T) {
    console.groupCollapsed(functionName);
    console.log("PREV STATE", prevState)
    console.log("NEXT STATE", nextState);
    (console as any).trace();
    console.groupEnd();
}
