import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        // Send a POST request to your server with the user's credentials
        const response = await fetch('http://localhost:3000/api/v1/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ login: username, password: password })
        });
  
        if (!response.ok) {
          throw new Error('Invalid username or password');
        }
  
        // Get the user's role from the server response
        const data = await response.json();
        const userRole = data.role;
  
        // Set the user's authentication state and role in local storage
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userRole', userRole);
  
        // Redirect the user to the Me page
        navigate('/me');
      } catch (error) {
        setError(error.message);
      }
};

  return (
    <div className='form'>
      <h1 className='text-xlg'>Login!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="username"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </div>
        <div>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
           <button className='btn--eye' type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <svg width="24" height="24" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M 0 0C 0 0 0 18 0 18C 0 18 982 1000 982 1000C 982 1000 1000 1000 1000 1000C 1000 1000 1000 982 1000 982C 1000 982 18 0 18 0C 18 0 0 0 0 0C 0 0 0 0 0 0M 505 262C 505 262 505 262 505 262C 687 262 869 338 971 491C 974 495 974 500 971 505C 868 659 684 736 501 737C 318 738 134 662 31 508C 29 504 29 498 31 494C 134 340 318 263 501 262C 503 262 504 262 505 262M 505 287C 505 287 505 287 505 287C 504 287 503 287 501 287C 328 288 155 360 57 501C 155 642 328 713 501 712C 675 711 847 639 945 498C 848 358 677 287 505 287M 500 325C 500 325 500 325 500 325C 546 325 591 343 624 376C 657 409 675 454 675 500C 675 546 657 591 624 624C 591 657 546 675 500 675C 454 675 409 657 376 624C 343 591 325 546 325 500C 325 468 334 437 350 410C 356 428 373 439 391 439C 403 439 414 435 422 427C 430 418 434 407 434 396C 434 377 422 360 403 354C 432 335 466 325 500 325"/></svg> : <svg width="24" height="24" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M 981 484C 987 492 987 503 981 511C 876 670 688 748 501 749C 315 750 127 673 21 515C 15 507 15 496 21 487C 127 329 314 250 501 249C 503 249 504 249 505 249C 691 250 877 327 981 484C 981 484 981 484 981 484M 501 299C 334 300 169 369 72 501C 168 634 334 700 501 699C 668 699 834 630 930 498C 835 366 671 300 505 299C 504 299 503 299 501 299C 501 299 501 299 501 299M 624 376C 657 409 675 454 675 500C 675 546 657 591 624 624C 591 657 546 675 500 675C 454 675 409 657 376 624C 343 591 325 546 325 500C 325 468 334 437 350 410C 356 428 373 439 391 439C 415 439 434 420 434 396C 434 377 422 360 403 354C 432 335 466 325 500 325C 546 325 591 343 624 376C 624 376 624 376 624 376"/></svg>}
            </button>
        </div>
        <div>
          <button className='btn btn--primary' type="submit">Login</button>
        </div>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
