import { useEffect } from 'react';

const LinkedInCallback = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    if (accessToken && window.opener) {
      window.opener.postMessage({ type: 'LINKEDIN_TOKEN', token: accessToken }, 'http://localhost:5173');
      window.close();
    }
  }, []);

  return <div>LinkedIn ile giriş yapılıyor...</div>;
};

export default LinkedInCallback; 