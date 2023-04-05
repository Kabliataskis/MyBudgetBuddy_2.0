import React, {useState} from 'react';
import './Login_forma_dizainas.css';
import './Login_forma.js';
import './Register_forma'; 
import Login from './Login_forma.js';
import Register from './Register_forma';



export const Auth= () => {
    const [showLogin, setShowLogin] = useState(true);

	return (

		<>
			<div className='flex'>
				<div className='boxes'>

		<div className='AllBox'>		
		<div className='box1'><h2><div><h2>Apie Aplikacija</h2></div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et facere accusamus consequuntur dignissimos quod magnam.</h2></div>
		
		<div className='box2'><h2><div><h2>Galimybes</h2></div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium alias molestiae nemo distinctio, rerum est!</h2></div>
		<div className='box3'><h2><div><h2>Limitai</h2></div>orem ipsum dolor sit amet consectetur adipisicing elit. Amet porro at, debitis distinctio consectetur fuga.</h2></div>
		</div>
		</div>
        {showLogin ? <Login setShowLogin={setShowLogin}/> : <Register setShowLogin={setShowLogin}/>}
		
		</div>
		</>
	)

};


export default Auth;