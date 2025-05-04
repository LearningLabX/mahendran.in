
interface LeaderboardUser {
  id: string;
  username: string;
  avatar: string;
  xp: number;
  challengesSolved: number;
  badges?: string[];
  streak: number;
}

export const leaderboardData = {
  daily: [
    {
      id: 'u1',
      username: 'flutter_master',
      avatar: 'https://i.pravatar.cc/150?img=1',
      xp: 320,
      challengesSolved: 8,
      badges: ['🔥 7-Day Streak', '🧙 UI Wizard', '🚀 Fast Solver'],
      streak: 7
    },
    {
      id: 'u2',
      username: 'dart_ninja',
      avatar: 'https://i.pravatar.cc/150?img=2',
      xp: 280,
      challengesSolved: 7,
      badges: ['🌟 First 1000 XP', '🔧 Bug Hunter'],
      streak: 4
    },
    {
      id: 'u3',
      username: 'mobile_dev',
      avatar: 'https://i.pravatar.cc/150?img=3',
      xp: 250,
      challengesSolved: 6,
      badges: ['🔥 5-Day Streak'],
      streak: 5
    },
    {
      id: 'u4',
      username: 'code_wizard',
      avatar: 'https://i.pravatar.cc/150?img=4',
      xp: 210,
      challengesSolved: 5,
      badges: ['🧪 Algorithm Master'],
      streak: 3
    },
    {
      id: 'u5',
      username: 'app_creator',
      avatar: 'https://i.pravatar.cc/150?img=5',
      xp: 180,
      challengesSolved: 4,
      badges: ['🏆 Top Contributor'],
      streak: 2
    },
    {
      id: 'u6',
      username: 'widget_builder',
      avatar: 'https://i.pravatar.cc/150?img=6',
      xp: 150,
      challengesSolved: 3,
      badges: ['📱 UI Expert'],
      streak: 1
    },
    {
      id: 'u7',
      username: 'kotlin_coder',
      avatar: 'https://i.pravatar.cc/150?img=7',
      xp: 120,
      challengesSolved: 3,
      badges: ['🔄 KMP Expert'],
      streak: 3
    },
    {
      id: 'u8',
      username: 'swift_dev',
      avatar: 'https://i.pravatar.cc/150?img=8',
      xp: 100,
      challengesSolved: 2,
      badges: ['🍎 iOS Developer'],
      streak: 2
    }
  ],
  weekly: [
    {
      id: 'u2',
      username: 'dart_ninja',
      avatar: 'https://i.pravatar.cc/150?img=2',
      xp: 1250,
      challengesSolved: 25,
      badges: ['🌟 First 1000 XP', '🔧 Bug Hunter', '🏆 Weekly Champion'],
      streak: 14
    },
    {
      id: 'u1',
      username: 'flutter_master',
      avatar: 'https://i.pravatar.cc/150?img=1',
      xp: 1100,
      challengesSolved: 22,
      badges: ['🔥 14-Day Streak', '🧙 UI Wizard', '🚀 Fast Solver'],
      streak: 14
    },
    {
      id: 'u4',
      username: 'code_wizard',
      avatar: 'https://i.pravatar.cc/150?img=4',
      xp: 980,
      challengesSolved: 20,
      badges: ['🧪 Algorithm Master', '🌟 Rising Star'],
      streak: 12
    },
    {
      id: 'u3',
      username: 'mobile_dev',
      avatar: 'https://i.pravatar.cc/150?img=3',
      xp: 850,
      challengesSolved: 17,
      badges: ['🔥 10-Day Streak'],
      streak: 10
    },
    {
      id: 'u7',
      username: 'kotlin_coder',
      avatar: 'https://i.pravatar.cc/150?img=7',
      xp: 700,
      challengesSolved: 14,
      badges: ['🔄 KMP Expert'],
      streak: 7
    }
  ],
  allTime: [
    {
      id: 'u1',
      username: 'flutter_master',
      avatar: 'https://i.pravatar.cc/150?img=1',
      xp: 12450,
      challengesSolved: 248,
      badges: ['🔥 50-Day Streak', '🧙 UI Wizard', '👑 Legend', '🚀 Fast Solver'],
      streak: 50
    },
    {
      id: 'u2',
      username: 'dart_ninja',
      avatar: 'https://i.pravatar.cc/150?img=2',
      xp: 10280,
      challengesSolved: 205,
      badges: ['🌟 10000 XP Club', '🔧 Bug Hunter', '🧠 Algorithm Expert'],
      streak: 32
    },
    {
      id: 'u4',
      username: 'code_wizard',
      avatar: 'https://i.pravatar.cc/150?img=4',
      xp: 8650,
      challengesSolved: 173,
      badges: ['🧪 Algorithm Master', '🌟 Rising Star', '🔥 30-Day Streak'],
      streak: 24
    },
    {
      id: 'u9',
      username: 'senior_dev',
      avatar: 'https://i.pravatar.cc/150?img=9',
      xp: 7890,
      challengesSolved: 158,
      badges: ['👑 Early Adopter', '📱 UI Genius', '🧠 Problem Solver'],
      streak: 12
    },
    {
      id: 'u3',
      username: 'mobile_dev',
      avatar: 'https://i.pravatar.cc/150?img=3',
      xp: 6540,
      challengesSolved: 130,
      badges: ['🔥 20-Day Streak', '🌟 5000 XP Club'],
      streak: 8
    }
  ]
};
