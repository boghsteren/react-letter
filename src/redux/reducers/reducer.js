export const reducer = (entity = "", initialState) => {
  return (state = initialState || [], action) => {
    switch (action.type) {
      case `SET_${entity.toUpperCase()}`:
        return action.items;
      case `UPDATE_${entity.toUpperCase()}`:
        return [
          ...state.filter((item) => item._id !== action.item._id),
          action.item,
        ];
      case `ADD_${entity.toUpperCase()}`:
        return [...state, action.item];
      case `REMOVE_${entity.toUpperCase()}`:
        return [...state.filter((item) => item._id !== action.item._id)];
      default:
        return state;
    }
  };
};

export default reducer;
