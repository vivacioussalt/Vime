import React from 'react';
import Video from './Video';

const AnswerVideoGrid = ({ videos, upvote, downvote }) => {
  return (
    <div className="row center">
      {videos.map(video => 
        <div key={video.id} className="col s4">
          <Video video={video} upvote={upvote} downvote={downvote} />
        </div>
      )}
    </div>
  );
};

AnswerVideoGrid.propTypes = { videos: React.PropTypes.array.isRequired };

export default AnswerVideoGrid;
