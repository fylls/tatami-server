# api.tatami.gg

Create .env file
```env
# STRIPE API KEYS
TEST_KEY = "sk_test_####################################################################"
LIVE_KEY = "sk_live_####################################################################"

# MONGODB API KEYS
LIVE_URI = "mongodb+srv://##############################################################"
TEST_URI = "mongodb+srv://##############################################################"
```

Install dependencies
```bash
npm install
```
Run in development
```bash
npm run dev
(npx cross-env NODE_ENV=test nodemon src/app.ts)
```

Build typescript
```bash
npm run build
(tsc -p .)
```

Run in production
```bash
npm start
(npx cross-env NODE_ENV=live node dist/app.js)
```

Delete node_modules
```bash
npm run delete
(rm -rf node_modules/)
```

Update all packages
```bash
npm run update
(rm -rf node_modules/ && npm install -g npm-check-updates && ncu -u && npm install)
```

Prepare for deployment
```bash
npm run zip
(tsc -p . && zip beanstalk.zip -r \"dist/*\" .env package.json package-lock.json .gitignore)
```
