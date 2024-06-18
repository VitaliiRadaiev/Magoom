// let paintingPreview = document.querySelector('[data-home-intro]');
// if (paintingPreview) {

//     //let myPanel = paintingPreview.querySelector('.home-intro__row-1');
//     let myPanel = paintingPreview;
//     let subpanel = paintingPreview.querySelector('.home-intro__title--desk');
//     let parent = paintingPreview;

//     myPanel.onmousemove = transformPanel;
//     myPanel.onmouseenter = handleMouseEnter;
//     myPanel.onmouseleave = handleMouseLeave;

//     let mouseX, mouseY;

//     let transformAmount = 2;

//     function transformPanel(mouseEvent) {
//         mouseX = mouseEvent.pageX;
//         mouseY = mouseEvent.pageY;

//         const centerX = myPanel.offsetLeft + myPanel.clientWidth / 2;
//         const centerY = myPanel.offsetTop + myPanel.clientHeight / 2;

//         const percentX = (mouseX - centerX) / (myPanel.clientWidth / 2);
//         const percentY = -((mouseY - centerY) / (myPanel.clientHeight / 2));

//         //subpanel.style.transform = "perspective(400px) rotateY(" + percentX * transformAmount + "deg) rotateX(" + percentY * transformAmount + "deg)";
//         gsap.to(subpanel, 1, {
//             transformPerspective: 400,
//             rotateY: percentX * transformAmount,
//             rotateX: percentY * transformAmount,
//         });
//     }

//     function handleMouseEnter() {
//         parent.classList.add('hover');

//         setTimeout(() => {
//             subpanel.style.transition = "";
//         }, 100);
//         //subpanel.style.transition = "transform 0.1s";
//     }

//     function handleMouseLeave() {
//         parent.classList.remove('hover');
//         //subpanel.style.transition = "transform 0.1s";
//         setTimeout(() => {
//             subpanel.style.transition = "";
//         }, 100);

//         //subpanel.style.transform = "perspective(400px) rotateY(0deg) rotateX(0deg)";
//         gsap.to(subpanel, 1, {
//             transformPerspective: 400,
//             rotateY: 0,
//             rotateX: 0,
//         });
//     }
// }