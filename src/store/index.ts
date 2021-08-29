
// 引入 createStore 专门用于创建 redux 中最为核心的 store 对象
import { createStore, applyMiddleware, combineReducers } from 'redux'
// 引入 redux-thunk 用于支持异步 action
import thunk from 'redux-thunk'
// 引入 redux-devtools-extension 进行 redux debug 处理
import { composeWithDevTools } from 'redux-devtools-extension'

// 引入reducer
const reducers = (s => {
    const r: any = {};
    s.keys().forEach(key => {
        const k = key.match(/\/(.+).ts$/)?.[1];
        if (k) {
            r[k] = s(key).default
        }
    })
    return r
})(require.context('./reducers', true, /.ts$/))

const store = createStore(
    combineReducers(reducers),
    composeWithDevTools(applyMiddleware(thunk))
)

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
