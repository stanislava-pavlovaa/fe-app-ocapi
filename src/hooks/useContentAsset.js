import { get } from '../service/ocapiService';
import { getContentEndpoint } from '../endpoints/shopApi';

import { useEffect, useState } from 'react';

const getContentAsset = async (cid) => {
  const asset = await get(getContentEndpoint(cid));
  return asset.c_body;
};

const useContentAsset = (cid) => {
  const [contentAsset, setContentAsset] = useState(null);

  useEffect(() => {
    const fetchAsset = async () => {
      const asset = await getContentAsset(cid);
      setContentAsset(asset);
    };
    fetchAsset();
}, [cid]);

  return { contentAsset };
};

export default useContentAsset;
