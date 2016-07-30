import { Link } from 'react-router';

let QuestionVideoGrid = ({ videos, fetchAnswers }) => {
  return (
    <div className="row center">
      {videos.map(video => 
        <div key={video.id} className="col s4">
            <video onClick={fetchAnswers.bind(null, video.id, video.code)} controls src={video.url} width="100%"/>
        </div>
      )}
    </div>
  );
};

QuestionVideoGrid.propTypes = { videos: React.PropTypes.array.isRequired };

export default QuestionVideoGrid;
