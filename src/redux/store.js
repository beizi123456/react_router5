import { createStore,combineReducers } from 'redux'
import { CollapsedReducer } from './reducers/CollapseReducer'
import { LoadingReducer } from './reducers/LoadingReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'



const persistConfig = {
    key: 'newsSystem',
    storage,
    blacklist: ['LoadingReducer']
}
const reducer = combineReducers({
    CollapsedReducer,
    LoadingReducer
})
const persistedReducer = persistReducer(persistConfig, reducer)


let store = createStore(persistedReducer)
let persistor = persistStore(store)

export { store, persistor }

/**
 * store.dispatch() 分发
 * store.subscribe() 订阅
*/
