import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { useDispatch } from "react-redux";
import { LOGOUT_REQUEST } from "../../constants/app.constants";
import { FaHeart } from "react-icons/fa";
// import { AiOutlineUser } from "react-icons/ai";
import { useWishlist } from "../../context/AddWishlistContext";

const Header: React.FC = () => {
  const isLoggedIn: any = useSelector((state: any) => state.auth.isLoggedIn);
  // const [isDropdown, setIsDropDown] = useState(false)
  const [loggedOut, setLoggedOut] = useState(false);
  const { openCart, cartQuantity } = useShoppingCart();
  const { openWishlist, wishlistQuantity } = useWishlist();
  const dispatch = useDispatch();

  function logout(): void {
    dispatch({ type: LOGOUT_REQUEST, payload: {} });
    localStorage.removeItem("persist:root");
    setLoggedOut(true);
  }
  console.log(cartQuantity);
  // const handleDropDown = () => {
  //   console.log('clicked');
  //   setIsDropDown(prev => !prev)
  // }
  return (
    <nav className="bg-white shadow-sm p-4 w-full">
      <div className="container mx-auto flex items-center">
        <div className="flex space-x-4 items-center justify-between w-full">
          <div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-800 font-semibold px-3 py-2 rounded-md ${
                  isActive ? "text-blue-500" : "hover:text-blue-500"
                }`
              }
            >
              Shoppify
            </NavLink>
            <NavLink
              to="/Orders"
              className={({ isActive }) =>
                `text-gray-800 font-semibold px-3 py-2 rounded-md ${
                  isActive ? "text-blue-500" : "hover:text-blue-500"
                }`
              }
            >
              Orders
            </NavLink>
          </div>

          <div className="flex items-center justify-center">
            <button
              onClick={openCart}
              className="rounded-full flex items-center justify-center mr-4 relative"
            >
              <img
                src="../../public/image/cart.svg"
                alt=""
                className="w-6 h-6"
              />
              <div className="rounded-full bg-red-500 flex justify-center items-center absolute w-6 h-6 bottom-5 left-10">
                {cartQuantity}
              </div>
            </button>
            <button
              onClick={openWishlist}
              className="rounded-full flex items-center justify-center mr-4 relative"
            >
              <FaHeart size={20} color="red"></FaHeart>
              <div className="rounded-full bg-red-500 flex justify-center items-center absolute w-6 h-6 bottom-5 left-10">
                {wishlistQuantity}
              </div>
            </button>
            {
              isLoggedIn && !loggedOut && (
                <NavLink to="/">
                  <button
                    className="bg-red-500 text-white text-xs rounded-full"
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                </NavLink>
              )
              // <div>
              //   <button onClick={handleDropDown} className="rounded-full flex items-center justify-center mr-4 relative">
              //     <AiOutlineUser size={20} color="black"></AiOutlineUser>
              //   </button>
              //   {isDropdown && <div id="dropdown" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 absolute">
              //     <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              //       <li>
              //         <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">Sign out</span>
              //       </li>
              //     </ul>
              //   </div>}
              // </div>
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
