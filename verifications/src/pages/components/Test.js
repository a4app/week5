import React from 'react'
// import axios from 'axios';
import '../css/test.css'

export default function Test() {

	const clicked = () => {
		console.log('CLicked');
	};

	return (
		<div className='test-main'>
			<div className="test-button" onClick={clicked}>
				Test
			</div>
		</div>
	)
}
