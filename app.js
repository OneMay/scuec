const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa2-cors');
var http = require('http');
var crawler = require('./crawler');
var fs = require('fs');
var file = './message.json';
const app = new Koa();
app.use(cors());
setInterval(crawler, 3000000);//5Сʱ
router.get('/page', async(ctx, next) => {
     const ip = ctx.req.headers['x-forwarded-for'] || ctx.req.headers['x-real-ip'] ||
           ctx.req.connection.remoteAddress ||
           ctx.req.socket.remoteAddress ||
           ctx.req.connection.socket.remoteAddress;
    return new Promise(function(resolve, reject) {
        fs.readFile(file, 'utf8', function(err, data) {
            var page = JSON.parse(data.toString());
            //ctx.body = { message: page ,ip:ip }
            ctx.body = `<div>{"message":[{"list":[{"chapterTitle":"中南民族大学关于2018年端午节放假安排的通知","chapterHref":"https://www.scuec.edu.cn/s/1/t/560/02/84/info131716.htm","chapterTime":"2018-06-06"},{"chapterTitle":"关于举行南湖大讲坛第四十九讲的通知","chapterHref":"https://www.scuec.edu.cn/s/1/t/560/01/3e/info131390.htm","chapterTime":"2018-05-31"},{"chapterTitle":"关于选拔2019年第七届世界军人运动会第一批志愿者的通知","chapterHref":"https://www.scuec.edu.cn/s/1/t/560/01/47/info131399.htm","chapterTime":"2018-05-31"},{"chapterTitle":"管理学院2018年“优秀大学生夏令营”活动公告","chapterHref":"https://www.scuec.edu.cn/s/45/t/1265/00/19/info131097.htm","chapterTime":"2018-05-24"},{"chapterTitle":"中南民族大学学生食堂改造工程公开招标公告","chapterHref":"http://gzc.scuec.edu.cn/AssertMgt/ContentDetail.html?id=5af24dc7918413035cf50612","chapterTime":"2018-05-09"},{"chapterTitle":"中南民族大学2018年5月“校领导接待日”预告","chapterHref":"https://www.scuec.edu.cn/s/1/t/560/fc/99/info130201.htm","chapterTime":"2018-05-08"},{"chapterTitle":"中南民族大学学生食堂改造工程公开招标公告","chapterHref":"http://gzc.scuec.edu.cn/AssertMgt/ContentDetail.html?id=5af0f5d391841307b4a6ccff","chapterTime":"2018-05-08"},{"chapterTitle":"中南民族大学2018年预备师资岗位招聘公告","chapterHref":"http://www.scuec.edu.cn/s/19/t/912/f9/64/info129380.htm","chapterTime":"2018-05-07"},{"chapterTitle":"关于组织收听收看纪念马克思诞辰200周年大会的通知","chapterHref":"https://www.scuec.edu.cn/s/1/t/560/fc/13/info130067.htm","chapterTime":"2018-05-03"},{"chapterTitle":"关于转发《关于组织开展第五届寻找“洪山好人”活动的方案》的通知","chapterHref":"https://www.scuec.edu.cn/s/1/t/560/fb/0a/info129802.htm","chapterTime":"2018-04-28"},{"chapterTitle":"中南民族大学非事业编制工作人员招聘启事","chapterHref":"https://www.scuec.edu.cn/s/19/t/912/f9/dd/info129501.htm","chapterTime":"2018-04-27"},{"chapterTitle":"关于选拔我校参加第五期湖北省青年马克思主义者培养工程学员的通知","chapterHref":"https://www.scuec.edu.cn/s/1/t/560/fa/09/info129545.htm","chapterTime":"2018-04-25"},{"chapterTitle":"关于遴选学生工作骨干赴中国台湾地区培训研修的通知","chapterHref":"https://www.scuec.edu.cn/s/1/t/560/f8/53/info129107.htm","chapterTime":"2018-04-19"},{"chapterTitle":"中南民族大学物业服务外包项目（第3包、第4包、第5包）公开招标公告","chapterHref":"http://gzc.scuec.edu.cn/AssertMgt/ContentDetail.html?id=5ad5403e9184130c84e70f6b","chapterTime":"2018-04-17"},{"chapterTitle":"中南民族大学物业服务外包项目（第1包、第2包）公开招标公告","chapterHref":"http://gzc.scuec.edu.cn/AssertMgt/ContentDetail.html?id=5ad541ea9184130c84e70f70","chapterTime":"2018-04-17"},{"chapterTitle":"中南民族大学校区电缆沟维修改造工程 （第三标段）公开招标公告","chapterHref":"http://gzc.scuec.edu.cn/AssertMgt/ContentDetail.html?id=5ad401aa9184130a08aeedf5","chapterTime":"2018-04-16"}]},{"list":[{"chapterTitle":"我校图书馆学术能力进入全国本科院校图书馆排名前100强","chapterHref":"https://www.scuec.edu.cn/s/329/t/1619/02/65/info131685.htm","chapterTime":"2018-06-05","img":"https://www.scuec.edu.cnundefined"},{"chapterTitle":"南湖大讲坛第四十九讲举行 鲁成文教授漫谈“诗乐共辉”","chapterHref":"https://www.scuec.edu.cn/s/329/t/1619/02/6e/info131694.htm","chapterTime":"2018-06-05","img":"https://www.scuec.edu.cnundefined"},{"chapterTitle":"学校召开2018年财务工作会议","chapterHref":"https://www.scuec.edu.cn/s/329/t/1619/02/28/info131624.htm","chapterTime":"2018-06-04","img":"https://www.scuec.edu.cnundefined"},{"chapterTitle":"校工会举办“榜样的力量”专题访谈","chapterHref":"https://www.scuec.edu.cn/s/329/t/1619/01/c3/info131523.htm","chapterTime":"2018-06-04","img":"https://www.scuec.edu.cn/picture/article/329/20/98/b27a02274e558c26203abae72cb6/a9fa9583-72ca-4f07-9398-a64b2234d61c.jpg"},{"chapterTitle":"第10期西藏自治区县处级少数民族干部培训班在我校开班","chapterHref":"https://www.scuec.edu.cn/s/329/t/1619/02/29/info131625.htm","chapterTime":"2018-06-04","img":"https://www.scuec.edu.cn/picture/article/329/49/a7/0b6afd7f4786b98a596d3dac6d66/412bf5ab-ab72-4625-b161-fa0d2c852887.jpg"},{"chapterTitle":"湖北省教育基金会向我校捐赠30万元","chapterHref":"https://www.scuec.edu.cn/s/329/t/1619/01/5b/info131419.htm","chapterTime":"2018-06-01","img":"https://www.scuec.edu.cnundefined"},{"chapterTitle":"校党委中心组（扩大）举行理论学习会","chapterHref":"https://www.scuec.edu.cn/s/329/t/1619/01/83/info131459.htm","chapterTime":"2018-06-01","img":"https://www.scuec.edu.cn/picture/article/329/2c/45/0f7fe2b24da893c0a76dfc7fa72d/2e533112-bdc7-4c26-aaa9-4c466b379725.jpg"},{"chapterTitle":"天津校友会代表来校交流访问","chapterHref":"https://www.scuec.edu.cn/s/329/t/1619/01/82/info131458.htm","chapterTime":"2018-06-01","img":"https://www.scuec.edu.cnundefined"},{"chapterTitle":"学校召开2018年本预科招生委员会工作会议","chapterHref":"https://www.scuec.edu.cn/s/329/t/1619/01/80/info131456.htm","chapterTime":"2018-06-01","img":"https://www.scuec.edu.cnundefined"},{"chapterTitle":"校党委书记边境参加生科学院2018届毕业生座谈会","chapterHref":"https://www.scuec.edu.cn/s/329/t/1619/01/10/info131344.htm","chapterTime":"2018-05-30","img":"https://www.scuec.edu.cnundefined"},{"chapterTitle":"第十五届毕业生论坛求索梦未停","chapterHref":"https://www.scuec.edu.cn/s/329/t/1619/01/1c/info131356.htm","chapterTime":"2018-05-29","img":"https://www.scuec.edu.cn/picture/article/329/9d/04/61036cf749e5b7e1ad1e3d8dd9e2/cf1b204e-e8c4-4fde-8396-acee6625a9c8.jpg"},{"chapterTitle":"“毛泽东诗词与文化自信”学术研讨会暨中国毛泽东诗词研究会第十七届年会在我校召开","chapterHref":"https://www.scuec.edu.cn/s/329/t/1619/00/b3/info131251.htm","chapterTime":"2018-05-28","img":"https://www.scuec.edu.cn/picture/article/329/73/4e/5d85bf2546ab97aa341181abcfac/7412b536-c6fa-4a15-86c4-5ae924017208.jpg"},{"chapterTitle":"“我选湖北▪新浙商”主题招聘会在我校举行","chapterHref":"https://www.scuec.edu.cn/s/329/t/1619/00/a1/info131233.htm","chapterTime":"2018-05-28","img":"https://www.scuec.edu.cn/picture/article/329/9d/12/fbfcb49b42feb50e8c2217a06f80/808a2ddb-68b3-4d75-925e-0307f79414c7.jpg"},{"chapterTitle":"我校主持承担的国家科技支撑计划项目“菱锰矿高效综合利用及污染治理关键技术及示范”结项","chapterHref":"https://www.scuec.edu.cn/s/329/t/1619/00/68/info131176.htm","chapterTime":"2018-05-25","img":"https://www.scuec.edu.cnundefined"},{"chapterTitle":"学校召开就业创业工作专题会议","chapterHref":"https://www.scuec.edu.cn/s/329/t/1619/00/75/info131189.htm","chapterTime":"2018-05-25","img":"https://www.scuec.edu.cnundefined"}]},{"list":[{"chapterTitle":"第10期西藏自治区县处级少数民族干部培训班在我校开班","chapterHref":"https://www.scuec.edu.cn/s/329/t/1619/02/29/info131625.htm","chapterTime":"2018-06-04","img":"https://www.scuec.edu.cn/picture/article/329/49/a7/0b6afd7f4786b98a596d3dac6d66/412bf5ab-ab72-4625-b161-fa0d2c852887.jpg"},{"chapterTitle":"校工会举办“榜样的力量”专题访谈","chapterHref":"https://www.scuec.edu.cn/s/329/t/1619/01/c3/info131523.htm","chapterTime":"2018-06-04","img":"https://www.scuec.edu.cn/picture/article/329/20/98/b27a02274e558c26203abae72cb6/a9fa9583-72ca-4f07-9398-a64b2234d61c.jpg"},{"chapterTitle":"校党委中心组（扩大）举行理论学习会","chapterHref":"https://www.scuec.edu.cn/s/329/t/1619/01/83/info131459.htm","chapterTime":"2018-06-01","img":"https://www.scuec.edu.cn/picture/article/329/2c/45/0f7fe2b24da893c0a76dfc7fa72d/2e533112-bdc7-4c26-aaa9-4c466b379725.jpg"},{"chapterTitle":"“毛泽东诗词与文化自信”学术研讨会暨中国毛泽东诗词研究会第十七届年会在我校召开","chapterHref":"https://www.scuec.edu.cn/s/329/t/1619/00/b3/info131251.htm","chapterTime":"2018-05-28","img":"https://www.scuec.edu.cn/picture/article/329/73/4e/5d85bf2546ab97aa341181abcfac/7412b536-c6fa-4a15-86c4-5ae924017208.jpg"},{"chapterTitle":"“我选湖北▪新浙商”主题招聘会在我校举行","chapterHref":"https://www.scuec.edu.cn/s/329/t/1619/00/a1/info131233.htm","chapterTime":"2018-05-28","img":"https://www.scuec.edu.cn/picture/article/329/9d/12/fbfcb49b42feb50e8c2217a06f80/808a2ddb-68b3-4d75-925e-0307f79414c7.jpg"}]}],"ip":"59.68.40.54"}`+` <div slot="footer" style="text-align:center">
            <p>
      @2019 雨飞燕微双
      <!--<a href="//www.miitbeian.gov.cn" target="_blank" class="beian"
                >蜀ICP备17011354号</a
              >--!>
            </p>
          </div>`;
            resolve(next())
        });

    });
}, function(ctx, next) {
    ctx.body.message = ctx.body.message;
});


app.use(router.routes());
app.listen(8070);
console.log('app started at port 8070...');
