export default {
  "824ec22a-1056-484d-8a1c-fd2580019ea3": {
    uuid: "824ec22a-1056-484d-8a1c-fd2580019ea3",
    question: "What is the result of the following code?",
    code:
      "var array = [1,2,3,4,5,6];\r\n\r\nfor (var i = 1; i < array.length; i+=2) {\r\n  console.log(array[i])\r\n}",
    language: "javascript",
    answers: [
      { text: "[2, 4, 6, 8, 10, 12]" },
      { text: "[1, 3, 5, 7, 9, 11, 13]" },
      { text: "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]" },
      { text: "[2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]" }
    ],
    solutions: [0]
  },
  "jfads8-1056-484d-8a1c-fd2580019ea3": {
    uuid: "jfads8-1056-484d-8a1c-fd2580019ea3",
    question: "What is the result of the following code?",
    code: 'const result = 1 + Number("2") + "3";',
    language: "javascript",
    answers: [{ text: "13" }, { text: "18" }, { text: "22" }],
    solutions: [0]
  },
  "720ec11d-1056-484d-8a1c-fd2580019ea3": {
    uuid: "720ec11d-1056-484d-8a1c-fd2580019ea3",
    question: "What does HTML stand for?",
    answers: [
      { text: "Http Transfer Modeling Language" },
      { text: "Hyper Text Markup Language" },
      { text: "Holistic Text Markup Language" }
    ],
    solutions: [1]
  },
  "6490b8ab-f5c1-4019-86f2-b6cdd3d7c6ba": {
    uuid: "6490b8ab-f5c1-4019-86f2-b6cdd3d7c6ba",
    question: "Which ones are valid HTML elements?",
    answers: [
      { text: "<head>" },
      { text: "<header>" },
      { text: "<body>" },
      { text: "<feet>" },
      { text: "<foot>" },
      { text: "<footer>" }
    ],
    solutions: [1, 2, 5]
  },
  "913db727-61c5-4968-b244-fb015a1f0e74": {
    uuid: "913db727-61c5-4968-b244-fb015a1f0e74",
    question: "What is the answer to life, the universe and everything?",
    answers: [
      { text: "7" },
      { text: "21" },
      { text: "144" },
      { text: "42" },
      { text: "0" }
    ],
    solutions: [3]
  }
};
