import React from 'react'

const Logo: React.FC = () => {
  return (
    <div className="ways2spain-admin-logo">
      <img 
        src="/admin-assets/logo-light.svg" 
        alt="Ways2Spain Logo" 
        className="logo-light" 
      />
      <img 
        src="/admin-assets/logo-dark.svg" 
        alt="Ways2Spain Logo" 
        className="logo-dark" 
      />
      <style dangerouslySetInnerHTML={{
        __html: `
          .ways2spain-admin-logo {
            display: flex;
            align-items: center;
            height: 100%;
          }
          .ways2spain-admin-logo img {
            max-height: 48px;
            width: auto;
          }
          .logo-light { display: block; }
          .logo-dark { display: none; }
          html[data-theme="dark"] .logo-light { display: none; }
          html[data-theme="dark"] .logo-dark { display: block; }
        `
      }} />
    </div>
  )
}

export default Logo
