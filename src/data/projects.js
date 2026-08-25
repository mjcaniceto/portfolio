import akuma_landing from "../assets/projects/akuma/akuma_landing.png";
import akuma_sizer from "../assets/projects/akuma/akuma_sizer.png";
import akuma_visualizer from "../assets/projects/akuma/akuma_visualizer.png";  
import akuma_footer from "../assets/projects/akuma/akuma_footer.png";  

export const PROJECTS = [
  {
    id: "1",
    title: "Akuma Apparel Website",
    codename: "akuma-apparel",
    category: "e-commerce",
    summary: "An archived e-commerce website for Akuma Apparel, a streetwear brand. Built with React and Tailwind CSS.",
    stack: ["React", "Tailwind CSS", "Javascript"],
    thumbnail: akuma_landing,
    images: [ akuma_landing, akuma_sizer, akuma_visualizer, akuma_footer ],
    githubUrl: "https://github.com/mjcaniceto/akuma-archived",
    liveUrl: "https://mjcaniceto.github.io/akuma-archived/",
    status: "archived"
  },
  {
    id: "2",
    title: "Soju Snaps",
    codename: "soju-snaps",
    category: "e-commerce",
    summary: "A rental management system for Soju Snaps. A web application that allows users to manage their rental properties, bookings, and payments. Built with the MERN stack.",
    stack: ["React", "Tailwind CSS", "Typescript", "Node.js", "Express", "MongoDB"],
    thumbnail: "",
    images: [],
    githubUrl: "",
    liveUrl: "",
    status: "in-progress"
  },
  {
    id: "3",
    title: "Letterboxd Clone",
    codename: "letterboxd-clone",
    category: "web-app",
    summary: "A letterbox clone for ___ .",
    stack: ["React", "Tailwind CSS", "Typescript", "Node.js", "Express", "MongoDB"],
    thumbnail: "",
    images: [],
    githubUrl: "",
    liveUrl: "",
    status: "in-progress"
  },
  {
    id: "4",
    title: "Vehicle Maintenance Tracker",
    codename: "vehicle-maintenance-tracker",
    category: "web-app",
    summary: "A web application for tracking vehicle maintenance schedules and expenses.",
    stack: ["React", "Tailwind CSS", "Typescript", "Node.js", "Express", "MongoDB"],
    thumbnail: "",
    images: [],
    githubUrl: "",
    liveUrl: "",
    status: "initialized"
  }
];
