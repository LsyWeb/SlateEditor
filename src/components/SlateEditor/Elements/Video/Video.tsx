import React, { FC } from 'react'

import "./Video.css";

type ImageProps = {
  attributes: any;
  element: any;
  children: any;
};

const Image:FC<ImageProps> = ({ attributes, element, children }) => {

    const {url,width,height} = element;
  return (
    <div
      {...attributes}
      className='element-video'
      style={{display:'flex',justifyContent:'center'}}
    >
      <div contentEditable={false} style={{width:width,height:height}}>
        <div className='video-wrapper'>
        <iframe src={url} frameBorder="0" title={url}/>
        </div>
      </div>
      {children}
    </div>
  );
};
export default Image;