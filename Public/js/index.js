/**
 * Created by zgfeng on 2016/5/23.
 */
var btnEdit             =       $('#btn-edit'),
    btnLogout           =       $('#btn-logout'),
    edit                =       $('#edit'),
    editId              =       $('#edit-id'),
    editAccounts        =       $('#edit-accounts'),
    editPassword        =       $('#edit-password'),
    editNotPassword     =       $('#edit-notpassword');

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
                switch (node.text)
                {
                    case '登录帐号' :
                        $('#user-add').dialog('destroy');
                        $('#user-edit').dialog('destroy');
                        break;
                    case '职位部门' :
                        $('#post-add').dialog('destroy');
                        $('#post-edit').dialog('destroy');
                        break;
                }
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

//登出系统
btnLogout.click(function () {
    $.messager.confirm('操作提醒', '是否退出系统！', function (flag) {
        if (flag)
        {
            $.messager.progress({
                text : '登出系统中...',
            });

            location.href = ThinkPHP['MODULE'] + '/Login/logout';
        }
    });
});

//点击弹出修改密码面板
btnEdit.click(function () {
    edit.dialog('open');
});

$(function () {
    //修改密码面板
    edit.dialog({
        title : '修改密码',
        width: 400,
        height: 280,
        iconCls : 'icon-edit',
        closed: true,
        modal : true,
        maximizable : true,
        buttons:[
            {
                text : '保存',
                size : 'large',
                iconCls : 'icon-accept',
                handler : function ()
                {
                    if (edit.form('validate'))
                    {
                        $.ajax({
                            url : ThinkPHP['MODULE'] + '/User/editPassword',
                            type : 'POST',
                            data : {
                                id : editId.val(),
                                password : editPassword.val(),
                                notPassword : editNotPassword.val()
                            },
                            beforeSend : function ()
                            {
                                $.messager.progress({
                                    text : '正在尝试保存...'
                                })
                            },
                            success : function (data)
                            {
                                $.messager.progress('close');
                                if (data > 0)
                                {
                                    $.messager.show({
                                        title : '操作提示',
                                        msg : '修改密码成功'
                                    });
                                    edit.form('reset');
                                    edit.dialog('close');
                                    $.messager.alert('操作提醒', '密码修改成功，请重新登录！', 'info', function () {
                                        location.href = ThinkPHP['MODULE'] + '/Login/logout';
                                    });
                                } else {
                                    $.messager.alert('修改密码失败', '密码没有被被修改！', 'warning', function () {
                                        editPassword.textbox('textbox').select();
                                    });
                                }
                            }
                        });
                    }
                }
            },{
                text : '取消',
                size : 'large',
                iconCls : 'icon-cross',
                handler : function ()
                {
                    edit.dialog('close');
                }
            }],
        onClose : function ()
        {
            edit.form('reset');
            edit.dialog('center');
        }
    });

    //帐号
    editAccounts.textbox({
        width : 220,
        height : 32,
        disabled : true
    });

    //密码
    editPassword.textbox({
        width : 220,
        height : 32,
        required : true,
        validType : 'length[6,30]',
        missingMessage : '请修改帐号密码',
        invalidMessage : '帐号密码6-30位'
    });

    //确认密码
    editNotPassword.textbox({
        width : 220,
        height : 32,
        required : true,
        validType : 'equals["#edit-password"]',
        missingMessage : '请确认帐号密码',
        invalidMessage : '确认密码和密码不一致'
    });
});

//检查一个字段是否和另一个字段相同
$.extend($.fn.validatebox.defaults.rules, {
    equals: {
        validator: function(value,param){
            return value == $(param[0]).val();
        },
        message: '密码和密码确认必须一致'
    }
});