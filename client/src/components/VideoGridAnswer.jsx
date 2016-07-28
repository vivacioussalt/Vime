import React from 'react';

let VideoGrid = ({videos}) => {
  return (
    <div className="row center">
      {videos.map(video => 
        <div key={video.id} className="col s4">
          <video controls src={video.url} width="100%"/>
        </div>
      )}
    </div>
  );
};

VideoGrid.propTypes = { videos: React.PropTypes.array.isRequired };

export default VideoGrid;