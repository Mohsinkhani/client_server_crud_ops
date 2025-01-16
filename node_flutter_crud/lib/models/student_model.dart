class Student {
  String id;
  String name;
  String rollNumber;

  Student({required this.id, required this.name, required this.rollNumber});

  factory Student.fromJson(Map<String, dynamic> json) {
    return Student(
      id: json['_id'],
      name: json['name'],
      rollNumber: json['shape'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'name': name,
      'shape': rollNumber,
    };
  }
}
