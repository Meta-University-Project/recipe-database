const SAMPLE_DESCRIPTION = "This hearty, flexible stew comes together with pantry ingredients and delivers layers of flavors. Cherry tomatoes, roasted in a generous glug of olive oil to amplify their sweetness, lend a welcome brightness to this otherwise rich dish. Onion, garlic and red-pepper flakes form the backbone of this dish, to which white beans and broth are added, then simmered until thick. While this stew is lovely on its own, you could also add wilt-able greens such as kale, escarole or Swiss chard at the end, and toasted bread crumbs on top. The dish is vegan as written, but should you choose to top your bowl with a showering of grated pecorino or Parmesan, it would most likely work well in your favor.";

const SAMPLE_RECIPE: Recipe = {
  key: "1",
  title: "Some Recipe",
  img: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574",
  description: SAMPLE_DESCRIPTION,
  ingredients: [
    { name: "something", quantity: 1, unit: "tbsp" },
    { name: "something else", quantity: 2, unit: "cup" },
    { name: "onion, diced", quantity: 3, unit: "whole" },
    { name: "onion, diced", quantity: 3/8, unit: "tsp" }
  ],
  instructions: [
    "Preheat oven to 350\u00B0F",
    "Boil pasta until just cooked",
    "Brown ground beef and then drain.",
    "Add taco seasoning and water to meat and simmer for 5 minutes.",
    "Put half of the shredded cheese over pasta, then cover with hamburger meat and mix gently.",
    "Sprinkle the remaining cheese over the top.",
    "Cook in the oven uncovered for 15 to 20 minutes."
  ]
}

const Recipes: Recipe[] = [
  { ...SAMPLE_RECIPE, key: "1" },
  { ...SAMPLE_RECIPE, key: "2" },
  { ...SAMPLE_RECIPE, key: "3" },
  { ...SAMPLE_RECIPE, key: "4" },
  { ...SAMPLE_RECIPE, key: "5" }
];

export default Recipes;