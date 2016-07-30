export default function filter(state = 'POPULAR', action) {
  if (action.type === 'SET_FILTER') {
    return action.value;
  }
  return state;
} 
