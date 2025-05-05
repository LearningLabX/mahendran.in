// Define the user profile data structure with necessary types

// Type definitions
interface User {
  username: string;
  avatar: string;
  bio: string;
  xp: number;
  streak: number;
  challengesSolved: number;
  joinDate: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  unlocked: boolean;
  xpReward: number;
}

interface Challenge {
  id: string;
  title: string;
  tags: string[];
  xpEarned: number;
  completedDate: string;
  solution: string;
}

interface UserProfileData {
  user: User;
  achievements: Achievement[];
  solvedChallenges: Challenge[];
}

// Create the userProfileData object
export const userProfileData: UserProfileData = {
  user: {
    username: 'DevMaster',
    avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Felix',
    bio: 'Mobile app developer | Flutter enthusiast | Open source contributor',
    xp: 1250,
    streak: 14,
    challengesSolved: 32,
    joinDate: 'May 2024',
  },
  achievements: [
    {
      id: 'a1',
      name: 'First Steps',
      description: 'Complete your first challenge',
      emoji: '🚀',
      unlocked: true,
      xpReward: 50,
    },
    {
      id: 'a2',
      name: 'On Fire',
      description: 'Maintain a 7-day streak',
      emoji: '🔥',
      unlocked: true,
      xpReward: 100,
    },
    {
      id: 'a3',
      name: 'Flutter Expert',
      description: 'Complete all Flutter challenges',
      emoji: '💪',
      unlocked: true,
      xpReward: 200,
    },
    {
      id: 'a4',
      name: 'Code Ninja',
      description: 'Solve 50 challenges',
      emoji: '🥷',
      unlocked: false,
      xpReward: 300,
    },
    {
      id: 'a5',
      name: 'Perfect Solution',
      description: 'Get a perfect score on a hard challenge',
      emoji: '⭐',
      unlocked: true,
      xpReward: 150,
    },
    {
      id: 'a6',
      name: 'Early Bird',
      description: 'Complete a challenge within 1 hour of posting',
      emoji: '🐦',
      unlocked: false,
      xpReward: 100,
    },
  ],
  solvedChallenges: [
    {
      id: 'c1',
      title: 'Flutter Navigation Bar Implementation',
      tags: ['Flutter', 'UI', 'Navigation'],
      xpEarned: 75,
      completedDate: 'May 2, 2025',
      solution: `import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Navigation Bar Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _selectedIndex = 0;
  
  final List<Widget> _pages = [
    Center(child: Text('Home')),
    Center(child: Text('Search')),
    Center(child: Text('Profile')),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Navigation Demo'),
      ),
      body: _pages[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.search),
            label: 'Search',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.blue,
        onTap: _onItemTapped,
      ),
    );
  }
}`,
    },
    {
      id: 'c2',
      title: 'State Management with Provider',
      tags: ['Flutter', 'Provider', 'State Management'],
      xpEarned: 100,
      completedDate: 'Apr 28, 2025',
      solution: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => Counter(),
      child: MyApp(),
    ),
  );
}

class Counter with ChangeNotifier {
  int _count = 0;
  int get count => _count;

  void increment() {
    _count++;
    notifyListeners();
  }
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Provider Demo',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Provider Demo'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text('You have pushed the button this many times:'),
            Consumer<Counter>(
              builder: (context, counter, child) => Text(
                '\${counter.count}',
                style: Theme.of(context).textTheme.headlineMedium,
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => Provider.of<Counter>(context, listen: false).increment(),
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}`,
    },
    {
      id: 'c3',
      title: 'Animated List Implementation',
      tags: ['Flutter', 'Animation', 'UI'],
      xpEarned: 85,
      completedDate: 'Apr 20, 2025',
      solution: `import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Animated List Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: AnimatedListSample(),
    );
  }
}

class AnimatedListSample extends StatefulWidget {
  @override
  _AnimatedListSampleState createState() => _AnimatedListSampleState();
}

class _AnimatedListSampleState extends State<AnimatedListSample> {
  final GlobalKey<AnimatedListState> _listKey = GlobalKey<AnimatedListState>();
  final List<String> _items = ['Item 1', 'Item 2', 'Item 3'];
  
  void _addItem() {
    final int newIndex = _items.length;
    _items.add('Item \${newIndex + 1}');
    _listKey.currentState!.insertItem(newIndex);
  }

  void _removeItem(int index) {
    final String removedItem = _items[index];
    _items.removeAt(index);
    _listKey.currentState!.removeItem(
      index,
      (context, animation) => _buildItem(removedItem, animation),
    );
  }

  Widget _buildItem(String item, Animation<double> animation) {
    return SizeTransition(
      sizeFactor: animation,
      child: Card(
        margin: EdgeInsets.all(10),
        elevation: 5,
        child: ListTile(
          title: Text(item),
          trailing: IconButton(
            icon: Icon(Icons.delete),
            onPressed: () => _removeItem(_items.indexOf(item)),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Animated List'),
      ),
      body: AnimatedList(
        key: _listKey,
        initialItemCount: _items.length,
        itemBuilder: (context, index, animation) {
          return _buildItem(_items[index], animation);
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _addItem,
        tooltip: 'Add Item',
        child: Icon(Icons.add),
      ),
    );
  }
}`,
    },
  ],
};
