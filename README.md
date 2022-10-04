This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Roadmap

### Initial steps

- [x] Configure Typescript and NextJS.
- [x] Configure i18n for NextJS and React app.
- [x] Consider advantages of logged in users (Store custom added data? Where/How?).

  - [x] Check availability Twitter log in.
  - [x] Check availability Google log in.

- [x] Make initial fetch to a food database:
  - :x: MyFitnessPal: CORS violation, private API.
  - :x: FoodRepo.org: almost no images, not in spanish, inacurate search.
  - :white_check_mark: OpenFoodFacts: success, but no results for non-brand generic foods (potato, bread...).
  - :white_large_square: USDA API: only in English, but allows both branded and generic food search.
  - :white_check_mark: BEDCA: generic food only, requests and responses must be XML formatted.
- [x] Configure architecture to be able to use multiple data sources.
- [ ] _Postponed: Save preferences about preferred units and data sources._

### App roadmap

#### v1.0

- [x] Select food from incoming external database fetched data.
- [x] Display selected food macronutrients and information.
- [x] Compare two selected foods.
- [x] Conversion between foods selecting one or more macronutrients.
  - The food amount will be according to the first macronutrient limit reached.
- [x] Change selected foods on conversion page.
- [x] Be able to switch selected foods.

#### v2.0

- [x] Change on demand source to get food data: deprecated as now all calls to all sources are made parallel.
- [x] Add capability to add custom food data and show it in results.
- [x] Use custom food in comparison and conversion functionalities.
- [ ] Add full CRUD operations for added custom foods.
- [ ] Add capability to edit personal settings (language, preferred units, preferred data sources...).

#### v3.0

- [ ] Add different language translations and capability to change selected language.
- [ ] Add measurement equivalences in conversion (100g -> 6 tablespoon).
- [ ] Conversion between more than 2 selected foods to be able to compare.
  - [ ] Highlight the food with overall closer values.

### v4.0

- [ ] Redesign app appearance and UX.

## Getting Started

First, install all dependencies and lbiraries running:

```bash
npm i
```

Once installed, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
