import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='container px-4 2xl:p-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={assets.vite_logo} alt="NaukriVerse Symbol" height={40} width={40} />
          <span className="font-bold text-xl ml-2">NaukriVerse</span>
        </div>
        <p className='flex-1 border-1 border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>
            Copyright @NaukriVerse.com | All rights reserved.
        </p>
        <div className='flex gap-2.5'>
            <img width={38} src={assets.facebook_icon} alt="" />
            <img width={38} src={assets.twitter_icon} alt="" />
            <img width={38} src={assets.instagram_icon} alt="" />
        </div>
    </div>
  )
}

export default Footer