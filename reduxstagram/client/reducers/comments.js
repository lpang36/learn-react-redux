//reducer takes in action and copy of state, returns new copy of state
function postComments(state=[], action) {
  switch(action.type) {
    case 'ADD_COMMENT':
      return [...state,{
        user: action.author,
        text: action.comment
      }]
    case 'REMOVE_COMMENT':
      return [
        ...state.slice(0,action.index),
        ...state.slice(action.index+1)
        ]
    default:
      return state
  }
}

export default function comments(state=[],action) {
  if(typeof action.postId!=='undefined') {
    return {
      ...state,
      [action.postId]: postComments(state[action.postId],action) //[key] implies variable key name
    }
  }
  return state
}