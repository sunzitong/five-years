import './canvas.less';

const cvs = document.getElementById('c');
const ctx = cvs.getContext('2d');

const draw = () => {
  cvs.width = window.innerWidth;
  cvs.height = 200;
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  ctx.beginPath();
  ctx.font = '20px mongo';
  ctx.textAlign = 'center';
  ctx.baseAlign = 'middle';
  ctx.fillText('canvas components', cvs.width / 2, 40);
  ctx.closePath();

  ctx.beginPath();
  ctx.font = '100px mongo';
  ctx.textAlign = 'center';
  ctx.baseAlign = 'middle';
  ctx.strokeText('Goyoo', cvs.width / 2, 140);
  ctx.closePath();
};

draw();

window.addEventListener('resize', draw);
