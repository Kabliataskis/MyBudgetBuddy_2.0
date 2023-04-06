import './Login_forma_dizainas.css';
import './Login_forma.js';
import './Register_forma'; 
import {useFormik} from 'formik'

export const Login= (props) => {
	const {setShowLogin} = props;

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
			
			<h1 className='prisijungimas'>Prisijungimas</h1>
			<div className='row'>
			<label forhtml='text'></label>
			<h3 className='text1' >Slapyvardis</h3>
			<input onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} type='name' placeholder="Vardenis" id="name" name="name" required />
			<div className='form-control'>{formik.touched.name && formik.errors.name ? <div className='error'> {formik.errors.name} </div> :null} </div>
			
			</div>
			



			
			<div className='row'>
			<label forhtml='password'></label>
			<h3 className='text1'> Slaptažodis</h3>
			<input onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}  type='password' placeholder="**********" id="password" className='password' name="password" required />
			<div className='form-control'>{formik.touched.password && formik.errors.password ? <div className='error'> {formik.errors.password} </div> :null} </div>
			</div>

			<button  className='btn'type="submit" variant="contained" onClick={ () => Login} ><h2>Prisijungti</h2></button> 

		</form>

		<h3 className='textinfo'>Dar neturite paskyros ?</h3>
		
		<button className='btn2' onClick={() => setShowLogin(false)} type='submit' variant='contained'>Registracija</button>
		
		</div>
		

	)

};


export default Login;