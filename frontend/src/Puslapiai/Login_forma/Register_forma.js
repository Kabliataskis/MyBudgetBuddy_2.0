import './Login_forma_dizainas.css';
import './Login_forma.js';
import './Register_forma'; 
import {useFormik} from 'formik';


    const Register= (props) => {
	const {setShowLogin} = props;

	const handleSubmit = (e) =>{
		e.preventDefault(console.log);
	
	}



	const initialValues= {
		name: '',
		email: '',
		password: ''
	}


 const onSubmit= values => {
	console.log('Form data', values)
 }


 const validate= values => {
	let errors= {}
	if(!values.name){
		errors.name='Required'
	}
	if(!values.email){
		errors.email= 'Required'
	}else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.text(values.email)){
		errors.email='Invalid email format'
	}
	if(!values.password){
		errors.password='Required'
	}

	return errors;
 }

	//function formValidation() {
	const formik= useFormik({
	initialValues,
	onSubmit,
	validate
	});
		console.log('Visited fields', formik.touched);


 



	//}

    

	return (

		

		<div className='forma'>
		<form onSubmit={formik.handleSubmit}>
			
			<h1 className='prisijungimas'>Registracija</h1>
			
			<div className='row2'>
			<label forhtml='text'></label>

			<h3 className='text2' >Slapyvardis</h3>
			<input onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} type='text' placeholder="Vardenis" id="name" name="name" className='formInput' required />
			<div className='form-control2'>{formik.touched.name && formik.errors.name ? <div className='error'> {formik.errors.name} </div> :null} </div>
			</div>


            <div className='row2'>
			<label forhtml='text'></label>
			<h3 className='text2'>El. paštas</h3>
			<input onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} type='email' placeholder="El. paštas" id="email" name="email" className='formInput' required />
			<div className='form-control2'>{formik.touched.email && formik.errors.email ? <div className='error'> {formik.errors.email} </div> :null} </div>
			</div>



			<div className='row2'>
			<label forhtml='password'></label>
			<h3 className='text2'> Slaptažodis</h3>
			<input  onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}  type='password' placeholder="**********" id="password" className='formInput' name="password" required />
			<div className='form-control2'>{formik.touched.password && formik.errors.password ? <div className='error'> {formik.errors.password} </div> :null} </div>
			</div>



			<button className='btnReg'type="submit" variant="contained"><h2>Užsiregistruoti</h2></button>
		</form>
		<h3 className='text'>Jau turite paskyra ?</h3>

		 <button onClick={() => setShowLogin(true)} className='btn2'type="submit" variant="contained" >Prisijungti</button>

		</div>

	)

};


export default Register;