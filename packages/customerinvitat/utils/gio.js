/* eslint-disable no-undef */
const growingio = () => {
  // if (process.env.VUE_APP_ENV !== 'test') {
    var tag = ''

    !function(e, t, n, g, i) {
      e[i] = e[i] ||
      function () {
        (e[i].q = e[i].q || []).push(arguments)
      },
      n = t.createElement('script'),
      tag = t.getElementsByTagName('script')[0],
      n.async = 1,
      n.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + g, tag.parentNode.insertBefore(n, tag)
    } (window, document, 'script', 'assets.growingio.com/2.1/gio.js', 'gio')
    gio('init', 'a860ae5401443ead', {})

    gio('config', { 'hashtag': true })

    gio('send')
  // }
}
export default growingio
