import React, { Component } from 'react';
import './css/App.css';

import loadingGif from './imgs/loading.gif';

import AppTitle from './components/AppTitle.jsx';
import Error from './components/Error.jsx';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fromFld: 1,
			toFld: 20,
			data: [],
			errorMsg: '',
			isLoading: true
		};
	}

	handleClick(e) {
		e.preventDefault();

		this.setState({
			isLoading: true
		});

		this.sendRequest();
	}

	sendRequest() {
		let { fromFld, toFld, errorMsg, isLoading } = this.state;

		if (fromFld < 1 || fromFld > 1000 || toFld < 1 || toFld > 1000) {
			errorMsg = 'Range must be between 1 and 1000.';
			isLoading = false;

			this.setState({
				errorMsg,
				isLoading
			});
		} else if (fromFld > toFld) {
			errorMsg = 'The value of \'To\' field must not be less than the value of \'From\' field.';
			isLoading = false;

			this.setState({
				errorMsg ,
				isLoading
			});
		} else {

			const tokenUrl = 'https://veil-deposit.glitch.me/api/token';
			const dataUrl = 'https://veil-deposit.glitch.me/api/data?';
			const methodType = {
				method: 'GET'
			};

			fetch(tokenUrl, methodType)
				.then((response) => response.json())
				.then((json) => {
					let { token } = json;

					fetch(`${dataUrl}from=${fromFld}&to=${toFld}&token=${token}`, methodType)
						.then((response) => response.json())
						.then((json) => {
							let { data, error } = json;

							if (error) {
								errorMsg = 'Range must be between 1 and 1000.';

							this.setState({
								errorMsg 
							});
							}

							isLoading = false;

							this.setState({
								data,
								isLoading
							});
						})
						.catch((error) => {
							console.log(`There has been a problem: ${error.message}`);
						});
					})
					.catch((error) => {
						console.log(`There has been a problem: ${error.message}`);
					});
		}
	}
	
	renderData() {
		return this.state.data.map((item) => {
			let { index, slot, city, velocity} = item;

			slot = slot || '0';
			city = city || 'None';
			velocity = velocity || '0.00';

			return (
				<tr key={index}>
					<th scope="row">{index}</th>
					<td>{slot}</td>
					<td>{city}</td>
					<td>{velocity}</td>
				</tr>
			);
		});
	}

	componentDidMount() {
		this.sendRequest();
	}

  render() {
    return (
      <div className="container">
				<AppTitle title="C-Code Front-End Test" />

				<Error error={this.state.errorMsg} />

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
									min="1"
									max="1000"
									className="form-control" 
									type="number" 
									id="fromFld"
									name="fromFld"
									value={this.state.fromFld}
									onChange={(event) => this.setState({ fromFld: event.target.value})} 
									onFocus={() => this.setState({errorMsg: ''})}
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
									min="1"
									max="1000" 
									className="form-control" 
									type="number" 
									id="toFld" 
									name="toFld" 
									value={this.state.toFld}
									onChange={(event) => this.setState({ toFld: event.target.value})}
									onFocus={() => this.setState({errorMsg: ''})}
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
				
				{
					this.state.isLoading ?
					<div className="text-center">
						<img src={loadingGif} alt="Loading Gif"/>
					</div> :
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
							{
								this.renderData()
							}
						</tbody>
					</table>
				}

      </div>
    );
  }
}

export default App;
