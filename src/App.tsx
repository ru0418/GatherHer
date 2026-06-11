/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Compass, 
  PlusCircle, 
  Award, 
  FileText, 
  ShieldCheck, 
  Coins, 
  Heart, 
  Check, 
  ChevronRight, 
  MapPin, 
  Sparkles,
  User,
  Users,
  Camera,
  Layers,
  Sparkle,
  X,
  Star,
  CheckCircle2,
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Activity, 
  ActivityCategory, 
  JournalPost, 
  RewardItem, 
  UserProfile, 
  VerificationStatus 
} from "./types";
import { 
  INITIAL_ACTIVITIES, 
  INITIAL_JOURNAL_POSTS, 
  REWARD_ITEMS, 
  INITIAL_USER_PROFILE 
} from "./mockData";

import AllFemaleCommunity from "./components/AllFemaleCommunity";
import CreateGroup from "./components/CreateGroup";
import RewardMarketplace from "./components/RewardMarketplace";
import OutdoorJournal from "./components/OutdoorJournal";
import { GatherHerLogoIcon, GatherHerLogoFull } from "./components/GatherHerLogo";

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<"community" | "create" | "rewards" | "journal">("community");
  
  // App states
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [posts, setPosts] = useState<JournalPost[]>(INITIAL_JOURNAL_POSTS);
  const [rewardItems, setRewardItems] = useState<RewardItem[]>(REWARD_ITEMS);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  
  // Interactive verification popup simulation
  const [showVerifyWizard, setShowVerifyWizard] = useState(false);
  const [verifyStep, setVerifyStep] = useState<1 | 2>(1);
  const [idSubmitted, setIdSubmitted] = useState(false);
  
  // Confetti / feedback notification
  const [hudNotification, setHudNotification] = useState<string | null>(null);

  // Trigger floating HUD notification
  const triggerHUD = (text: string) => {
    setHudNotification(text);
    setTimeout(() => {
      setHudNotification(null);
    }, 3000);
  };

  // 1. Join / Leave Event Toggle
  const handleJoinToggle = (activityId: string) => {
    setActivities((prev) => 
      prev.map((act) => {
        if (act.id !== activityId) return act;
        
        const isJoined = act.joinedUsers.includes(profile.name);
        let updatedUsers = [...act.joinedUsers];
        let participantCount = act.currentParticipants;
        
        if (isJoined) {
          updatedUsers = updatedUsers.filter((u) => u !== profile.name);
          participantCount = Math.max(0, participantCount - 1);
          triggerHUD(`已取消登記「${act.title}」囉！`);
          
          setProfile(p => ({
            ...p,
            joinedActivitiesCount: Math.max(0, p.joinedActivitiesCount - 1),
            points: Math.max(0, p.points - 50) // deduct participation mock bonus
          }));
        } else {
          updatedUsers.push(profile.name);
          participantCount = Math.min(act.maxParticipants, participantCount + 1);
          triggerHUD(`一鍵申請加入成功！獲得同行登記 +50 積分 🌸`);
          
          setProfile(p => ({
            ...p,
            joinedActivitiesCount: p.joinedActivitiesCount + 1,
            points: p.points + 50 // add participation mock bonus
          }));
        }
        
        return {
          ...act,
          joinedUsers: updatedUsers,
          currentParticipants: participantCount
        };
      })
    );
  };

  // 2. Add Event
  const handleAddActivity = (newAct: Omit<Activity, "id" | "creator" | "currentParticipants" | "joinedUsers" | "pointsReward">) => {
    const freshAct: Activity = {
      ...newAct,
      id: `act-user-${Date.now()}`,
      creator: {
        name: profile.name,
        avatar: profile.avatar,
        isVerified: profile.verificationStatus === VerificationStatus.VERIFIED
      },
      currentParticipants: 1,
      joinedUsers: [profile.name],
      pointsReward: 100
    };

    setActivities((prev) => [freshAct, ...prev]);
    setProfile((p) => ({
      ...p,
      joinedActivitiesCount: p.joinedActivitiesCount + 1,
      points: p.points + 100 // creator reward points
    }));
    triggerHUD("開團發表成功！發起奖励 +100 積分入帳 🌟");
  };

  // 3. Add Post / Journal
  const handleAddPost = (newPost: Omit<JournalPost, "id" | "author" | "likes" | "hasLiked" | "bookmarks" | "hasBookmarked" | "date">) => {
    const isVerified = profile.verificationStatus === VerificationStatus.VERIFIED;
    const freshPost: JournalPost = {
      ...newPost,
      id: `post-user-${Date.now()}`,
      author: {
        name: profile.name,
        avatar: profile.avatar,
        isVerified
      },
      likes: 1,
      hasLiked: true,
      bookmarks: 0,
      hasBookmarked: false,
      date: new Date().toISOString().split("T")[0]
    };

    setPosts((prev) => [freshPost, ...prev]);
    setProfile((p) => ({
      ...p,
      points: p.points + 50 // sharing bonus points
    }));
    triggerHUD("日誌上架成功！撰文獎勵 +50 庫存積分 📸");
  };

  // 4. Like post toggle
  const handleLikeToggle = (postId: string) => {
    setPosts((prev) => 
      prev.map((p) => {
        if (p.id !== postId) return p;
        const liked = !p.hasLiked;
        return {
          ...p,
          hasLiked: liked,
          likes: liked ? p.likes + 1 : Math.max(0, p.likes - 1)
        };
      })
    );
  };

  // 5. Bookmark post toggle
  const handleBookmarkToggle = (postId: string) => {
    setPosts((prev) => 
      prev.map((p) => {
        if (p.id !== postId) return p;
        const bookmarked = !p.hasBookmarked;
        return {
          ...p,
          hasBookmarked: bookmarked,
          bookmarks: bookmarked ? p.bookmarks + 1 : Math.max(0, p.bookmarks - 1)
        };
      })
    );
  };

  // 6. Redeem Reward Item
  const handleRedeemReward = (itemId: string, costPoints: number) => {
    // subtract cost from profile
    setProfile((p) => {
      const targetItem = rewardItems.find(item => item.id === itemId);
      const code = `GHER-${itemId.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      
      const newClaimed = [
        {
          id: `red-user-${Date.now()}`,
          rewardTitle: targetItem ? targetItem.title : "專屬禮券商品",
          redeemedDate: new Date().toISOString().split("T")[0],
          code
        },
        ...p.redeemedRewards
      ];

      return {
        ...p,
        points: Math.max(0, p.points - costPoints),
        redeemedRewards: newClaimed
      };
    });

    // subtract stock from item
    setRewardItems((prevItems) => 
      prevItems.map((item) => {
        if (item.id !== itemId) return item;
        return {
          ...item,
          stock: Math.max(0, item.stock - 1)
        };
      })
    );

    triggerHUD("獎勵商品兌換成功！已扣除對應點數 🎟️");
  };

  // 7. Simulating identity audit with beautiful results
  const triggerSimulationVerify = () => {
    setIdSubmitted(true);
    triggerHUD("資料安全傳輸中，專員即刻審核...");
    
    setTimeout(() => {
      setProfile((p) => {
        // Unlocks badge if not unlocked
        const hasBadge = p.unlockedBadges.some(b => b.id === "badge-1");
        const baseBadges = [...p.unlockedBadges];
        if (!hasBadge) {
          baseBadges.unshift({
            id: "badge-1",
            name: "信任種子",
            description: "完成實名女性身分驗證，為社群注入安全感與信任",
            icon: "ShieldCheck",
            unlockedAt: new Date().toISOString().split("T")[0]
          });
        }
        return {
          ...p,
          verificationStatus: VerificationStatus.VERIFIED,
          points: p.points + 100,
          unlockedBadges: baseBadges
        };
      });
      setShowVerifyWizard(false);
      setIdSubmitted(false);
      setVerifyStep(1);
      triggerHUD("🎉 身分驗證已通過！解鎖【信任種子】徽章與 +100P 獎勵！");
    }, 2000);
  };
  return (
    <div className="min-h-screen bg-bento-bg text-bento-charcoal font-sans flex flex-col justify-start">
      
      {/* Dynamic HUD banner */}
      <AnimatePresence>
        {hudNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 bg-bento-forest text-bento-cream font-medium text-xs px-5 py-3 rounded-full shadow-lg z-50 flex items-center gap-2 border border-bento-sage/35"
          >
            <Sparkle className="h-4 w-4 text-bento-sand animate-spin" />
            <span>{hudNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container: Elegant dual panel for desktop display, and direct mobile layout */}
      <div className="max-w-7xl w-full mx-auto px-4 py-6 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
        
        {/* Left column (Desktop Branding & App presentation - formatted like a Bento Sidebar block) */}
        <div className="lg:col-span-4 space-y-6 hidden lg:block pr-2">
          <div className="bg-bento-soft-white rounded-3xl p-6 border border-bento-sage/20 shadow-xs space-y-4">
            <GatherHerLogoFull size={55} showSubtitle={true} />
            <p className="text-sm text-bento-muted leading-relaxed pt-1">
              專為上班族女性、女孩設計的極簡戶外生活平台。這裡沒有繁瑣強硬的體能競賽，只有充滿療癒的溫柔林野、信任陪伴，以及共同累積成果的積分獎勵中心。
            </p>
          </div>

          {/* Core USP block (三大安心機制 formatted as an elegant Bento Pod) */}
          <div className="bg-bento-limelight rounded-3xl p-6 border border-bento-sage/20 shadow-xs space-y-4 font-sans text-xs">
            <h3 className="font-bold text-bento-charcoal text-sm flex items-center gap-1.5">
              <ShieldCheck className="h-5 w-5 text-bento-forest" />
              三大全女性安心守護機制
            </h3>
            <ul className="space-y-3 text-bento-charcoal/90 leading-relaxed">
              <li className="flex gap-2 bg-bento-soft-white/60 p-2.5 rounded-xl border border-bento-sage/10">
                <span className="text-bento-forest font-black shrink-0">1.</span>
                <span><strong>專人雙重女性驗證</strong>：所有活動發起人、同行旅伴在加入行程前均需提交證件與自開影片手勢比對，杜絕陌生侵入。</span>
              </li>
              <li className="flex gap-2 bg-bento-soft-white/60 p-2.5 rounded-xl border border-bento-sage/10">
                <span className="text-bento-forest font-black shrink-0">2.</span>
                <span><strong>留守應急求助備案</strong>：結合戶外安全聯絡人備忘機制，每次活動皆配置健全安全的留守諮詢專線。</span>
              </li>
              <li className="flex gap-2 bg-bento-soft-white/60 p-2.5 rounded-xl border border-bento-sage/10">
                <span className="text-bento-forest font-black shrink-0">3.</span>
                <span><strong>無防備放鬆氛圍</strong>：去除性別隔閡與速度攀比，以手作露營、夕陽輕跑、新手越野健行爲主，自在交友。</span>
              </li>
            </ul>
          </div>

          {/* Dynamic Interactive Stats (Bento Grid Mini-pod) */}
          <div className="bg-bento-cream rounded-3xl p-5 border border-bento-sand flex items-center justify-around text-center shadow-xxs">
            <div>
              <p className="text-[10px] text-bento-muted uppercase tracking-wider">實名女行員</p>
              <p className="text-lg font-black font-sans text-bento-charcoal">4,120 人</p>
            </div>
            <div className="h-8 w-px bg-bento-sand/60"></div>
            <div>
              <p className="text-[10px] text-bento-muted uppercase tracking-wider">安心成行</p>
              <p className="text-lg font-black font-sans text-bento-charcoal">1,890 團</p>
            </div>
            <div className="h-8 w-px bg-bento-sand/60"></div>
            <div>
              <p className="text-[10px] text-bento-muted uppercase tracking-wider">折扣發放</p>
              <p className="text-lg font-black font-sans text-bento-charcoal">NT$ 94 萬</p>
            </div>
          </div>

          <div className="text-center pt-2">
            <p className="text-[10px] text-bento-muted font-sans font-medium">
              © 2026 GatherHer Group Inc. 專利隱私與實名加密保護。
            </p>
          </div>
        </div>

        {/* Right column (Responsive Premium Mockup Phone Center piece) */}
        <div id="gatherher-appcat-card" className="lg:col-span-8 w-full max-w-2xl mx-auto bg-bento-soft-white rounded-[32px] border border-bento-sage/20 shadow-sm overflow-hidden flex flex-col justify-between min-h-[750px] relative">
          
          {/* Mockup Status bar / App Header */}
          <div className="bg-bento-limelight px-4 md:px-6 py-3 border-b border-bento-sage/20 flex items-center justify-between">
            <div className="flex items-center gap-0.5 cursor-pointer" onClick={() => setActiveTab("community")}>
              <GatherHerLogoFull size={32} showSubtitle={false} className="scale-90 origin-left" />
            </div>

            {/* Simulated Live User Profile Stats bar */}
            <div className="flex items-center gap-2.5">
              {/* Point pill */}
              <div 
                onClick={() => setActiveTab("rewards")}
                className="bg-bento-soft-white shadow-xxs cursor-pointer border border-bento-sage/15 px-2 py-1 rounded-xl flex items-center gap-1.5 hover:bg-bento-lime/40 transition"
              >
                <Coins className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-xs font-black text-bento-charcoal font-sans">{profile.points} P</span>
              </div>

              {/* Verified pill */}
              <div 
                onClick={() => {
                  if (profile.verificationStatus !== VerificationStatus.VERIFIED) {
                    setShowVerifyWizard(true);
                  }
                }}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xxs font-semibold transition cursor-pointer shadow-xxs ${
                  profile.verificationStatus === VerificationStatus.VERIFIED
                    ? "bg-bento-lime text-bento-forest border border-bento-sage/20"
                    : "bg-terracotta-light text-terracotta border border-terracotta/20"
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{profile.verificationStatus === VerificationStatus.VERIFIED ? "已實名驗證" : "立即驗證"}</span>
              </div>

              {/* Avatar Icon */}
              <div className="flex items-center">
                <img 
                  src={profile.avatar} 
                  alt={profile.name}
                  className="w-7 h-7 rounded-full object-cover shadow-xxs border border-bento-sage/15"
                />
              </div>
            </div>
          </div>

          {/* Interactive Core Render Screens */}
          <div className="p-4 md:p-6 flex-1 overflow-y-auto max-h-[660px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.18 }}
              >
                {activeTab === "community" && (
                  <AllFemaleCommunity 
                    activities={activities}
                    onJoinToggle={handleJoinToggle}
                    userProfile={profile}
                    onVerifyRequest={() => setShowVerifyWizard(true)}
                  />
                )}

                {activeTab === "create" && (
                  <CreateGroup 
                    userProfile={profile}
                    onAddActivity={handleAddActivity}
                  />
                )}

                {activeTab === "rewards" && (
                  <RewardMarketplace 
                    userProfile={profile}
                    rewardItems={rewardItems}
                    onRedeemReward={handleRedeemReward}
                  />
                )}

                {activeTab === "journal" && (
                  <OutdoorJournal 
                    posts={posts}
                    userProfile={profile}
                    onAddPost={handleAddPost}
                    onLikeToggle={handleLikeToggle}
                    onBookmarkToggle={handleBookmarkToggle}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Tactile Mockup Bottom Nav Bar with Bento layout */}
          <div className="bg-bento-soft-white/95 backdrop-blur-md px-3 py-3 border-t border-bento-sage/20 grid grid-cols-4 gap-2 select-none z-10 sticky bottom-0 rounded-b-[32px]">
            <button
              onClick={() => setActiveTab("community")}
              className={`flex flex-col items-center justify-center gap-1 py-1.5 px-1.5 rounded-2xl transition cursor-pointer text-center ${
                activeTab === "community" 
                  ? "text-bento-forest font-bold bg-bento-lime/60 border border-bento-sage/20 shadow-xxs" 
                  : "text-bento-muted hover:text-bento-forest hover:bg-bento-limelight/30"
              }`}
            >
              <Compass className="h-5.5 w-5.5" />
              <span className="text-[10px] scale-95 font-semibold">全女社群</span>
            </button>

            <button
              onClick={() => setActiveTab("create")}
              className={`flex flex-col items-center justify-center gap-1 py-1.5 px-1.5 rounded-2xl transition cursor-pointer text-center ${
                activeTab === "create" 
                  ? "text-bento-forest font-bold bg-bento-lime/60 border border-bento-sage/20 shadow-xxs" 
                  : "text-bento-muted hover:text-bento-forest hover:bg-bento-limelight/30"
              }`}
            >
              <PlusCircle className="h-5.5 w-5.5" />
              <span className="text-[10px] scale-95 font-semibold">隨時揪團</span>
            </button>

            <button
              onClick={() => setActiveTab("rewards")}
              className={`flex flex-col items-center justify-center gap-1 py-1.5 px-1.5 rounded-2xl transition cursor-pointer text-center ${
                activeTab === "rewards" 
                  ? "text-bento-forest font-bold bg-bento-lime/60 border border-bento-sage/20 shadow-xxs" 
                  : "text-bento-muted hover:text-bento-forest hover:bg-bento-limelight/30"
              }`}
            >
              <Award className="h-5.5 w-5.5" />
              <span className="text-[10px] scale-95 font-semibold">積分獎勵</span>
            </button>

            <button
              onClick={() => setActiveTab("journal")}
              className={`flex flex-col items-center justify-center gap-1 py-1.5 px-1.5 rounded-2xl transition cursor-pointer text-center ${
                activeTab === "journal" 
                  ? "text-bento-forest font-bold bg-bento-lime/60 border border-bento-sage/20 shadow-xxs" 
                  : "text-bento-muted hover:text-bento-forest hover:bg-bento-limelight/30"
              }`}
            >
              <FileText className="h-5.5 w-5.5" />
              <span className="text-[10px] scale-95 font-semibold">戶外日誌</span>
            </button>
          </div>

        </div>

      </div>

      {/* Verification Wizard Overlay Triggered dynamically */}
      {showVerifyWizard && (
        <div className="fixed inset-0 bg-bento-charcoal/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-bento-soft-white rounded-[28px] max-w-sm w-full overflow-hidden shadow-xl border border-bento-sage/25 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="bg-bento-forest text-bento-cream p-6 space-y-2 relative">
              <button 
                onClick={() => {
                  setShowVerifyWizard(false);
                  setVerifyStep(1);
                }}
                className="absolute right-4 top-4 text-bento-cream/80 hover:text-bento-cream bg-white/15 p-1.5 rounded-full hover:bg-white/25 transition"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="inline-flex p-2 bg-white/15 rounded-xl text-bento-cream">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold tracking-tight">100% 女性安全身分審查</h3>
              <p className="text-[10px] text-bento-limelight/95 leading-relaxed font-light">為了維持 GatherHer 的全女性高感度淨土，我們透過實名核對提供安全守護。</p>
            </div>

            <div className="p-6 space-y-4">
              {/* Progress Steps header line */}
              <div className="flex items-center justify-between text-[10px] font-bold text-bento-muted">
                <span className={verifyStep === 1 ? "text-bento-forest" : ""}>STEP 1: 實名證件對照</span>
                <ChevronRight className="h-3 w-3 text-bento-sage" />
                <span className={verifyStep === 2 ? "text-bento-forest" : ""}>STEP 2: 拍張微笑自拍</span>
              </div>

              {verifyStep === 1 ? (
                <div className="space-y-3 font-sans">
                  <p className="text-xs text-bento-muted leading-relaxed font-light">
                    請上傳身分證件正面（僅用於比對女性姓名字根、身分號開頭為 2 字根，系統自動遮罩照片，不留底）。
                  </p>
                  
                  {/* Fake upload container clickable to instantly simulate file input */}
                  <div className="border border-dashed border-bento-sage/35 hover:border-bento-forest bg-bento-limelight/30 rounded-2xl p-6 text-center space-y-2 transition duration-200 cursor-pointer" onClick={() => setVerifyStep(2)}>
                    <div className="p-2.5 bg-bento-soft-white inline-block rounded-full shadow-xxs text-bento-forest">
                      <Camera className="h-5 w-5" />
                    </div>
                    <div className="text-xs font-semibold text-bento-charcoal">拍照或上傳國家證件</div>
                    <p className="text-xxs text-bento-muted">支持 JPG, PNG，最大 5MB</p>
                  </div>

                  {/* quick mockup info warning */}
                  <div className="p-2.5 bg-bento-limelight rounded-xl text-xxs text-bento-charcoal font-light flex gap-2">
                    <span className="font-semibold text-bento-forest">🔒 全加密傳輸：</span>
                    <span className="text-bento-muted">所有憑證於核對完畢後，完全進行加密去敏感處理，本司不儲存任何原圖。</span>
                  </div>

                  <button
                    onClick={() => setVerifyStep(2)}
                    className="w-full bg-bento-forest hover:bg-bento-forest/90 text-bento-cream text-xs py-2.5 rounded-xl font-semibold transition cursor-pointer"
                  >
                    已成功讀入 · 進入下一步
                  </button>
                </div>
              ) : (
                <div className="space-y-3 font-sans">
                  <p className="text-xs text-bento-muted leading-relaxed font-light">
                    請對鏡頭拍攝一段含「手勢眨眼」的 2 秒自拍，用於與剛剛的證件肖像交叉防偽。
                  </p>

                  <div className="bg-bento-charcoal aspect-video rounded-2xl overflow-hidden relative flex flex-col items-center justify-center text-bento-cream space-y-2">
                    {idSubmitted ? (
                      <div className="text-center space-y-2">
                        <div className="w-8 h-8 rounded-full border-2 border-bento-cream border-t-transparent animate-spin mx-auto"></div>
                        <p className="text-xxs text-bento-limelight">AI 微笑分析與防偽審核中...</p>
                      </div>
                    ) : (
                      <>
                        <div className="absolute top-2 left-2 bg-rose-500 text-bento-cream font-mono text-[9px] px-1.5 py-0.5 rounded animate-pulse">
                          ● CAMERA PREVIEW
                        </div>
                        <span className="text-[10px] text-bento-lime">前方照相機已啟動</span>
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/40">
                          <User className="h-5 w-5 text-bento-cream" />
                        </div>
                        <span className="text-xxs text-bento-limelight">手勢要求 : 比出 😉 奇妙微笑</span>
                      </>
                    )}
                  </div>

                  <button
                    onClick={triggerSimulationVerify}
                    disabled={idSubmitted}
                    className="w-full bg-bento-forest hover:bg-bento-forest/90 text-bento-cream text-xs py-2.5 rounded-xl font-semibold transition cursor-pointer"
                  >
                    {idSubmitted ? "安全提交處理中..." : "提交安心審核 (可賺 +100P)"}
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
