import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'models/student_model.dart';

class StudentProvider with ChangeNotifier {
  List<Student> _students = [];

  List<Student> get students => _students;

  // Fetch students from the server
  Future<void> fetchStudents() async {
    try {
      final response = await http.get(Uri.parse('http://192.168.100.193:4000/students'));

      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        _students = data.map((studentData) => Student.fromJson(studentData)).toList();
        notifyListeners();
      } else {
        throw Exception('Failed to load students');
      }
    } catch (error) {
      throw error;
    }
  }

  // Add student
  Future<void> addStudent(Student student) async {
    try {
      final response = await http.post(
        Uri.parse('http://192.168.100.193:4000/student'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(student),
      );

      if (response.statusCode == 200) {
        fetchStudents();  // Refresh the list after adding
      } else {
        throw Exception('Failed to add student');
      }
    } catch (error) {
      throw error;
    }
  }

  // Update student
  Future<void> updateStudent(Student student) async {
    try {
      final response = await http.put(
        Uri.parse('http://192.168.100.193:4000/student/${student.id}'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(student),
      );

      if (response.statusCode == 200) {
        fetchStudents();  // Refresh the list after update
      } else {
        throw Exception('Failed to update student');
      }
    } catch (error) {
      throw error;
    }
  }

  // Delete student
  Future<void> deleteStudent(String id) async {
    try {
      final response = await http.delete(
        Uri.parse('http://192.168.100.193:4000/student/$id'),
      );

      if (response.statusCode == 200) {
        fetchStudents();  // Refresh the list after deletion
      } else {
        throw Exception('Failed to delete student');
      }
    } catch (error) {
      throw error;
    }
  }
}
