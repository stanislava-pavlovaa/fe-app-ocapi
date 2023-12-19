
import './Footer.css';
import useContentAsset from '../../hooks/useContentAsset';

const Footer = () => {
  const { contentAsset } = useContentAsset('ocapi-footer');

  return (
    <footer className='footer d-flex flex-column justify-content-center align-items-center gap-2 p-4'>
      <section dangerouslySetInnerHTML={{ __html: contentAsset }}></section>
      <div className='row italic'>
        RefArch © {new Date().getFullYear()} - All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
