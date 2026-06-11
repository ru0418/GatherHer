/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Sparkles, 
  Award, 
  Coins, 
  ShieldCheck, 
  Compass, 
  Leaf, 
  Flame, 
  Package, 
  ArrowUpRight, 
  ShoppingBag,
  Ticket,
  CheckCircle2,
  X,
  Lock
} from "lucide-react";
import { RewardItem, UserProfile } from "../types";

interface RewardMarketplaceProps {
  userProfile: UserProfile;
  rewardItems: RewardItem[];
  onRedeemReward: (id: string, costPoints: number) => void;
}

export default function RewardMarketplace({ 
  userProfile, 
  rewardItems, 
  onRedeemReward 
}: RewardMarketplaceProps) {
  const [activeCategory, setActiveCategory] = useState<string>("全部");
  const [successRedemption, setSuccessRedemption] = useState<{
    title: string;
    code: string;
  } | null>(null);
  const [errorText, setErrorText] = useState("");

  const filteredItems = rewardItems.filter((item) => {
    return activeCategory === "全部" || item.category === activeCategory;
  });

  const handleRedeem = (item: RewardItem) => {
    setErrorText("");
    if (userProfile.points < item.pointsRequired) {
      setErrorText(`哎呀！累積積分還不足，需要 ${item.pointsRequired} 點，妳目前為 ${userProfile.points} 點。多去首頁參與或發起活動吧！`);
      setTimeout(() => setErrorText(""), 4000);
      return;
    }
    if (item.stock <= 0) {
      setErrorText("這個商品太熱門了，目前已被兌換一空！");
      setTimeout(() => setErrorText(""), 3000);
      return;
    }

    // Generate simulated unique serial
    const code = `GHER-${item.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Trigger master state points deduction
    onRedeemReward(item.id, item.pointsRequired);
    
    // Success notification dialog
    setSuccessRedemption({
      title: item.title,
      code
    });
  };

  // Badge icon component mapping
  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="h-6 w-6 text-emerald-600" />;
      case "Compass":
        return <Compass className="h-6 w-6 text-amber-600" />;
      case "Leaf":
        return <Leaf className="h-6 w-6 text-sage-600" />;
      case "Flame":
        return <Flame className="h-6 w-6 text-orange-600" />;
      default:
        return <Award className="h-6 w-6 text-sage-650" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Premium Dashboard Header Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* User Card: Level, Points */}
        <div className="bg-gradient-to-tr from-sage-700 via-sage-800 to-sage-900 rounded-2xl p-5 text-white shadow-md space-y-4 md:col-span-2 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 opacity-10 font-sans font-bold text-7xl select-none">
            HER
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-sage-200 font-light tracking-wide uppercase">尊榮會員等級</p>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold">鼠尾草行者 · LEVEL 2</span>
                <span className="bg-white/20 text-white text-xxs px-2 py-0.5 rounded-full backdrop-blur-xs font-semibold">
                  青翠山林
                </span>
              </div>
            </div>
            
            {/* Wallet styling */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-2 rounded-xl flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-400 animate-bounce" />
              <div>
                <p className="text-xxs text-sage-200 font-light">現有可用積分</p>
                <p className="text-base font-extrabold font-mono tracking-tight text-white">{userProfile.points} P</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs text-sage-200">
              <span className="font-light">升級至 LEVEL 3 (百岳森之女)：520P / 800P</span>
              <span className="font-semibold font-mono">65%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full transition-all duration-500"
                style={{ width: "65%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Member quick stats */}
        <div className="bg-white rounded-2xl p-4 border border-sage-100 shadow-xs flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-sage-500 uppercase tracking-wide">累計探險統計</h3>
            <p className="text-xl font-bold text-sage-900">3 次出行、120k 紀錄</p>
          </div>
          <div className="space-y-1">
            <span className="text-xxs text-sage-600 block font-light">
              每一場真實成行可額外加權獲得合作品牌 1.2x 生態圈優惠折抵。
            </span>
          </div>
          <div className="flex gap-2">
            <span className="inline-flex items-center px-2 py-1 rounded text-xxs font-medium bg-sage-50 text-sage-600 border border-sage-200/50">
              🔰 安全旅行險覆蓋
            </span>
          </div>
        </div>
      </div>

      {/* error message bar if any */}
      {errorText && (
        <div className="bg-terracotta-light border border-terracotta/30 text-terracotta text-xs p-3.5 rounded-xl animate-bounce">
          {errorText}
        </div>
      )}

      {/* Growth Badges Section (成長徽章) */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold text-sage-900 font-sans flex items-center gap-1.5">
            <Award className="h-4 w-4 text-sage-600" /> 
            我的成長徽章 (Growth Badges)
          </h2>
          <span className="text-xs text-sage-600 font-light">已解鎖 3 / 4</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {userProfile.unlockedBadges.map((badge) => (
            <div 
              key={badge.id}
              className="bg-white rounded-xl p-3 border border-sage-100 shadow-xxs font-sans text-center flex flex-col items-center space-y-1.5 group hover:border-sage-200 transition-all cursor-default"
            >
              <div className="p-3 bg-sage-50 rounded-full transform group-hover:scale-105 transition-transform">
                {getBadgeIcon(badge.icon)}
              </div>
              <p className="text-xs font-semibold text-sage-800">{badge.name}</p>
              <p className="text-xxs text-sage-600 font-light line-clamp-2 leading-relaxed h-7">
                {badge.description}
              </p>
              <span className="text-xxs text-sage-400 font-light font-mono pt-1">
                {badge.unlockedAt} 解鎖
              </span>
            </div>
          ))}

          {/* Locked badge example for completeness! */}
          <div 
            className="bg-sage-50/50 rounded-xl p-3 border border-dashed border-sage-200 font-sans text-center flex flex-col items-center justify-center space-y-1.5 grayscale opacity-60"
          >
            <div className="p-3 bg-white rounded-full">
              <Lock className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-xs font-semibold text-gray-500">營火守護君</p>
            <p className="text-xxs text-gray-500 font-light shrink-0 leading-relaxed max-w-[120px]">
              成功發起兩場露營/野營相關揪團解鎖
            </p>
            <span className="text-xxs text-gray-400 font-light pt-1">
              未達標
            </span>
          </div>
        </div>
      </div>

      {/* Marketplace Market items with tabbed filter */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sage-100 pb-2">
          <h2 className="text-sm font-bold text-sage-900 font-sans flex items-center gap-1.5">
            <ShoppingBag className="h-4 w-4 text-sage-600" /> 
            全女性專屬兌換商城 (Reward Marketplace)
          </h2>
          
          <div className="flex gap-1">
            {["全部", "戶外裝備", "女性用品", "聯名好禮"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  activeCategory === cat
                    ? "bg-sage-600 text-white shadow-xs"
                    : "bg-white text-sage-700 border border-sage-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Goods Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const hasEnough = userProfile.points >= item.pointsRequired;
            return (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl border border-sage-100 shadow-xs hover:shadow-xs transition-all overflow-hidden flex flex-col h-full"
              >
                <div className="h-44 bg-sage-50 relative overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-xxs font-semibold bg-white/90 text-sage-800 shadow-sm">
                    {item.category}
                  </span>
                  {item.stock <= 5 && item.stock > 0 && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-xxs font-semibold bg-terracotta text-white shadow-sm">
                      緊張！剩餘 {item.stock} 件
                    </span>
                  )}
                  {item.stock === 0 && (
                    <span className="absolute inset-0 bg-black/50 text-white font-bold flex items-center justify-center">
                      已全數兌完
                    </span>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3 font-sans">
                  <div className="space-y-1">
                    <p className="text-xxs text-sage-500 font-medium tracking-wide uppercase">{item.brand}</p>
                    <h3 className="text-xs font-bold text-sage-800 line-clamp-1 leading-snug">{item.title}</h3>
                    <p className="text-xxs text-sage-600 font-light line-clamp-2 h-7 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-sage-50 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Coins className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-black font-mono text-sage-800">{item.pointsRequired} <span className="text-xs font-normal">P</span></span>
                    </div>

                    <button
                      onClick={() => handleRedeem(item)}
                      disabled={item.stock === 0}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                        item.stock === 0
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : hasEnough
                            ? "bg-sage-600 hover:bg-sage-700 text-white shadow-xs"
                            : "bg-sage-50 hover:bg-sage-100 text-sage-600 border border-sage-200"
                      }`}
                    >
                      {item.stock === 0 ? "兌換完畢" : hasEnough ? "立即兌換" : "積分不足"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Redeemed History center (兌換紀錄與序號核銷) */}
      <div className="bg-white rounded-2xl p-5 border border-sage-100 shadow-xs space-y-4">
        <h3 className="text-xs font-bold text-sage-800 uppercase tracking-wide flex items-center gap-1.5 border-b border-sage-50 pb-2">
          <Ticket className="h-4 w-4 text-sage-600" /> My Wallet / 兌換實體票券庫 ({userProfile.redeemedRewards.length})
        </h3>

        {userProfile.redeemedRewards.length === 0 ? (
          <p className="text-xs text-sage-500 font-light py-2">目前尚無兌換記錄，快去參與活動累積積分吧！</p>
        ) : (
          <div className="space-y-2">
            {userProfile.redeemedRewards.map((rev) => (
              <div 
                key={rev.id} 
                className="flex items-center justify-between p-3 bg-sage-50/55 rounded-xl border border-sage-100 text-xs gap-3"
              >
                <div>
                  <h4 className="font-semibold text-sage-800">{rev.rewardTitle}</h4>
                  <p className="text-xxs text-sage-500 font-light">核銷日期 : {rev.redeemedDate}</p>
                </div>
                
                <div className="text-right">
                  <span className="inline-block bg-white border border-sage-200 text-sage-800 font-mono font-bold text-xxs px-2.5 py-1 rounded shadow-xs select-all">
                    {rev.code}
                  </span>
                  <p className="text-xxs text-sage-600 mt-1">憑碼至合作實體櫃台兌領</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Success Modal */}
      {successRedemption && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 text-center shadow-lg space-y-4 border border-sage-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto shadow-sm">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-base">禮品兌換成功 🎁</h3>
              <p className="text-xs text-slate-800 font-semibold px-2">{successRedemption.title}</p>
              <p className="text-xs text-sage-600 font-light px-2 pt-1 leading-relaxed">
                對應的活動積分已自妳的帳戶扣除。虛擬電子兌領代碼已同步儲存於下方的「兌換實體票券庫」中。
              </p>
            </div>

            <div className="border border-dashed border-sage-200 bg-sage-50 p-3 rounded-lg">
              <p className="text-xxs text-sage-500">憑此專屬代碼至櫃位核銷：</p>
              <p className="text-sm font-bold font-mono text-sage-900 tracking-widest pt-1">{successRedemption.code}</p>
            </div>

            <button
              onClick={() => setSuccessRedemption(null)}
              className="w-full bg-sage-605 hover:bg-sage-700 bg-sage-600 hover:bg-sage-700 text-white text-xs py-2 rounded-xl font-medium transition cursor-pointer"
            >
              好，我知道了
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
