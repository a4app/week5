import React, { useState } from 'react'
import '../css/phone.css'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from './firebase.js'

const Phone = () => {

    const [div, setDiv] = useState(1);
    const [phone, setPhone] = useState('+91');
    const [otp, setOTP] = useState('');
    const [output, setOutput] = useState({msg: '', color: 'red'})
    const [result, setResult] = useState(null);

    const [phoneValid, setPhoneValid] = useState(false);
    const [OTPValid, setOTPValid] = useState(false);
    const [phoneBorder, setPhoneBorder] = useState('#FF0000');
    const [OTPBorder, setOTPBorder] = useState('#FF0000');

    const validatePhone = (e) => {
        const val = e.target.value;
        setPhone(val);
        if(val.length < 13) {
            setPhoneBorder('#FF0000');
            setPhoneValid(false);
        }
        else {
            setPhoneBorder('#00FF00');
            setPhoneValid(true);
        }
    }

    const validateOTP = (e) => {
        const val = e.target.value;
        setOTP(val);
        if(val.length < 6) {
            setOTPBorder('#FF0000');
            setOTPValid(false);
        }
        else {
            setOTPBorder('#00FF00');
            setOTPValid(true);
        }
    }

    const sentOTP = async (e) => {
        e.preventDefault();
        setDiv(2);
        const recaptchaVerifier = await new RecaptchaVerifier(auth, 'captcha', { size: "invisible" });
        signInWithPhoneNumber(auth, phone, recaptchaVerifier).then((result) => {
            setResult(result);
            setDiv(3);
        }).catch((_) => {
            setOutput({msg: 'something went wrong', color: '#FF0000'});
        })
    }

    const verifyOTP = (e) => {
        e.preventDefault();
        setDiv(2);
        result.confirm(otp).then(() => {
            setOutput({msg: 'Verification succesfull', color: '#00FF00'});
            setDiv(4);
        }).catch((error) => {
            console.error(error);
            setOutput({msg: 'Verification failed', color: '#FF0000'});
            setDiv(4);
        })
    }

    const goBack = (e) => {
        e.preventDefault();
        setDiv(1);
        setPhone('+91');
        setPhoneBorder('#ff0000');
        setOTP('');
    }

    return (
        <div className="phone-main">
                <div id='captcha' style={{position: 'absolute'}}></div>
                {
                    (div === 1) ? (
                        <div className="phone-div1">
                            <label className="phone-label">Enter phone number :</label>
                            <form className='phone-form' onSubmit={sentOTP}>
                                <input 
                                    type="text" 
                                    value={phone} 
                                    className='phone-number-input' 
                                    style={{border: `2px solid ${phoneBorder}`}} 
                                    onChange={validatePhone} 
                                    autoFocus
                                />
                                <input type="submit" value="Sent OTP" className='sent-otp' disabled={!phoneValid}/>
                            </form>
                        </div>
                    ) : (div === 2) ? (
                        <div className="phone-div1">
                            <div className="spinner"></div>
                        </div>
                    ) : (div === 3) ? (
                        <div className="phone-div1">
                            <label className="phone-label">Enter your OTP :</label>
                            <form className='phone-form' onSubmit={verifyOTP}>
                                <input 
                                    type="text" 
                                    className='phone-number-input' 
                                    placeholder='XXXXXX' style={{border: `2px solid ${OTPBorder}`}} 
                                    onChange={validateOTP} 
                                    autoFocus
                                />
                                <input type="submit" value="Verify" className='sent-otp' disabled={!OTPValid}/>
                            </form>
                        </div>
                    ) : (div === 4) ? (
                        <div className="phone-div1">
                            <span className='result' style={{color: output.color}}> {output.msg} </span>
                            <form className='phone-form' onSubmit={goBack}>
                                <input type="submit" value="back" className='sent-otp' />
                            </form>
                        </div>
                    ) : null
                }
                
        </div>
    )
    
}

export default Phone;