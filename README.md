This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Roadmap

### Initial steps

- [x] Configure Typescript and NextJS.
- [ ] Configure i18n for NextJS and React app.
- [ ] Consider advantages of logged in users (Store custom added data? Where/How?).

  - [ ] Check availability Twitter log in.
  - [ ] Check availability Google log in.

- [ ] Check usage of SWR from NextJS team to make fetch calls.
- [ ] Make initial fetch to a food database:
  - [ ] MyFitnessPal
  - [ ] FoodRepo.org
  - [ ] OpenFoodFacts
- [ ] Configure architecture to be able to use multiple data sources.
- [ ] Save preferences about preferred units and data sources.

### App functionalities

#### v1.0

- [ ] Select food from incoming external database fetched data.
- [ ] Display selected food macronutrients and information.
- [ ] Compare two selected foods.
- [ ] Conversion between foods selecting one or more macronutrients.
  - The food amount will be according to the first macronutrient limit reached.

#### v2.0

- [ ] Change on demand source to get food data.
- [ ] Add measurement equivalences in conversion (100g -> 6 tablespoon).
- [ ] Conversion between more than 2 selected foods to be able to compare.
  - [ ] Highlight the food with overall closer values.

#### v3.0

- [ ] Add capability to add custom food data and show it in results.
- [ ] Use custom food in comparison and conversion functionalities.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
