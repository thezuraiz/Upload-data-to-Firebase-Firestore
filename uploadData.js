import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc } from "firebase/firestore";
import express from "express";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

const app = express();
let db;

// Initialize Firebase app
const initializeFirebaseApp = () => {
  try {
    const firebaseApp = initializeApp(firebaseConfig);
    db = getFirestore(firebaseApp);
    console.log("DB Connected");
    return firebaseApp;
  } catch (error) {
    console.error("Firebase Initialize App Error:", error);
    throw new Error("Failed to initialize Firebase");
  }
};

const dietPlans = {
  bmi_underweight: {
    breakfast: [
      {
        name: "Oats with milk",
        calories: 300,
        protein: "10g",
        fat: "5g",
        carbs: "50g",
        imageUrl:
          "https://www.seriouseats.com/thmb/q0uVpVkqB0wLPCa5HoP3DcmfAk0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20210604-oatmeal-vicky-wasik-15-313d13908b5a4fbe8678f78c00721c1a.jpg",
      },
      {
        name: "Smoothie with banana and almond butter",
        calories: 350,
        protein: "8g",
        fat: "15g",
        carbs: "45g",
        imageUrl:
          "https://cookieandkate.com/images/2015/03/peanut-butter-banana-smoothie-recipe-1-1-800x1200.jpg",
      },
      {
        name: "Avocado toast",
        calories: 250,
        protein: "6g",
        fat: "12g",
        carbs: "30g",
        imageUrl:
          "https://downshiftology.com/wp-content/uploads/2020/06/Avocado-Toast-Recipe-3-500x500.jpg",
      },
    ],
    lunch: [
      {
        name: "Grilled chicken with brown rice",
        calories: 600,
        protein: "40g",
        fat: "15g",
        carbs: "60g",
        imageUrl:
          "https://www.eatthis.com/wp-content/uploads/sites/4/2019/02/grilled-chicken-breast.jpg",
      },
      {
        name: "Vegetable stir-fry with tofu",
        calories: 550,
        protein: "20g",
        fat: "20g",
        carbs: "60g",
        imageUrl:
          "https://cookieandkate.com/images/2022/04/tofu-stir-fry-recipe-550x824.jpg",
      },
      {
        name: "Tuna salad sandwich",
        calories: 500,
        protein: "30g",
        fat: "18g",
        carbs: "45g",
        imageUrl:
          "https://www.thespruceeats.com/thmb/nMSdOlJnF7LVeoVoIx0OEpg9eHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-tuna-salad-sandwich-3050455-step-11-5c34c0d746e0fb0001a23c27.jpg",
      },
    ],
    dinner: [
      {
        name: "Salmon with veggies",
        calories: 700,
        protein: "50g",
        fat: "25g",
        carbs: "40g",
        imageUrl:
          "https://www.acouplecooks.com/wp-content/uploads/2021/04/Pan-Seared-Salmon-011.jpg",
      },
      {
        name: "Spaghetti with marinara sauce",
        calories: 650,
        protein: "20g",
        fat: "10g",
        carbs: "100g",
        imageUrl:
          "https://www.simplyrecipes.com/thmb/P0k5EJigYrOsFo0ERQH4kzTq4RQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Spaghetti-Marinara-LEAD-4-f9aa7e3028e7478cbbce46b37b2912b2.jpg",
      },
      {
        name: "Grilled steak with sweet potatoes",
        calories: 750,
        protein: "55g",
        fat: "30g",
        carbs: "60g",
        imageUrl:
          "https://www.eatwell101.com/wp-content/uploads/2021/01/Grilled-Steak-Sweet-Potato-Skewers-Recipe.jpg",
      },
    ],
    snacks: [
      {
        name: "Banana with peanut butter",
        calories: 200,
        protein: "5g",
        fat: "10g",
        carbs: "30g",
        imageUrl:
          "https://minimalistbaker.com/wp-content/uploads/2020/02/AMAZING-Banana-Toast-with-Peanut-Butter-Honey-and-Chia-Seeds-SO-healthy-quick-and-satisfying-banana-peanutbutter-toast-healthy-vegan-recipe-minimalistbaker-14.jpg",
      },
      {
        name: "Greek yogurt with berries",
        calories: 180,
        protein: "12g",
        fat: "4g",
        carbs: "25g",
        imageUrl:
          "https://www.eatthis.com/wp-content/uploads/sites/4/2020/08/greek-yogurt-berries.jpg",
      },
      {
        name: "Almonds and dried fruit",
        calories: 220,
        protein: "6g",
        fat: "14g",
        carbs: "30g",
        imageUrl:
          "https://www.runningonrealfood.com/wp-content/uploads/2019/08/dried-fruit-nuts-running-on-real-food-8.jpg",
      },
    ],
    calories: 2200,
    dietaryPreference: "non-vegetarian",
  },
  bmi_normal: {
    breakfast: [
      {
        name: "Eggs with toast",
        calories: 350,
        protein: "20g",
        fat: "15g",
        carbs: "30g",
        imageUrl:
          "https://www.seriouseats.com/thmb/xOXYYAWhNfZP3lTwg9VgBOpHcyo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20200625-french-toast-vicky-wasik-27-fcbd7ad6aa9e403081807ff5db610f0d.jpg",
      },
      {
        name: "Chia pudding with fruits",
        calories: 300,
        protein: "10g",
        fat: "8g",
        carbs: "45g",
        imageUrl:
          "https://www.thespruceeats.com/thmb/zRXkULZk6tXXRs0eg5F66T-xvmU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/basic-chia-seed-pudding-recipe-3377625-hero-01-ffb2c8df2709491191f31cf9d82f1744.jpg",
      },
      {
        name: "Pancakes with maple syrup",
        calories: 400,
        protein: "8g",
        fat: "12g",
        carbs: "70g",
        imageUrl:
          "https://www.simplyrecipes.com/thmb/Bzx88nJUZjrkdLnFC_MpSP1zfmw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Pancakes-LEAD-4-40dc330b9a824d2097528da898eb3a9f.jpg",
      },
    ],
    lunch: [
      {
        name: "Turkey sandwich",
        calories: 450,
        protein: "25g",
        fat: "15g",
        carbs: "40g",
        imageUrl:
          "https://www.tasteofhome.com/wp-content/uploads/2021/12/shutterstock_1569751812.jpg",
      },
      {
        name: "Quinoa salad with chickpeas",
        calories: 500,
        protein: "15g",
        fat: "10g",
        carbs: "60g",
        imageUrl:
          "https://www.acouplecooks.com/wp-content/uploads/2020/02/Quinoa-Salad-005.jpg",
      },
      {
        name: "Chicken Caesar salad",
        calories: 550,
        protein: "40g",
        fat: "25g",
        carbs: "30g",
        imageUrl:
          "https://www.eatwell101.com/wp-content/uploads/2021/06/chicken-Caesar-salad-recipe-9.jpg",
      },
    ],
    dinner: [
      {
        name: "Chicken salad",
        calories: 600,
        protein: "45g",
        fat: "20g",
        carbs: "35g",
        imageUrl:
          "https://www.simplyrecipes.com/thmb/QUZ4wTA5ANwn6A6t_pRDPFfCNcU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Chicken-Salad-LEAD-5-3133cb5064044ca58d15c1a61aa36da2.jpg",
      },
      {
        name: "Veggie stir fry with rice",
        calories: 550,
        protein: "15g",
        fat: "10g",
        carbs: "90g",
        imageUrl:
          "https://www.cookingclassy.com/wp-content/uploads/2020/03/vegetable-stir-fry-4-1.jpg",
      },
      {
        name: "Stuffed bell peppers",
        calories: 500,
        protein: "25g",
        fat: "15g",
        carbs: "60g",
        imageUrl:
          "https://www.acouplecooks.com/wp-content/uploads/2019/10/stuffed-peppers-recipe-004.jpg",
      },
    ],
    snacks: [
      {
        name: "Apple slices with almond butter",
        calories: 200,
        protein: "4g",
        fat: "10g",
        carbs: "30g",
        imageUrl:
          "https://i.pinimg.com/originals/a8/47/c7/a847c75650cb17c1873d1e6a35d1c943.jpg",
      },
      {
        name: "Trail mix",
        calories: 250,
        protein: "8g",
        fat: "15g",
        carbs: "25g",
        imageUrl:
          "https://www.wellplated.com/wp-content/uploads/2019/03/trail-mix-recipe-1-600x900.jpg",
      },
      {
        name: "Rice cakes with hummus",
        calories: 180,
        protein: "6g",
        fat: "4g",
        carbs: "30g",
        imageUrl:
          "https://i0.wp.com/www.loveandlemons.com/wp-content/uploads/2022/02/hummus.png?resize=640%2C640&ssl=1",
      },
    ],
    calories: 2400,
    dietaryPreference: "non-vegetarian",
  },
  bmi_overweight: {
    breakfast: [
      {
        name: "Greek yogurt with honey",
        calories: 200,
        protein: "15g",
        fat: "6g",
        carbs: "20g",
        imageUrl:
          "https://www.eatwell101.com/wp-content/uploads/2022/04/yogurt-parfait-recipe.jpg",
      },
      {
        name: "Fruit smoothie",
        calories: 250,
        protein: "6g",
        fat: "3g",
        carbs: "50g",
        imageUrl:
          "https://cookieandkate.com/images/2018/03/strawberry-smoothie-recipe-1-1.jpg",
      },
      {
        name: "Veggie omelet",
        calories: 300,
        protein: "20g",
        fat: "12g",
        carbs: "30g",
        imageUrl:
          "https://www.loveandlemons.com/wp-content/uploads/2022/02/vegetable-omelette.jpg",
      },
    ],
    lunch: [
      {
        name: "Grilled chicken salad",
        calories: 400,
        protein: "35g",
        fat: "15g",
        carbs: "30g",
        imageUrl:
          "https://www.acouplecooks.com/wp-content/uploads/2020/02/Grilled-Chicken-Salad-004.jpg",
      },
      {
        name: "Zucchini noodles with marinara",
        calories: 350,
        protein: "10g",
        fat: "8g",
        carbs: "50g",
        imageUrl:
          "https://www.acouplecooks.com/wp-content/uploads/2018/08/zucchini-noodles-001.jpg",
      },
      {
        name: "Quinoa and black bean bowl",
        calories: 450,
        protein: "15g",
        fat: "10g",
        carbs: "70g",
        imageUrl:
          "https://cookieandkate.com/images/2019/01/quinoa-bowl-recipe-1-2.jpg",
      },
    ],
    dinner: [
      {
        name: "Baked salmon with asparagus",
        calories: 500,
        protein: "40g",
        fat: "25g",
        carbs: "20g",
        imageUrl:
          "https://www.wellplated.com/wp-content/uploads/2019/01/baked-salmon-recipe-1-600x900.jpg",
      },
      {
        name: "Turkey meatballs with zucchini",
        calories: 600,
        protein: "45g",
        fat: "20g",
        carbs: "40g",
        imageUrl:
          "https://www.jessicagavin.com/wp-content/uploads/2019/01/italian-turkey-meatballs-10-1200.jpg",
      },
      {
        name: "Stuffed bell peppers with quinoa",
        calories: 550,
        protein: "30g",
        fat: "15g",
        carbs: "70g",
        imageUrl:
          "https://www.acouplecooks.com/wp-content/uploads/2019/10/stuffed-peppers-recipe-003.jpg",
      },
    ],
    snacks: [
      {
        name: "Veggies with hummus",
        calories: 150,
        protein: "4g",
        fat: "5g",
        carbs: "20g",
        imageUrl:
          "https://www.eatwell101.com/wp-content/uploads/2021/02/vegetable-sticks-hummus-recipe.jpg",
      },
      {
        name: "Rice cakes with avocado",
        calories: 200,
        protein: "6g",
        fat: "10g",
        carbs: "20g",
        imageUrl:
          "https://i.pinimg.com/originals/71/f9/66/71f9a0ef1642927b8921132bc5cd54d5.jpg",
      },
      {
        name: "Cottage cheese with pineapple",
        calories: 180,
        protein: "15g",
        fat: "2g",
        carbs: "20g",
        imageUrl:
          "https://www.acouplecooks.com/wp-content/uploads/2022/01/cottage-cheese-pineapple.jpg",
      },
    ],
    calories: 2100,
    dietaryPreference: "non-vegetarian",
  },
  bmi_obese: {
    breakfast: [
      {
        name: "Smoothie with spinach and banana",
        calories: 200,
        protein: "5g",
        fat: "2g",
        carbs: "40g",
        imageUrl:
          "https://www.jessicagavin.com/wp-content/uploads/2022/05/smoothie-1-500x500.jpg",
      },
      {
        name: "Oatmeal with berries",
        calories: 250,
        protein: "8g",
        fat: "5g",
        carbs: "45g",
        imageUrl:
          "https://www.acouplecooks.com/wp-content/uploads/2020/05/oatmeal-with-berries-001.jpg",
      },
      {
        name: "Chia seed pudding",
        calories: 300,
        protein: "10g",
        fat: "8g",
        carbs: "50g",
        imageUrl:
          "https://www.eatwell101.com/wp-content/uploads/2021/09/chia-pudding-recipe.jpg",
      },
    ],
    lunch: [
      {
        name: "Mixed green salad with dressing",
        calories: 400,
        protein: "10g",
        fat: "15g",
        carbs: "30g",
        imageUrl:
          "https://www.cookincanuck.com/wp-content/uploads/2021/02/Mixed-Green-Salad-with-Lemon-Olive-Oil-Dressing-8.jpg",
      },
      {
        name: "Vegetable soup",
        calories: 250,
        protein: "10g",
        fat: "5g",
        carbs: "35g",
        imageUrl:
          "https://www.dinneratthezoo.com/wp-content/uploads/2019/01/vegetable-soup-8.jpg",
      },
      {
        name: "Lentil salad",
        calories: 350,
        protein: "18g",
        fat: "8g",
        carbs: "50g",
        imageUrl:
          "https://i.pinimg.com/originals/24/c9/81/24c9814425bb4be7819929f052164f09.jpg",
      },
    ],
    dinner: [
      {
        name: "Baked chicken with vegetables",
        calories: 500,
        protein: "40g",
        fat: "20g",
        carbs: "30g",
        imageUrl:
          "https://www.acouplecooks.com/wp-content/uploads/2019/09/baked-chicken-vegetables-0001.jpg",
      },
      {
        name: "Quinoa and roasted veggies",
        calories: 550,
        protein: "15g",
        fat: "15g",
        carbs: "80g",
        imageUrl:
          "https://www.eatwell101.com/wp-content/uploads/2020/01/quinoa-bowl-with-roasted-vegetables-recipe-2.jpg",
      },
      {
        name: "Stuffed zucchini boats",
        calories: 600,
        protein: "30g",
        fat: "25g",
        carbs: "50g",
        imageUrl:
          "https://www.acouplecooks.com/wp-content/uploads/2020/06/stuffed-zucchini-boats-0001.jpg",
      },
    ],
    snacks: [
      {
        name: "Celery sticks with peanut butter",
        calories: 150,
        protein: "5g",
        fat: "8g",
        carbs: "20g",
        imageUrl:
          "https://www.eatwell101.com/wp-content/uploads/2021/02/celery-with-peanut-butter-recipe-2.jpg",
      },
      {
        name: "Nut butter energy balls",
        calories: 250,
        protein: "8g",
        fat: "15g",
        carbs: "20g",
        imageUrl:
          "https://www.wellplated.com/wp-content/uploads/2019/01/no-bake-energy-balls-recipe.jpg",
      },
      {
        name: "Greek yogurt with nuts",
        calories: 200,
        protein: "15g",
        fat: "10g",
        carbs: "10g",
        imageUrl:
          "https://www.acouplecooks.com/wp-content/uploads/2021/03/greek-yogurt-1.jpg",
      },
    ],
    calories: 2300,
    dietaryPreference: "non-vegetarian",
  },
};

const uploadData = async () => {
  try {
    console.log("Uploading Data");

    for (const [key, value] of Object.entries(dietPlans)) {
      // Working Module
      // const documentRef = doc(collection(db, "dietPlans")); // Create a document reference with an auto-generated ID
      // await setDoc(documentRef, value); // Set the document with the value (object)

      // Working Module with keys
      const documentRef = doc(db, "dietPlans", key);
      await setDoc(documentRef, value);
      console.log(`Collection ${key} uploaded`);
    }

    console.log("Data uploaded successfully!");
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

// Start Express server
const startServer = async () => {
  const port = 3000;

  app.listen(port, async () => {
    await initializeFirebaseApp();
    console.log(`Server is running on port ${port}`);
    uploadData().catch(console.error);
  });
};

await startServer();
