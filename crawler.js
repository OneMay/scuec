var http = require('https');
var promise = require('bluebird'); //Promise 的主要作用就是用于封装异步操作，以便根据异步操作是否成功来进行后续的操作。
/*promise对象，说白了，就是个代理，充当异步操作与回调函数之间的中介。简单的说就是：
每一个异步任务会立刻返回一个Promise对象。Promises对象有一个then方法，
允许指定回调函数，在异步任务完成后调用。*/
var cheerio = require('cheerio');
var baseUrl = ['https://www.scuec.edu.cn/s/1/t/560/p/2/list.htm', 'https://www.scuec.edu.cn/s/329/t/1619/p/2/list.htm'];
var fs = require('fs');

function crawler() {
    function filterChapters(pageList) {
        var page = [];
        http.get(baseUrl[1], function(res) {
            var html = '';
            res.on('data', function(data) {
                html += data;
            })

            res.on('end', function() {
                var $ = cheerio.load(html);
                var chapters = $('.columnStyle');
                //  console.log(chapters)

                var pageList2 = {
                    list: []
                };
                var pageList3 = {
                    list: []
                };
                var count = [];

                chapters.each(function(item, index) {

                    var chapter = $(this);
                    var chapterTitle = chapter.find('a').text();
                    var chapterHref = chapter.find('a').attr("href");
                    var chapterTime = chapter.find('.postTime').text();

                    var reg = /^\//;
                    var chapterData = {
                        chapterTitle: chapterTitle,
                        chapterHref: reg.test(chapterHref) ? 'https://www.scuec.edu.cn' + chapterHref : chapterHref,
                        chapterTime: chapterTime,
                        img: ''
                    }
                    http.get(chapterData.chapterHref, function(res) {
                        var html = '';
                        res.on('data', function(data) {
                            html += data;
                        })

                        res.on('end', function() {
                            var $ = cheerio.load(html);
                            count.push($('.single-content').find('img').attr('src'))
                            chapterData.img = 'https://www.scuec.edu.cn' + $('.single-content').find('img').attr('src');
                            if ($('.single-content').find('img').attr('src') && pageList3.list.length <= 4) {
                                pageList3.list.push(chapterData);
                            }
                            pageList2.list.push(chapterData);
                            if (count.length == 15) {

                                pageList2.list.sort((a, b) => {
                                    if (a.chapterTime > b.chapterTime) {
                                        return -1
                                    } else if (a.chapterTime < b.chapterTime) {
                                        return 1
                                    } else {
                                        return 0
                                    }
                                })
                                pageList3.list.sort((a, b) => {
                                    if (a.chapterTime > b.chapterTime) {
                                        return -1
                                    } else if (a.chapterTime < b.chapterTime) {
                                        return 1
                                    } else {
                                        return 0
                                    }
                                })
                                page.push(pageList)
                                page.push(pageList2)
                                page.push(pageList3)
                                var buf = new Buffer(page);
                                fs.writeFile('./message.json', JSON.stringify(page), function(err) {
                                    if (err) console.log('写文件操作失败');

                                });


                            }
                        })
                    }).on('error', function(e) {

                        console.log('获取课程数据出错2！');
                    })


                })

            })
        }).on('error', function(e) {

            console.log('获取课程数据出错2！');
        })


    }



    function getPageAsync() {

        http.get(baseUrl[0], function(res) {
            var html = '';

            res.on('data', function(data) {
                html += data;
            })

            res.on('end', function() {
                var $ = cheerio.load(html);
                if ($('.wz_list').find('a').text()) {
                    var chapters = $('.wz_list');
                    //  console.log(chapters)

                    var pageList = {
                        list: []
                    };
                    var count = [];
                    chapters.each(function(item, index) {

                        var chapter = $(this);
                        var chapterTitle = chapter.find('a').text();
                        var chapterHref = chapter.find('a').attr("href");
                        var reg = /^\//;
                        var chapterData = {
                            chapterTitle: chapterTitle,
                            chapterHref: reg.test(chapterHref) ? 'https://www.scuec.edu.cn' + chapterHref : chapterHref,
                            chapterTime: ''
                        }
                        var reg2 = /^(https)/;
                        var http = require('http');
                        if (reg2.test(chapterData.chapterHref)) {
                            http = require('https');
                        }
                        if (/ContentDetail\.html/.test(chapterData.chapterHref)) {

                            http.get('http://gzc.scuec.edu.cn/ReturnContent/GetContentDetail?AskString={"data":' + '"' + chapterData.chapterHref.match(/id=(.+)/)[1] + '"}', function(res) {
                                var html;
                                res.on('data', function(data) {
                                    html = data;
                                })

                                res.on('end', function() {
                                    var obj = html.toString()
                                    var reg = /(\d{4}-\d{2}-\d{2})/m;
                                    var date = new Date();
                                    chapterData.chapterTime = obj.match(reg) ? obj.match(reg)[1] : date.getFullYear() + '-' + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + ((date.getDate()) > 9 ? (date.getDate()) : '0' + (date.getDate()));
                                    count.push(chapterData.chapterTime)

                                    pageList.list.push(chapterData);
                                    if (count.length == 16) {

                                        pageList.list.sort((a, b) => {
                                            if (a.chapterTime > b.chapterTime) {
                                                return -1
                                            } else if (a.chapterTime < b.chapterTime) {
                                                return 1
                                            } else {
                                                return 0
                                            }
                                        })

                                        filterChapters(pageList)

                                    }

                                })
                            }).on('error', function(e) {

                                console.log('获取课程数据出错2！');
                            })
                        } else {
                            http.get(chapterData.chapterHref, function(res) {
                                var html = '';
                                res.on('data', function(data) {
                                    html += data;
                                })

                                res.on('end', function() {
                                    var $ = cheerio.load(html);
                                    var date = /(\d{4}-\d{2}-\d{2})/g;
                                    if ($('.description').text()) {
                                        var str = $('.description').text()
                                        chapterData.chapterTime = str.match(date)[0];
                                        count.push(chapterData.chapterTime)
                                    } else {
                                        var str = $('#articinfo').text() || $("#th_content>h4").text()||$(".description td").text();
                                        chapterData.chapterTime = str.match(date)[0];
                                        count.push(chapterData.chapterTime)
                                    }

                                    pageList.list.push(chapterData);
                                    if (count.length == 15) {

                                        pageList.list.sort((a, b) => {
                                            if (a.chapterTime > b.chapterTime) {
                                                return -1
                                            } else if (a.chapterTime < b.chapterTime) {
                                                return 1
                                            } else {
                                                return 0
                                            }
                                        })

                                        filterChapters(pageList)

                                    }

                                })
                            }).on('error', function(e) {

                                console.log('获取课程数据出错2！');
                            })
                        }



                    })
                }

            })
        }).on('error', function(e) {

            console.log('获取课程数据出错！');
        })

    }
    getPageAsync()


}

module.exports = crawler;
