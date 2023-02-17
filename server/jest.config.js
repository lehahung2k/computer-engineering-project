module.exports = {
  roots: ["<rootDir>/src"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.js?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  reporters: [
    //Các dạng báo cáo đầu ra
    "default", // Báo cáo dạng commandline cơ bản
    [
      "jest-html-reporters",
      {
        // Báo cáo dạng web rất đẹp
        publicPath: "./jest-report",
        filename: "index.html",
        openReport: true,
      },
    ],
  ],
  verbose: false, //Hiển thi chi tiết dữ liệu từng bộ test
};
