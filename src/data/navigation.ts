import _ from "lodash";
import { NavItemType } from "../components/Navigation/NavigationItem";

const randomId = _.uniqueId;

export const MEGAMENU_TEMPLATES: NavItemType[] = [
  // home pages ---------
  {
    id: randomId(),
    href: "/#",
    name: "Home Page",
    children: [
      { id: randomId(), href: "/", name: "Home page 1" },
      { id: randomId(), href: "/home-2", name: "Home page 2" },
      { id: randomId(), href: "/home-3", name: "Home page 3" },
      { id: randomId(), href: "/home-4", name: "Home page 4" },
      { id: randomId(), href: "/home-6", name: "Home page 5" },
      { id: randomId(), href: "/", name: "Header style 1", isNew: true },
      { id: randomId(), href: "/home-2", name: "Header style 2", isNew: true },
    ],
  },

  // single pages ---------
  {
    id: randomId(),
    href: "/single/demo-slug",
    name: "Single Pages",
    children: [
      {
        id: randomId(),
        href: "/single/demo-slug",
        name: "Single page 1",
      },
      {
        id: randomId(),
        href: "/single-2/demo-slug",
        name: "Single page 2",
      },
      {
        id: randomId(),
        href: "/single-3/demo-slug",
        name: "Single page 3",
      },
      {
        id: randomId(),
        href: "/single-4/demo-slug",
        name: "Single page 4",
      },

      {
        id: randomId(),
        href: "/single-audio/demo-slug",
        name: "Single Audio",
      },
      {
        id: randomId(),
        href: "/single-video/demo-slug",
        name: "Single Video",
      },
      {
        id: randomId(),
        href: "/single-gallery/demo-slug",
        name: "Single Gallery",
        isNew: true,
      },
    ],
  },

  // archive pages ---------
  {
    id: randomId(),
    href: "/#",
    name: "Archive Pages",
    children: [
      {
        id: randomId(),
        href: "/archive/demo-slug",
        name: "Category page",
      },
      {
        id: randomId(),
        href: "/archive-2/demo-slug",
        name: "Category audio",
      },
      {
        id: randomId(),
        href: "/archive-3/demo-slug",
        name: "Category videos",
      },
      {
        id: randomId(),
        href: "/search",
        name: "Search page",
      },
      {
        id: randomId(),
        href: "/search-2",
        name: "Search page 2",
      },
      {
        id: randomId(),
        href: "/author/demo-slug",
        name: "Author page",
      },
    ],
  },

  // others pages ----------------
  {
    id: randomId(),
    href: "/#",
    name: "Other Pages",
    children: [
      { id: randomId(), href: "/dashboard", name: "Dashboard" },
      { id: randomId(), href: "/about", name: "About" },
      { id: randomId(), href: "/contact", name: "Contact us" },
      {
        id: randomId(),
        href: "/login",
        name: "Login",
      },
      {
        id: randomId(),
        href: "/signup",
        name: "Signup",
      },
      {
        id: randomId(),
        href: "/forgot-pass",
        name: "Forgot password",
      },
      {
        id: randomId(),
        href: "/subscription",
        name: "Subscription",
      },
    ],
  },
];

const OTHER_PAGE_CHILD: NavItemType[] = [
  // archive pages ----------------
  {
    id: randomId(),
    href: "/archive/demo-slug",
    name: "Category pages",
    type: "dropdown",
    children: [
      {
        id: randomId(),
        href: "/archive/demo-slug",
        name: "Category page 1",
      },
      {
        id: randomId(),
        href: "/archive-2/demo-slug",
        name: "Category page 2",
      },
      {
        id: randomId(),
        href: "/archive-3/demo-slug",
        name: "Category page 3",
      },
    ],
  },

  // single pages ----------------
  {
    id: randomId(),
    href: "/single/demo-slug",
    name: "Single pages",
    type: "dropdown",
    children: [
      {
        id: randomId(),
        href: "/single/demo-slug",
        name: "Single 1",
      },
      {
        id: randomId(),
        href: "/single-2/demo-slug",
        name: "Single 2",
      },
      {
        id: randomId(),
        href: "/single-3/demo-slug",
        name: "Single 3",
      },
      {
        id: randomId(),
        href: "/single-4/demo-slug",
        name: "Single 4",
      },
      {
        id: randomId(),
        href: "/single-5/demo-slug",
        name: "Single 5",
      },
      {
        id: randomId(),
        href: "/single-audio/demo-slug",
        name: "Single Audio",
      },
      {
        id: randomId(),
        href: "/single-video/demo-slug",
        name: "Single Video",
      },
      {
        id: randomId(),
        href: "/single-gallery/demo-slug",
        name: "Single Gallery",
      },
    ],
  },

  // seach pages ----------------
  {
    id: randomId(),
    href: "/search",
    name: "Search Page",
    type: "dropdown",
    children: [
      {
        id: randomId(),
        href: "/search",
        name: "Search page",
      },
      {
        id: randomId(),
        href: "/search-2",
        name: "Search page 2",
      },
    ],
  },

  // author pages ----------------
  {
    id: randomId(),
    href: "/author/demo-slug",
    name: "Author page",
  },

  // dashboard pages ----------------
  {
    id: randomId(),
    href: "/dashboard",
    name: "Dashboard Page",
    type: "dropdown",
    children: [
      {
        id: randomId(),
        href: "/dashboard/edit-profile",
        name: "Edit profile page",
      },
      {
        id: randomId(),
        href: "/dashboard/posts",
        name: "Posts page",
      },
      {
        id: randomId(),
        href: "/dashboard/submit-post",
        name: "Submit post page",
      },
      {
        id: randomId(),
        href: "/dashboard/subscription",
        name: "Subscription",
      },
      {
        id: randomId(),
        href: "/dashboard/billing-address",
        name: "Billing address",
      },
    ],
  },

  // about pages ----------------
  {
    id: randomId(),
    href: "/about",
    name: "Other Pages",
    type: "dropdown",
    children: [
      {
        id: randomId(),
        href: "/about",
        name: "About",
      },
      {
        id: randomId(),
        href: "/contact",
        name: "Contact us",
      },
      {
        id: randomId(),
        href: "/login",
        name: "Login",
      },
      {
        id: randomId(),
        href: "/signup",
        name: "Signup",
      },
      {
        id: randomId(),
        href: "/forgot-pass",
        name: "Forgot password",
      },
      {
        id: randomId(),
        href: "/subscription",
        name: "Subscription",
      },
    ],
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: randomId(),
    href: "/",
    name: "Home",
  },
  {
    id: randomId(),
    href: "/authors",
    name: "Elite Authors",
  },
  {
    id: randomId(),
    href: "/dashboard",
    name: "Dashboard",
  },
  {
    id: randomId(),
    href: "/categories",
    name: "Blog",
    type: "dropdown",
    children: [
      { id: randomId(), href: "/categories/technology", name: "Technology" },
      {
        id: randomId(),
        href: "/categories/decentralization",
        name: "Decentralization",
      },
      { id: randomId(), href: "/categories/community", name: "Community" },
    ],
  },
  
];
