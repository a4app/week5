import React, { useState } from 'react'
import emailjs from '@emailjs/browser';
import '../css/email.css'


const Email = () => {

    const [div, setDiv] = useState(1);
    const [email, setEmail] = useState('');
    const [generatedOTP, setGeneratedOTP] = useState('');
    const [otp, setOTP] = useState('');
    const [output, setOutput] = useState({msg: '', color: 'red'})

	const [validEmail, setValidEmail] = useState(false);
	const [validOTP, setValidOTP] = useState(false);

	const [emailBorder, setEmailBorder] = useState('#FF0000');
	const [OTPBorder, setOTPBorder] = useState('#FF0000');

	const validateEmail = (e) => {
		const val = e.target.value;
		setEmail(val)
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		if(emailRegex.test(val)) {
			setEmailBorder('#00FF00')
			setValidEmail(true);
		}
		else {
			setEmailBorder('#FF0000')
			setValidEmail(false);
		}
	}

	const validateOTP = (e) => {
		const val = e.target.value;
		setOTP(val)
		if(val.length < 6) {
			setOTPBorder('#FF0000')
			setValidOTP(false);
		}
		else {
			setOTPBorder('#00FF00')
			setValidOTP(true);
		}
	}

    const sentOTP = (e) => {

		e.preventDefault();
		setDiv(2);

		const randomNumber = Math.floor(Math.random() * 1000000);
  		const number = String(randomNumber).padStart(6, '0');
		setGeneratedOTP(number);
		try {
			emailjs.send("service_56utgyq","template_tllr6o9",{
				otp: number,
				email_id: email,
			},'cEpMQYfu0Ydrq5uPx');
			setDiv(3);
		}
		catch(err) {
			setOutput({
				msg: 'errror occured',
				color: '#FF0000'
			})
			setDiv(4);
		}
		setEmail('');
    }

    const verifyOTP = (e) => {
		e.preventDefault();
		if(otp === generatedOTP) {
			setOutput( {
				msg: 'verification succesfull',
				color: '#00FF00',
			})
			setDiv(4);
		}
		else {
			setOutput( {
				msg: 'verification failed',
				color: '#FF0000',
			})
			setDiv(4);
		}
		setOTP('');
		setGeneratedOTP('');
    }

    const goBack = (e) => {
		e.preventDefault();
		setEmailBorder('#FF0000');
		setDiv(1);
    }

    return (
        <div className="email-main">
            <div id='captcha' style={{position: 'absolute'}}></div>
            {
                (div === 1) ? (
                    <div className="email-div1">
                        <label className="email-label">Enter email id :</label>
						<form onSubmit={sentOTP} className='email-form'>
							<input 
								type="text" 
								value={email} 
								style={{border: `2px solid ${emailBorder}`}} 
								className='email-id-input' 
								placeholder='. . . '
								onChange={validateEmail}
								autoFocus
							/>
							<input type="submit" value="Sent OTP" className='sent-otp' disabled={!validEmail}/>
						</form>
                    </div>
                ) : (div === 2) ? (
                    <div className="email-div1">
                        <div className="spinner"></div>
                    </div>
                ) : (div === 3) ? (
                    <div className="email-div1">
                        <label className="email-label">Enter your OTP :</label>
						<form onSubmit={verifyOTP} className='email-form'>
							<input 
								type="text" 
								value={otp} 
								className='email-id-input' 
								placeholder='XXXXXX' 
								style={{border: `2px solid ${OTPBorder}`}} onChange={validateOTP} 
								autoFocus
							/>
							<input type="submit" value="Verify" className='sent-otp' disabled={!validOTP} />
						</form>
                    </div>
                ) : (div === 4) ? (
                    <div className="email-div1">
                        <span className='result' style={{color: output.color}}> {output.msg} </span>
						<form onSubmit={goBack} className='email-form'>
                        	<input type="submit" value="back" className='sent-otp' />
						</form>
                    </div>
                ) : null
            }
            
        </div>
    )
    
}

export default Email;