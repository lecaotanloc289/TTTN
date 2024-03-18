import 'package:elma/api/apiCategories.dart';
import 'package:elma/models/category.dart';
import 'package:flutter/material.dart';

class CategoriesScreen extends StatefulWidget {
  const CategoriesScreen({super.key});

  @override
  State<CategoriesScreen> createState() => _CategoriesScreenState();
}

class _CategoriesScreenState extends State<CategoriesScreen> {
  Future<List<Categories>> getCategories() async {
    return APICategory.getListCategory();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: getCategories(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          } else if (snapshot.hasError) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          } else {
            final data = snapshot.data;
            return SizedBox(
              height: 100,
              child: ListView.separated(
                  itemBuilder: (context, index) {
                    return category(data[index]);
                  },
                  separatorBuilder: (context, index) => SizedBox(
                        width: 20,
                      ),
                  itemCount: data!.length),
            );
          }
        });
  }

  Widget category(Categories categories) {
    return Row(
      children: [
        ClipRRect(
          borderRadius: BorderRadius.circular(30),
          child: Image.network(categories.icon!,
              width: 10,
              height: 10,
              fit: BoxFit.fill, errorBuilder: (BuildContext context,
                  Object exception, StackTrace? stackTrace) {
            return Text('Không thể tải hình ảnh');
          }),
        ),
        const SizedBox(height: 5),
        Text(
          categories.name!,
          style: const TextStyle(
            fontWeight: FontWeight.bold,
          ),
        ),
      ],
    );
  }
  // SizedBox(
  //   height: 100,
  //   child: ListView.separated(
  //     scrollDirection: Axis.horizontal,
  //     itemBuilder: (context, index) {
  //       return Column(
  //         children: [
  //           Container(
  //             height: 70,
  //             width: 70,
  //             decoration: BoxDecoration(
  //               shape: BoxShape.circle,
  //               image: DecorationImage(
  //                 image: Image.network(
  //                   categories[index].image!,
  //                 ),
  //               ),
  //             ),
  //           ),
  //           const SizedBox(height: 5),
  //           Text(
  //             categories[index].title!,
  //             style: const TextStyle(
  //               fontWeight: FontWeight.bold,
  //             ),
  //           ),
  //         ],
  //       );
  //     },
  //     separatorBuilder: (context, index) => const SizedBox(width: 20),
  //     itemCount: categories.length,
  //   ),
  // );
}
