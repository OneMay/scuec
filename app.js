const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa2-cors');
var http = require('http');
var crawler = require('./crawler')
const app = new Koa();
app.use(cors());
router.get('/page', async(ctx, next) => {
    return new Promise(function(resolve, reject) { //关键啊，文档中居然没有 
        crawler(resolve, next, ctx)

    });
}, function(ctx, next) {
    ctx.body.message = ctx.body.message;
});


app.use(router.routes());
app.listen(8070);
console.log('app started at port 8070...');