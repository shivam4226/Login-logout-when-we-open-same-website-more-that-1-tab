import   { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoggedInState } from '../AtomData/atom';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [loginStatus, setIsloginStatus] = useState();
   const isLoggedIns = useRecoilValue(isLoggedInState);
   const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [images, setImages] = useState([]);

 useEffect(() => {
   const storageSlection = localStorage.getItem('selectedStorage');
    const handleStorageChange = () => {
      if (storageSlection == 'sessionStorage') {
        setIsloginStatus(sessionStorage.getItem('isLoggedIn') === 'true');
      }else{
        setIsloginStatus(localStorage.getItem('isLoggedIn') === 'true');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    if(storageSlection == 'sessionStorage'){
       const isLoginStatus = sessionStorage.getItem('isLoggedIn');
      if (isLoginStatus) {
        setIsloginStatus(true);
        setIsLoggedIn(true);
      }else{
        setIsloginStatus(false);
        setIsLoggedIn(false);
      }

    }else{
      const isLoginStatus = localStorage.getItem('isLoggedIn');
      if (isLoginStatus) {
        setIsloginStatus(true);
        setIsLoggedIn(true);
      }else{
        setIsloginStatus(false);
        setIsLoggedIn(false);
      }
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isLoggedIns]);

console.log('islogin--', isLoggedIns);

  const handleLoginRedirect = () => {
    navigate('/auth');
  };

  const callPixelApi = async () => {
    try {
      const url = "https://api.pexels.com/v1/search?query=Beauty+Salon&per_page=100";
      const access_token = '563492ad6f917000010000013cb6a1002c044f51b7aac14f043d6c09';
      axios.get(url, {
        headers: {
          'Authorization': `${access_token}`
        }
      }).then(data => {
        console.log(data);
        setImages(data.data.photos);
      })
    } catch (error) {
      console.error('Error calling Pixel API:', error);
    }
  };

  useEffect(() =>{
    if(loginStatus){
      callPixelApi()
    }
  },[loginStatus])

  return (
    <>
      {loginStatus ? (
        <>
          <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Random Images from Pixels</h1>
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {images.map((image) => (
                <img
                  key={image.id}
                  src={image?.src?.medium}
                  alt={image.alt}
                  style={{ width: '200px', height: '200px', margin: '10px', objectFit: 'cover' }}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
          <Card style={{ width: '25rem' }}>
            <Card.Body>
              <Card.Title>Please first login to access the website!</Card.Title>
              <div className='mt-4 text-center'>
                <Button onClick={handleLoginRedirect}>Login</Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}

    </>
  );
};

export default HomePage;
