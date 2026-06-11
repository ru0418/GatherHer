/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ActivityCategory {
  HIKING = "登山",
  CAMPING = "露營",
  RUNNING = "跑步",
  TREKKING = "健行"
}

export enum VerificationStatus {
  UNVERIFIED = "未驗證",
  PENDING = "審核中",
  VERIFIED = "女性身分已認證"
}

export interface Activity {
  id: string;
  title: string;
  creator: {
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  category: ActivityCategory;
  date: string;
  time: string;
  location: string;
  difficulty: "簡單" | "中等" | "挑戰";
  maxParticipants: number;
  currentParticipants: number;
  joinedUsers: string[]; // User names
  description: string;
  imageUrl: string;
  pointsReward: number;
}

export interface JournalPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  title: string;
  content: string;
  category: ActivityCategory;
  routeRecord?: string; // e.g. "陽明山大縱走東段 8.2km"
  photos: string[];
  likes: number;
  hasLiked?: boolean;
  bookmarks: number;
  hasBookmarked?: boolean;
  date: string;
}

export interface RewardItem {
  id: string;
  title: string;
  brand: string;
  pointsRequired: number;
  category: "戶外裝備" | "女性用品" | "聯名好禮";
  imageUrl: string;
  description: string;
  stock: number;
}

export interface UserProfile {
  name: string;
  avatar: string;
  points: number;
  verificationStatus: VerificationStatus;
  joinedActivitiesCount: number;
  unlockedBadges: {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt?: string;
  }[];
  redeemedRewards: {
    id: string;
    rewardTitle: string;
    redeemedDate: string;
    code: string;
  }[];
}
