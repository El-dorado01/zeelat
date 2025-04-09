import React, { useEffect, useState } from 'react'

const SharedButtons = () => {
    const [currentUrl, setCurrentUrl] = useState("");
    const title = 'Unlock Your Potential: Enroll Now and Start Your Journey to Academic Excellence!'

  // Get the current URL client-side
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

    // Encode the URL for safe sharing
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);
  const whatsappText = encodeURIComponent(`${title} - ${currentUrl}`);

  // Social media share URLs
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${whatsappText}`,
  };

  // Open share link in a new tab
  const handleShare = (platform) => {
    window.open(shareUrls[platform], "_blank", "noopener,noreferrer");
  };

  return (
      <div className="social-share d-flex">
          <p className="me-4 text-white">Share:</p>

          <ul className="social-icon">
              <li className="social-icon-item">
                  <a onClick={() => handleShare('twitter')} className="social-icon-link bi-twitter"></a>
              </li>

              <li className="social-icon-item">
                  <a onClick={() => handleShare('facebook')} className="social-icon-link bi-facebook"></a>
              </li>

              <li className="social-icon-item">
                  <a onClick={() => handleShare('whatsapp')} className="social-icon-link bi-whatsapp"></a>
              </li>
          </ul>

          {/* <a href="#" className="custom-icon bi-bookmark ms-auto"></a> */}
      </div>
  );
}

export default SharedButtons