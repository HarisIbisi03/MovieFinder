A movie finder app built with React. Site uses TMDB API to fetch movie data, and uses React Router for navigation. Homepage displays a list of popular movies, and allows users to search for movies by title.Movies include release year, rating, and a poster image. Clicking on a movie title will navigate to a details page, which includes a description of the movie, and a list of cast. To get back to the homepage, simply click on the header "MovieFinder".

# How to run the project

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file and add your TMDB API key:
   ```
   REACT_APP_TMDB_KEY=your_api_key_here
   ```
4. Run the development server with `npm start`

# Why we used React instead of Angular or Vue

We used React because we thought that the component based architecture was the most effective when it comes to reusing components and manage big applications. React is more flexible to use compared to Vue or Angular because of the components. React is also a JavaScript-library that we as a group have a bit of experience from, which is what made us choose React. We don't have any experience with either of Vue or Angular. The components that are created can manage their own states which makes it easier to build complex UIs by connecting the different components together. React uses virtual DOM which leads to better performances, and whilst Vue also utilizes virtual DOM, React is praised for it's speed and efficiency. React is also a library and not a framework, which makes it easier for us choose what we want to work with. It also helps us with creating dynamic web pages, which is what we needed for this project, because we can also create bigger programs with React. 

# References

[1] GeeksForGeeks, "React VS Angular VS Vue – Which Framework is the Best?," 2024. [Online]. Available: https://www.geeksforgeeks.org/react-vs-angular-vs-vue-which-framework-is-the-best/ (accessed: 2024-11-03)

[2] M. Joshi, "Angular vs React vs Vue: Core Differences," _BrowserStack_, [Online], May. 11, 2023. Available: https://www.browserstack.com/guide/angular-vs-react-vs-vue (accessed: 2024-11-03)

[3] GeeksForGeeks, "Why Choose React For Web Development in 2024," 2024. [Online]. Available: https://www.geeksforgeeks.org/why-choose-react-for-web-development/ (accessed: 2024-11-03)

[4] O. Hutsulyak, “10 Key Reasons Why You Should Use React for Web Development,” TechMagic, [Online], Aug. 01, 2024. Available: https://www.techmagic.co/blog/why-we-use-react-js-in-the-development (accessed: 2024-11-19)

