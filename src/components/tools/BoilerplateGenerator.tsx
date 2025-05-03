
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Check, Download } from 'lucide-react';

const BoilerplateGenerator = () => {
  const [appName, setAppName] = useState('my_flutter_app');
  const [selectedTemplate, setSelectedTemplate] = useState('getx');
  const [copied, setCopied] = useState(false);
  
  const templates = {
    getx: `
// GetX - main.dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:${appName}/app/routes/app_pages.dart';
import 'package:${appName}/app/modules/home/bindings/home_binding.dart';
import 'package:${appName}/app/modules/home/views/home_view.dart';

void main() {
  runApp(
    GetMaterialApp(
      title: "${appName}",
      initialRoute: AppPages.INITIAL,
      getPages: AppPages.routes,
      initialBinding: HomeBinding(),
      home: HomeView(),
    )
  );
}

// app_pages.dart
import 'package:get/get.dart';
import '../modules/home/bindings/home_binding.dart';
import '../modules/home/views/home_view.dart';

part 'app_routes.dart';

class AppPages {
  AppPages._();

  static const INITIAL = Routes.HOME;

  static final routes = [
    GetPage(
      name: _Paths.HOME,
      page: () => HomeView(),
      binding: HomeBinding(),
    ),
  ];
}

// app_routes.dart
part of 'app_pages.dart';

abstract class Routes {
  Routes._();
  static const HOME = _Paths.HOME;
}

abstract class _Paths {
  _Paths._();
  static const HOME = '/home';
}

// home_controller.dart
import 'package:get/get.dart';

class HomeController extends GetxController {
  final count = 0.obs;

  void increment() => count.value++;
}

// home_binding.dart
import 'package:get/get.dart';
import '../controllers/home_controller.dart';

class HomeBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<HomeController>(
      () => HomeController(),
    );
  }
}

// home_view.dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../controllers/home_controller.dart';

class HomeView extends GetView<HomeController> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('${appName}'),
        centerTitle: true,
      ),
      body: Center(
        child: Obx(
          () => Text(
            'Click count: \${controller.count}',
            style: TextStyle(fontSize: 20),
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: controller.increment,
        child: Icon(Icons.add),
      ),
    );
  }
}
    `,
    bloc: `
// BLoC - main.dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:${appName}/counter/counter.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '${appName}',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: BlocProvider(
        create: (_) => CounterBloc(),
        child: const CounterPage(),
      ),
    );
  }
}

// counter_event.dart
part of 'counter_bloc.dart';

abstract class CounterEvent extends Equatable {
  const CounterEvent();

  @override
  List<Object> get props => [];
}

class CounterIncremented extends CounterEvent {}

class CounterDecremented extends CounterEvent {}

// counter_state.dart
part of 'counter_bloc.dart';

class CounterState extends Equatable {
  final int value;
  
  const CounterState(this.value);

  @override
  List<Object> get props => [value];
}

// counter_bloc.dart
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';

part 'counter_event.dart';
part 'counter_state.dart';

class CounterBloc extends Bloc<CounterEvent, CounterState> {
  CounterBloc() : super(const CounterState(0)) {
    on<CounterIncremented>((event, emit) {
      emit(CounterState(state.value + 1));
    });
    on<CounterDecremented>((event, emit) {
      emit(CounterState(state.value - 1));
    });
  }
}

// counter_page.dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'counter_bloc.dart';

class CounterPage extends StatelessWidget {
  const CounterPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Counter')),
      body: BlocBuilder<CounterBloc, CounterState>(
        builder: (context, state) {
          return Center(
            child: Text(
              '\${state.value}',
              style: Theme.of(context).textTheme.headline2,
            ),
          );
        },
      ),
      floatingActionButton: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          FloatingActionButton(
            child: const Icon(Icons.add),
            onPressed: () {
              context.read<CounterBloc>().add(CounterIncremented());
            },
          ),
          const SizedBox(height: 8),
          FloatingActionButton(
            child: const Icon(Icons.remove),
            onPressed: () {
              context.read<CounterBloc>().add(CounterDecremented());
            },
          ),
        ],
      ),
    );
  }
}
    `,
    provider: `
// Provider - main.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:${appName}/counter_provider.dart';
import 'package:${appName}/counter_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '${appName}',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: ChangeNotifierProvider(
        create: (_) => CounterProvider(),
        child: const CounterPage(),
      ),
    );
  }
}

// counter_provider.dart
import 'package:flutter/material.dart';

class CounterProvider extends ChangeNotifier {
  int _count = 0;
  
  int get count => _count;
  
  void increment() {
    _count++;
    notifyListeners();
  }
  
  void decrement() {
    _count--;
    notifyListeners();
  }
}

// counter_page.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'counter_provider.dart';

class CounterPage extends StatelessWidget {
  const CounterPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Counter Example'),
      ),
      body: Center(
        child: Consumer<CounterProvider>(
          builder: (context, provider, child) {
            return Text(
              '\${provider.count}',
              style: Theme.of(context).textTheme.headline2,
            );
          },
        ),
      ),
      floatingActionButton: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          FloatingActionButton(
            onPressed: () {
              context.read<CounterProvider>().increment();
            },
            tooltip: 'Increment',
            child: const Icon(Icons.add),
          ),
          const SizedBox(height: 8),
          FloatingActionButton(
            onPressed: () {
              context.read<CounterProvider>().decrement();
            },
            tooltip: 'Decrement',
            child: const Icon(Icons.remove),
          ),
        ],
      ),
    );
  }
}
    `,
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTemplate = () => {
    const element = document.createElement('a');
    const file = new Blob([templates[selectedTemplate]], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${appName}_${selectedTemplate}_template.dart`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="app-name">App Name</Label>
          <Input
            id="app-name"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            placeholder="my_flutter_app"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="template-select">State Management</Label>
          <Select
            value={selectedTemplate}
            onValueChange={setSelectedTemplate}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="getx">GetX</SelectItem>
              <SelectItem value="bloc">BLoC</SelectItem>
              <SelectItem value="provider">Provider</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="structure">Project Structure</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="mt-2">
          <div className="p-4 border rounded-md bg-secondary/10">
            <pre className="font-mono text-xs whitespace-pre-wrap overflow-auto max-h-96">
              {templates[selectedTemplate]}
            </pre>
          </div>
        </TabsContent>
        <TabsContent value="structure" className="mt-2">
          <div className="p-4 border rounded-md">
            {selectedTemplate === 'getx' && (
              <pre className="font-mono text-xs whitespace-pre">
{`lib/
├── main.dart
├── app/
│   ├── routes/
│   │   ├── app_pages.dart
│   │   └── app_routes.dart
│   └── modules/
│       └── home/
│           ├── bindings/
│           │   └── home_binding.dart
│           ├── controllers/
│           │   └── home_controller.dart
│           └── views/
│               └── home_view.dart`}
              </pre>
            )}
            {selectedTemplate === 'bloc' && (
              <pre className="font-mono text-xs whitespace-pre">
{`lib/
├── main.dart
└── counter/
    ├── bloc/
    │   ├── counter_bloc.dart
    │   ├── counter_event.dart
    │   └── counter_state.dart
    ├── counter.dart
    └── view/
        └── counter_page.dart`}
              </pre>
            )}
            {selectedTemplate === 'provider' && (
              <pre className="font-mono text-xs whitespace-pre">
{`lib/
├── main.dart
├── counter_provider.dart
└── counter_page.dart`}
              </pre>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => copyToClipboard(templates[selectedTemplate])}>
          {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy Code'}
        </Button>
        <Button onClick={downloadTemplate}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default BoilerplateGenerator;
