/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Plus, 
  Sparkles, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Compass, 
  Tent, 
  TrendingUp, 
  Check,
  ShieldAlert,
  HelpCircle,
  FileText
} from "lucide-react";
import { Activity, ActivityCategory, UserProfile } from "../types";

interface CreateGroupProps {
  userProfile: UserProfile;
  onAddActivity: (activity: Omit<Activity, "id" | "creator" | "currentParticipants" | "joinedUsers" | "pointsReward">) => void;
}

const CuratedImages = [
  {
    name: "高山雲海",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    category: ActivityCategory.HIKING
  },
  {
    name: "美學營帳",
    url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800",
    category: ActivityCategory.CAMPING
  },
  {
    name: "晨光跑步",
    url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=800",
    category: ActivityCategory.RUNNING
  },
  {
    name: "竹林健行",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800",
    category: ActivityCategory.TREKKING
  },
  {
    name: "野溪露營",
    url: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&q=80&w=800",
    category: ActivityCategory.CAMPING
  },
  {
    name: "高山湖泊",
    url: "https://images.unsplash.com/photo-1551632811-561730d1e4a6?auto=format&fit=crop&q=80&w=800",
    category: ActivityCategory.HIKING
  }
];

export default function CreateGroup({ userProfile, onAddActivity }: CreateGroupProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ActivityCategory>(ActivityCategory.HIKING);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("08:00");
  const [location, setLocation] = useState("");
  const [difficulty, setDifficulty] = useState<"簡單" | "中等" | "挑戰">("簡單");
  const [maxParticipants, setMaxParticipants] = useState<number>(6);
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(CuratedImages[0].url);
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleCategoryChange = (cat: ActivityCategory) => {
    setCategory(cat);
    // Auto sync an image corresponding to the category for the best user experience!
    const matchingImg = CuratedImages.find(img => img.category === cat);
    if (matchingImg) {
      setSelectedImage(matchingImg.url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!title.trim()) {
      setValidationError("請輸入活動名稱唷！");
      return;
    }
    if (!date) {
      setValidationError("請選擇活動日期。");
      return;
    }
    if (!location.trim()) {
      setValidationError("請填寫活動集合或活動地點。");
      return;
    }
    if (!description.trim() || description.length < 10) {
      setValidationError("請寫些看活動描述（至少 10 個字），讓大家都安心了解。");
      return;
    }

    onAddActivity({
      title,
      category,
      date,
      time,
      location,
      difficulty,
      maxParticipants,
      description,
      imageUrl: selectedImage
    });

    setSubmitted(true);
    // Reset form states smoothly
    setTimeout(() => {
      setTitle("");
      setDate("");
      setTime("08:00");
      setLocation("");
      setDifficulty("簡單");
      setMaxParticipants(6);
      setDescription("");
      setSubmitted(false);
    }, 2500);
  };

  const getCategoryIcon = (cat: ActivityCategory) => {
    switch (cat) {
      case ActivityCategory.HIKING:
        return <Compass className="h-5 w-5" />;
      case ActivityCategory.CAMPING:
        return <Tent className="h-5 w-5" />;
      case ActivityCategory.RUNNING:
        return <TrendingUp className="h-5 w-5" />;
      case ActivityCategory.TREKKING:
        return <Compass className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {/* Intro Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 bg-bento-limelight rounded-full text-bento-forest border border-bento-sage/20 shadow-xxs">
          <Plus className="h-6 w-6" id="post-plus-icon" />
        </div>
        <h1 className="text-2xl font-black text-bento-charcoal tracking-tight font-sans">
          發起女孩戶外揪團
        </h1>
        <p className="text-xs text-bento-muted font-normal max-w-sm mx-auto">
          簡單填寫資訊，便能迅速建立專屬女性的冒險計畫。所有同行旅伴皆經由實名女性身分核對保障。
        </p>
      </div>

      {submitted ? (
        <div className="bg-bento-lime/30 border border-bento-sage/25 rounded-3xl p-8 text-center space-y-4 shadow-xs animate-in fade-in duration-300">
          <div className="w-12 h-12 bg-bento-forest rounded-full flex items-center justify-center text-bento-cream mx-auto shadow-sm">
            <Check className="h-6 w-6" />
          </div>
          <h2 className="text-base font-extrabold text-bento-charcoal">揪團活動發布成功 🎉</h2>
          <p className="text-xs text-bento-muted max-w-xs mx-auto font-light leading-relaxed">
            妳的活動已經被刊登在【全女性戶外社群】首頁上，並已自動將妳設為第一個同行旅伴。系統已為妳發放發起者獎勵 +100 積分！
          </p>
          <p className="text-xxs text-bento-forest/70 font-mono font-medium animate-pulse">正在重置表單頁面...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-bento-soft-white rounded-[28px] p-6 border border-bento-sage/20 shadow-xxs space-y-6">
          {validationError && (
            <div className="bg-bento-limelight border border-rose-300/65 text-rose-700 text-xs p-3 rounded-2xl flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Activity Category Section */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-bento-charcoal block">
              1. 選擇活動主題分組
            </label>
            <div className="grid grid-cols-4 gap-2">
              {Object.values(ActivityCategory).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`py-3 px-1 rounded-2xl border flex flex-col items-center gap-1.5 transition cursor-pointer font-bold ${
                    category === cat
                      ? "bg-bento-forest border-bento-forest text-bento-cream shadow-xs"
                      : "bg-bento-soft-white border-bento-sage/20 text-bento-muted hover:bg-bento-limelight/30"
                  }`}
                >
                  <span className={category === cat ? "text-bento-cream" : "text-bento-forest"}>
                    {getCategoryIcon(cat)}
                  </span>
                  <span className="text-xs">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-3">
            <div className="space-y-1">
              <label htmlFor="title" className="text-xs font-semibold text-sage-700 block">
                2. 活動名稱 (吸引同行的一句話)
              </label>
              <input
                id="title"
                type="text"
                placeholder="例如：【新手友善】合歡主東峰兩天一夜療癒森呼吸"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={40}
                className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-slate-800 placeholder-sage-400 focus:outline-none focus:ring-1 focus:ring-sage-500 font-light"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="description" className="text-xs font-semibold text-sage-700 block">
                3. 行程說明 ＆ 裝備要求
              </label>
              <textarea
                id="description"
                rows={3}
                placeholder="建議說明：&#10;- 活動流程概要與集合點詳細資訊&#10;- 建議携带防滑登山鞋/保暖外套&#10;- 這趟行程偏悠閒或極限自我挑戰..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-slate-800 placeholder-sage-400 focus:outline-none focus:ring-1 focus:ring-sage-500 font-light leading-relaxed"
              ></textarea>
            </div>
          </div>

          {/* Date Picker, Time, Capacity Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="date" className="text-xs font-semibold text-sage-700 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-sage-500" /> 活動日期
              </label>
              <input
                id="date"
                type="date"
                value={date}
                min="2026-06-11"
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-sage-500 cursor-pointer font-light"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="time" className="text-xs font-semibold text-sage-700 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-sage-500" /> 出發時間
              </label>
              <input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-sage-500 cursor-pointer font-light"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="location" className="text-xs font-semibold text-sage-700 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-sage-500" /> 活動集合地點
              </label>
              <input
                id="location"
                type="text"
                placeholder="例如：台北市 內湖捷運站2號出口"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 bg-sage-50/50 border border-sage-200 rounded-xl text-xs text-slate-800 placeholder-sage-400 focus:outline-none focus:ring-1 focus:ring-sage-500 font-light"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="maxParticipants" className="text-xs font-semibold text-sage-700 flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-sage-500" /> 募集人數上限
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="maxParticipants"
                  type="range"
                  min={3}
                  max={15}
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-sage-100 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xs font-bold text-sage-800 w-8 text-right font-mono">
                  {maxParticipants} 人
                </span>
              </div>
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-sage-700 block">
              4. 旅途體能難度設定
            </label>
            <div className="flex gap-2">
              {(["簡單", "中等", "挑戰"] as const).map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setDifficulty(diff)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition cursor-pointer ${
                    difficulty === diff
                      ? "bg-sand-100 border-sand-400 text-sand-800 shadow-xs"
                      : "bg-white border-sage-200 text-sage-600 hover:bg-sage-50"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Background Imagery choice */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-sage-700 block">
              5. 點選封面精美配圖
            </label>
            <div className="grid grid-cols-6 gap-1.5">
              {CuratedImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImage(img.url)}
                  className={`aspect-video rounded-lg overflow-hidden relative border-2 ${
                    selectedImage === img.url ? "border-sage-650 ring-1 ring-sage-500" : "border-transparent"
                  }`}
                >
                  <img src={img.url} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors"></div>
                </button>
              ))}
            </div>
          </div>

          {/* Consent / Safety warning bottom */}
          <div className="p-3 bg-sage-50 rounded-xl border border-sage-100/50 flex items-start gap-2">
            <ShieldAlert className="h-4 w-4 text-sage-600 shrink-0 mt-0.5" />
            <span className="text-xxs text-sage-600 font-light leading-relaxed">
              全體保證：發起人應忠實履行約定，並確認攜帶基礎安全急救裝備。任何非女性用戶發起或參與活動，經舉報將永久凍結帳號，並通報合作執法機關核查。
            </span>
          </div>

          {/* CTA Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-sage-600 hover:bg-sage-700 text-white font-semibold rounded-xl text-xs transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            對外發布揪團活動 (賺取 +100 積分)
          </button>
        </form>
      )}
    </div>
  );
}
