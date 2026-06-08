import React from 'react';
import googleIcon from '@/assets/icon-google.svg';
import appleIcon from '@/assets/icon-apple.svg';
import SocialButton from './SocialButton';

const SocialLogin = () => {
  const handleSocialLogin = (provider) => {
    // TODO: Wire up OAuth provider
    console.log(`Initiating ${provider} OAuth flow`);
  };

  return (
    <div className="flex gap-4 w-full">
      <SocialButton
        provider="Google"
        iconSrc={googleIcon}
        onClick={() => handleSocialLogin('Google')}
      />
      <SocialButton
        provider="Apple"
        iconSrc={appleIcon}
        onClick={() => handleSocialLogin('Apple')}
      />
    </div>
  );
};

export default SocialLogin;
