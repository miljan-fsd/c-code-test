import React, { Component } from 'react';
import './css/App.css';

import AppTitle from './components/AppTitle.jsx';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fromFld: 1,
			toFld: 20
		};
	}

	handleClick(e) {
		e.preventDefault();


		console.log('ok');
	}
	
  render() {
    return (
      <div className="container">
				<AppTitle title="C-Code Front-End Test" />

				<form className="mb-5">
					<fieldset>
						<legend className="mb-5">
							<i>Choose range (between 1 and 1000):</i>
						</legend>

						{/* Form field: 
							fromFld 
						*/}
						<div className="form-group row">
							<label className="col-2 col-form-label" htmlFor="fromFld">
								<b>From:</b>
							</label>

							<div className="col-10">
								<input
									className="form-control" 
									type="number" 
									id="fromFld"
									defaultValue={this.state.fromFld} 
								/>
							</div>
						</div>

						{/* Form field: 
							toFld 
						*/}
						<div className="form-group row">
							<label className="col-2 col-form-label" htmlFor="toFld">
								<b>To:</b>
							</label>

							<div className="col-10">
								<input 
									className="form-control" 
									type="number" 
									id="toFld" 
									defaultValue={this.state.toFld}
								/>
							</div>
						</div>

						{/* Form button */}
						<div className="row">
							<div className="col-10 push-2">
								<button 
									className="btn btn-success btn-block btn-lg"
									onClick={(e) => this.handleClick(e)}
								>
									Load
								</button>
							</div>
						</div>
					</fieldset>
				</form>
				
				<table className="table table-striped">
					<thead className="thead-inverse">
						<tr>
							<th>Index</th>
							<th>Slot</th>
							<th>City</th>
							<th>Velocity</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">1</th>
							<td>8</td>
							<td>Carleton Place</td>
							<td>265.68</td>
						</tr>
						<tr>
							<th scope="row">2</th>
							<td>Jacob</td>
							<td>Thornton</td>
							<td>@fat</td>
						</tr>
						<tr>
							<th scope="row">3</th>
							<td>Larry</td>
							<td>the Bird</td>
							<td>@twitter</td>
						</tr>
					</tbody>
				</table>

      </div>
    );
  }
}

export default App;
