export const CollapsedReducer = (prevState = {
    isCollapsed:false
}, action) => {
    console.log('action', action)
    let { type} = action
    switch (type) {
        case "change_collapsed":
            //注意不能直接更改原来的值
            let newState = { ...prevState }
            newState.isCollapsed = !newState.isCollapsed
            return newState
        default:
            return prevState
    }
}
