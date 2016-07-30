import { checkStatus, toJSON } from './fetchUtils';
import { addQuestion } from './questionAction';
import { addAnswer } from './answerActions';

function vote(type, videoType, video) {
  const value = type === 'upvote' ? video.upvote + 1 : video.downvote + 1;
  return dispatch => {
    fetch(`/api/${videoType}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({
        id: video.id,
        type,
        value: value,
        // needed for answer videos only
        questionId: video.questionId
      })
    })
    .then(checkStatus)
    .then(toJSON)
    .then(video => {
      if (videoType === 'questions') {
        return dispatch(addQuestion(video));
      } else {
        return dispatch(addAnswer(video));
      }
    })
    .catch(err => { console.log(err); })
  }
}

export default vote;
