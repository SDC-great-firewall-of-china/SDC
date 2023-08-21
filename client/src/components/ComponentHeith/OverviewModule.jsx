import React, { useEffect, useState } from 'react';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import ProductInfo from './ProductInfo/ProductInfo.jsx';
import axios from 'axios';

const OverviewModule = () => {

  const [productData, setProductData] = useState({});
  const [images, setImages] = useState([]);
  const [styles, setStyles] = useState([]);
  const [thumbnail, SetThumbnail] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);





    useEffect(() => {
      axios.get('/api/product')
        .then(response => {
          setProductData(response.data);
        })
        .catch(error => {
          console.error('Error fetching product information:', error);
        });
    }, []);

    useEffect(() => {
      axios.get('/api/images')
        .then(response => {
          const styleImages = response.data.results[0].photos.map(photo => photo.url);
          setImages(styleImages);
          const stylesData = response.data.results;
          setStyles(stylesData);
          const thumbnailImages = response.data.results[0].photos.map(photo => photo.thumbnail_url);
          SetThumbnail(thumbnailImages);

           // Calculate available sizes from styles
        const availableSizesSet = new Set();
        stylesData.forEach(style => {
          Object.keys(style.skus).forEach(skuId=> {
            const size = style.skus[skuId].size;
              availableSizesSet.add(size);
          });
        });
        setAvailableSizes(Array.from(availableSizesSet));


        })
        .catch(error => {
          console.error('Error fetching images:', error);
        });
    }, []);


  return (
    <section className="h-[100vh] bg-[#27272A]">
      <div>
        <nav className="pt-7 pb-3 px-6 text-white text-xl flex flex-col justify-center items-center">
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-[#78716C]">MEN</a></li>
            <li>-</li>
            <li><a href="#" className="hover:text-[#78716C]">WOMEN</a></li>
            <li>-</li>
            <li><a href="#" className="hover:text-[#78716C]">SPORT</a></li>
            <li>-</li>
            <li><a href="#" className="hover:text-[#78716C]">BEAUTY</a></li>
            <li>-</li>
            <li><a href="#" className="hover:text-[#78716C]">HOME</a></li>
            <li>-</li>
            <li><a href="#" className="hover:text-[#78716C]">SALE</a></li>
          </ul>
        </nav>
        <h1 className="text-white pb-8 flex flex-col justify-center items-center">Free Shipping over $100 ~ Become a ÉLIER Member ~ ÉLIER x thredUP</h1>
      </div>

      <div className="flex">
        <div className="w-2/3">
          <ImageGallery images={images} thumbnail={thumbnail} />
        </div>

        <div className="w-1/3 ">
          <ProductInfo productData={productData}
          styles ={styles}
          setImages={setImages}
          SetThumbnail={SetThumbnail}
          availableSizes={availableSizes}
          />
        </div>
      </div>
    </section>
  );
};

export default OverviewModule;

