import React from 'react';

const items = [
  {
    id: 1,
    name: 'Avocado Haas',
    price: '$15.00',
    bgColor: 'bg-[#C7F0D9]',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 2,
    name: 'Oat Milk 1L',
    price: '$7.99',
    bgColor: 'bg-[#FEF5DD]',
    image: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 3,
    name: 'Artisan Bread',
    price: '$12.99',
    bgColor: 'bg-[#FFE8E8]',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 4,
    name: 'Greek yogurt',
    price: '$8.00',
    bgColor: 'bg-[#E5F0FF]',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=200&h=200'
  }
];

const PopularItems = () => {
  return (
    <div className="bg-white border border-[#EBEBEB] rounded-2xl p-6 font-inter h-[400px]">
      <h2 className="text-[15px] font-bold text-[#0A0A0A] mb-4">Popular Items</h2>
      <div className="grid grid-cols-2 gap-4 h-[calc(100%-40px)]">
        {items.map((item) => (
          <div 
            key={item.id}
            className="border border-[#EBEBEB] rounded-2xl p-4 flex flex-col justify-between h-full relative overflow-hidden"
          >
            <div className="z-10">
              <h4 className="text-[14px] font-bold text-[#0A0A0A]">{item.name}</h4>
              <p className="text-[14px] font-bold text-[#005EF8] mt-1">{item.price}</p>
            </div>
            
            {/* The colored background shape with image */}
            <div className={`absolute -bottom-2 -right-2 w-[100px] h-[80px] ${item.bgColor} rounded-tl-[40px] flex items-end justify-end overflow-hidden`}>
               <img 
                 src={item.image} 
                 alt={item.name} 
                 className="w-full h-full object-cover rounded-tl-[40px]" 
               />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularItems;
