/**
 * Created by Administrator on 2016/5/23.
 */
//内容切换选项卡
$('#tabs').tabs({
    fit: true,
    border: false
});

//左侧树型导航
$('#tree').tree({
    url : ThinkPHP['MODULE'] + '/Index/getTree',
    lines : true,
    animate : true
});