
interface TipItem {
  id: string;
  category: string;
  title: string;
  content: string;
  codeSnippet?: string;
  link?: string;
  explanation?: string;
  question?: string;
  answer?: string;
}

export const learnData: TipItem[] = [
  // Flutter tips
  {
    id: 't1',
    category: 'flutter',
    title: 'Use const constructors whenever possible',
    content: 'The const keyword in Flutter allows widgets to be cached and reused, improving performance.',
    codeSnippet: `// Instead of:
Container(color: Colors.red)

// Use:
const Container(color: Colors.red)`,
    explanation: 'When a widget is marked as const, Flutter can reuse the instance rather than creating a new one every time the build method is called. This improves performance since it reduces object allocation and garbage collection.'
  },
  {
    id: 't2',
    category: 'flutter',
    title: 'Prefer SizedBox over Container for spacing',
    content: 'SizedBox is more efficient than Container when you just need to create spacing.',
    codeSnippet: `// Instead of:
Container(height: 16)

// Use:
const SizedBox(height: 16)`,
    question: 'What is the difference between SizedBox and Container?',
    answer: 'Container is a convenience widget that combines common painting, positioning, and sizing widgets. SizedBox is more lightweight and should be used when you only need to specify width or height. For simple spacing, SizedBox is more efficient and clear in its intent.'
  },
  {
    id: 't3',
    category: 'flutter',
    title: 'Use ListView.builder for large lists',
    content: 'Use ListView.builder instead of ListView for better performance with large lists.',
    codeSnippet: `ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text(items[index].title),
    );
  },
)`,
    explanation: 'ListView.builder creates items on demand as they become visible, rather than all at once. This makes it more efficient for large lists, as it only builds visible items and recycles them as the user scrolls.'
  },
  // Dart tips
  {
    id: 't4',
    category: 'dart',
    title: 'Use cascade notation for fluent interfaces',
    content: 'Cascade notation (..) allows you to make a sequence of operations on the same object.',
    codeSnippet: `// Instead of:
var button = ElevatedButton();
button.style = ButtonStyle();
button.onPressed = () => print('Pressed');
button.child = Text('Click me');

// Use:
var button = ElevatedButton()
  ..style = ButtonStyle()
  ..onPressed = () => print('Pressed')
  ..child = Text('Click me');`,
    question: 'What is cascade notation in Dart?',
    answer: 'Cascade notation (..) in Dart allows you to make a sequence of operations on the same object. It\'s a concise way to perform multiple operations without repeating the object reference, making the code more readable and fluent.'
  },
  {
    id: 't5',
    category: 'dart',
    title: 'Use collection if and for',
    content: 'Dart offers collection if and for for concise list and map manipulations.',
    codeSnippet: `// List with conditional items
final items = [
  'Always included',
  if (isLoggedIn) 'Profile',
  for (var feature in enabledFeatures) feature,
];`,
    explanation: 'Collection if allows you to conditionally include items in a collection. Collection for allows you to add multiple items by iterating over another collection. Both provide a concise and readable way to build dynamic collections.'
  },
  // Kotlin tips
  {
    id: 't6',
    category: 'kotlin',
    title: 'Use data classes for simple models',
    content: 'Kotlin data classes automatically generate equals(), hashCode(), toString(), and copy().',
    codeSnippet: `data class User(
  val id: Long,
  val name: String,
  val email: String
)

// Use copy to create modified instances
val user = User(1, "John", "john@example.com")
val updatedUser = user.copy(name = "John Doe")`,
    explanation: 'Data classes in Kotlin are designed to hold data. They automatically generate useful methods like equals(), hashCode(), toString(), and copy(). This reduces boilerplate code and makes your models more concise and functional.'
  },
  {
    id: 't7',
    category: 'kotlin',
    title: 'Use scope functions for cleaner code',
    content: 'Kotlin scope functions (let, run, with, apply, also) make code more concise and readable.',
    codeSnippet: `// Instead of:
val user = getUser()
if (user != null) {
  user.name = "John"
  user.email = "john@example.com"
  saveUser(user)
}

// Use:
getUser()?.apply {
  name = "John"
  email = "john@example.com"
  saveUser(this)
}`,
    question: 'What are scope functions in Kotlin and when should I use them?',
    answer: 'Scope functions in Kotlin (let, run, with, apply, also) provide temporary scopes to execute code blocks on an object. They differ in how the object is referenced inside the block (this or it) and what the expression returns (the object or the result). Use them to make your code more concise and readable by reducing repetition and improving clarity.'
  },
  // React Native tips
  {
    id: 't8',
    category: 'reactnative',
    title: 'Use memo and useCallback for performance',
    content: 'Use React.memo and useCallback to prevent unnecessary renders in React Native.',
    codeSnippet: `// Memoize a component
const MemoizedComponent = React.memo(({ prop }) => {
  return <Text>{prop}</Text>
});

// Memoize a callback
const MyComponent = () => {
  const handlePress = useCallback(() => {
    console.log('Pressed');
  }, []); // Empty dependency array means it's created once
  
  return <Button onPress={handlePress} title="Press Me" />;
}`,
    explanation: 'React.memo prevents a component from re-rendering if its props haven\'t changed. useCallback memoizes a callback function so it\'s not recreated on each render. Both help avoid unnecessary re-renders, which is especially important on mobile devices where performance is critical.'
  },
  {
    id: 't9',
    category: 'reactnative',
    title: 'Use FlatList over ScrollView for long lists',
    content: 'FlatList is optimized for long lists as it only renders items that are currently visible.',
    codeSnippet: `<FlatList
  data={items}
  renderItem={({ item }) => <ItemComponent item={item} />}
  keyExtractor={item => item.id.toString()}
/>`,
    question: 'When should I use FlatList instead of ScrollView in React Native?',
    answer: 'Use FlatList when rendering lists with many items or of unknown length. Unlike ScrollView, FlatList only renders items that are currently visible on screen and recycles item components as the user scrolls. This significantly improves memory usage and performance for long lists. ScrollView is simpler but renders all child components at once, making it suitable only for a small number of items.'
  }
];
