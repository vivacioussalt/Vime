const Video = ({ video, upvote, downvote }) => {
  var votes;
  if (upvote) {
    votes = (
      <div className="row">
        <div className="col s3">
          <i className="small material-icons" onClick={upvote.bind(null, video)}>thumb_up</i>
          <p>{video.upvote}</p>
        </div>
        <div className="col s3">
          <i className="small material-icons" onClick={downvote.bind(null, video)}>thumb_down</i>
          <p>{video.downvote}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <video className="responsive-video" controls src={video.url} width="100%"/>
      {votes}
    </div>
  )
}

export default Video;
