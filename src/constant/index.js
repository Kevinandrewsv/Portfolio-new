// src/constants/index.js
/* Projects / nav / social data
   - Updated import paths to "../assets/..." (assumes this file lives at src/constants/)
   - Standardized tag names (lowercase) and reused icon sources via techIconMap
   - Email social link now uses mailto:
   - NOTE: rename "notes maker.png" file to "notemakers.png" (or update the import if you keep the space)
*/

import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

/* --- Images: adjust names if your files differ --- */
/* If your file is actually "notes maker.png" either rename it to "notemakers.png"
   (recommended) or keep the space and update the import path accordingly. */
import taskpora from "../assets/projects/taskpora.png";
import doct from "../assets/projects/doct.png";
import zapcart from "../assets/projects/Zapcart.png";
import fashionova from "../assets/projects/fashionova.png";
import mindcore from "../assets/projects/Mindcore.png";
import neuronest from "../assets/projects/Neuronest.png";
import quickserve from "../assets/projects/quickserve.png";
import notemakers from "../assets/projects/notes maker.png"; // recommended rename from "notes maker.png"
import conexa from "../assets/projects/conexa.png";
import gsapgaming from "../assets/projects/gsapgaming.png";

/* --- Navigation links (keeps in sync with your App.jsx section ids) --- */
export const navLinks = [
  { id: "home", title: "Home" },
  { id: "services", title: "Services" },
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Projects" },
  { id: "contributions", title: "Contributions" },
  { id: "contact", title: "Contact" },
];

/* --- Technology icons (single source-of-truth) --- */
const techIconMap = {
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  html5: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  css3: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  js: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  bootstrap: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  redux: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  materialui: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
  firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  express: "https://skillicons.dev/icons?i=express",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  vercel: "https://skillicons.dev/icons?i=vercel",
  netlify: "https://www.vectorlogo.zone/logos/netlify/netlify-icon.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  nextjs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
};

/* --- Technologies quick list (URLs) for UI badges / icons row --- */
export const technologies = [
  techIconMap.react,
  techIconMap.html5,
  techIconMap.css3,
  techIconMap.js,
  techIconMap.bootstrap,
  techIconMap.redux,
  techIconMap.typescript,
  techIconMap.mongodb,
  techIconMap.figma,
  techIconMap.nodejs,
  techIconMap.materialui,
  techIconMap.firebase,
  techIconMap.express,
  techIconMap.python,
  techIconMap.vercel,
  techIconMap.netlify,
  techIconMap.git,
  techIconMap.postgresql,
  techIconMap.aws,
  techIconMap.nextjs,
];

/* --- Projects (standardized tag names/icons) --- */
export const projects = [
  {
    name: "Taskpora",
    description:
      "Taskpora is a staff and task management platform where teams can efficiently create, assign, and track tasks through an intuitive Kanban-style board with real-time updates. It supports role-based access for administrators, team leads, and staff, facilitating seamless collaboration. Integrated chat allows team members to discuss task progress and share updates instantly. A comprehensive analytics dashboard provides insights into productivity trends and workload distribution across the organization.",
    tags: [
      { name: "react", icon: techIconMap.react },
      { name: "tailwindcss", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
      { name: "nodejs", icon: techIconMap.nodejs },
      { name: "express", icon: techIconMap.express },
      { name: "mongodb", icon: techIconMap.mongodb },
      { name: "aws", icon: techIconMap.aws },
    ],
    image: taskpora,
    server_link: "https://github.com/ImranSarkerWeb/tasty-drop-server",
    client_link: "https://github.com/Kevinandrewsv/Taskpora/tree/main/client",
    live_link: "https://taskpora.vercel.app/",
  },

  {
    name: "Doct.",
    description:
      "Doct is a doctor appointment application for a multi-speciality hospital, enabling patients to browse specialties, view doctor profiles, and schedule appointments. It features Admin, Doctor, and Patient dashboards with role based access to manage calendars, approve bookings, and review medical histories. Doctors and administrators oversee appointments, while an analytics dashboard delivers insights into appointment volumes and resource allocation.",
    tags: [
      { name: "react", icon: techIconMap.react },
      { name: "nodejs", icon: techIconMap.nodejs },
      { name: "express", icon: techIconMap.express },
      { name: "mongodb", icon: techIconMap.mongodb },
      { name: "tailwindcss", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
    ],
    image: doct,
    server_link: "https://github.com/Kevinandrewsv/Doct-Backend",
    client_link: "https://github.com/Kevinandrewsv/Doct-Frontend",
    live_link: "https://doctsite.netlify.app/",
  },

  {
    name: "ZapCart",
    description:
      "A full stack e-commerce application named ZapCart featuring a Next.js frontend and an Express.js backend. Customers can browse products by category, search items, and view detailed product pages. It includes JWT-based authentication with Customer and Admin dashboards: customers manage carts and profiles, while admins handle product, category, and order management. The checkout flow integrates Stripe for payments and uses Nodemailer for order confirmation emails. MongoDB Atlas stores all data, and Tailwind CSS ensures a responsive UI.",
    tags: [
      { name: "nextjs", icon: techIconMap.nextjs },
      { name: "typescript", icon: techIconMap.typescript },
      { name: "mongodb", icon: techIconMap.mongodb },
      { name: "tailwindcss", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
    ],
    image: zapcart,
    client_link: "https://github.com/Kevinandrewsv/Zepcart",
    live_link: "https://zepcart.vercel.app/",
  },

  {
    name: "Fashionova",
    description:
      "A full-stack fashion shopping web application named Fashionova is designed to offer users a modern online clothing store experience. Customers can explore the latest fashion collections, filter by category or price, and manage their cart and wishlist. The project includes two dashboards—Admin and Customer—secured with JWT-based authentication. Admins can manage product listings, categories, and track orders. The platform integrates Stripe for secure payments, uses Nodemailer for order confirmations, and stores data in MongoDB.",
    tags: [
      { name: "react", icon: techIconMap.react },
      { name: "tailwindcss", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
      { name: "nodejs", icon: techIconMap.nodejs },
      { name: "express", icon: techIconMap.express },
      { name: "mongodb", icon: techIconMap.mongodb },
    ],
    image: fashionova,
    server_link: "https://github.com/Kevinandrewsv/FashioNova/tree/main/backend",
    client_link: "https://github.com/Kevinandrewsv/FashioNova/tree/main/frontend",
    live_link: "https://fashio-nova.vercel.app/",
  },

  {
    name: "GsapGaming",
    description:
      "GsapGaming is a client-side React showcase styled with Tailwind CSS and driven by GSAP to deliver fast, game-like animations and interactions. It includes a responsive hero with parallax motion and animated game cards (trailers, screenshots, quick demos) featuring “Play Demo” and “Watch Trailer” controls plus interactive stat panels that update in-browser. Additional React Router–powered pages — Games, Leaderboard, Team, and Contact — present media-rich galleries, player profiles, and a simple contact form, all running entirely on the client for instant, immersive experiences.",
    tags: [
      { name: "react", icon: techIconMap.react },
      { name: "tailwindcss", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
    ],
    image: gsapgaming,
    client_link: "https://github.com/Kevinandrewsv/Gsap-recreate",
    live_link: "https://gsapanimatedclone.vercel.app/",
  },

  {
    name: "MindCore",
    description:
      "MindCore is a client-side React frontend styled with Tailwind CSS and enhanced with Framer Motion to deliver smooth, conversational animations for an OpenAI-style chat experience. It features a responsive chat interface with threaded message bubbles, model selector, prompt templates, and instant in-browser responses (frontend-only mock powered by local state), plus client-validated input and exportable conversation cards.",
    tags: [
      { name: "react", icon: techIconMap.react },
      { name: "tailwindcss", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
    ],
    image: mindcore,
    client_link: "https://github.com/Kevinandrewsv/Mindcore",
    live_link: "https://mindcore-pearl.vercel.app/",
  },

  {
    name: "Neuronest",
    description:
      "Neuronest AI is a demo showcasing six AI utilities in a clean, card based layout. Users can generate full articles, craft catchy blog titles, produce AI-generated images, remove backgrounds or unwanted objects from photos, and receive automated resume reviews all instantly within the interface. Subtle animations and responsive design ensure a polished user experience across desktop and mobile, making Neuronest a compelling example of modern UI architecture, state management, and interactive component design.",
    tags: [
      { name: "react", icon: techIconMap.react },
      { name: "express", icon: techIconMap.express },
      { name: "postgresql", icon: techIconMap.postgresql },
      { name: "tailwindcss", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
    ],
    image: neuronest,
    server_link: "https://github.com/Kevinandrewsv/NeuroNest.ai/tree/main/server",
    client_link: "https://github.com/Kevinandrewsv/NeuroNest.ai/tree/main/client",
    live_link: "https://neuronestai-seven.vercel.app/",
  },

  {
    name: "QuickServe",
    description:
      "QuickServe is a food delivery application for a single hotel. Customers browse menu items, add to cart, and schedule delivery times. It features real-time order tracking and customization options. A staff dashboard allows kitchen teams to manage orders, update preparation status, and coordinate deliveries. Automated notifications keep customers informed when meals are prepared and en route. An analytics dashboard provides insights into popular dishes and peak ordering times.",
    tags: [
      { name: "react", icon: techIconMap.react },
      { name: "nodejs", icon: techIconMap.nodejs },
      { name: "express", icon: techIconMap.express },
    ],
    image: quickserve,
    server_link: "https://github.com/Kevinandrewsv/Quickserve-backend",
    client_link: "https://github.com/Kevinandrewsv/Quickserve-Frontend",
    live_link: "https://quickserve-site.netlify.app/",
  },

  {
    name: "Note Makers",
    description:
      "Note Makers is a front-end note-taking web application built with React and Tailwind CSS. It allows users to create, edit, and delete notes in a clean, responsive interface. Each note is displayed as a card with a title and description, and all actions such as adding or removing notes are handled entirely on the client side using React state. The app also features basic local storage integration to preserve notes across sessions, making Note Makers a simple yet effective demonstration of CRUD operations, component structuring, and state management in a modern React environment.",
    tags: [
      { name: "react", icon: techIconMap.react },
      { name: "tailwindcss", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
      { name: "nodejs", icon: techIconMap.nodejs },
      { name: "express", icon: techIconMap.express },
    ],
    image: notemakers,
    server_link: "https://github.com/Kevinandrewsv/Notes-Makers-Backend",
    client_link: "https://github.com/Kevinandrewsv/Notes-Makers-Frontend",
    live_link: "https://noteworthy-kevin.netlify.app/",
  },
];

/* --- Social links --- */
export const socialLinks = [
  { icon: FaGithub, name: "Kevin Andrews", link: "https://github.com/Kevinandrewsv" },
  { icon: FaTwitter, name: "Kevin Andrews", link: "https://x.com/kevinandrewsV" },
  { icon: FaLinkedinIn, name: "Kevin Andrews", link: "https://www.linkedin.com/in/kevinandrewsv" },
  { icon: FaEnvelope, name: "kevinandrews001@gmail.com", link: "mailto:kevinandrews001@gmail.com" },
  { icon: FaFacebook, name: "Kevin Andrews", link: "https://www.facebook.com/kevin.andrews.1650" },
];

