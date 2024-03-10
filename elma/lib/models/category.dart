class Category {
  final String title;
  final String image;

  Category({
    required this.title,
    required this.image,
  });
}

final List<Category> categories = [
  Category(title: "Mobile", image: "images/Ip15.jpg"),
  Category(title: "Laptop", image: "images/lapdell.jpg"),
  Category(title: "PC", image: "images/pc.jpg"),
  Category(title: "Air", image: "images/Sony.jpg"),
  Category(title: "Watch", image: "images/watch.jpg"),
];
