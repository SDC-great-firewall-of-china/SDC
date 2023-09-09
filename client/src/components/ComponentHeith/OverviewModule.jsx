import React, { useEffect, useState } from 'react';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import ProductInfo from './ProductInfo/ProductInfo.jsx';
import { AiOutlineClose, AiOutlineMenu, AiFillShopping } from 'react-icons/ai';
import axios from 'axios';

const OverviewModule = () => {


  const [productData, setProductData] = useState({});
  const [images, setImages] = useState([]);
  const [styles, setStyles] = useState([]);
  const [thumbnail, SetThumbnail] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [nav, setNav] = useState(true);

  // Function to toggle the navigation menu
  const handleNav = () => {
    setNav(!nav);
  }

  // Fetch product data using Axios when the component mounts
  useEffect(() => {
    axios.get('/api/product')
      .then(response => {
        console.log(response);
        setProductData(response.data);
      })
      .catch(error => {
        console.error('Error fetching product information:', error);
      });
  }, []);

  // Fetch image data using Axios when the component mounts
  useEffect(() => {
    axios.get('/api/images')
      .then(response => {
        console.log(response);
        const styleImages = response.data.results[0].photos.map(photo => photo.url);
        setImages(styleImages);
        const stylesData = response.data.results;
        setStyles(stylesData);
        const thumbnailImages = response.data.results[0].photos.map(photo => photo.thumbnail_url);
        SetThumbnail(thumbnailImages);

        // Calculate available sizes from styles
        const availableSizesSet = new Set();
        stylesData.forEach(style => {
          Object.keys(style.skus).forEach(skuId => {
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

  // Render the component's JSX
  return (
    <section className=" bg-[#27272A]">
      <div>
        {/* Navigation menu for larger screens */}
        <nav className="hidden pt-7 pb-3 px-6 text-white text-xl md:flex flex-col justify-center items-center space-y-3 md:space-y-0 md:flex-row">
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

        <h1 className="hidden text-white pb-8 md:flex flex-col justify-center items-center md:text-left">Free Shipping over $100 ~ Become a ÉLIER Member ~ ÉLIER x thredUP</h1>

        {/* Hamburger menu for smaller screens */}
        <div onClick={handleNav} className='md:hidden text-white flex justify-between items-center p-4'>
          <h1 className="text-white text-xl font-bold tracking-widest ">ÉLIER</h1>
          {!nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
        </div>

        {/* Side navigation menu for smaller screens */}
        {!nav && (
          <div className='fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 text-white bg-[#27272A] ease-in-out duration-500  z-50'>
            <ul className="pt-24 uppercase ">
              <li className='p-4 border-b border-white'><a href="/">Home</a></li>
              <li className='p-4 border-b border-white'><a href="/">Shop</a></li>
              <li className='p-4 border-b border-white'><a href="/">About</a></li>
              <li className='p-4 border-b border-white'><a href="/">Contact</a></li>
            </ul>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3">
          <ImageGallery images={images} thumbnail={thumbnail} />
        </div>

        {/* Render product information */}
        <div className="w-full md:w-1/3 mt-4 md:mt-0">
          <ProductInfo productData={productData}
            styles={styles}
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

