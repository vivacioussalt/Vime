import { Link } from 'react-router';

const QuestionVideoGrid = ({ videos, goToTopic, setFilter, submitHandler }) => {
  return (
    <div className="row center">
      <h5 className="center-align grey-text-lighten-1">Filter By</h5>
      <p className="col s2 center-align btn-medium waves-effect waves-light blue darken-1" onClick={setFilter.bind(null, 'NEWEST')}>Newest</p>
      <p className="col s2 offset-s1 center-align btn-medium waves-effect waves-light blue darken-1" onClick={setFilter.bind(null, 'OLDEST')}>Oldest</p>
      <p className="col s2 offset-s1 center-align btn-medium waves-effect waves-light blue darken-1" onClick={setFilter.bind(null, 'HIGHEST_RATED')}>Highest Rated</p>
      <p className="col s2 offset-s1 center-align btn-medium waves-effect waves-light blue darken-1" onClick={setFilter.bind(null, 'POPULAR')}>Popular</p>
      <br/>
      <br/>
      <h5 className="center-align grey-text-lighten-1">Search by tag:</h5>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="Tag name"></input>
      </form>
      <div className="col s12">
        {videos.map(video => 
          <div key={video.id} className="col s4">
              <video onClick={goToTopic.bind(null, video.id, video.code)} controls src={video.url} width="100%"/>
          </div>
        )}
      </div>
    </div>
  );
};

QuestionVideoGrid.propTypes = { videos: React.PropTypes.array.isRequired };

export default QuestionVideoGrid;
