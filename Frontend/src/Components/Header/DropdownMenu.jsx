const DropdownMenu = ({ closeMenu }) => {
    return (
        <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
            <a href="#courses" onClick={closeMenu} className="block px-4 py-2 hover:bg-blue-200">Courses</a>
            <a href="#departments" onClick={closeMenu} className="block px-4 py-2 hover:bg-blue-200">Departments</a>
            <a href="#facilities" onClick={closeMenu} className="block px-4 py-2 hover:bg-blue-200">Facilities</a>
        </div>
    );
};

export default DropdownMenu;
