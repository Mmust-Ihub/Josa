import React from 'react';
import { IoTimeOutline } from "react-icons/io5";
import OtherCategories from './OtherCategories';
// import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';




function MainCatNews(props) {
    const title = props.title;
    const slug = props.slug
    const category = props.category;
    const headline = props.headline;
    const image = props.image;
    const published_on = props.published_on;
    const url = `/${category}/${slug}`;
  return (
    <div className='mt-8 flex flex-2 md:flex-row flex-col w-full gap-3 h-fit  bg-slate-100 rounded-lg p-5 min-w-screen max-h-max  ' >

     <div className='rounded-lg p-1 md:min-w-[300px] max-w-[350px] border-2 '>
       <img src={image}className='w-full'/>
       </div>

      <div>
        <h1 className='max-w-1/2 font-bold '><Link to={url} className='hover:text-purple-700'>{title}</Link></h1>
        <p>{headline}</p>
        <p className='font-light tracking-wide p-8 text-[12px] text-right'>{published_on}</p>
      </div>
    </div>
  )
}

export default MainCatNews