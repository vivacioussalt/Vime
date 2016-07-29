let QuestionVideoGrid = ({videos}) => {
  return (
    <div className="row center">
      {Object.keys(videos).map(videoCode => 
        <div key={videos[videoCode].id} className="col s4">
          <Link to={`/qa/${videoCode}`}>
            <video controls src={videos[videoCode].url} width="100%"/>
          </Link>
        </div>
      )}
    </div>
  );
};

QuestionVideoGrid.propTypes = { videos: React.PropTypes.object.isRequired };

export default QuestionVideoGrid;
