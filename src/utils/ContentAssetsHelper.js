import React from 'react';
import { Link } from 'react-router-dom';
import parse, { domToReact} from 'html-react-parser';

export const replaceAnchorTags = (htmlString) => {
  const options = {
    replace: (domNode) => {
      if (domNode.name === 'a' && domNode.attribs.href) {
        return (
          <Link to={domNode.attribs.href} className={domNode.attribs.class}>
            {domToReact(domNode.children, options)}
          </Link>
        );
      }
    },
  };

  return parse(htmlString, options);
};
