import Video from './Video';
import StripeButton from './StripeButton';

const AnswerVideoGrid = ({ videos, upvote, downvote, setFilter }) => {
  return (
    <div className="row center">
      <h5 className="center-align grey-text-lighten-1">Filter By</h5>
      <p className="col s2 center-align btn-medium waves-effect waves-light blue darken-1" onClick={setFilter.bind(null, 'NEWEST')}>Newest</p>
      <p className="col s2 offset-s1 center-align btn-medium waves-effect waves-light blue darken-1" onClick={setFilter.bind(null, 'OLDEST')}>Oldest</p>
      <p className="col s2 offset-s1 center-align btn-medium waves-effect waves-light blue darken-1" onClick={setFilter.bind(null, 'HIGHEST_RATED')}>Highest Rated</p>
      <p className="col s2 offset-s1 center-align btn-medium waves-effect waves-light blue darken-1" onClick={setFilter.bind(null, 'POPULAR')}>Popular</p>
      <div className="col s12">
        {videos.map(video => 
          <div key={video.id} className="col s4">
            <Video video={video} upvote={upvote} downvote={downvote} />
            <StripeButton videoId={video.id} />
          </div>
        )}
      </div>
    </div>
  );
};

AnswerVideoGrid.propTypes = { videos: React.PropTypes.array.isRequired };

export default AnswerVideoGrid;
