
type typeFn = 'sessionStorage' | 'localStorage';

interface IStorageData<T> {
    key: string,
    value: T,
    expire: number,
}

interface IStorage {
    setItem<T>(key: string, value: T, expire?: number): T,
    getItem<T>(key: string, defValue: T | null): T | null,
    removeItem(key: string): void,
    updateItem<T extends [] | object>(key: string, value: T, expire?: number): T,
    clear(key: string): void,
}

const setItem = function<T> (fn: typeFn, key: string, value: T, expire: number = -1) : T {
    window[fn].setItem(key, JSON.stringify({ key, value, expire }));
    return value;
};

const getItem = function<T> (fn: typeFn, key: string, defValue: T | null = null) : T | null {
    const data = window[fn].getItem(key);
    if (data === null) {
        return defValue;
    }
    const { expire, value } = JSON.parse(data) as IStorageData<T>;
    if (expire === -1 || Date.now() < expire) {
        return value;
    }
    removeItem(fn, key);
    return defValue;
};

const removeItem = function (fn: typeFn, key: string): void {
    window[fn].removeItem(key);
};

const updateItem = function<T extends [] | object> (fn: typeFn, key: string, value: T, expire?: number) : T {
    const data = window[fn].getItem(key);
    if (data) {
        const { value: prevValue, expire: prevExpire } = JSON.parse(data) as IStorageData<T>;
        if (prevExpire === -1 || Date.now() < prevExpire) {
            if (Array.isArray(value)) {
                value = [...prevValue as [], ...value] as T
            } else {
                value = Object.assign({}, prevValue, value);
            }
            if (!expire) {
                expire = prevExpire;
            }
        }
    }
    return setItem<T>(fn, key, value, expire);
};

const clear = function (fn: typeFn) : void {
    window[fn].clear();
};

export const cache: IStorage = {
    setItem: (key, value, expire = -1) => setItem('sessionStorage', key, value, expire),
    getItem: (key, defValue = null) => getItem('sessionStorage', key, defValue),
    removeItem: key => removeItem('sessionStorage', key),
    updateItem: (key, value, expire?) => updateItem('sessionStorage', key, value, expire),
    clear: () => clear('sessionStorage'),
};

export const local: IStorage = {
    setItem: (key, value, expire = -1) => setItem('localStorage', key, value, expire),
    getItem: (key, defValue = null) => getItem('localStorage', key, defValue),
    removeItem: key => removeItem('localStorage', key),
    updateItem: (key, value, expire?) => updateItem('localStorage', key, value, expire),
    clear: () => clear('localStorage'),
};

export function createLocalStorage (key: string) {
    return {
        setItem: local.setItem.bind(null, key)
    }
}

export default {
    cache,
    local
}
