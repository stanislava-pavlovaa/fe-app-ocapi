import './Footer.css';
import useContentAsset from '../../hooks/useContentAsset';
import { replaceAnchorTags } from '../../utils/ContentAssetsHelper';

const Footer = () => {
  const { contentAsset } = useContentAsset('ocapi-footer');

  if (!contentAsset) {
    return null; 
  }

  const parsedContent = replaceAnchorTags(contentAsset);

  return (
    <footer className='footer d-flex flex-column justify-content-center align-items-center gap-2 p-4'>
      <div>{parsedContent}</div>
      <div className='row italic'>
        RefArch © {new Date().getFullYear()} - All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
