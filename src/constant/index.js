import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

import taskpora from "../../src/assets/projects/taskpora.png";
import doct from "../../src/assets/projects/doct.png";
import zapcart from "../../src/assets/projects/Zapcart.png";
import fashionova from "../../src/assets/projects/fashionova.png";
import mindcore from "../../src/assets/projects/mindcore.png";
import neuronest from "../../src/assets/projects/neuronest.png";  
import quickserve from "../../src/assets/projects/quickserve.png";
import notemakers from "../../src/assets/projects/notes maker.png";
import conexa from "../../src/assets/projects/conexa.png";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "work",  title: "Work"  },
  { id: "contact", title: "Contact" },
];

const technologies = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",  // <- TypeScript
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  "https://skillicons.dev/icons?i=express",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "https://skillicons.dev/icons?i=vercel",
  "https://www.vectorlogo.zone/logos/netlify/netlify-icon.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  // newly added:
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
];


const projects = [
{
  name: "Taskpora",
  description:
    "Taskpora is a staff and task management platform where teams can efficiently create, assign, and track tasks through an intuitive Kanban-style board with real-time updates. It supports role-based access for administrators, team leads, and staff, facilitating seamless collaboration. Integrated chat allows team members to discuss task progress and share updates instantly. Automated notifications keep everyone informed of changes and deadlines. A comprehensive analytics dashboard provides insights into productivity trends and workload distribution across the organization.",
  tags: [
    {
      name: "reactjs",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "tailwindcss",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    },
    {
        name: "nodeJs",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
    {
      name: "expressjs",
      icon: "https://skillicons.dev/icons?i=express",
    },
    {
      name: "mongodb",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "aws",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    },
  ],
  image: taskpora,
  server_link: "https://github.com/ImranSarkerWeb/tasty-drop-server",
  client_link: "https://github.com/BakiAbdullah/Tasty-drop-client",
  live_link: "https://tasty-drops.web.app/",
},

  {
    name: "Doct.",
    description:
"Doct is a doctor appointment application for a multi-speciality hospital, enabling patients to browse specialties, view doctor profiles, and schedule appointments. It features Admin, Doctor, and Patient dashboards with role based access to manage calendars, approve bookings, and review medical histories. Email confirmations are sent upon booking. Doctors and administrators oversee appointments, while an analytics dashboard delivers insights into appointment volumes and resource allocation. This streamlined platform enhances overall efficiency and ensures seamless interactions.",
    tags: [
      {
        name: "react",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "nodeJs",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
       {
      name: "expressjs",
      icon: "https://skillicons.dev/icons?i=express",
    },
      {
        name: "mongodb",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "tailwind",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
      },
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
    {
      name: "nextjs",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "typescript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "mongodb",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "tailwindcss",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    },
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
    {
      name: "react",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "tailwindcss",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    },
    {
        name: "nodeJs",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
    {
      name: "expressjs",
      icon: "https://skillicons.dev/icons?i=express",
    },
    {
      name: "mongodb",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
  ],
  image: fashionova,
  server_link: "https://github.com/Kevinandrewsv/FashioNova/tree/main/backend",
  client_link: "https://github.com/Kevinandrewsv/FashioNova/tree/main/frontend",
  live_link: "https://fashio-nova.vercel.app/",
},
  {
    name: "Conexa",
    description:
"Conexa is a social media platform where users can sign up, customize profiles, and share text, photo, and video posts in a personalized feed. They can follow or befriend others, like and comment on posts, and send private messages in real time. An Admin dashboard offers moderation tools for reviewing content and handling user reports. Email notifications keep users informed of new follows and messages, delivering a streamlined, scalable networking experience.",
    tags: [
      {
        name: "react",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "nodeJs",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
      name: "expressjs",
      icon: "https://skillicons.dev/icons?i=express",
    },
      {
        name: "mongodb",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "tailwind",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
      },
    ],
    image: conexa,
    server_link: "https://github.com/Kevinandrewsv/Conexa/tree/main/server",
    client_link: "https://github.com/Kevinandrewsv/Conexa/tree/main/client",
    live_link: "https://conexaforu.vercel.app/",
  },
  {
    name: "MindCore",
    description:
      "MindCore is a client-side React portfolio app styled with Tailwind CSS and animated with Framer Motion that emulates a car service booking site. It offers a responsive hero section, service cards (oil changes, tire rotations, inspections) with “Book Now” buttons, and a client-validated booking form that displays in-browser confirmations. Additional React Router powered pages Gallery, Team, About, and Contact—showcase image grids, staff profiles, and a simple email form, all running entirely in the browser.",
    tags: [
      {
        name: "react",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "tailwind",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
      },
       
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
    {
      name: "react",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "expressjs",
      icon: "https://skillicons.dev/icons?i=express",
    },
    {
      name: "postgresql",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "tailwindcss",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    },
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
      {
        name: "react",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "nodeJs",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
      name: "expressjs",
      icon: "https://skillicons.dev/icons?i=express",
    }
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
      {
        name: "react",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "tailwind",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
      },
      {
        name: "nodeJs",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
      name: "expressjs",
      icon: "https://skillicons.dev/icons?i=express",
    },
    ],
    image: notemakers,
     server_link: "https://github.com/Kevinandrewsv/Notes-Makers-Backend",
    client_link: "https://github.com/Kevinandrewsv/Notes-Makers-Frontend",
    live_link: "https://noteworthy-kevin.netlify.app/",
  },
];

const socialLinks = [
  {
    icon: FaGithub,
    name: "Kevin Andrews",
    link: "https://github.com/Kevinandrewsv",
  },
  {
    icon: FaTwitter,
    name: "Kevin Andrews",
    link: "https://x.com/kevinandrewsV",
  },
  {
    icon: FaLinkedinIn,
    name: "Kevin andrews",
    link: "https://www.linkedin.com/in/kevinandrewsv",
  },
  {
    icon: FaEnvelope,
    name: "kevinandrews001@gmail.com",
  },
  {
    icon: FaFacebook,
    name: "Kevin andrews",
    link: "https://www.facebook.com/kevin.andrews.1650",
  },
];

export { projects, socialLinks, technologies };
