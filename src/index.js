const a = (x , y) => x * y;
console.log(a(50, 10));

import $ from 'jquery';
import { gsap } from "gsap";
import './css/style.css';




$('body').css('background-color' , '#f20');

gsap.to('.box' , {
    x: 400,
    y: 500,
    width: '300px',
    duration: 1,
    rotation :  360,
    delay: .3,
    repeat: -1,
    yoyo : true,
    repeatDelay: .3

})



