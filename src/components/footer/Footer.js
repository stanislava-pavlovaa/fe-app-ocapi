
import './Footer.css';
import useContentAsset from '../../hooks/useContentAsset';

const Footer = () => {
  const { contentAsset } = useContentAsset('ocapi-footer');

  return (
    <footer className='footer'>
      <section dangerouslySetInnerHTML={{ __html: contentAsset }}></section>
      <div className='row italic'>
        FitFusion Footwear © {new Date().getFullYear()} - All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
