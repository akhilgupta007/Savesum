import React from 'react';

const deals = [
  {
    id: 1,
    name: 'BOGO Fresh Greens',
    store: 'Whole Foods Market',
    price: '$15.00',
    image: 'https://images.unsplash.com/photo-1573246123716-6b1782bfc499?auto=format&fit=crop&q=80&w=100&h=100',
  },
  {
    id: 2,
    name: 'Buy One Get One Free Avocados',
    store: "Trader Joe's",
    price: '$3.99',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=100&h=100',
  },
  {
    id: 3,
    name: 'Two for One Organic Apples',
    store: 'Sprouts Farmers Market',
    price: '$6.00',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?auto=format&fit=crop&q=80&w=100&h=100',
  },
  {
    id: 4,
    name: 'Half Price Kale Salad',
    store: 'Earth Fare',
    price: '$7.50',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=100&h=100',
  },
];

const MostUsedDeals = () => {
  return (
    <div className="bg-white border border-[#EBEBEB] rounded-2xl p-6 font-inter h-[400px]">
      <h2 className="text-[15px] font-bold text-[#0A0A0A] mb-4">Most Used Deals</h2>
      <div className="flex flex-col">
        {deals.map((deal, index) => (
          <div 
            key={deal.id} 
            className={`flex items-center justify-between py-4 ${index !== deals.length - 1 ? 'border-b border-[#EBEBEB]' : ''}`}
          >
            <div className="flex items-center gap-4">
              <img src={deal.image} alt={deal.name} className="w-11 h-11 rounded-lg object-cover" />
              <div>
                <h4 className="text-[14px] font-semibold text-[#0A0A0A] leading-tight">{deal.name}</h4>
                <p className="text-[12px] text-[#8C8C8C] mt-1 font-medium">{deal.store}</p>
              </div>
            </div>
            <div className="text-[15px] font-bold text-[#10B981]">
              {deal.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostUsedDeals;
