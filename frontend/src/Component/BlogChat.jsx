/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { IoMdTime } from "react-icons/io";
import { Typewriter } from "react-simple-typewriter";
import pic from '/images/profile.png'

function Content(props) {
  const id = props.id;
  const title = props.title;
  const content = props.content;
  const published_on = props.published_on;
  const author = props.author;
  const image = props.image;
  const author_image = props.author_image;

  console.log("Image :",author_image)
  return (
    <div className="flex flex-col   px-5 ">
      <div className=" md:flex-3" key={id}>
        <div className="col-span-2  max-w-[700px] ">
          <div className="lg:row-start-1 lg:mx-auto  lg:w-full">
            <div className="lg:pr-1">
              <div className="w-full">
                <h1 className="mt-2 text-l font-bold tracking-tight text-gray-900 sm:text-4xl uppercase">
                  {title}
                </h1>
                <div className="sm:text-center flex gap-5 items-center">
                  <a href="/" aria-label="Author" className=" mb-1">
                    <motion.img
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        ease: "linear",
                        duration: 1.5,
                      }}
                      alt="avatar"
                      src={author_image || pic}
                      className="object-cover w-10 h-10 rounded-full shadow-sm"
                    />
                  </a>
                  <div className="alignt-center flex flex-col gap-1 font-mono text-left">
                    <p className="flex mt-3 justify-between divide-x gap-1  font-medium leading-4 text-gray-600">
                      <IoMdTime />

                      <span className="text-[10px] font-light bg">
                        <Typewriter
                          words={[`${published_on}`]}
                          loop={1}
                          delaySpeed={500}
                          cursorBlinking={false}
                          typeSpeed={80}
                        />
                      </span>
                    </p>

                    <p className="mb-2 text-xs font-semibold tracking-wide text-gray-600 uppercase sm:text-left">
                      By {author}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pl-2  px-6 ">
            <motion.img
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                ease: "linear",
                duration: 1.5,
              }}
              className="w-full max-w-[700px]  max-h-[600px] rounded-md bg-gray-900 object-cover shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] mb-10"
              src={image}
              alt="News image"
            />
          </div>

          <div className="lg:row-start-2 lg:mx-auto lg:w-full lg:max-w-7xl lg:gap-x-8 ">
            <div className="lg:pr-4">
              <motion.div
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  ease: "linear",
                  delay: 0.3,
                  duration: 1.5,
                }}
                className="text-base leading-7 text-gray-700"
              >
                {content}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default Content;
