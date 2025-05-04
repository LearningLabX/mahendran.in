export const userProfileData = {
  user: {
    username: 'flutter_master',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Flutter developer with 3+ years of experience. Love creating beautiful UI and solving complex problems.',
    xp: 1240,
    streak: 7,
    challengesSolved: 42,
    joinDate: 'Apr 12, 2023',
  },
  achievements: [
    {
      id: 'a1',
      name: '7-Day Streak',
      description: 'Completed challenges for 7 days in a row',
      emoji: '🔥',
      unlocked: true,
      xpReward: 100,
    },
    {
      id: 'a2',
      name: 'First 1000 XP',
      description: 'Earned your first 1000 XP',
      emoji: '🌟',
      unlocked: true,
      xpReward: 150,
    },
    {
      id: 'a3',
      name: 'UI Wizard',
      description: 'Completed 10 UI challenges',
      emoji: '🧙',
      unlocked: true,
      xpReward: 200,
    },
    {
      id: 'a4',
      name: 'Bug Hunter',
      description: 'Fixed 5 debugging challenges',
      emoji: '🔍',
      unlocked: true,
      xpReward: 100,
    },
    {
      id: 'a5',
      name: 'Algorithm Master',
      description: 'Solved 10 algorithm challenges',
      emoji: '🧠',
      unlocked: false,
      xpReward: 300,
    },
    {
      id: 'a6',
      name: '30-Day Streak',
      description: 'Completed challenges for 30 days in a row',
      emoji: '📅',
      unlocked: false,
      xpReward: 500,
    },
  ],
  solvedChallenges: [
    {
      id: 'c1',
      title: 'Design a Bottom Navigation Bar',
      tags: ['Flutter', 'UI'],
      xpEarned: 50,
      completedDate: 'May 3, 2023',
      solution: `class CustomBottomNav extends StatefulWidget {
  @override
  _CustomBottomNavState createState() => _CustomBottomNavState();
}

class _CustomBottomNavState extends State<CustomBottomNav> {
  int _selectedIndex = 0;
  
  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: _selectedIndex,
      onTap: _onItemTapped,
      type: BottomNavigationBarType.fixed,
      selectedItemColor: Theme.of(context).primaryColor,
      unselectedItemColor: Colors.grey,
      items: [
        BottomNavigationBarItem(
          icon: _buildIcon(0, Icons.home),
          label: 'Home',
        ),
        BottomNavigationBarItem(
          icon: _buildIcon(1, Icons.search),
          label: 'Search',
        ),
        BottomNavigationBarItem(
          icon: _buildIcon(2, Icons.favorite),
          label: 'Favorites',
        ),
        BottomNavigationBarItem(
          icon: _buildIcon(3, Icons.person),
          label: 'Profile',
        ),
      ],
    );
  }
  
  Widget _buildIcon(int index, IconData icon) {
    return AnimatedContainer(
      duration: Duration(milliseconds: 200),
      padding: EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: _selectedIndex == index ? Theme.of(context).primaryColor.withOpacity(0.2) : Colors.transparent,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Icon(icon),
    );
  }
}`,
    },
    {
      id: 'c2',
      title: 'Parse JSON Response',
      tags: ['Dart', 'Logic'],
      xpEarned: 75,
      completedDate: 'May 2, 2023',
      solution: `class Post {
  final int id;
  final String title;
  
  Post({required this.id, required this.title});
  
  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      id: json['id'],
      title: json['title'],
    );
  }
}

class Preferences {
  final String theme;
  final bool notifications;
  
  Preferences({required this.theme, required this.notifications});
  
  factory Preferences.fromJson(Map<String, dynamic> json) {
    return Preferences(
      theme: json['theme'],
      notifications: json['notifications'],
    );
  }
}

class User {
  final int id;
  final String name;
  final String email;
  final Preferences preferences;
  final List<Post> posts;
  
  User({
    required this.id, 
    required this.name, 
    required this.email, 
    required this.preferences, 
    required this.posts,
  });
  
  factory User.fromJson(Map<String, dynamic> json) {
    var userJson = json['user'];
    
    var postsList = userJson['posts'] as List;
    List<Post> posts = postsList.map((item) => Post.fromJson(item)).toList();
    
    return User(
      id: userJson['id'],
      name: userJson['name'],
      email: userJson['email'],
      preferences: Preferences.fromJson(userJson['preferences']),
      posts: posts,
    );
  }
}`,
    },
    {
      id: 'c5',
      title: 'Create an Extension Method',
      tags: ['Dart', 'Logic'],
      xpEarned: 40,
      completedDate: 'May 1, 2023',
      solution: `extension StringHelpers on String {
  String capitalize() {
    if (isEmpty) return this;
    return this[0].toUpperCase() + this.substring(1);
  }
  
  String truncate(int maxLength, {String suffix = '...'}) {
    if (length <= maxLength) return this;
    return substring(0, maxLength) + suffix;
  }
  
  String toSlug() {
    return toLowerCase()
      .replaceAll(' ', '-')
      .replaceAll(RegExp(r'[^\w-]'), '');
  }
}`,
    },
    {
      id: 'c6',
      title: 'Convert Stateful to Stateless',
      tags: ['Flutter', 'Architecture'],
      xpEarned: 65,
      completedDate: 'Apr 30, 2023',
      solution: `// Before:
class CounterWidget extends StatefulWidget {
  @override
  _CounterWidgetState createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  int _count = 0;
  
  void _increment() {
    setState(() {
      _count++;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: $_count'),
        ElevatedButton(
          onPressed: _increment,
          child: Text('Increment'),
        ),
      ],
    );
  }
}

// After (with Provider):
class CounterModel extends ChangeNotifier {
  int _count = 0;
  int get count => _count;
  
  void increment() {
    _count++;
    notifyListeners();
  }
}

// Register in main.dart
// ChangeNotifierProvider(create: (_) => CounterModel()),

class CounterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final counter = context.watch<CounterModel>();
    return Column(
      children: [
        Text('Count: {counter.count}'),
        ElevatedButton(
          onPressed: counter.increment,
          child: Text('Increment'),
        ),
      ],
    );
  }
}`,
    },
  ],
};
