## Instructions

Follow the steps below to upload your diet plan data to Firebase.

### Step 1: Add Firebase Configuration

- Locate your Firebase configuration keys (API key, project ID, etc.).
### Step 2: Replace Your Data

- Replace the existing data in the script with your own JSON data.
- Ensure your data is formatted correctly. For example:

  ```json
  {
    "mealPlans": [
      {
        "id": "1",
        "name": "Breakfast",
        "items": ["Eggs", "Toast", "Orange Juice"]
      },
      {
        "id": "2",
        "name": "Lunch",
        "items": ["Chicken Salad", "Rice"]
      }
    ]
  }

### Step 3: Run the Script
 - Open your terminal.

 - Navigate to your project directory.

 - Run the following command:

    ```bash
       npm run uploadData

### Happy Coding! 🎉
