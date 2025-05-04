
export const userProfileData = {
  user: {
    username: 'flutter_master',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Flutter developer with 3+ years of experience. Love creating beautiful UI and solving complex problems.',
    xp: 1240,
    streak: 7,
    challengesSolved: 42,
    joinDate: 'Apr 12, 2023'
  },
  achievements: [
    {
      id: 'a1',
      name: '7-Day Streak',
      description: 'Completed challenges for 7 days in a row',
      emoji: '🔥',
      unlocked: true,
      xpReward: 100
    },
    {
      id: 'a2',
      name: 'First 1000 XP',
      description: 'Earned your first 1000 XP',
      emoji: '🌟',
      unlocked: true,
      xpReward: 150
    },
    {
      id: 'a3',
      name: 'UI Wizard',
      description: 'Completed 10 UI challenges',
      emoji: '🧙',
      unlocked: true,
      xpReward: 200
    },
    {
      id: 'a4',
      name: 'Bug Hunter',
      description: 'Fixed 5 debugging challenges',
      emoji: '🔍',
      unlocked: true,
      xpReward: 100
    },
    {
      id: 'a5',
      name: 'Algorithm Master',
      description: 'Solved 10 algorithm challenges',
      emoji: '🧠',
      unlocked: false,
      xpReward: 300
    },
    {
      id: 'a6',
      name: '30-Day Streak',
      description: 'Completed challenges for 30 days in a row',
      emoji: '📅',
      unlocked: false,
      xpReward: 500
    }
  ],
  solvedChallenges: [
    {
      id: 'c1',
      title: 'Design a Bottom Navigation Bar',
      tags: ['Flutter', 'UI'],
      xpEarned: 50,
      completedDate: 'May 3, 2023'
    },
    {
      id: 'c2',
      title: 'Parse JSON Response',
      tags: ['Dart', 'Logic'],
      xpEarned: 75,
      completedDate: 'May 2, 2023'
    },
    {
      id: 'c5',
      title: 'Create an Extension Method',
      tags: ['Dart', 'Logic'],
      xpEarned: 40,
      completedDate: 'May 1, 2023'
    },
    {
      id: 'c6',
      title: 'Convert Stateful to Stateless',
      tags: ['Flutter', 'Architecture'],
      xpEarned: 65,
      completedDate: 'Apr 30, 2023'
    }
  ]
};
