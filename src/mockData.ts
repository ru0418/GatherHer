/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Activity, ActivityCategory, JournalPost, RewardItem, UserProfile, VerificationStatus } from "./types";

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: "act-1",
    title: "【新手友善】合歡主東峰兩天一夜療癒森呼吸",
    creator: {
      name: "晴萱 (Sunny)",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
      isVerified: true
    },
    category: ActivityCategory.HIKING,
    date: "2026-06-25",
    time: "07:30",
    location: "南投縣 合歡山主峰、東峰",
    difficulty: "簡單",
    maxParticipants: 8,
    currentParticipants: 6,
    joinedUsers: ["安婷", "筱雅", "育佳", "佩芸", "怡凡", "晴萱 (Sunny)"],
    description: "專為想體驗高山的新手設計的行程！住在清境附近，隔天清晨出發登頂，欣赏絕美雲海。全程配備合格女性專業嚮導，慢節奏、無痛上百岳！",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561730d1e4a6?auto=format&fit=crop&q=80&w=800",
    pointsReward: 150
  },
  {
    id: "act-2",
    title: "【森林系】逐露春曉溪谷野營 · 享受星空微醺之夜",
    creator: {
      name: "家瑄 (Abby)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      isVerified: true
    },
    category: ActivityCategory.CAMPING,
    date: "2026-07-04",
    time: "10:00",
    location: "新竹縣 尖石鄉野營地",
    difficulty: "中等",
    maxParticipants: 6,
    currentParticipants: 4,
    joinedUsers: ["家瑄 (Abby)", "育綺", "語婕", "巧柔"],
    description: "遠離城市喧囂，來一場療癒心靈的無插電露營。我們將在溪畔搭建美學帳篷，自己炊事、手沖咖啡。晚上圍在營火旁配著溫潤果茶聊天，這是一場與大自然的深度對話。",
    imageUrl: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800",
    pointsReward: 200
  },
  {
    id: "act-3",
    title: "【大稻埕】夕陽微風河畔 5K 慢跑小聚 ＆ 輕食交流",
    creator: {
      name: "雨婷 (Tina)",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
      isVerified: true
    },
    category: ActivityCategory.RUNNING,
    date: "2026-06-18",
    time: "17:30",
    location: "台北市 大稻埕碼頭廣場",
    difficulty: "簡單",
    maxParticipants: 12,
    currentParticipants: 8,
    joinedUsers: ["雨婷 (Tina)", "佳穎", "若薇", "子瑜", "詠晴", "書媞", "美秀", "曉芳"],
    description: "下班後的舒壓時光！我們在大稻埕碼頭沿河畔跑 5K，均速 6:30 慢跑。夜幕低垂時沿途觀賞夕陽，結束後在河畔貨櫃市集聚餐聊天，交流日常工作與生活趣事！",
    imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=800",
    pointsReward: 80
  },
  {
    id: "act-4",
    title: "【金面山】剪刀石健行 攀岩挑戰與極致美照",
    creator: {
      name: "心怡 (Sherry)",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
      isVerified: true
    },
    category: ActivityCategory.TREKKING,
    date: "2026-06-21",
    time: "08:00",
    location: "台北市 內湖金面山登山口",
    difficulty: "挑戰",
    maxParticipants: 8,
    currentParticipants: 7,
    joinedUsers: ["心怡 (Sherry)", "宛婷", "冠妤", "詩涵", "孟蓉", "莉芳", "思敏"],
    description: "去內湖金面山挑戰一下大岩壁攀爬！登上剪刀石可以 360 度俯瞰台北盆地，視野絕佳。我們會互相協助、拍照，是熱血女孩不能錯過的半日輕冒險！",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    pointsReward: 100
  }
];

export const INITIAL_JOURNAL_POSTS: JournalPost[] = [
  {
    id: "post-1",
    author: {
      name: "安婷 (Amber)",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
      isVerified: true
    },
    title: "在加里山頂的一杯手沖，生活的所有疲憊都散去了 🌲",
    content: "上週末跟 GatherHer 上的夥伴一起去了「台灣富士山」加里山。在柳杉林穿梭的時候，泥土跟松針葉的味道超好聞！原本擔心自己走不完，但路上女孩們大家一邊聊天一邊打氣、互相提醒踩點，最後順利登頂！在山頂喝到自己帶的手沖咖啡，真的有無比的成就感！找到懂妳的女孩玩戶外，真的好幸福 ✨",
    category: ActivityCategory.HIKING,
    routeRecord: "苗栗加里山步道 · 往返 5.8km · 攀升 920m",
    photos: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800"
    ],
    likes: 124,
    hasLiked: false,
    bookmarks: 48,
    hasBookmarked: false,
    date: "2026-06-10"
  },
  {
    id: "post-2",
    author: {
      name: "家瑄 (Abby)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      isVerified: true
    },
    title: "尖石松林免裝備溫馨美學露營，療癒上班族的靈魂",
    content: "這是我在 GatherHer 開的第一個露營團，謝謝大家信任！我們在滿月下生火，圍在一起烤棉花糖、玩桌遊，還聊了每個人在辦公室遇到的各種奇妙事情，甚至一邊敷面膜一邊看夜空！有別於男女混團的壓力，全女生團真的可以超級自在放開、大笑！期待下一次再與這群寶藏女孩一起逐露春曉！",
    category: ActivityCategory.CAMPING,
    routeRecord: "新竹尖石頂大山營地 · 2天1夜精緻野宿",
    photos: [
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1532339680222-3e127362a17f?auto=format&fit=crop&q=80&w=800"
    ],
    likes: 89,
    hasLiked: false,
    bookmarks: 32,
    hasBookmarked: false,
    date: "2026-06-08"
  },
  {
    id: "post-3",
    author: {
      name: "育綺 (Kiki)",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
      isVerified: true
    },
    title: "大坑 4 號步道「萬里長城」極限挑戰，流汗排毒超爽快！",
    content: "傳說中陡峭的圓木步道，今天終於完成挑戰了！雖然大腿有點酸，但金黃陽光透過相思樹林灑下來的那一刻真的超美 ☀️ 全程手腳並用，跟著 GatherHer 認識的幾位陽光姊妹一邊拍照一邊加油，完全沒想像中累，大推給想突破自我的女生！",
    category: ActivityCategory.TREKKING,
    routeRecord: "台中大坑4號步道 · 全長1.9km 圓木高難度步道",
    photos: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800"
    ],
    likes: 72,
    hasLiked: false,
    bookmarks: 20,
    hasBookmarked: false,
    date: "2026-06-05"
  }
];

export const REWARD_ITEMS: RewardItem[] = [
  {
    id: "rew-1",
    title: "GatherHer 聯名輕量防水坐墊 (珊瑚橘)",
    brand: "Wilderness Cozy",
    pointsRequired: 300,
    category: "戶外裝備",
    imageUrl: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=400",
    description: "GatherHer 限定聯名設計。極輕僅 45g，四折便攜，防水防污，適合露營或登山休息時隨地一坐，保護妳的服裝乾淨舒適、遠離泥塵濕氣。",
    stock: 24
  },
  {
    id: "rew-2",
    title: "精選 100% 天然精油茶樹薄荷戶外防蚊香氛噴霧 100ml",
    brand: "Forest Breath",
    pointsRequired: 450,
    category: "女性用品",
    imageUrl: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&q=80&w=400",
    description: "专爲女性肌膚設計，調和茶樹、澳洲尤加利、薄荷與薰衣草精油。氣味療癒清新，零化學 DEET，有效防蚊防小黑蚊，舒緩山林悶熱、給妳純淨森林的安撫力。",
    stock: 15
  },
  {
    id: "rew-3",
    title: "專業羊毛透氣登山中筒襪 (莫蘭迪 sage 綠)",
    brand: "LanaWool Active",
    pointsRequired: 600,
    category: "戶外裝備",
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=400",
    description: "採用一等紐西蘭美麗諾羊毛，足底厚實緩震，腳背超透氣網眼網孔設計。莫蘭迪鼠尾草綠配上甜美小山丘提花，美感與機能完美兼顧的高質感必備單品。",
    stock: 8
  },
  {
    id: "rew-4",
    title: "極輕量美學露營雙壁不鏽鋼馬克杯 300ml",
    brand: "Outfitter Minimalist",
    pointsRequired: 800,
    category: "聯名好禮",
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400",
    description: "磨砂象牙白飾面配精緻雷射 GatherHer 浮雕限定徽章。雙層真空結構，可極致保溫隔熱。把手可折疊收納極省空間，喝手沖咖啡或熱烤可可的儀式感必備。",
    stock: 5
  },
  {
    id: "rew-5",
    title: "女性專屬親膚多用途防汗微纖維運動快乾毛巾",
    brand: "Lotus Yoga & Trail",
    pointsRequired: 250,
    category: "女性用品",
    imageUrl: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=400",
    description: "極致吸水、抗菌防臭，比一般棉質快乾 4 倍。附矽膠網狀收納袋，掛在登山包上隨拿隨用，手感親膚柔軟，給大汗淋漓的妳最溫柔的拂拭。",
    stock: 30
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  name: "雅涵 (Iris)",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200", // Will be customisable
  points: 520, // initial points
  verificationStatus: VerificationStatus.VERIFIED, // verified for high trust out of the box so they see the verified badges
  joinedActivitiesCount: 3,
  unlockedBadges: [
    {
      id: "badge-1",
      name: "信任種子",
      description: "完成實名女性身分驗證，為社群注入安全感與信任",
      icon: "ShieldCheck",
      unlockedAt: "2026-06-01"
    },
    {
      id: "badge-2",
      name: "百里初行",
      description: "參與 GatherHer 兩場健行活動並順利解鎖",
      icon: "Compass",
      unlockedAt: "2026-06-05"
    },
    {
      id: "badge-3",
      name: "綠野精靈",
      description: "首次發布戶外日誌獲得 10 個以上愛心驚喜",
      icon: "Leaf",
      unlockedAt: "2026-06-08"
    }
  ],
  redeemedRewards: [
    {
      id: "red-past-1",
      rewardTitle: "女性專屬運動防滑髮帶套組",
      redeemedDate: "2026-06-02",
      code: "GHER-HAIR-8821"
    }
  ]
};
