import React from "react";
import { motion } from "framer-motion";
import { BsLink45Deg } from "react-icons/bs";
import { BiCodeAlt } from "react-icons/bi";
import { TfiServer } from "react-icons/tfi";
import { styles } from "../style";
import { projects } from "../constant";
import { fadeIn, staggerContainer, textVariant } from "../utils/motion";

const StarWrapper = (Component, idName) =>
  function HOC() {
    return (
      <motion.section
        id={idName}
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className={`${styles.padding} max-w-7xl mx-auto relative`}
      >
        <span className="hash-span" id={idName}>&nbsp;</span>
        <Component />
      </motion.section>
    );
  };

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  live_link,
  client_link,
  server_link,
  projectType = "Team project",
}) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.2, 0.6)}
    className="w-full max-w-[420px] h-full flex flex-col"
  >
    <div className="relative group cursor-pointer flex-1 flex flex-col">
      {/* Gradient Border */}
      <div
        className="absolute -inset-0.5 
                    rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-1000
                    group-hover:duration-200 animate-tilt"
      />

      {/* Card */}
      <div className="relative bg-gray-800/25 backdrop-blur-sm rounded-xl overflow-hidden flex flex-col h-full">
        {/* Screenshot */}
        <div className="w-full h-48 bg-gray-800/25 flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt={`${name} preview`}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-600">No preview</span>
          )}
        </div>

        {/* Content */}
        <div className="p-6  flex-1 flex flex-col">
          {/* Header Icons */}
          <div className="flex items-center justify-between mb-4 ">
            <span className="text-pink-400 text-sm font-medium">
              {projectType}
            </span>
            <div className="flex  items-center gap-3 text-gray-400 group-hover:text-white transition-colors">
              {server_link && (
                <a
                  href={server_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Server"
                  className="hover:text-pink-400"
                >
                  <TfiServer size={18} />
                </a>
              )}
              <a
                href={client_link}
                target="_blank"
                rel="noopener noreferrer"
                title="Client"
                className="hover:text-pink-400"
              >
                <BiCodeAlt size={20} />
              </a>
              <a
                href={live_link}
                target="_blank"
                rel="noopener noreferrer"
                title="Live"
                className="hover:text-pink-400"
              >
                <BsLink45Deg size={22} />
              </a>
            </div>
          </div>

          {/* Title & Description */}
          <h3
            className="text-white font-bold text-xl mb-3 group-hover:text-transparent
                       group-hover:bg-clip-text group-hover:bg-gradient-to-r
                       group-hover:from-pink-400 group-hover:to-purple-400
                       transition-all duration-300"
          >
            {name}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-4 flex-1">
            {description}
          </p>

          {/* Footer: Features + Tech Icons */}
          <div className="mt-auto">
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-400 text-sm">
                <div className="w-1 h-1 bg-pink-400 rounded-full mr-3" />
                Multiple payment methods
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <div className="w-1 h-1 bg-pink-400 rounded-full mr-3" />
                Role-based dashboards
              </div>
            </div>
            <div className="flex  flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <img
                  key={idx}
                  src={tag.icon}
                  alt={tag.name}
                  title={tag.name}
                  className="w-6 h-6 object-contain opacity-80 hover:opacity-100"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const Works = () => (
  <>
    {/* Projects Banner (same style as Contact) */}
    <section
      id="projects"
      className="w-full py-16 relative overflow-hidden flex justify-center items-center"
    >
      <h1 className="absolute inset-0 flex justify-center items-center text-[6rem] font-black text-white opacity-5 select-none pointer-events-none uppercase">
        Projects
      </h1>
      <motion.div
        variants={fadeIn("up", "spring", 0.2, 1)}
        className="relative z-10 text-center"
      >
        <h2 className={styles.sectionHeadText}>Projects</h2>
      </motion.div>
    </section>

    <div className="relative">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl" />
      </div>

      {/* Subheading */}
      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="text-center mb-16 relative z-10"
      >
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Browse my team projects with code links and live demos, each card
          uniform in height.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {projects.map((p, i) => (
          <ProjectCard key={i} index={i} {...p} />
        ))}
      </div>
    </div>
  </>
);

export default StarWrapper(Works, "projects");
