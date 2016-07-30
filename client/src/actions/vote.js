import { checkStatus, toJSON } from './fetchUtils';
import { addQuestion } from './questionAction';
import { addAnswer } from './answerAction';

function vote(type, videoType, video) {
  const value = type === 'upvote' ? video.upvote + 1 : video.downvote + 1;
  return dispatch => {
    fetch(`http://localhost:3000/api/${videoType}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({
        id: video.id,
        type,
        value: value,
      })
    })
    .then(checkStatus)
    .then(toJSON)
    .then(video => {
      if (videoType === 'question') {
        return dispatch(addQuestion(video));
      } else {
        return dispatch(addAnswer(video));
      }
    })
    .catch(err => { console.log(err); })
  }
}

export default vote;
