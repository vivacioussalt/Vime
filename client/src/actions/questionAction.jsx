export default {
    addQuestion: function addQuestion(question){
    return {
      type: 'ADD_QUESTION',
      question
    }
  }
}