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
      // Put your publishable key here
      Stripe.setPublishableKey('pk_test_z9YfRtJFE0bOPNH3ITLbbf3J');

      this.setState({ stripeLoading: false, stripeLoadingError: false });
    }
  },

  onScriptError: function() {
    this.setState({ stripeLoading: false, stripeLoadingError: true });
  },

  onSubmit: function(event) {
    var self = this;
    console.log('this is the event', event);
    console.log('this is the self value', self);
    event.preventDefault();
    this.setState({ submitDisabled: true, paymentError: null });
    // send form here
    Stripe.createToken(event.target, function(status, response) {
      if (response.error) {
        self.setState({ paymentError: response.error.message, submitDisabled: false });
      }
      else {
        self.setState({ paymentComplete: true, submitDisabled: false, token: response.id });
        // make request to your server here!
        var obj = {};
        data.stripeToken = response.id;
        $.ajax({
          url: '/api/stripe',
          dataType: 'json',
          type: 'POST',
          data: obj,
          success: function(data) {
            // this.setState({data: data});
            console.log(data);
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });

        console.log('make request to server');
        console.log(response);
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
      return (<form onSubmit={this.onSubmit} >
        <span>{ this.state.paymentError }</span><br />
        <input type='text' data-stripe='number' placeholder='credit card number' /><br />
        <input type='text' data-stripe='exp-month' placeholder='expiration month' /><br />
        <input type='text' data-stripe='exp-year' placeholder='expiration year' /><br />
        <input type='text' data-stripe='cvc' placeholder='cvc' /><br />
        <input type='text' name='amount' placeholder='Amount to donate' /><br />
        <input name="userId" value="1" type="hidden" />
        <input name="answerId" value="1" type="hidden" />
        <input disabled={this.state.submitDisabled} type='submit' value='Purchase' />
      </form>);
    }
  }
});

export default PaymentForm;
