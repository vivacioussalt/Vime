import Video from './Video';

const AnswerVideoGrid = ({videos}) => {
  return (
    <div className="row center">
      {videos.map(video => 
        <div key={video.id} className="col s4">
          <Video video={video}/>
        </div>
      )}
    </div>
  );
};

AnswerVideoGrid.propTypes = { videos: React.PropTypes.array.isRequired };

export default AnswerVideoGrid;
