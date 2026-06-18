import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Upload, ImagePlus, X, Camera } from 'lucide-react';
import StoreSelect from './StoreSelect';
import RewardTypeSelect from './RewardTypeSelect';
import CouponTypeSelect from './CouponTypeSelect';

const CreateDealForm = ({ formData, setFormData }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const processImageFile = (file) => {
    if (!file) return;
    if (!file.type.match('image.*')) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, img: reader.result, imgFile: file, imgName: file.name }));
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e) => {
    processImageFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processImageFile(e.dataTransfer.files[0]);
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setFormData(prev => ({ ...prev, img: null, imgFile: null, imgName: null }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const fileInputRef = useRef(null);

  return (
    <div className="flex flex-col gap-6 w-full font-inter pb-32">

      {/* ITEM INFORMATION */}
      <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 shadow-sm">
        <h3 className="text-[13px] font-bold text-[#0A0A0A] tracking-wider mb-6">ITEM INFORMATION</h3>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#0A0A0A]">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              placeholder="e.g. Pain Relief Caplets"
              className="w-full px-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#0A0A0A]">UPC Code</label>
            <input
              type="text"
              name="upc"
              value={formData.upc || ''}
              onChange={handleInputChange}
              placeholder="012345678901"
              className="w-full px-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-semibold text-[#0A0A0A]">Product Image</label>

          {formData.img ? (
            /* ── PREVIEW STATE ── */
            <div className="relative w-full h-[200px] rounded-2xl overflow-hidden group shadow-md border border-[#EBEBEB]">
              {/* Blurred background fill */}
              <div
                className="absolute inset-0 scale-110"
                style={{ backgroundImage: `url(${formData.img})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(20px) brightness(0.6)' }}
              />
              {/* Crisp centred image */}
              <img
                src={formData.img}
                alt="Product Preview"
                className="relative z-10 w-full h-full object-contain drop-shadow-xl"
              />
              {/* Glass overlay on hover */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-black/0 group-hover:bg-black/50 transition-all duration-300 backdrop-blur-0 group-hover:backdrop-blur-sm">
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 text-[#0A0A0A] text-[13px] font-semibold shadow-lg hover:bg-white transition-colors"
                  >
                    <Camera size={15} strokeWidth={2} />
                    Change Photo
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-2 rounded-xl bg-red-500/90 text-white shadow-lg hover:bg-red-600 transition-colors"
                    title="Remove image"
                  >
                    <X size={15} strokeWidth={2.5} />
                  </button>
                </div>
                {formData.imgName && (
                  <p className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-[11px] text-white/80 font-medium truncate max-w-[80%]">
                    {formData.imgName}
                  </p>
                )}
              </div>
              <input type="file" accept="image/png, image/jpeg" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
            </div>
          ) : (
            /* ── UPLOAD STATE ── */
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative w-full h-[200px] rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 flex flex-col items-center justify-center gap-3
                ${ isDragging
                  ? 'border-2 border-[#005EF8] bg-[#E8F0FE]/60 scale-[1.01]'
                  : 'border-2 border-dashed border-[#D1D5DC] bg-gradient-to-br from-[#F9FAFB] to-[#F0F4FF] hover:border-[#005EF8] hover:from-[#EEF4FF] hover:to-[#E8F0FE]'
                }`}
            >
              {/* Decorative blobs */}
              <div className="absolute top-[-20px] right-[-20px] w-32 h-32 rounded-full bg-[#005EF8]/5 pointer-events-none" />
              <div className="absolute bottom-[-20px] left-[-20px] w-24 h-24 rounded-full bg-[#005EF8]/5 pointer-events-none" />

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-all duration-300 ${
                isDragging ? 'bg-[#005EF8] text-white scale-110' : 'bg-white text-[#005EF8]'
              }`}>
                {isDragging ? <Upload size={26} strokeWidth={2} /> : <ImagePlus size={26} strokeWidth={1.5} />}
              </div>

              {/* Text */}
              <div className="text-center">
                <p className="text-[14px] font-semibold text-[#0A0A0A]">
                  {isDragging ? 'Drop it here!' : <><span className="text-[#005EF8]">Click to upload</span> or drag & drop</>}
                </p>
                <p className="text-[12px] text-[#6A7282] mt-1">PNG, JPG — Max 5MB</p>
              </div>

              <input type="file" accept="image/png, image/jpeg" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
            </div>
          )}
        </div>
      </div>

      {/* RETAILER PRICING */}
      <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 shadow-sm">
        <h3 className="text-[13px] font-bold text-[#0A0A0A] tracking-wider mb-6">RETAILER PRICING</h3>

        <div className="flex flex-col gap-2 mb-6">
          <label className="text-[13px] font-semibold text-[#0A0A0A]">Store/Retailer</label>
          <StoreSelect
            value={formData.store || ''}
            onChange={(storeName) => setFormData(prev => ({ ...prev, store: storeName }))}
          />
          {formData.store === 'Others' && (
            <input
              type="text"
              name="customStoreName"
              placeholder="Enter store name"
              value={formData.customStoreName || ''}
              onChange={handleInputChange}
              className="mt-2 w-full px-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#0A0A0A]">Retail Price</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#6A7282]">$</div>
              <input
                type="number"
                step="0.01"
                min="0"
                name="retail"
                value={formData.retail || ''}
                onChange={handleInputChange}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* OFFER DETAILS */}
      <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 shadow-sm relative z-20">
        <h3 className="text-[13px] font-bold text-[#0A0A0A] tracking-wider mb-6">OFFER DETAILS</h3>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#0A0A0A]">Coupon Amount</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#6A7282]">$</div>
              <input
                type="number"
                step="0.01"
                min="0"
                name="coupon"
                value={formData.coupon || ''}
                onChange={handleInputChange}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
              />
            </div>
          </div>

          <CouponTypeSelect
            value={formData.couponType || ''}
            onChange={(option) => setFormData(prev => ({ ...prev, couponType: option }))}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#0A0A0A]">Reward Amount</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#6A7282]">$</div>
              <input
                type="number"
                step="0.01"
                min="0"
                name="reward"
                value={formData.reward || ''}
                onChange={handleInputChange}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CAMPAIGN SCHEDULING */}
      <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 shadow-sm z-10">
        <h3 className="text-[13px] font-bold text-[#0A0A0A] tracking-wider mb-6">CAMPAIGN SCHEDULING</h3>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#0A0A0A]">Start Date</label>
            <div className="relative">
              <input
                type="date"
                name="startDate"
                value={formData.startDate || ''}
                min={new Date().toISOString().split('T')[0]}
                onChange={handleInputChange}
                className="w-full pl-4 pr-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8] bg-white"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#0A0A0A]">End Date</label>
            <div className="relative">
              <input
                type="date"
                name="endDate"
                value={formData.endDate || ''}
                min={formData.startDate || new Date().toISOString().split('T')[0]}
                onChange={handleInputChange}
                className="w-full pl-4 pr-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8] bg-white"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CreateDealForm;
