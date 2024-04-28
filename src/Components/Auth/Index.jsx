import  {useState} from 'react';
import SignUpForm from './SignUp';
import SignInForm from './Login';

const AuthComponent = () => {
  const [leftPartActive, setLeftPartActive] = useState(true);

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div style={{ display: 'flex', flexDirection: 'column', width: '30%', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
        <div style={{ flex: 1, display: 'flex', marginBottom: '20px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
          <button
            style={{
              flex: 1,
              backgroundColor: leftPartActive ? 'lightblue' : 'white',
              color: leftPartActive ? 'darkblue' : 'black',
              padding: '10px',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => setLeftPartActive(true)}
          >
            Sign Up
          </button>
          <button
            style={{
              flex: 1,
              backgroundColor: !leftPartActive ? 'lightgreen' : 'white',
              color: !leftPartActive ? 'darkgreen' : 'black',
              padding: '10px',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => setLeftPartActive(false)}
          >
            Sign In
          </button>
        </div>
        {leftPartActive ? <SignUpForm /> : <SignInForm />}
      </div>
    </div>
  );
};

export default AuthComponent;
