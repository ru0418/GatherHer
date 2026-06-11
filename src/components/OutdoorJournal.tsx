/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from "react";
import { 
  Heart, 
  Bookmark, 
  Share2, 
  MapPin, 
  Camera, 
  Plus, 
  Grid, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  Tent, 
  TrendingUp, 
  Check,
  AlertCircle
} from "lucide-react";
import { JournalPost, ActivityCategory, UserProfile } from "../types";

interface OutdoorJournalProps {
  posts: JournalPost[];
  userProfile: UserProfile;
  onAddPost: (post: Omit<JournalPost, "id" | "author" | "likes" | "hasLiked" | "bookmarks" | "hasBookmarked" | "date">) => void;
  onLikeToggle: (id: string) => void;
  onBookmarkToggle: (id: string) => void;
}

const PreselectedPostImages = [
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1551632811-561730d1e4a6?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=800"
];

export default function OutdoorJournal({ 
  posts, 
  userProfile, 
  onAddPost, 
  onLikeToggle, 
  onBookmarkToggle 
}: OutdoorJournalProps) {
  const [activeTab, setActiveTab] = useState<"feed" | "pics">("feed");
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<ActivityCategory>(ActivityCategory.HIKING);
  const [routeRecord, setRouteRecord] = useState("");
  const [selectedImg, setSelectedImg] = useState(PreselectedPostImages[0]);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const handleShare = (postTitle: string) => {
    triggerToast(`已複製分享連結！快分享給其他女性群組：「${postTitle}」🌸`);
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      triggerToast("標題和心得內容都不能空著唷！");
      return;
    }

    onAddPost({
      title,
      content,
      category,
      routeRecord: routeRecord.trim() ? routeRecord : undefined,
      photos: [selectedImg]
    });

    // Reset Form
    setTitle("");
    setContent("");
    setRouteRecord("");
    setShowAddForm(false);
    triggerToast("日誌發布成功！感謝分享妳的美麗冒險 🏔️");
  };

  return (
    <div className="space-y-6 relative">
      
      {/* Dynamic Toast feedback */}
      {toastMessage && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-sage-800 text-white text-xs px-4 py-2.5 rounded-full shadow-lg z-50 flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <Sparkles className="h-4 w-4 text-yellow-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Mode Switches & Post button */}
      <div className="flex items-center justify-between border-b border-sage-100 pb-3">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("feed")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "feed" ? "bg-sage-600 text-white" : "bg-white text-sage-605 text-sage-600 border border-sage-100"
            }`}
          >
            🍁 精選動態 Feed (小紅書風格)
          </button>
          <button
            onClick={() => setActiveTab("pics")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "pics" ? "bg-sage-600 text-white" : "bg-white text-sage-605 text-sage-600 border border-sage-100"
            }`}
          >
            📸 戶外美景牆 Collage
          </button>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-terracotta hover:bg-terracotta/90 text-white text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 shadow-xs transition cursor-pointer"
        >
          {showAddForm ? "取消編報" : "紀錄冒險 ＋"}
        </button>
      </div>

      {/* Interactive Quick Add Journal Form in Page */}
      {showAddForm && (
        <form 
          onSubmit={handleSubmitPost} 
          className="bg-sand-50/70 border border-sand-200/50 rounded-2xl p-4 space-y-4 animate-in slide-in-from-top-3 duration-200"
        >
          <h3 className="text-xs font-bold text-sage-805 text-sage-800 flex items-center gap-1 underline decoration-sand-400">
            ✍️ 發布我的小紅書戶外日誌
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xxs font-bold text-sage-600">日誌標題 (好標題賺大流量)</label>
              <input 
                type="text" 
                placeholder="例如：在加里山頂的一本手沖，疲憊散去了..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white border border-sage-200 rounded-xl text-xs px-3 py-2 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xxs font-bold text-sage-600">路線紀錄 / 地點 (選填)</label>
              <input 
                type="text" 
                placeholder="例如：陽明山大縱走 · 8.2km"
                value={routeRecord}
                onChange={(e) => setRouteRecord(e.target.value)}
                className="w-full bg-white border border-sage-200 rounded-xl text-xs px-3 py-2 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xxs font-bold text-sage-600">冒險筆記心得內容</label>
            <textarea
              rows={3}
              placeholder="跟大家分享妳在登山、露營或慢跑時的療癒心得吧！純女性社群可以超級放鬆寫..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-white border border-sage-200 rounded-xl text-xs px-3 py-2 focus:outline-none leading-relaxed"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xxs font-bold text-sage-600 block">分類</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ActivityCategory)}
                className="w-full bg-white border border-sage-200 rounded-xl text-xs px-2.5 py-1.5 focus:outline-none"
              >
                {Object.values(ActivityCategory).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xxs font-bold text-sage-600 block">選擇一張絕美配圖</label>
              <div className="flex gap-1.5 overflow-x-auto py-1">
                {PreselectedPostImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImg(img)}
                    className={`h-11 w-16 rounded overflow-hidden shrink-0 border-2 relative ${
                      selectedImg === img ? "border-sage-600 ring-1" : "border-transparent"
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-sage-650 bg-sage-600 hover:bg-sage-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            上傳發布冒險故事 (加發 +50 積分)
          </button>
        </form>
      )}

      {activeTab === "pics" ? (
        /* Image Collage view */
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {posts.flatMap(p => p.photos).map((img, index) => (
            <div 
              key={index} 
              className="aspect-square bg-sage-100 rounded-lg overflow-hidden relative group cursor-pointer border border-sage-50"
            >
              <img 
                src={img} 
                alt="" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xxs font-semibold flex items-center gap-1">
                  <Camera className="h-3.5 w-3.5" /> 點選查看大圖
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Xiaohongshu Waterfall/Grid Layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="bg-white rounded-2xl border border-sage-105 border-sage-100 shadow-xs hover:shadow-xs transition duration-200 overflow-hidden flex flex-col justify-between group"
            >
              {/* Media showcase */}
              <div className="relative h-48 overflow-hidden bg-sage-50">
                <img 
                  src={post.photos[0]} 
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-xxs font-semibold bg-white/90 text-sage-800 shadow-sm">
                  #{post.category}
                </span>

                {post.routeRecord && (
                  <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-xs text-white text-xxs px-2.5 py-1 rounded-full flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-red-400" />
                    <span className="truncate max-w-[200px]">{post.routeRecord}</span>
                  </div>
                )}
              </div>

              {/* Feed Content body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3 font-sans">
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-sage-900 leading-snug line-clamp-1 group-hover:text-sage-700">
                    {post.title}
                  </h3>
                  <p className="text-xs text-sage-700 font-light line-clamp-3 leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {/* Interactive metrics bar */}
                <div className="pt-3 border-t border-sage-50 flex items-center justify-between gap-1.5">
                  {/* Author profile */}
                  <div className="flex items-center gap-1.5 min-w-[100px]">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name}
                      className="w-5.5 h-5.5 rounded-full object-cover shadow-xxs border border-white"
                    />
                    <div className="truncate">
                      <div className="flex items-center gap-0.5">
                        <span className="text-xxs text-sage-700 font-bold max-w-[65px] truncate">{post.author.name}</span>
                        {post.author.isVerified && (
                          <ShieldCheck className="h-3 w-3 text-sage-600 shrink-0" />
                        )}
                      </div>
                      <p className="text-xxs text-sage-400 font-light font-mono scale-90 -translate-x-1">{post.date}</p>
                    </div>
                  </div>

                  {/* Actions right */}
                  <div className="flex items-center gap-1 sm:gap-2 text-sage-600">
                    <button 
                      onClick={() => onLikeToggle(post.id)}
                      className={`p-1.5 rounded-full hover:bg-slate-50 transition cursor-pointer flex items-center gap-1 text-xs font-semibold ${
                        post.hasLiked ? "text-red-500 scale-105" : "text-sage-500"
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${post.hasLiked ? "fill-current" : ""}`} />
                      <span className="font-mono">{post.likes}</span>
                    </button>

                    <button 
                      onClick={() => onBookmarkToggle(post.id)}
                      className={`p-1.5 rounded-full hover:bg-slate-50 transition cursor-pointer flex items-center gap-1 text-xs font-semibold ${
                        post.hasBookmarked ? "text-amber-500" : "text-sage-500"
                      }`}
                    >
                      <Bookmark className={`h-4 w-4 ${post.hasBookmarked ? "fill-current" : ""}`} />
                      <span className="font-mono">{post.bookmarks}</span>
                    </button>

                    <button 
                      onClick={() => handleShare(post.title)}
                      className="p-1.5 rounded-full hover:bg-slate-50 text-sage-500 transition cursor-pointer"
                      title="分享連結"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Community Policy disclaimer */}
      <div className="bg-sage-50/50 p-3 rounded-xl border border-sage-100/50 flex items-start gap-2 text-xxs text-sage-600">
        <AlertCircle className="h-4 w-4 text-sage-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed font-light">
          <strong>小紅書風格戶外防線手冊：</strong> 歡迎分享裝備開箱、女性生理期登山對策、露營自炊菜單與獨行安全防護技巧。所有發布內容皆由女性協同過濾審查，杜絕擦邊與虛假炫富，給女孩們最純淨實用的參考。
        </p>
      </div>

    </div>
  );
}
