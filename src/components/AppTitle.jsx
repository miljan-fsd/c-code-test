import React from 'react';

const AppTitle = (props) => {
	return (
		<h1 className="text-uppercase p-3 mb-5 text-center bg-inverse text-white">
			{props.title}
		</h1>
	);
};

export default AppTitle;
