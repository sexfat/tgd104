//測試用
const a = (x , y) => x * y;
console.log(a(50, 10));

//套件引入
import $ from 'jquery';
import { gsap } from "gsap";

// 樣式引入
import './css/style.css';
import './sass/style.scss';


$('body').css('background-color' , '#eee');

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



