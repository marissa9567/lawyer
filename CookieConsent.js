import Cookies from 'js-cookie';

const setMyCookie = () => {
  const consent = Cookies.get('myAwesomeCookieName'); // Check for consent
  if (consent) {
    // Set your cookie only if consent has been given
    Cookies.set('myCookie', 'myValue', { expires: 7 });
  }
};

// Call this function after the user has given consent
export default setMyCookie