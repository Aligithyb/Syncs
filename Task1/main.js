const m = document.querySelector('.m');
const menulist = document.querySelector('nav ul');
const bar = document.querySelector('nav');
const banimage = document.querySelector('.centerdedimg');
const collimg = document.querySelectorAll('.collection_card');
console.log(collimg[0].id);
function setdisplay(){
    if(window.innerWidth>768){
        menulist.style.display = 'flex';
    }else {
        menulist.style.display='none';
    }
}
setdisplay();
window.addEventListener('resize',setdisplay);
m.addEventListener('click',function (){
    if (menulist.style.display=='none'){
        menulist.style.display='flex';

    }else {
        menulist.style.display='none';

    }


});
const threshold = 10;
window.addEventListener('scroll',()=>{
    if(window.scrollY >=threshold){
        bar.classList.add('scrolled');
    }else {
        bar.classList.remove('scrolled')
    }
});
for(let i=0;i<collimg.length;i++){
    collimg[i].addEventListener('click',()=>{
        banimage.src = `${collimg[i].id}`
    });
}
function onYouTubeIframeAPIReady() {
    new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'nkyof8coGvk',
        playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0
        },
    });
}
onYouTubeIframeAPIReady();


