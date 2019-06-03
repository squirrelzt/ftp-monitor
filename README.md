react-router路由在Link中可以打开，通过url无法打开。用户直接向服务器请求某个子路由，会显示网页找不到的404错误。
如果开发服务器使用的是webpack-dev-server，加上–history-api-fallback参数就可以了。
解决办法：
1.如果你使用的是 node 作为服务器，将服务器端的路由最下面的配置为 *，
app.get('*/', function(req, res) {
    res.sendFile(path.join(__dirname, './../dist/index.html'));
});
注意: 新增语句要在app.use("/", mockData);之后，否则无法使用测试数据。
clean-webpack-plugin每次都会都会删除已经build的index.html,因此需要把次插件去掉。

2.如果使用java做服务器，创建ErrorPageConfig类，页面404时调整到index.html页面。