


import Image1 from '#@/images/topics/undraw_Remote_design_team_re_urdx.png';
import Image2 from '#@/images/businesswoman-using-tablet-analysis.jpg';
import Image3 from '#@/images/topics/undraw_Redesign_feedback_re_jvm0.png';
import Image4 from '#@/images/topics/colleagues-working-cozy-office-medium-shot.png';
import Image5 from '#@/images/topics/undraw_online_ad_re_ol62.png';
import Image6 from '#@/images/topics/undraw_Group_video_re_btu7.png';
import Image7 from '#@/images/topics/undraw_viral_tweet_gndb.png';
import Image8 from '#@/images/topics/undraw_Finance_re_gnv2.png';
import Image9 from '#@/images/topics/undraw_Compose_music_re_wpiw.png';
import Image10 from '#@/images/topics/undraw_happy_music_g6wc.png';
import Image11 from '#@/images/topics/undraw_Podcast_audience_re_4i5q.png';
import Image12 from '#@/images/topics/undraw_Graduation_re_gthn.png';
import Image13 from '#@/images/topics/undraw_Educator_re_ju47.png';

import AppLogo from '#@/images/appLogo.png';

const images = [
    { id: 'featured-1', src: Image1, alt: 'Remote Design Team' },
    { id: 'featured-2', src: Image2, alt: 'Businesswoman Tablet Analysis' },
    { id: 'explore-1', src: Image1, alt: 'Remote Design Team' },
    { id: 'explore-2', src: Image3, alt: 'Redesign Feedback' },
    { id: 'explore-3', src: Image4, alt: 'Colleagues Working' },
    { id: 'explore-4', src: Image5, alt: 'Online Ad' },
    { id: 'explore-5', src: Image6, alt: 'Group Video' },
    { id: 'explore-6', src: Image7, alt: 'Viral Tweet' },
    { id: 'explore-7', src: Image8, alt: 'Finace' },
    { id: 'explore-8', src: Image2, alt: 'Businesswoman Using Tablet' },
    { id: 'explore-9', src: Image9, alt: 'Compose Music' },
    { id: 'explore-10', src: Image10, alt: 'Happy Music' },
    { id: 'explore-11', src: Image11, alt: 'Podcast Audience' },
    { id: 'explore-12', src: Image12, alt: 'Graduation' },
    { id: 'explore-13', src: Image13, alt: 'Educator' },
];


export const ImageComponent = ({ id }) => {
    const image = images.find((img) => img.id === id);
    if (!image) return null; 
    return <img src={image.src} className="custom-block-image img-fluid" alt={image.alt} />;
};

export const AppLogoIcon = () => {
    return <img src={AppLogo} alt="App Logo" />
}