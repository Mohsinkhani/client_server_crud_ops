import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'studentprovider.dart';
import 'models/student_model.dart';

class StudentForm extends StatefulWidget {
  @override
  _StudentFormState createState() => _StudentFormState();
}

class _StudentFormState extends State<StudentForm> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _rollNumberController = TextEditingController();
  bool _isEditing = false;
  String _editingStudentId = '';

  @override
  void initState() {
    super.initState();
    // Fetch students when the widget is initialized
    Provider.of<StudentProvider>(context, listen: false).fetchStudents();
  }

  void _clearForm() {
    _nameController.clear();
    _rollNumberController.clear();
    setState(() {
      _isEditing = false;
      _editingStudentId = '';
    });
  }

  @override
  Widget build(BuildContext context) {
    final studentProvider = Provider.of<StudentProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text('Student CRUD App'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            Form(
              key: _formKey,
              child: Column(
                children: [
                  TextFormField(
                    controller: _nameController,
                    decoration: InputDecoration(labelText: 'Name'),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter name';
                      }
                      return null;
                    },
                  ),
                  TextFormField(
                    controller: _rollNumberController,
                    decoration: InputDecoration(labelText: 'rollNumber'),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter your roll number';
                      }
                      return null;
                    },
                  ),
                  SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: () {
                      if (_formKey.currentState!.validate()) {
                        final student = Student(
                          id: _editingStudentId,
                          name: _nameController.text,
                          rollNumber: _rollNumberController.text,
                        );
                        if (_isEditing) {
                          studentProvider.updateStudent(student);
                        } else {
                          studentProvider.addStudent(student);
                        }
                        _clearForm();
                      }
                    },
                    child: Text(_isEditing ? 'Update' : 'Submit'),
                  ),
                ],
              ),
            ),
            SizedBox(height: 20),
            Expanded(
              child: studentProvider.students.isEmpty
                  ? Center(child: CircularProgressIndicator())
                  : ListView.builder(
                itemCount: studentProvider.students.length,
                itemBuilder: (context, index) {
                  final student = studentProvider.students[index];
                  return ListTile(
                    title: Text(student.name),
                    subtitle: Text('rollNumber: ${student.rollNumber}'),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          icon: Icon(Icons.edit),
                          onPressed: () {
                            _nameController.text = student.name;
                            _rollNumberController.text = student.rollNumber;
                            setState(() {
                              _isEditing = true;
                              _editingStudentId = student.id;
                            });
                          },
                        ),
                        IconButton(
                          icon: Icon(Icons.delete),
                          onPressed: () {
                            studentProvider.deleteStudent(student.id);
                          },
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
