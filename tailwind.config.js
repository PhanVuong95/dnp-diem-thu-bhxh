module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  },
  theme: {
    extend: {
      colors: {
        warning: "#FAAD14",
      },
    },
  },
  safelist: ["bg-[#FAAD14]"],
};
