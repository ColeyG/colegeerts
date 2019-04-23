// anime({
//     targets: '.secSplit',
//     keyframes: [
//         { rotate: 45 },
//         { rotate: 90 },
//         { rotate: 135 },
//         { rotate: 180 },
//         { rotate: 225 },
//         { rotate: 270 },
//         { rotate: 315 },
//         { rotate: 360 },
//     ],
//     loop: true,
//     duration: 8000,
// })

anime({
    targets: '.splitBox',
    keyframes: [
        { translateY: 40 },
        { translateY: 40 },
        { translateX: 40 },
        { translateX: 40 },
        { translateY: 0 },
        { translateY: 0 },
        { translateX: 0 },
        { translateX: 0 },
    ],
    loop: true,
    duration: 8000,
    easing: 'cubicBezier(.5, .05, .1, .3)',
})