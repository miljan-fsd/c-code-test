import React, { Component } from 'react';

class Error extends Component {
  render() {
    return (
      <div>
        {
					(this.props.error !== '')
					? <div className="alert alert-danger">{this.props.error}</div>
					: ''
				}
      </div>
    );
  }
}

export default Error;