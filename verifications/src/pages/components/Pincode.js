import React, {useState} from 'react'
import '../css/pincode.css'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom';

const Pincode = () => {

	const [pincode, setPincode] = useState(''); //682033 689544 673592
	const [border, setBorder] = useState('#FF0000');
	const [valid, setValid] = useState(true);
	const [area, setArea] = useState({city: '...', district: '...', state: '...'});
	const [outputDiv, setOutputDiv] = useState(1);

	const onChange = (e) => {
		const val = e.target.value;
		setPincode(val);
		if(val.length < 6) {
			setValid(true);
			setBorder('#Ff0000');
		}
		else {
			setValid(false);
			setBorder('#00FF00');
		}
	}

	const oonSubmit = (e) => {
		e.preventDefault();
		setOutputDiv(3);
		axios.get(`https://api.postalpincode.in/pincode/${pincode}`)
		.then((res) => {
			if(res.data[0].Status === 'Success') {
				setOutputDiv(1);
				setArea({
					city: res.data[0].PostOffice[0].Block,
					district: res.data[0].PostOffice[0].District,
					state: res.data[0].PostOffice[0].State
				});
			}
			else {
				setOutputDiv(2);
			}
			
		}).catch((err) => {
			console.log(err);
			setOutputDiv(2);
		});

	}

	return (
		<div className='pincode-main'>
			<div className="pincode-div">
				<form className='pincode-form' onSubmit={oonSubmit} >
					<input
						type="text" 
						className='pincode-input' 
						placeholder='Enter pincode . . .' 
						style={{border: `2px solid ${border}`}}
						onChange={onChange} 
						autoFocus
					/>
					<input type="submit" className='pincode-submit' disabled={valid} />
				</form>
				{
					( outputDiv === 1 ) ? (
						<div className="output-div">
							<div className="city"> { area.city } </div>
							<div className="district"> { area.district } </div>
							<div className="state"> { area.state } </div>
						</div>
					) : ( outputDiv === 2 ) ? (
						<div className="error-div">
							Not Found
						</div>
					) : ( outputDiv === 3 ) ? (
						<div className="spinner-div">
							<div className="spinnerr"></div>
						</div>
					) : null
				}
			</div>
		</div>
	)
};

export default Pincode;
