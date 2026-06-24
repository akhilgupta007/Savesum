import React, { useState, useRef, useEffect } from 'react';
import { X, Calendar, Plus } from 'lucide-react';
import { useUpdateDeal } from '../hooks/useUpdateDeal';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import StoreSelect from './StoreSelect';
import RewardTypeSelect from './RewardTypeSelect';
import CouponTypeSelect from './CouponTypeSelect';
import dayjs from 'dayjs';
import UniversalLoader from '@/components/shared/UniversalLoader/UniversalLoader';
import { fetchDealById } from '../services/deals.service';
import toast from 'react-hot-toast';

const formatCouponTypeForForm = (couponType) => {
  if (couponType === 'percentage' || couponType === 'flat') return 'Custom';
  return couponType || 'Custom';
};

const EditDealModal = ({ isOpen, onClose, deal }) => {
  const queryClient = useQueryClient();
  const { mutate: updateDeal, isPending: isUpdating } = useUpdateDeal();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [savingType, setSavingType] = useState(null);

  const dealId = deal?._id || deal?.id;

  const {
    data: dealDetailsResponse,
    isLoading: isLoadingDealDetails,
  } = useQuery({
    queryKey: ['deal', dealId],
    queryFn: () => fetchDealById(dealId),
    enabled: isOpen && !!dealId,
    staleTime: 0,
  });

  const dealDetails = dealDetailsResponse?.data || dealDetailsResponse || deal;

  useEffect(() => {
    if (dealDetails && isOpen) {
      setFormData({
        productName: dealDetails.productName || '',
        upcCode: dealDetails.upcCode || '',
        store: dealDetails.store?.name || dealDetails.storeName || dealDetails.store || '',
        retailPrice: dealDetails.retailPrice || '',
        couponAmount: dealDetails.couponAmount || '',
        couponType: formatCouponTypeForForm(dealDetails.couponType),
        rewardName: dealDetails.rewardName || '',
        rewardAmount: dealDetails.rewardAmount || '',
        startDate: dealDetails.startDate ? dayjs(dealDetails.startDate).format('YYYY-MM-DD') : '',
        endDate: dealDetails.endDate ? dayjs(dealDetails.endDate).format('YYYY-MM-DD') : '',
      });
      setImagePreview(dealDetails.productImageUrl || null);
      setImageFile(null);
    }
  }, [dealDetails, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (isDraft) => {
    if (formData.retailPrice !== undefined && Number(formData.retailPrice) <= 0) {
      toast.error('Retail Price must be greater than 0');
      return;
    }

    if (isDraft === true) setSavingType('draft');
    else if (isDraft === false) setSavingType('publish');
    else setSavingType('update');

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'store') return; // Handled separately below

      if (formData[key] !== '' && formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    if (formData.store) {
      const actualStoreName = formData.store === 'Others' ? formData.customStoreName : formData.store;
      if (actualStoreName) {
        data.append('storeName', actualStoreName);
      }
      
      if (formData.store !== 'Others') {
        // Match store name to id via cache
        const storesCache = queryClient.getQueryData(['stores']);
        const cacheList = storesCache?.data || [];
        const foundStore = cacheList.find(s => s.name.toLowerCase() === formData.store.toLowerCase());
        if (foundStore) {
          data.append('storeId', foundStore._id);
        }
      }
    }
    
    if (imageFile) {
      data.append('productImage', imageFile);
    }
    
    if (isDraft !== undefined) {
      data.append('isDraft', isDraft ? 'true' : 'false');
    }

    updateDeal({ id: deal._id || deal.id, formData: data }, {
      onSuccess: () => {
        onClose();
      },
      onSettled: () => setSavingType(null)
    });
  };

  if (!isOpen) return null;

  if (isLoadingDealDetails && !dealDetails) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center font-inter">
        <div className="absolute inset-0 bg-[#0A0A0A] bg-opacity-40" onClick={onClose} />
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-[700px] mx-4 overflow-hidden flex flex-col">
          <UniversalLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-inter">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0A0A0A] bg-opacity-40"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-[700px] mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#EBEBEB]">
          <h2 className="text-[16px] font-bold text-[#0A0A0A] tracking-wider uppercase">
            Edit Deal
          </h2>
          <button 
            onClick={onClose}
            className="text-[#0A0A0A] hover:text-gray-500 transition-colors"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 flex flex-col gap-6 overflow-y-auto flex-1">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#0A0A0A]">Product Name</label>
              <input 
                type="text" 
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                placeholder="e.g. Pain Relief Caplets"
                className="w-full px-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#0A0A0A]">UPC Code</label>
              <input 
                type="text" 
                name="upcCode"
                value={formData.upcCode}
                onChange={handleInputChange}
                placeholder="012345678901"
                className="w-full px-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#0A0A0A]">Store</label>
              <input
                type="text"
                value={formData.store || ''}
                disabled
                className="w-full px-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#6A7282] bg-[#F9FAFB] cursor-not-allowed focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#0A0A0A]">Retail Price</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#6A7282]">$</div>
                <input 
                  type="number" 
                  step="0.01"
                  name="retailPrice"
                  value={formData.retailPrice}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className={`w-full pl-8 pr-4 py-2.5 border rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none ${
                    formData.retailPrice !== undefined && formData.retailPrice !== '' && Number(formData.retailPrice) <= 0 
                    ? 'border-[#B00020] focus:border-[#B00020]' 
                    : 'border-[#EBEBEB] focus:border-[#005EF8]'
                  }`}
                />
              </div>
              {formData.retailPrice !== undefined && formData.retailPrice !== '' && Number(formData.retailPrice) <= 0 && (
                <span className="text-[12px] text-[#B00020] mt-1">Retail Price must be greater than 0</span>
              )}
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#0A0A0A]">Coupon Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#6A7282]">$</div>
                <input 
                  type="number" 
                  step="0.01"
                  name="couponAmount"
                  value={formData.couponAmount}
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

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#0A0A0A]">Reward Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#6A7282]">$</div>
                <input 
                  type="number" 
                  step="0.01"
                  name="rewardAmount"
                  value={formData.rewardAmount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
                />
              </div>
            </div>
          </div>

          {/* Row 5: Complex layout with Dates and Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left side: Dates */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-[#0A0A0A]">Start Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full pl-4 pr-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-[#0A0A0A]">End Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full pl-4 pr-4 py-2.5 border border-[#EBEBEB] rounded-lg text-[14px] text-[#0A0A0A] placeholder-[#6A7282] focus:outline-none focus:border-[#005EF8]"
                  />
                </div>
              </div>
            </div>

            {/* Right side: Image Uploader */}
            <div className="flex flex-col gap-2 h-full">
              <label className="text-[13px] font-semibold text-[#0A0A0A]">Update Product Image</label>
              <div className="flex gap-4 flex-1">
                {/* Existing Image Thumbnail */}
                <div className="w-[120px] bg-[#EBEBEB] rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={imagePreview || "https://images.unsplash.com/photo-1584308666744-24d5e4b6e58b?w=80&h=80&fit=crop"} 
                    alt="Product" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Drag and Drop Zone */}
                <div 
                  className="flex-1 border border-dashed border-[#D1D5DC] rounded-xl flex flex-col items-center justify-center p-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer relative overflow-hidden"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-10 h-10 bg-[#E8F0FE] rounded-full flex items-center justify-center text-[#005EF8] mb-3">
                    <Plus size={20} strokeWidth={2.5} />
                  </div>
                  <p className="text-[12px] font-medium text-[#0A0A0A] text-center leading-tight">
                    Drag & drop product photo or <span className="text-[#005EF8]">Browse</span>
                  </p>
                  <p className="text-[11px] text-[#6A7282] mt-1 text-center">
                    Supports PNG, JPG (Max 5MB)
                  </p>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-4 px-8 py-6 border-t border-[#EBEBEB] bg-white">
          <button 
            onClick={onClose}
            disabled={isUpdating}
            className="flex-1 py-3 border border-[#B00020] text-[#B00020] rounded-xl text-[14px] font-semibold hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          
          {deal?.isDraft ? (
            <>
              <button 
                onClick={() => handleSubmit(true)}
                disabled={isUpdating}
                className="flex-1 py-3 bg-white border border-[#005EF8] text-[#005EF8] rounded-xl text-[14px] font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isUpdating && savingType === 'draft' ? 'Saving...' : 'Save as Draft'}
              </button>
              <button 
                onClick={() => handleSubmit(false)}
                disabled={isUpdating}
                className="flex-1 py-3 bg-[#005EF8] text-white rounded-xl text-[14px] font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isUpdating && savingType === 'publish' ? 'Publishing...' : 'Publish Deal'}
              </button>
            </>
          ) : (
            <button 
              onClick={() => handleSubmit(undefined)}
              disabled={isUpdating}
              className="flex-1 py-3 bg-[#005EF8] text-white rounded-xl text-[14px] font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isUpdating && savingType === 'update' ? 'Updating...' : 'Update Deal'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditDealModal;

