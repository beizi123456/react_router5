import { createStore,combineReducers } from 'redux'
import {CollapsedReducer } from './reducers/CollapseReducer'

const reducer = combineReducers({
    CollapsedReducer,
})
const store = createStore(reducer)



export default store

/**
 * store.dispatch() 分发
 * store.subscribe() 订阅
*/
