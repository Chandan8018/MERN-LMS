import { Avatar, Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsGithub } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import icon from "../assets/logo2.png";
export default function FooterCom() {
  return (
    <Footer
      container
      className='border border-t-8 border-teal-500 bg-[#9C9290] dark:bg-[#18191D]'
    >
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link
              to='/'
              className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white flex items-center'
            >
              <img src={icon} alt='LMS' className='h-20' />
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title
                title='About'
                className='text-black dark:text-white'
              />
              <Footer.LinkGroup col>
                <Footer.Link href='#' className='text-black dark:text-white'>
                  Blog's
                </Footer.Link>
                <Footer.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-black dark:text-white'
                >
                  Books' Club
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title
                title='Follow us'
                className='text-black dark:text-white'
              />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://www.github.com/Chandan8018'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-black dark:text-white'
                >
                  Github
                </Footer.Link>
                <Footer.Link href='#' className='text-black dark:text-white'>
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title
                title='Legal'
                className='text-black dark:text-white'
              />
              <Footer.LinkGroup col>
                <Footer.Link href='#' className='text-black dark:text-white'>
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href='#' className='text-black dark:text-white'>
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            className='text-black dark:text-white'
            href='#'
            by="Book's Club"
            year={new Date().getFullYear()}
          />
          <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
            <Footer.Icon href='#' icon={BsFacebook} />
            <Footer.Icon href='#' icon={BsInstagram} />
            <Footer.Icon href='#' icon={FaXTwitter} />
            <Footer.Icon
              href='https://github.com/Chandan8018'
              icon={BsGithub}
            />
            <Footer.Icon href='#' icon={FaYoutube} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
