import React from "react";

const LoadMask = () => {
	return (
		<div className="spinner-box">
			<svg className="spinner" viewBox="0 0 50 50">
				<circle className="spinner-path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
			</svg>
		</div>
	);
};

export default LoadMask;
