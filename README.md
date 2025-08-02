# Mineder

**Tin[der], but only with h[er], because she is [mine]**

I built this project after seeing [this Hacker News post](https://news.ycombinator.com/item?id=44664873). I hadn’t tried that version, but I loved the idea and made my own web take on it. I planned to launch on August 1, but here we are!

Mineder is a simple Tinder clone - only for your partner. You upload their photos and info, then swipe right (like) or up (superlike). That’s it. No real matches, no secret chats, just your partner’s faces and a couple of buttons.

Anyone can run this app. Just add your partner’s pictures and profile details.

## Tech Stuff

Built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://motion.dev/) and vibe coding (because why not?). I wanted to explore some fresh tools - Next.js for the app framework, Framer Motion for smooth animations, and the whole vibe coding craze.

You can see a live demo [here](https://mineder.vercel.app/) (if the site's still up). The default login is nothing! Just click the 'Login' button.

### Writing with AI

About 90% of this project was generated with large language models. I did review the code and made small tweaks, but most of it came straight from AI. Here's how it went:

#### Prompt

I used this prompt to drive code generation. Not everything here made it into the final app (the formatting is not great but it conveys the idea), but you get the idea:

```
Create a well animated and colorful Tinder clone. We are using NextJS with app router (the project is already setup, so no need to create a new one). It doesn't need to be client side. Make use of the nextjs backend. Just no database. Install UI frameworks if required or use Tailwind or shadcn, whichever is best for smooth animations and swipes. Keep all data (profile info and user pics) including authentication local, no databases. Users can login and they'll be presented with different profiles that they can swipe left/right/up. Keep easily configurable options to disable/enable one or more of these swipes (ie, if LEFT_SWIPE_ENABLED = false, no left swipe is allowed by the users).
No need to build the sign up page now, only login is enough for now.
The website should be responsive and work on both mobile and desktop, including the swipes.
Also have buttons along with the swipe gestures.
Swipe gestures will be beautifully animated. Scrolling should reveal multiple pictures, just like in Tinder.
Just reiterating, the application should have buttery smooth animations and gesture controls.
Make sure that the main profile screen is animated, like buttons bouncing/scaling slightly on hover. Clicking on select (right swipe) will show a positive-ish animation. Left swipe or button click will have a negative-ish animation, and so on...
To start with, keep a few user's info and pics available locally, which will be shown in random combinations.
Keep the design fresh and colorful, however, do not copy Tinder's styles (because copyright!).
```

#### Jules

I got beta access to Google's Jules first. I asked it to scaffold the Next.js starter app, but it kept trying to create a new project from scratch. Once I locked down that detail, it produced decent code - but its tests failed and imports broke. I tried running it locally (branch [tinder-clone](https://github.com/sherlockdoyle/mineder/tree/tinder-clone)), hit import errors, and eventually gave up. I could've fixed it, but I wanted to move on.

#### v0 by Vercel

Visually, Vercel's v0 preview looked the best - bright colors, smooth swipes. But it pulled in older library versions that I didn't want to update by hand. It also messed up layouts: buttons sat behind the cards and nothing was centered.

#### ChatGPT

ChatGPT gave modern code and patterns, but it faked authentication in client-side localStorage. I had to ask it again for a real, server-side check. It also stacked cards side-by-side instead of one on top of another. I could've refined the prompt more, but I was too lazy.

#### Claude Sonnet

Claude Sonnet nailed the layout and swipe logic. It started with client-side auth, so I asked for server-side instead. The output matched what you see now. It did add some extra, inefficient code, which I trimmed by hand.

## Running This

I want anyone - even a non-programmer - to spin this up and share the love! Below is a light technical guide that should be easy for anyone with basic computer skills.

### Prerequisites

1. **Install Node.js**

   * Visit <https://nodejs.org/en/download>
   * Download the installer for your OS
   * Run it and follow the "Next" prompts

2. **Get the code**

   * Clone this repo:

     ```bash
     git clone https://github.com/sherlockdoyle/mineder.git
     ```

   * Or download the ZIP:
     <https://github.com/sherlockdoyle/mineder/archive/refs/heads/main.zip>
   * Unzip into a folder you like

### Running the App

1. **Install dependencies**
   Open a terminal or command prompt.

   ```bash
   cd mineder
   npm install
   ```

2. **Start the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Customizing the App

My goal is to make it super easy to add your own partner's info and pics. Here's how the files work:

* [**images/**](images/)
  Put your images here. The app will pick them at random. Make sure file names use only letters and numbers.

* [**src/data/user.ts**](src/data/user.ts)
  Holds a simple hashed token for login.

* [**src/data/profiles.ts**](src/data/profiles.ts)
  Controls the fake profiles:

  * `NAMES`: array of names to show
  * `AGE`: number or `undefined` (random if `undefined`)
  * `INTERESTS`: array of interests
  * `BIOS`: array of short bios
  * `DISTANCE`: number or `undefined` (random if `undefined`)

To personalize, delete the example pics in **images/** and add your own. Then update the arrays in **profiles.ts** with names (different names that you call them), interests, and bios you like. You can also set exact ages and distances if you wish.

#### Building Your Login Token

Use the provided script to generate your auth token:

```bash
node scripts/build-token.js <username> <password>
```

Replace `<username>` and `<password>` with your chosen login. Copy the output and paste it into `USER_TOKEN` inside **src/data/user.ts**.

### Deploying the App

I recommend Vercel - it's free for personal projects and super easy. Sign up at <https://vercel.com>. Then follow this excellent guide: <https://www.alexchantastic.com/deploying-with-vercel-cli>

If you hit any snags, open an issue on GitHub and I'll try to help out!
