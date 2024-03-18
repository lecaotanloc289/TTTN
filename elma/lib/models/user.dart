// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

class User {
  final String? avatar;
  final String? name;
  final String? email;
  final String? password;
  final String? street;
  final String? city;
  final String? zip;
  final String? country;
  final bool? is_admin;
  final int? phone;
  final List<String>? likedProducts;
  final DateTime dateCreated;

  User(
    this.avatar,
    this.name,
    this.email,
    this.password,
    this.street,
    this.city,
    this.zip,
    this.country,
    this.is_admin,
    this.phone,
    this.likedProducts,
    this.dateCreated,
  );

  

  

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'avatar': avatar,
      'name': name,
      'email': email,
      'password': password,
      'street': street,
      'city': city,
      'zip': zip,
      'country': country,
      'is_admin': is_admin,
      'phone': phone,
      'likedProducts': likedProducts,
      'dateCreated': dateCreated.millisecondsSinceEpoch,
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      map['avatar'] != null ? map['avatar'] as String : null,
      map['name'] != null ? map['name'] as String : null,
      map['email'] != null ? map['email'] as String : null,
      map['password'] != null ? map['password'] as String : null,
      map['street'] != null ? map['street'] as String : null,
      map['city'] != null ? map['city'] as String : null,
      map['zip'] != null ? map['zip'] as String : null,
      map['country'] != null ? map['country'] as String : null,
      map['is_admin'] != null ? map['is_admin'] as bool : null,
      map['phone'] != null ? map['phone'] as int : null,
      map['likedProducts'] != null ? List<String>.from((map['likedProducts'] as List<String>)) : null,
      DateTime.fromMillisecondsSinceEpoch(map['dateCreated'] as int),
    );
  }

  String toJson() => json.encode(toMap());

  factory User.fromJson(String source) => User.fromMap(json.decode(source) as Map<String, dynamic>);
}
