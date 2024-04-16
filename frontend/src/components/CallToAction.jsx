import { Banner, Button } from "flowbite-react";
import { HiX } from "react-icons/hi";

export default function CallToAction() {
  return (
    <Banner>
      <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className='flex-1 justify-center flex flex-col'>
          <h2 className='text-2xl'>Want to read more intersting e-books?</h2>
          <p className='text-gray-500 my-2'>
            Checkout these resources with 1000+ e-books
          </p>
          <Button
            gradientDuoTone='purpleToPink'
            className='rounded-tl-xl rounded-bl-none'
          >
            <a
              href='https://www.junkybooks.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              JUNKBOOKS
            </a>
          </Button>
        </div>
        <div className='p-7 flex-1'>
          <img
            src='https://d1qwl4ymp6qhug.cloudfront.net/Images%20for%20blog/Ebook.png'
            className='rounded-tl-3xl rounded-br-3xl'
          />
        </div>
        <Banner.CollapseButton
          color='gray'
          className='flex items-center justify-center border-0 bg-slate-400 dark:bg-slate-200  text-gray-500 dark:text-gray-400 md:mb-64 h-6 w-6 rounded-full'
        >
          <HiX className='h-4 w-4 text-red-600 font-extrabold' />
        </Banner.CollapseButton>
      </div>
    </Banner>
  );
}
