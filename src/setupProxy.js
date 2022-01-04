const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function(app){
  app.use(
    createProxyMiddleware('/registerUser',{
      target: 'http://agmonitor-api.dev:8000',
      changeOrigin:true,
    })
  )
}
