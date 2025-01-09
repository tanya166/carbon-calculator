import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavbarItem = ({ item }) => {
  const navigate = useNavigate();

  const scrollToSection = (event) => {
    event.preventDefault();

    if (item.link) {
      navigate(item.link); // Navigate to the link if it exists
    } else if (item.className) {
      // Navigate to the correct page and scroll to the section
      const [page, section] = item.className.split('#');
      navigate(`/${page}#${section}`);

      setTimeout(() => {
        const sectionElement = document.querySelector(`.${section}`);
        if (sectionElement) {
          sectionElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);  // Delay to ensure the page has fully navigated
    }
  };

  return (
    <li><a href="#" onClick={scrollToSection}>{item.title}</a></li>
  );
};

export default NavbarItem;


