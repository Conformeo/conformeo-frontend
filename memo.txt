npm run test -- --watch=false --browsers=ChromeHeadless

npm run start:ci &                           # script qui démarre ng serve sans watch
npx wait-on http://localhost:4200            # attendre que le front soit up
npm run cy:run