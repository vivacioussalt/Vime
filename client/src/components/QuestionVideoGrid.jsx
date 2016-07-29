import { Link } from 'react-router';

let QuestionVideoGrid = ({videos, fetchAnswers}) => {
  return (
    <div className="row center">
      {Object.keys(videos).map(videoCode => 
        <div key={videos[videoCode].id} className="col s4">
            <video onClick={() => {fetchAnswers(videos[videoCode].id, videoCode)}} controls src={videos[videoCode].url} width="100%"/>
        </div>
      )}
    </div>
  );
};

QuestionVideoGrid.propTypes = { videos: React.PropTypes.object.isRequired };

export default QuestionVideoGrid;

//           <Link to={`/qa/${videoCode}`}>
          // </Link>