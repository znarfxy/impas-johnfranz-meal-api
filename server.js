const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const meals = [
  { id: 1, food: 'adobo', price: 75, category: 'lunch' },
  { id: 2, food: 'lumpia', price: 10, category: 'snack' },
  { id: 3, food: 'burger', price: 77, category: 'breakfast' }
];

app.use(express.static(__dirname));

app.get('/api/meals', (req, res) => {
  const search = String(req.query.search || '').trim().toLowerCase();
  const results = search
    ? meals.filter((meal) => (
      String(meal.id).includes(search) ||
      meal.food.toLowerCase().includes(search) ||
      meal.category.toLowerCase().includes(search)
    ))
    : meals;

  res.json(results);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Meal API is running at http://localhost:${port}`);
});
