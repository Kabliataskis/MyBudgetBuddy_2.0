import React, {useState} from 'react';
import './Login_forma_dizainas.css';
import './Login_forma.js';
import './Register_forma'; 







    const Register= (props) => {
	const {setShowLogin} = props;
	const [name, setName] =useState('');
    const [email, setEmail] =useState('');
	const [pass, setPass]= useState('');
   
	const handleSubmit = (e) =>{
		e.preventDefault(console.log);
		

	}

    

	return (

		

		<div className='forma'>
		<form onSubmit={handleSubmit}>
			
			<h1 className='prisijungimas'>Registracija</h1>
			
			<div className='row'>
			<label forhtml='text'></label>
			<h3 className='text1' >Slapyvardis</h3>
			<input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder="Vardenis" id="name" name="name" className='email' required />
			</div>


            <div className='row'>
			<label forhtml='text'></label>
			<h3 className='text1' >El. paštas</h3>
			<input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder="El. paštas" id="email" name="email" className='email' required />
			</div>



			<div className='row'>
			<label forhtml='password'></label>
			<h3 className='text1'> Slaptažodis</h3>
			<input value={pass} onChange={(e) => setPass(e.target.value)}  type='password' placeholder="**********" id="password" className='password' name="password" required />
			</div>



			<button className='btn'type="submit" variant="contained"><h2>Užsiregistruoti</h2></button>
		</form>
		<h3 className='text2'>Jau turite paskyra ?</h3>

		 <button onClick={() => setShowLogin(true)} className='btn2'type="submit" variant="contained" >Prisijungti</button>

		</div>

	)

};


export default Register;