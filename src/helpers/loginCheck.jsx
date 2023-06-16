import Cookies from 'universal-cookie';

const loginCheck = () => {
    const cookies = new Cookies();
    let loggedIn = false;
  
    const loginStatus = cookies.get('userAuth')?.token != null;
  
    if(loggedIn !== loginStatus) {loggedIn = loginStatus};
  
  return loggedIn;
}

export default loginCheck