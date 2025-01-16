class Customer {
  String id;
  String name;
  String email;
  String city;

  Customer({required this.id, required this.name, required this.email, required this.city});

  factory Customer.fromJson(Map<String, dynamic> json) {
    return Customer(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      city: json['city'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'city': city,
    };
  }
}
