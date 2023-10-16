"use client";

import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import { Fragment, useContext, useEffect } from "react";
import CommonModal from "../commonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "../CartModal";

function NavItems({
  isModalView = false,
  isAdminView,
  setShowNavModal,
  showNavModal,
}) {
  const router = useRouter();

  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border bg-transparent  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0  ">
        {isAdminView
          ? adminNavOptions.map((item) => (
              <li
                className="cursor-pointer  block py-2 pl-3 pr-4  text-gray-100 rounded md:p-0"
                key={item.id}
                onClick={() => {
                  router.push(item.path);
                  {
                    showNavModal ? setShowNavModal(false) : null;
                  }
                }}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-white shadow-sms rounded md:p-0"
                key={item.id}
                onClick={() => {
                  router.push(item.path);
                  {
                    showNavModal ? setShowNavModal(false) : null;
                  }
                }}
              >
                {item.label}
              </li>
            ))}
      </ul>
    </div>
  );
}

const Navbar = () => {
  const { showNavModal, setShowNavModal } = useContext(GlobalContext);
  const {
    user,
    isAuthUser,
    setIsAuthUser,
    setUser,
    setCurrentUpdatedProduct,
    showCartModal,
  } = useContext(GlobalContext);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (pathName !== "/admin-view/add-products") {
      setCurrentUpdatedProduct(null);
    }
  }, [pathName]);

  const handleLogOut = () => {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  };

  const isAdminView = pathName.includes("admin-view");

  return (
    <>
      <nav className="bg-[#E2C799] fixed w-full z-20  top-0 left-0 border-b border-[#C08261]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center cursor-pointer bg-gradient-to-br from-rose-400 to-red-800 text-transparent bg-clip-text">
            <span
              onClick={() => router.push("/")}
              className="slef-center text-4xl font-bold whitespace-nowrap"
            >
              GYALS
            </span>
          </div>
          <div className="flex md:order-2 gap-2">
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <button
                  onClick={() => router.push("/account")}
                  className={
                    "mt-1.5 inline-block bg-[#602424] px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
                  }
                >
                  Account
                </button>
                <button
                  onClick={() => router.push("/cart")}
                  className={
                    "mt-1.5 inline-block bg-[#602424] px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
                  }
                >
                  cart
                </button>
              </Fragment>
            ) : null}
            {user?.role === "admin" ? (
              isAdminView ? (
                <button
                  onClick={() => router.push("/")}
                  className={
                    "mt-1.5 inline-block bg-[#602424] px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
                  }
                >
                  Client View
                </button>
              ) : (
                <button
                  onClick={() => router.push("/admin-view")}
                  className={
                    "mt-1.5 inline-block bg-[#602424] px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
                  }
                >
                  Admin-Panel
                </button>
              )
            ) : null}
            {isAuthUser ? (
              <button
                onClick={handleLogOut}
                className={
                  "mt-1.5 inline-block bg-[#602424] px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
                }
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className={
                  "mt-1.5 inline-block bg-[#602424] px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
                }
              >
                login
              </button>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-[#F2ECBE] focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModal(!showNavModal)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6 text-[#C08261]"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <NavItems isModal={false} isAdminView={isAdminView} />
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
        mainContent={
          <NavItems
            setShowNavModal={setShowNavModal}
            showNavModal={showNavModal}
            router={router}
            isModalView={true}
            isAdminView={isAdminView}
          />
        }
        show={showNavModal}
        setShow={setShowNavModal}
      />
      {showCartModal && <CartModal />}
    </>
  );
};

export default Navbar;
