const DropdownMenu = ({ closeMenu }) => {
    return (
      <div className="absolute left-0 lg:left-auto lg:right-0 mt-2 w-48 bg-white shadow-xl rounded-lg py-2 z-50 border border-gray-100">
        <a
          href="#courses"
          onClick={closeMenu}
          className="block px-6 py-3 hover:bg-blue-50 hover:text-blue-500 text-blue-900 transition-colors"
        >
          Courses
        </a>
        <a
          href="#departments"
          onClick={closeMenu}
          className="block px-6 py-3 hover:bg-blue-50 hover:text-blue-500 text-blue-900 transition-colors"
        >
          Departments
        </a>
        <a
          href="#facilities"
          onClick={closeMenu}
          className="block px-6 py-3 hover:bg-blue-50 hover:text-blue-500 text-blue-900 transition-colors"
        >
          Facilities
        </a>
      </div>
    );
  };
  
  export default DropdownMenu;