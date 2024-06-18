// {
//     const footer = document.querySelector('[data-footer]');
//     if (footer) {
//         const transformWrapper = footer.querySelector('.footer__transform-wrapper');
//         if (transformWrapper && document.documentElement.clientWidth >= 992)  {
//             gsap.set(transformWrapper, { yPercent: -50 })
    
//             const uncover = gsap.timeline({ paused: true })
    
//             uncover.to(transformWrapper, { yPercent: 0, ease: 'none' });
    
//             const end = document.documentElement.clientWidth < 992
//                 ? 'bottom 10%'
//                 : `bottom ${document.documentElement.clientHeight - transformWrapper.clientHeight}`;
    
//             ScrollTrigger.create({
//                 trigger: footer.previousElementSibling,
//                 start: 'bottom bottom',
//                 end: end,
//                 animation: uncover,
//                 scrub: true,
//                 //markers: {startColor: "white", endColor: "white", fontSize: "18px", fontWeight: "bold", indent: 20}
//             })
    
//             window.addEventListener('resize', () => {
//                 ScrollTrigger.update();
//             })

//         }
//     }
// }