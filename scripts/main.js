const bezier = ".64,1.53,1,1.07";

anime({
  targets: ".leftBall",
  keyframes: [{ rotate: 45 }, { rotate: 0 }, { rotate: 0 }],
  loop: true,
  easing: "cubicBezier(" + bezier + ")",
});

anime({
  targets: ".rightBall",
  keyframes: [{ rotate: 0 }, { rotate: 0 }, { rotate: -45 }, { rotate: 0 }],
  loop: true,
  easing: "cubicBezier(" + bezier + ")",
});

anime({
  targets: ".mainBall",
  keyframes: [{ rotate: 5 }, { rotate: 0 }, { rotate: -5 }, { rotate: 0 }],
  loop: true,
  easing: "cubicBezier(" + bezier + ")",
});
