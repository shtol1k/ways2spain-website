import React from 'react'

const Icon: React.FC = () => {
  return (
    <div className="ways2spain-admin-icon">
      <img 
        src="/admin/icon.svg" 
        alt="Ways2Spain Icon" 
      />
      <style dangerouslySetInnerHTML={{
        __html: `
          .ways2spain-admin-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4px;
          }
          .ways2spain-admin-icon img {
            max-width: 32px;
            max-height: 32px;
            width: auto;
          }
        `
      }} />
    </div>
  )
}

export default Icon
