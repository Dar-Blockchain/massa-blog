import { Link, useLocation, Outlet } from "react-router-dom";
import Heading2 from "./Heading/Heading2";

const subPages = [
  { href: "/dashboard", pageName: "Dashboard", emoij: "⏳" },
  { href: "/dashboard/posts", pageName: "Posts", emoij: "📕" },
  { href: "/dashboard/edit-profile", pageName: "Edit profile", emoij: "🛠" },
  { href: "/dashboard/submit-post", pageName: "Submit post", emoij: "✍" },
];

const DashboardLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className={`nc-LayoutPage relative`}>
      <div
        className={`absolute h-[400px] top-0 left-0 right-0 w-full bg-primary-100 dark:bg-neutral-800 bg-opacity-25 dark:bg-opacity-40`}
      />
      <div className="container relative pt-6 sm:pt-10 pb-16 lg:pt-20 lg:pb-28">
        {/* CONTENT */}
        <div className="p-5 mx-auto bg-white rounded-xl sm:rounded-3xl lg:rounded-[40px] shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900">
          <div className={`nc-PageDashboard`}>
            <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-24">
              <Heading2 emoji="">Dashboard</Heading2>
              <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
                View your dashboard, manage your posts, subscription and edit
                your profile.
              </span>
            </header>

            <div className="flex flex-col space-y-8 xl:space-y-0 xl:flex-row">
              {/* SIDEBAR */}

              <div className="flex-shrink-0 max-w-xl xl:w-80 xl:pe-8">
                <ul className="text-base space-y-1 text-neutral-700 dark:text-neutral-400">
                  {subPages.map(({ href, pageName, emoij }, index) => {
                    return (
                      <li key={index}>
                        <Link
                          className={`px-6 py-3 font-medium rounded-full flex items-center ${
                            pathname === href
                              ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                              : "hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                          }`}
                          to={href}
                        >
                          <span className="w-8 me-2 text-lg">{emoij}</span>
                          <span> {pageName}</span>
                        </Link>
                      </li>
                    );
                  })}

                  <li className=" border-t border-neutral-200 dark:border-neutral-700" />
                  <li>
                    <Link
                      className={`flex items-center px-6 py-3 font-medium text-red-500`}
                      to={"/"}
                    >
                      <span className="w-8 me-2 text-lg">💡</span>
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="border-t border-neutral-500 dark:border-neutral-300 md:hidden"></div>

              <div className="flex-1">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
