import { useState } from 'react';
import '../css/aadhaar.css'

const Aadhaar = () => {

    const [aadhaar, setAadhaar] = useState('');
    const [aadhaarValid, setAadhaarValid] = useState(false);
    const [aadhaarBorder, setAAdhaarBorder] = useState('#FF0000');

    const [out, setOut] = useState({msg: '.', color: '#000000'})
    const [div, setDiv] = useState(1);

    const onSubmit = (e) => {
        e.preventDefault();
        setDiv(2);
        setTimeout(() => {
            setOut({msg: 'Verification Succesfull', color: '#00FF00'})
            setDiv(3);
            console.log(aadhaar);
        }, 2000)
    }

    const onChange = (e) => {
        const val = e.target.value;
        setAadhaar(val);
        if(val.length < 12) {
            setAAdhaarBorder('#FF0000');
            setAadhaarValid(false);
        }
        else {
            setAAdhaarBorder('#00FF00');
            setAadhaarValid(true);
        }
    }

    const goBack = (e) => {
        e.preventDefault();
        setAAdhaarBorder('#FF0000');
        setAadhaarValid(false);
        setDiv(1);
    }

    return (
        <div className='aadhaar-main'>
            {
                (div === 1) ? (
                    <form className="aadhaar-div" onSubmit={onSubmit}>
                        <label className='aadhaar-label'>Enter aadhaar number : </label>
                        <input 
                            type="text" 
                            className='aadhaar-input' 
                            style={{border: `2px solid ${aadhaarBorder}`}}
                            onChange={onChange} 
                            placeholder='XXXX XXXX XXXX'
                            autoFocus 
                        />
                        <input type="submit" className='aadhaar-submit' disabled={!aadhaarValid} />
                    </form>
                ) : (div === 2) ? (
                    <div className="aadhaar-spinner-div" >
                        <div className="aadhaar-spinner"></div>
                    </div>
                ) : (
                    <form className="aadhaar-div" onSubmit={goBack}>
                        <div className="output-msg" style={{color: out.color}}>
                            { out.msg }
                        </div>
                        <button type="submit" className='go-back'>Back</button>
                    </form>
                )
            }
        </div>
    )
}

export default Aadhaar;