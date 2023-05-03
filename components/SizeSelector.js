import React, { useState } from 'react'

const sizes = ['S', 'M', 'L', 'XL'];

const SizeSelector = () => {

  const [sizeSelected, setSizeSelected] = useState('S');

  const handleSizeSelected = (size) => {
    setSizeSelected(size === sizeSelected ? '' : size);
  }

  return (
    <div className='flex gap-2'>
      {sizes.map((size) => (
        <p key={size} onClick={() => handleSizeSelected(size)} className={`rounded-lg px-5 py-1 cursor-pointer ${sizeSelected === size ? 'bg-black text-white' : 'bg-white'}`}>
            {size}
        </p>
      ))}
    </div>
  )
}

export default SizeSelector
