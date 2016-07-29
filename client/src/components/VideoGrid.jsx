let VideoGrid = ({ videos, handleClick = () => {} }) => {
  return (
    <div className="row center">
      {videos.map(video => 
        <div key={video.id} className="col s4">
          <video onClick={handleClick} controls src={video.url} width="100%"/>
        </div>
      )}
    </div>
  );
};

VideoGrid.propTypes = { 
  videos: React.PropTypes.array.isRequired,
  handleClick: React.PropTypes.func.isRequired
};

export default VideoGrid;