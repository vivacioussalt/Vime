const Video = ({ video, upvote, downvote }) => ( 
  <div>
    <video className="responsive-video" controls src={video.url} width="100%"/>
    <div className="row">
      <div className="col s3">
        <i className="small material-icons" onClick={upvote}>thumb_up</i>
        <p>{video.upvote || 0}</p>
      </div>
      <div className="col s3">
        <i className="small material-icons" onClick={downvote}>thumb_down</i>
        <p>{video.downvot || 0}</p>
      </div>
    </div>
  </div>
)

export default Video;
