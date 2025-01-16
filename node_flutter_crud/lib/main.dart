import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'studentprovider.dart';
 import 'student_form.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => StudentProvider(),
      child: MaterialApp(
        title: 'Student CRUD App',
        theme: ThemeData(primarySwatch: Colors.blue),
        home: StudentForm(),
      ),
    );
  }
}
