import './paySuccess.less';


const { $, wx } = window;
$(() => {
  $('.button').on('click', () => {
    wx.closeWindow();
  });
});
