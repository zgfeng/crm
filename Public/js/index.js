/**
 * Created by zgfeng on 2016/5/23.
 */
//内容切换选项卡
$('#tabs').tabs({
    fit: true,
    border: false,
    onContextMenu : function (e,title,index)
    {
        e.preventDefault();

        var _this = this;
        var menu = $('#menu');

        //跟随鼠标定位
        menu.menu('show',{
            top : e.pageY,
            left : e.pageX
        });

        //起始标签禁用关闭
        if (index == 0)
        {
            menu.menu('disableItem',$('.closecur')[0]);
        } else {
            menu.menu('enableItem',$('.closecur')[0]);
        }

        //三个关闭
        menu.menu({
            onClick : function (item)
            {
                var tablist = $(_this).tabs('tabs');
                switch (item.text)
                {
                    case '关闭' :
                        $(_this).tabs('close',index);
                        break;
                    case '关闭所有' :
                        for (var i = tablist.length; i>0; i--)
                        {
                            $(_this).tabs('close',i);
                        }
                        break;
                    case '关闭其他所有' :
                        for (var i = tablist.length; i>0;i--)
                        {
                            if (i != index)
                            {
                                $(_this).tabs('close',i);
                            }
                        }
                        $(_this).tabs('select',1);
                        break;
                }
            }

        });
    }
});

//左侧树型导航
$('#tree').tree({
    url : ThinkPHP['MODULE'] + '/Index/getTree',
    lines : true,
    animate : true,
    //点击菜单实现业务模块响应
    onClick : function (node)
    {
        var tabs = $('#tabs');
        //判断是否存在模块链接
        if (node.url)
        {
            //判断是否已经打开标签页
            if (tabs.tabs('exists',node.text))
            {
                //页面已存在，就实现选中
                tabs.tabs('select',node.text)
            } else {
                //页面不存在，就给选项卡添加标签
                tabs.tabs('add',{
                    title : node.text,
                    closable : true,
                    iconCls : node.iconCls,
                    href : ThinkPHP['MODULE'] + '/' + node.url
                });
            }
        }
    }
});