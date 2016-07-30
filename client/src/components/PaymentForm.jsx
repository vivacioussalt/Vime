import { connect } from 'react-redux';
var React = require('react');
var ReactScriptLoaderMixin = require('react-script-loader').ReactScriptLoaderMixin;

var PaymentForm = React.createClass({
  mixins: [ ReactScriptLoaderMixin ],

  getInitialState: function() {
    return {
      stripeLoading: true,
      stripeLoadingError: false,
      submitDisabled: false,
      paymentError: null,
      paymentComplete: false,
      token: null
    };
  },

  getScriptURL: function() {
    return 'https://js.stripe.com/v2/';
  },

  onScriptLoaded: function() {
    if (!PaymentForm.getStripeToken) {
      Stripe.setPublishableKey('pk_test_z9YfRtJFE0bOPNH3ITLbbf3J');

      this.setState({ stripeLoading: false, stripeLoadingError: false });
    }
  },

  onScriptError: function() {
    this.setState({ stripeLoading: false, stripeLoadingError: true });
  },

  onSubmit: function(event) {
    var self = this;
    var videoId = parseInt(self.props.location.hash.slice(1));
    var donationAmount = event.target['4'].valueAsNumber;
    event.preventDefault();
    this.setState({ submitDisabled: true, paymentError: null });

    Stripe.createToken(event.target, function(status, response) {
      if (response.error) {
        self.setState({ paymentError: response.error.message, submitDisabled: false });
      }
      else {
        self.setState({ paymentComplete: true, submitDisabled: false, token: response.id });

        var obj = {};
        obj.stripeToken = response.id;
        obj.userId = self.props.userId;
        obj.videoId = videoId;
        obj.amount = donationAmount;
        $.ajax({
          url: '/api/stripe',
          dataType: 'json',
          type: 'POST',
          data: obj,
          success: function(data) {
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });

        console.log('make request to server');
      }
    });
  },

  render: function() {
    if (this.state.stripeLoading) {
      return <div>Loading</div>;
    }
    else if (this.state.stripeLoadingError) {
      return <div>Error</div>;
    }
    else if (this.state.paymentComplete) {
      return <div>Payment Complete!</div>;
    }
    else {
      return (
      <form onSubmit={this.onSubmit} >
        <span>{ this.state.paymentError }</span><br />
        <h5>Donate for great answers</h5>
        <input type='text' data-stripe='number' placeholder='credit card number' /><br />
        <input type='text' data-stripe='exp-month' placeholder='expiration month' /><br />
        <input type='text' data-stripe='exp-year' placeholder='expiration year' /><br />
        <input type='text' data-stripe='cvc' placeholder='cvc' /><br />
        <input type='number' id="amount" placeholder="Donation Amount" />
        <input disabled={this.state.submitDisabled} type='submit' value='Donate' />
      </form>);
    }
  }
});

function mapStateToProps(state) {
  return {
    userId: state.user ? state.user.id : null 
  };
}

export default connect(mapStateToProps, null)(PaymentForm);
// export default PaymentForm;
