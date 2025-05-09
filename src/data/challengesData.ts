export interface Challenge {
  id: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number;
  xpReward: number;
  solvedPercentage: number;
  instructions?: string;
  codeSnippet?: string;
  expectedOutput?: string;
  solutionExample?: string;
}

export const challengesData: Challenge[] = [
  {
    id: 'c1',
    title: 'Design a Bottom Navigation Bar',
    description: 'Create a custom bottom navigation bar in Flutter with animations and indicators.',
    tags: ['Flutter', 'UI'],
    difficulty: 'easy',
    timeLimit: 20,
    xpReward: 50,
    solvedPercentage: 78,
    instructions: 'Create a BottomNavigationBar with 4 items and custom transition animations. The active item should have a color indicator and slight scale effect.',
    codeSnippet: `class CustomBottomNav extends StatefulWidget {
  @override
  _CustomBottomNavState createState() => _CustomBottomNavState();
}

class _CustomBottomNavState extends State<CustomBottomNav> {
  int _selectedIndex = 0;
  
  // TODO: Implement the build method with animation
  
}`,
    expectedOutput: 'A bottom navigation bar with 4 items that animate when selected.',
    solutionExample: `class CustomBottomNav extends StatefulWidget {
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
      child: Icon(
        icon,
        color: _selectedIndex == index ? Theme.of(context).primaryColor : Colors.grey,
      ),
    );
  }
}`
  },
  {
    id: 'c2',
    title: 'Parse JSON Response',
    description: 'Implement a function to parse a complex JSON response from an API.',
    tags: ['Dart', 'Logic'],
    difficulty: 'medium',
    timeLimit: 25,
    xpReward: 75,
    solvedPercentage: 62,
    instructions: 'Create a data class and parse the provided JSON into a typed object. Handle nested objects and arrays correctly.',
    codeSnippet: `// JSON to parse:
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "preferences": {
      "theme": "dark",
      "notifications": true
    },
    "posts": [
      { "id": 101, "title": "First Post" },
      { "id": 102, "title": "Second Post" }
    ]
  }
}

// TODO: Create User class and fromJson method`,
    expectedOutput: 'A User object with name, email, preferences and posts properly parsed.',
    solutionExample: `class Post {
  final int id;
  final String title;
  
  Post({required this.id, required this.title});
  
  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      id: json['id'] as int,
      title: json['title'] as String,
    );
  }
}

class Preferences {
  final String theme;
  final bool notifications;
  
  Preferences({required this.theme, required this.notifications});
  
  factory Preferences.fromJson(Map<String, dynamic> json) {
    return Preferences(
      theme: json['theme'] as String,
      notifications: json['notifications'] as bool,
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
    final userJson = json['user'];
    return User(
      id: userJson['id'] as int,
      name: userJson['name'] as String,
      email: userJson['email'] as String,
      preferences: Preferences.fromJson(userJson['preferences']),
      posts: (userJson['posts'] as List)
        .map((postJson) => Post.fromJson(postJson))
        .toList(),
    );
  }
}`
  },
  {
    id: 'c3',
    title: 'Fix Authentication Flow',
    description: 'Debug and fix a broken Firebase authentication implementation.',
    tags: ['Firebase', 'Integration'],
    difficulty: 'hard',
    timeLimit: 30,
    xpReward: 100,
    solvedPercentage: 45,
    instructions: 'Fix the authentication service that has bugs in the sign-in and token refresh logic. The current implementation is missing error handling and proper state management.',
    codeSnippet: `class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  
  Future<User?> signIn(String email, String password) async {
    // Bug: Missing proper error handling
    final userCredential = await _auth.signInWithEmailAndPassword(
      email: email,
      password: password,
    );
    return userCredential.user;
  }
  
  Future<void> signOut() async {
    // Bug: Missing state cleanup
    return await _auth.signOut();
  }
  
  // Bug: Missing token refresh handling
}`
  },
  {
    id: 'c4',
    title: 'Implement a Custom List View',
    description: 'Create a reusable ListView with pull-to-refresh and infinite scrolling.',
    tags: ['Flutter', 'UI'],
    difficulty: 'medium',
    timeLimit: 25,
    xpReward: 80,
    solvedPercentage: 54,
    instructions: 'Implement a custom ListView widget that supports pull-to-refresh, infinite scrolling, and shows appropriate loading indicators.'
  },
  {
    id: 'c5',
    title: 'Create an Extension Method',
    description: 'Write an extension method that adds useful formatting functions to String class.',
    tags: ['Dart', 'Logic'],
    difficulty: 'easy',
    timeLimit: 15,
    xpReward: 40,
    solvedPercentage: 83,
    instructions: 'Create a Dart extension method on String that adds methods for: capitalizing first letter, truncating with ellipsis, and converting to slug format.'
  },
  {
    id: 'c6',
    title: 'Convert Stateful to Stateless',
    description: 'Refactor a stateful widget to a stateless widget using a state management solution.',
    tags: ['Flutter', 'Architecture'],
    difficulty: 'medium',
    timeLimit: 20,
    xpReward: 65,
    solvedPercentage: 71,
    instructions: 'Convert the provided stateful widget to a stateless one using Provider for state management.'
  }
];
