/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  ShieldCheck, 
  Filter, 
  TrendingUp, 
  Sparkles,
  CheckCircle2, 
  HelpCircle,
  X,
  AlertCircle
} from "lucide-react";
import { Activity, ActivityCategory, UserProfile, VerificationStatus } from "../types";
import { GatherHerLogoIcon } from "./GatherHerLogo";

interface AllFemaleCommunityProps {
  activities: Activity[];
  onJoinToggle: (id: string) => void;
  userProfile: UserProfile;
  onVerifyRequest: () => void;
}

export default function AllFemaleCommunity({ 
  activities, 
  onJoinToggle, 
  userProfile,
  onVerifyRequest
}: AllFemaleCommunityProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("全部");
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showVerificationInfo, setShowVerificationInfo] = useState(false);

  // Filter activities
  const filteredActivities = activities.filter((act) => {
    const matchesSearch = act.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          act.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          act.creator.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "全部" || act.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "全部" || act.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "簡單":
        return "bg-bento-lime text-bento-forest border border-bento-sage/20";
      case "中等":
        return "bg-bento-sand/40 text-bento-tuscan border border-bento-tuscan/20";
      case "挑戰":
        return "bg-terracotta-light text-terracotta border border-terracotta/25";
      default:
        return "bg-bento-limelight text-bento-muted border border-bento-sage/10";
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Header Banner (Bento Style with Forest background and rounded-3xl) */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-bento-forest to-bento-muted text-bento-cream p-7 md:p-9 shadow-xs border border-bento-sage/25">
        <div className="absolute right-0 bottom-0 opacity-[0.08] pointer-events-none transform translate-y-6 translate-x-6 scale-150 origin-bottom-right">
          <GatherHerLogoIcon size={160} />
        </div>
        <div className="max-w-md space-y-3.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-bento-cream/20 text-bento-cream backdrop-blur-xs border border-white/10 uppercase tracking-wider">
            <GatherHerLogoIcon size={12} className="text-bento-lime" /> ✨ 全女性限定安全社群
          </span>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white font-sans leading-tight">
            找到懂妳的女孩夥伴，<br/>一起踏上放鬆的戶外生活。
          </h1>
          <p className="text-xs text-bento-cream/90 font-light leading-relaxed">
            在這裡，沒有速度攀比與社交壓力。我們精心核對、關注安全、親近林野，共同感受大自然給予的療癒。
          </p>
        </div>
      </div>

      {/* Safety and Verification Banner (Structured Bento Pod) */}
      <div className="bg-bento-limelight rounded-3xl p-5 border border-bento-sage/25 shadow-xxs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-3 bg-bento-soft-white rounded-2xl text-bento-forest border border-bento-sage/20 mt-0.5 shadow-xxs">
            <ShieldCheck className="h-6 w-6" id="shield-badge-highlight" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-extrabold text-sm text-bento-charcoal">100% 女性專屬 · 實名女性身分認證</h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[9px] font-bold bg-bento-forest text-bento-cream">
                <ShieldCheck className="h-3 w-3 mr-0.5" /> 已啟用
              </span>
            </div>
            <p className="text-xs text-bento-muted font-normal leading-relaxed">
              拒絕任何假帳號與非女性侵入。每位同行夥伴均經過專人影片與證件女性身分對照，提供無憂的安全信任。
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-center">
          <button 
            onClick={() => setShowVerificationInfo(true)}
            className="text-xs text-bento-forest hover:underline font-semibold px-2 py-1 transition"
          >
            瞭解詳情
          </button>
          
          {userProfile.verificationStatus === VerificationStatus.VERIFIED ? (
            <div className="bg-bento-lime/80 text-bento-forest font-bold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1 shadow-xxs border border-bento-sage/20">
              <CheckCircle2 className="h-3.5 w-3.5" /> {userProfile.verificationStatus}
            </div>
          ) : userProfile.verificationStatus === VerificationStatus.PENDING ? (
            <div className="bg-bento-sand/40 text-bento-tuscan font-bold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1 border border-bento-sand">
              <span className="w-1.5 h-1.5 rounded-full bg-bento-tuscan animate-pulse"></span>
              {userProfile.verificationStatus}
            </div>
          ) : (
            <button
              onClick={onVerifyRequest}
              className="bg-bento-forest hover:bg-bento-forest/90 text-bento-cream text-xs px-4 py-1.5 rounded-full font-bold transition cursor-pointer shadow-xs border border-bento-sage/10"
            >
              立即驗證
            </button>
          )}
        </div>
      </div>

      {/* Search & Categories */}
      <div className="space-y-4">
        {/* Search Bar & Advanced Details */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-bento-muted" />
            <input 
              type="text"
              placeholder="搜尋活動標題、地點、嚮導..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-bento-soft-white border border-bento-sage/25 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-bento-forest transition-all font-light text-bento-charcoal"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-bento-muted hover:text-bento-charcoal text-xs font-semibold"
              >
                清除
              </button>
            )}
          </div>
          
          <div className="relative inline-block text-left">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="appearance-none bg-bento-soft-white border border-bento-sage/25 px-4 pr-9 py-2.5 rounded-2xl text-sm focus:outline-none text-bento-charcoal cursor-pointer hover:bg-bento-limelight/30 transition font-medium"
            >
              <option value="全部">難度: 全部</option>
              <option value="簡單">簡單 (新手)</option>
              <option value="中等">中等 (適度)</option>
              <option value="挑戰">挑戰 (高難度)</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-bento-muted">
              <Filter className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>

        {/* Categories Horizontal Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-2 px-2 scrollbar-none">
          {["全部", ...Object.values(ActivityCategory)].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-bento-forest text-bento-cream border-bento-forest shadow-xs"
                  : "bg-bento-soft-white text-bento-muted border-bento-sage/20 hover:bg-bento-limelight/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Display Filter Count */}
      <div className="flex justify-between items-center bg-bento-limelight/40 px-3 py-1.5 rounded-xl border border-bento-sage/10">
        <p className="text-xs text-bento-muted font-normal">
          目前有 <strong className="font-extrabold text-bento-charcoal">{filteredActivities.length}</strong> 個專屬女性活動符合條件
        </p>
      </div>

      {/* Activities Grid */}
      {filteredActivities.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center border border-dashed border-sage-200">
          <p className="text-sm text-sage-500 font-light">沒有找到合適的揪團活動，換個關鍵字搜尋吧！</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredActivities.map((act) => {
            const isUserJoined = act.joinedUsers.includes(userProfile.name);
            const isSpotsFull = act.currentParticipants >= act.maxParticipants;
            
            return (
              <div 
                key={act.id} 
                className="bg-bento-soft-white rounded-3xl overflow-hidden border border-bento-sage/20 shadow-xxs hover:shadow-xs hover:border-bento-sage/40 transition-all duration-300 flex flex-col group"
              >
                {/* Image Section with badge */}
                <div className="relative h-44 overflow-hidden bg-bento-limelight">
                  <img 
                    src={act.imageUrl} 
                    alt={act.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-bento-soft-white/90 text-bento-charcoal shadow-xxs backdrop-blur-xs border border-bento-sage/15">
                      {act.category}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xxs ${getDifficultyColor(act.difficulty)}`}>
                      {act.difficulty}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-bento-forest/90 backdrop-blur-xs text-bento-cream text-[10px] px-2.5 py-1 rounded-xl font-bold flex items-center gap-1 shadow-xxs border border-bento-sage/20">
                    <TrendingUp className="h-3 w-3 text-bento-sand" />
                    +{act.pointsReward} 積分
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4.5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Host profile */}
                    <div className="flex items-center gap-1.5 justify-between">
                      <div className="flex items-center gap-1.5">
                        <img 
                          src={act.creator.avatar} 
                          alt={act.creator.name}
                          className="w-5 h-5 rounded-full object-cover border border-bento-sage/10"
                        />
                        <span className="text-xs text-bento-muted font-bold">{act.creator.name}</span>
                        {act.creator.isVerified && (
                          <ShieldCheck className="h-4 w-4 text-bento-forest" title="已完成女性實名審查" />
                        )}
                      </div>
                      <span className="text-[10px] text-amber-600 bg-bento-cream border border-bento-sand px-2 py-0.5 rounded-lg font-bold">🙋 限女性</span>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => setSelectedActivity(act)}
                      className="text-base font-extrabold text-bento-charcoal group-hover:text-bento-forest cursor-pointer line-clamp-1 transition-colors"
                    >
                      {act.title}
                    </h3>

                    {/* Details row */}
                    <div className="space-y-1 text-xs text-bento-muted font-normal font-sans">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-bento-sage shrink-0" />
                        <span>{act.date} (週{getWeekday(act.date)}) · {act.time} 出發</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-bento-sage shrink-0" />
                        <span className="truncate">{act.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progressive participants state & CTA */}
                  <div className="pt-3 border-t border-bento-sage/15 space-y-2.5">
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-1 text-bento-muted font-normal">
                        <Users className="h-3.5 w-3.5 text-bento-sage" />
                        <span>成團人數 {act.currentParticipants}人 / 最多 {act.maxParticipants}人</span>
                      </div>
                      <span className={`font-bold ${isSpotsFull ? "text-terracotta" : "text-bento-forest"}`}>
                        {isSpotsFull ? "滿額" : `剩 ${act.maxParticipants - act.currentParticipants} 名額`}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-bento-limelight rounded-full h-1.5 overflow-hidden border border-bento-sage/5">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${isSpotsFull ? "bg-terracotta" : "bg-bento-forest"}`}
                        style={{ width: `${(act.currentParticipants / act.maxParticipants) * 100}%` }}
                      ></div>
                    </div>

                    <div className="flex gap-2 pt-1.5">
                      <button
                        onClick={() => setSelectedActivity(act)}
                        className="flex-1 border border-bento-sage/25 text-bento-charcoal text-xs px-2.5 py-2 rounded-xl hover:bg-bento-limelight/30 transition cursor-pointer font-bold"
                      >
                        看詳情
                      </button>
                      <button
                        onClick={() => onJoinToggle(act.id)}
                        disabled={!isUserJoined && isSpotsFull}
                        className={`flex-1 text-xs px-2.5 py-2 rounded-xl font-bold transition cursor-pointer flex items-center justify-center gap-1 ${
                          isUserJoined
                            ? "bg-bento-lime text-bento-forest border border-bento-sage/25 hover:bg-bento-limelight/50"
                            : isSpotsFull
                              ? "bg-bento-limelight text-bento-muted cursor-not-allowed border border-bento-sage/10"
                              : "bg-bento-forest hover:bg-bento-muted text-bento-cream shadow-xxs"
                        }`}
                      >
                        {isUserJoined ? "取消登記" : "即刻加入"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-lg border border-sage-100 animate-in fade-in zoom-in duration-200">
            <div className="sticky top-0 bg-white border-b border-sage-100 p-4 flex justify-between items-center z-10">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-sage-50 text-sage-700 px-2 py-1 rounded font-medium">
                  {selectedActivity.category}
                </span>
                <span className={`text-xs px-2 py-1 rounded font-medium ${getDifficultyColor(selectedActivity.difficulty)}`}>
                  {selectedActivity.difficulty}難度
                </span>
              </div>
              <button 
                onClick={() => setSelectedActivity(null)}
                className="p-1 hover:bg-sage-50 rounded-full text-sage-500 hover:text-sage-700 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="h-52 bg-sage-100 relative">
              <img 
                src={selectedActivity.imageUrl} 
                alt={selectedActivity.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <h2 className="absolute bottom-4 left-4 right-4 text-white text-lg font-bold">
                {selectedActivity.title}
              </h2>
            </div>

            {/* Modal Info */}
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between bg-sage-50/50 p-3 rounded-xl border border-sage-100/50">
                <div className="flex items-center gap-2">
                  <img 
                    src={selectedActivity.creator.avatar} 
                    alt={selectedActivity.creator.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xs text-sage-500 font-light">發起嚮導</h4>
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-semibold text-sage-800">{selectedActivity.creator.name}</p>
                      {selectedActivity.creator.isVerified && (
                        <ShieldCheck className="h-4 w-4 text-sage-600" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xxs text-sage-500 font-light">安全與信任</p>
                  <p className="text-xs text-sage-700 font-medium">女性審查核准</p>
                </div>
              </div>

              {/* Event details block */}
              <div className="space-y-2 text-sm text-sage-800 font-light font-sans">
                <div className="flex items-start gap-2.5">
                  <Calendar className="h-4 w-4 text-sage-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-sage-900">時間：</span>
                    <span>{selectedActivity.date} (週{getWeekday(selectedActivity.date)}) · {selectedActivity.time}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-sage-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-sage-900">地點：</span>
                    <span>{selectedActivity.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Users className="h-4 w-4 text-sage-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-sage-900">人數：</span>
                    <span>當前已登記 {selectedActivity.currentParticipants} 人 / 上限 {selectedActivity.maxParticipants} 人</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-amber-50/50 p-2.5 rounded-lg border border-amber-200/50 text-amber-800 text-xs">
                  <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="font-semibold block">【女性安心機制】</span>
                    <span>此行程包含安全聯絡人備案，並僅限通過「女性身分實名認證」的旅伴加入。謝絕男性與代辦參與。</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5 pt-2 border-t border-sage-100">
                <h3 className="text-xs text-sage-500 font-semibold tracking-wide uppercase">活動介紹</h3>
                <p className="text-xs text-sage-700 font-light leading-relaxed whitespace-pre-line">
                  {selectedActivity.description}
                </p>
              </div>

              {/* Reward Points disclaimer */}
              <div className="bg-sage-50 p-3 rounded-lg flex items-center justify-between text-xs text-sage-700">
                <span className="font-medium flex items-center gap-1">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  全程順利成行完成登入
                </span>
                <span className="font-bold text-sage-800 font-mono">+{selectedActivity.pointsReward} 積分</span>
              </div>

              {/* Joined users list preview */}
              <div className="space-y-2">
                <h4 className="text-xs text-sage-500 font-semibold uppercase tracking-wide">目前同行女孩 ({selectedActivity.joinedUsers.length} 人)</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedActivity.joinedUsers.map((user, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-sage-50 text-sage-700 text-xs rounded-full font-medium border border-sage-100/55">
                      <span className="w-1.5 h-1.5 rounded-full bg-sage-400"></span>
                      {user}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA in Modal */}
              <button
                onClick={() => {
                  onJoinToggle(selectedActivity.id);
                  // Update current dialog context smoothly
                  setSelectedActivity(prev => {
                    if (!prev) return null;
                    const isJoined = prev.joinedUsers.includes(userProfile.name);
                    let newUsers = [...prev.joinedUsers];
                    let count = prev.currentParticipants;
                    if (isJoined) {
                      newUsers = newUsers.filter(u => u !== userProfile.name);
                      count--;
                    } else {
                      newUsers.push(userProfile.name);
                      count++;
                    }
                    return {
                      ...prev,
                      joinedUsers: newUsers,
                      currentParticipants: count
                    };
                  });
                }}
                disabled={!selectedActivity.joinedUsers.includes(userProfile.name) && selectedActivity.currentParticipants >= selectedActivity.maxParticipants}
                className={`w-full py-2.5 rounded-xl text-center text-sm font-semibold transition cursor-pointer shadow-xs ${
                  selectedActivity.joinedUsers.includes(userProfile.name)
                    ? "bg-sage-100 border border-sage-200 text-sage-700 hover:bg-sage-200/50"
                    : selectedActivity.currentParticipants >= selectedActivity.maxParticipants
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-sage-600 hover:bg-sage-700 text-white"
                }`}
              >
                {selectedActivity.joinedUsers.includes(userProfile.name) ? "取消這項揪團登記" : "一鍵申請 · 即刻同行"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Safety info Modal */}
      {showVerificationInfo && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-lg space-y-4 border border-sage-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-sage-100">
              <div className="flex items-center gap-1.5 text-sage-800 font-bold">
                <ShieldCheck className="h-5 w-5 text-sage-600" />
                <span>GatherHer 安全白皮書</span>
              </div>
              <button 
                onClick={() => setShowVerificationInfo(false)}
                className="text-sage-400 hover:text-sage-600 font-medium"
              >
                關閉
              </button>
            </div>
            <div className="space-y-3 text-xs text-sage-700 font-light leading-relaxed">
              <div className="space-y-1">
                <p className="font-semibold text-sage-900">1. 線上多重比對</p>
                <p>我們結合實名制身分證件查核與手勢影片即時錄製，由女性專員人工雙重審查，確保群組內所有用戶均為真實女性。</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-sage-900">2. 自在社交環境</p>
                <p>沒有男性在團內搭訕、吹噓或不當拍照的困擾。女性獨有對談話題自由，共同分攤車資與互幫互助更輕鬆。</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-sage-900">3. 安全聯絡人備案</p>
                <p>每場登山活動主辦者皆需填寫緊急留守機制，APP 整合一鍵求助 SOS，並提供共享即時 GPS 軌跡給緊急聯絡人。</p>
              </div>
            </div>
            <button
              onClick={() => setShowVerificationInfo(false)}
              className="w-full bg-sage-600 hover:bg-sage-700 text-white text-xs py-2 rounded-xl font-medium transition cursor-pointer"
            >
              我知道了，祝妳旅途平安
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

// Utility to get day of week
function getWeekday(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    const days = ["日", "一", "二", "三", "四", "五", "六"];
    return days[d.getDay()];
  } catch {
    return "六";
  }
}
