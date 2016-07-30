import { Link } from 'react-router';

const StripeButton = (props) => ( 
  <div>
    <Link to={`/donate#${props.videoId}`} >
      <img src="/assets/images/blue-on-light.png" />
    </Link>
  </div>
);

export default StripeButton;