const PageData = {
  home: {
    title: "Welcome to Hostily",
    text: "Discover the best hotel deals around the world.",
  },
  about: {
    title: "About Us",
    text: "Learn more about our mission and values.",
  },
  contact: {
    title: "Contact Us",
    text: "Get in touch with our support tech team.",
  },
  rooms: {
    title: "Our Rooms",
    text: "Explore our luxurious room options.",
  },
  blog: {
    title: "Latest News",
    text: "Stay updated with our latest blogs and articles.",
  },
  members: {
    title: "Meet Our Team",
    text: "Discover the professionals delivering exceptional service and refined hospitality.",
  },
  singleroom: {
    title: "Single Room Details",
    text: "Experience the comfort and luxury of our single rooms.",
  },
  blogSingle: {
    title: "Blog Post",
    text: "Read our latest blog post and stay informed.",
  },
};

export function getPageData() {
  const path = window.location.pathname.split("/").pop().replace(".html", "");
  return PageData[path] || PageData["home"]; // Default to Home if no match
}
