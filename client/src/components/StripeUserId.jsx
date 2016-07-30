import { connect } from 'react-redux';

class StripeUserId extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    console.log(this.props.userId);
    debugger;
    console.log(evt);
    var stripeId = evt.target['0'].value;
    fetch('/api/stripe/id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stripeId: stripeId,
        userId: this.props.userId
      })
    });
  }

  render() {
    return (
      <div>
        <h5>If you would like to be able to receive donations you will need to register your Stripe User Id</h5>
        <form onSubmit={this.handleSubmit}>  
          <input id="stripeId" placeholder="Stripe Id" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.user ? state.user.id : null 
  };
}

export default connect(mapStateToProps, null)(StripeUserId);
