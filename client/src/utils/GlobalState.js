// import React, { createContext, useContext } from 'react'
import { createStore } from 'redux';
import { reducer } from './reducers'

export let store = createStore(reducer)


// const StoreContext = createContext();
// const { Provider } = StoreContext;

// export const StoreProvider = ({ value = [], ...props}) => {
//   const [state, dispatch] = useProductReducer({
//     products: [],
//     cart: [],
//     cartOpen: false,
//     categories: [],
//     currentCategory: ''
//   });
//   // console.log(state);
//   return <Provider value={[state, dispatch]} {...props} />
// }

// export const useStoreContext = () => {
//   return useContext(StoreContext)
// }