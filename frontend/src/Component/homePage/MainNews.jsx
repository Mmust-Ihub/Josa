/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import DOMPurify from 'dompurify'



function MainNews(props) {
  const title = props.title;
  const slug = props.slug;
  const sanitizedSlug = DOMPurify.sanitize(slug, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  
  // const headline = props.headline || ''; 
  const category = props.category;
  const image = props.image;
  const url = `/${category}/${slug}`;
  const published_on = props.published_on;

  // Simple truncate function if not using the hook
  const truncate = (str, maxLength) => (str.length > maxLength ? str.slice(0, maxLength) + '...' : str);

  return (
    <Link to={url}>
      <div className="group hover:scale-105 transition-all duration-200 ease-in-out grid lg:grid-cols-2 lg:gap-4 bg-slate-100 hover:bg-slate-100 rounded-lg mt-12 p-3">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            ease: "linear",
            duration: 1,
          }}
          className="w-full gap-2"
        >
          <img
            className="md:rounded-lg rounded-md w-full h-full max-h-[285px] object-cover mb-4"
            src={image}
            alt="Latest News..."
          />
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            ease: "linear",
            duration: 1,
          }}
          className="flex flex-col"
        >
          <div className="flex-1">
            <h1 className="font-bold text-2xl group-hover:text-purple-700 w-full flex cursor-pointer decoration-gray-400 justify-left">
              {title}
            </h1>
            <div className="border-none px-1 text-black">
              <Typewriter
                words={[truncate(sanitizedSlug, 200)]} // Ensure headline is a string
                loop={1}
                delaySpeed={500}
                cursorBlinking={false}
                typeSpeed={10}
              />
            </div>
          </div>
          <h1 className="font-light text-[12px] text-right pr-3">
            <Typewriter
              words={[`${published_on}`]}
              loop={1}
              delaySpeed={500}
              cursorBlinking={false}
              typeSpeed={80}
            />
          </h1>
        </motion.div>
      </div>
    </Link>
  );
}

export default MainNews;
