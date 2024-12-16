import React from 'react'

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-400 py-16">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-6 lg:px-10">
      {/* About Us Section */}
      <div>
        <h2 className="text-white text-lg font-bold mb-4">About Us</h2>
        <p className="text-sm leading-relaxed">
          Music School is a premier institution dedicated to teaching the art and science of music. We nurture talent, fostering a vibrant community of musicians to excel and create.
        </p>
      </div>
      {/* Quick Links Section */}
      <div>
        <h2 className="text-white text-lg font-bold mb-4">Quick Links</h2>
        <ul className="space-y-3">
          {["Home", "About", "Courses", "Contact"].map((link) => (
            <li key={link}>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300 text-sm"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* Follow Us Section */}
      <div>
        <h2 className="text-white text-lg font-bold mb-4">Follow Us</h2>
        <div className="flex space-x-6">
          {["Facebook", "Twitter", "Instagram"].map((platform) => (
            <a
              key={platform}
              href="#"
              className="hover:text-white transition-colors duration-300 text-sm"
            >
              {platform}
            </a>
          ))}
        </div>
      </div>
      {/* Contact Us Section */}
      <div>
        <h2 className="text-white text-lg font-bold mb-4">Contact Us</h2>
        <p className="text-sm">
          <span className="block">New Delhi, India</span>
          <span className="block">Delhi 10001</span>
          <span className="block">Email: info@musicschool.com</span>
          <span className="block">Phone: (123) 456-7890</span>
        </p>
      </div>
    </div>
    {/* Footer Bottom Text */}
    <div className="mt-12 text-center text-xs text-gray-500 border-t border-gray-700 pt-6">
      © 2024 Music School. All rights reserved.
    </div>
  </footer>
  )
}

export default Footer
