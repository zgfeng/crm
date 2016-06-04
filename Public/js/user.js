/**
 * Created by 张光锋 on 2016/6/4.
 */
var user                    =   $('#user'),
    userAdd                 =   $('#user-add'),
    userAddAccounts         =   $('#user-add-accounts'),
    userAddPassword         =   $('#user-add-password'),
    userEdit                =   $('#user-edit'),
    userEditId              =   $('#user-edit-id'),
    userEditAccounts        =   $('#user-edit-accounts'),
    userEditPassword        =   $('#user-edit-password'),
    userEditState           =   $('#user-edit-state'),
    userEditStateButton     =   $('#user-edit-state-button'),
    userSearchKeywords      =   $('#user-search-keywords'),
    userSearchDateType      =   $('#user-search-date-type'),
    userSearchDateFrom      =   $('#user-search-date-from'),
    userSearchDateTo        =   $('#user-search-date-to'),
    userSearchState         =   $('#user-search-state'),
    userTool                =   $('#user-tool'),
    randAdd                 =   $('.rand-add'),
    randEdit                =   $('.rand-edit'),
    userDate,
    userOpt;


//浏览器改变时触发
$(window).resize(function () {
    userAdd.dialog('center');
});


//表格数据列表
user.datagrid({
    url : ThinkPHP['MODULE'] + '/User/getList',
    fit : true,
    fitColumns : true,
    rownumbers : true,
    border : false,
    sortName : 'create_time',
    sortOrder : 'DESC',
    toolbar : '#user-tool',
    pagination : true,
    pageSize : 20,
    pageList : [10, 20, 30, 40, 50],
    pageNumber : 1,
    columns : [[
        {
            field : 'id',
            title : '自动编号',
            width : 100,
            checkbox : true
        },
        {
            field : 'accounts',
            title : '登录帐号',
            width : 100
        },
        {
            field : 'last_login_time',
            title : '登录时间',
            width : 100,
            sortable : true
        },
        {
            field : 'last_login_ip',
            title : '登录IP',
            width : 100
        },
        {
            field : 'login_count',
            title : '登录次数',
            width : 80,
            sortable : true
        },
        {
            field : 'create_time',
            title : '创建时间',
            width : 100,
            sortable : true
        },
        {
            field : 'state',
            title : '状态',
            width : 60,
            sortable : true,
            fixed : true,
            formatter : function (value, row)
            {
                var state = '';

                switch (value)
                {
                    case '正常' :

                        state = '<a href="javascript:void(0)" user-id="' + row.id + '" user-state="正常" class="user-state user-state-1" style="height: 18px; margin-left: 11px;"></a>';

                        break;

                    case '冻结' :

                        state = '<a href="javascript:void(0)" user-id="' + row.id + '" user-state="冻结" class="user-state user-state-2" style="height: 18px; margin-left: 11px;"></a>';

                        break;
                }

                return state;
            }
        }
    ]],
    onLoadSuccess : function ()
    {
        $('.user-state-1').linkbutton({
            iconCls : 'icon-ok',
            plain : true
        });
        $('.user-state-2').linkbutton({
            iconCls : 'icon-lock',
            plain : true
        });

        $('.user-state').click(function () {

            var id    = $(this).attr('user-id'),
                state = $(this).attr('user-state');

            switch (state)
            {
                case '正常' :

                    $.messager.confirm('确认', '冻结帐号？', function (flag) {

                        if (flag)
                        {
                            $.ajax({
                                url : ThinkPHP['MODULE'] + '/User/state',
                                type : 'POST',
                                data : {
                                    id : id,
                                    state : '冻结'
                                },
                                beforeSend : function ()
                                {
                                    $.messager.progress({
                                        text : '正在处理中...'
                                    })
                                    //user.datagrid('loading');
                                },
                                success : function (data)
                                {
                                    $.messager.progress('close');
                                    //user.datagrid('loaded');
                                    if (data > 0)
                                    {
                                        user.datagrid('reload');
                                        $.messager.show({
                                            title : '操作提醒',
                                            msg : '帐号冻结成功！'
                                        })
                                    } else {
                                        $.messager.alert('冻结失败', '未知原因导致冻结失败！', 'warning');
                                    }
                                }
                            });
                        }
                    });

                    break;

                case '冻结' :
                    $.messager.confirm('确认', '通过帐号？', function (flag) {

                        if (flag)
                        {
                            $.ajax({
                                url : ThinkPHP['MODULE'] + '/User/state',
                                type : 'POST',
                                data : {
                                    id : id,
                                    state : '正常'
                                },
                                beforeSend : function ()
                                {
                                    $.messager.progress({
                                        text : '正在处理中...'
                                    });
                                    //user.datagrid('loading');
                                },
                                success : function (data)
                                {
                                    $.messager.progress('close');
                                    //user.datagrid('loaded');
                                    if (data > 0)
                                    {
                                        user.datagrid('reload');
                                        $.messager.show({
                                            title : '操作提醒',
                                            msg : '帐号审核通过成功！'
                                        })
                                    } else {
                                        $.messager.alert('审核通过失败', '未知原因导致审核通过失败！', 'warning');
                                    }
                                }
                            });
                        }
                    });
                    break;
            }

        });
    }
});


//新增面板
userAdd.dialog({
    title : '新增帐号',
    width: 400,
    height: 300,
    iconCls : 'icon-add',
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
                if (userAdd.form('validate'))
                {
                    $.ajax({
                        url : ThinkPHP['MODULE'] + '/User/register',
                        type : 'POST',
                        data : {
                            accounts : $.trim(userAddAccounts.val()),
                            password : userAddPassword.val()
                        },
                        beforeSend : function ()
                        {
                            $.messager.progress({
                                text : '正在处理中...'
                            })
                        },
                        success : function (data)
                        {
                            $.messager.progress('close');
                            if (data > 0)
                            {
                                $.messager.show({
                                    title : '操作提示',
                                    msg : '添加成功'
                                });
                                userAdd.dialog('close');
                                user.datagrid('load');
                            } else if (data == -1) {
                                $.messager.alert('添加失败', '帐号名称被占用！', 'warning', function () {
                                    userAddAccounts.textbox('textbox').select();
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
                userAdd.dialog('close');
            }
        }],
    onClose : function ()
    {
        userAdd.form('reset');
        userAdd.dialog('center');
    }
});

//修改面板
userEdit.dialog({
    title : '修改帐号',
    width: 400,
    height: 300,
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
                if (userEdit.form('validate'))
                {
                    $.ajax({
                        url : ThinkPHP['MODULE'] + '/User/update',
                        type : 'POST',
                        data : {
                            id : userEditId.val(),
                            password : userEditPassword.val(),
                            state : userEditState.val()
                        },
                        beforeSend : function ()
                        {
                            $.messager.progress({
                                text : '正在处理中...'
                            })
                        },
                        success : function (data)
                        {
                            $.messager.progress('close');
                            if (data > 0)
                            {
                                $.messager.show({
                                    title : '操作提示',
                                    msg : '修改成功'
                                });
                                userEdit.dialog('close');
                                user.datagrid('reload');
                            } else {
                                $.messager.alert('修改失败', '没有任何数据被修改！', 'warning', function () {
                                    userEditPassword.textbox('textbox').select();
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
                userEdit.dialog('close');
            }
        }],
    onClose : function ()
    {
        userEdit.form('reset');
        userEdit.dialog('center');
    }
});

//工具条操作
userOpt = {
    add : function ()
    {
        userAdd.dialog('open');
    },
    edit : function ()
    {
        var rows = user.datagrid('getSelections');
        if (rows.length == 1)
        {
            userEdit.dialog('open');
            $.ajax({
                url : ThinkPHP['MODULE'] + '/User/getOne',
                type : 'POST',
                data : {
                    id : rows[0].id
                },
                beforeSend : function ()
                {
                    $.messager.progress({
                        text : '正在处理中...'
                    })
                },
                success : function (data)
                {
                    $.messager.progress('close');
                    if (data)
                    {
                        userEdit.form('load', {
                            id : data.id,
                            accounts : data.accounts
                        });
                        if (data.state == '正常')
                        {
                            userEditStateButton.switchbutton('check');
                            userEditState.val('正常');
                        } else {
                            userEditStateButton.switchbutton('uncheck');
                            userEditState.val('冻结');
                        }
                    } else {
                        $.messager.alert('操作警告', '没有获取到相应数据！', 'warning');
                    }
                }
            });
        } else {
            $.messager.alert('操作警告', '编辑记录必须只能选定一条数据！', 'warning');
        }
    },
    remove : function ()
    {
        var rows = user.datagrid('getSelections');
        if (rows.length > 0)
        {
            $.messager.confirm('确认操作', '您真的要删除所选的 <strong>' + rows.length + '</strong> 条记录吗？', function (flag) {
                if (flag) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i ++) {
                        ids.push(rows[i].id);
                    }

                    $.ajax({
                        url : ThinkPHP['MODULE'] + '/User/remove',
                        type : 'POST',
                        data : {
                            ids : ids.join(',')
                        },
                        beforeSend : function ()
                        {
                            $.messager.progress({
                                text : '正在处理中...'
                            });
                            //user.datagrid('loading');
                        },
                        success : function (data)
                        {
                            $.messager.progress('close');
                            //user.datagrid('loaded');
                            if (data)
                            {
                                user.datagrid('reload');
                                $.messager.show({
                                    title : '操作提醒',
                                    msg : data + '条数据被成功删除！'
                                })
                            } else {
                                $.messager.alert('删除失败', '没有删除任何数据！', 'warning');
                            }
                        }
                    });
                }
            });
        } else {
            $.messager.alert('操作警告', '删除记录必须一条或以上的数据！', 'warning');
        }
    },
    redo : function ()
    {
        user.datagrid('unselectAll');
    },
    reload : function ()
    {
        user.datagrid('reload');
    },
    search : function ()
    {
        if (userTool.form('validate'))
        {
            user.datagrid('load', {
                keywords : userSearchKeywords.textbox('getValue'),
                dateType : userSearchDateType.combobox('getValue'),
                dateFrom : userSearchDateFrom.datebox('getValue'),
                dateTo : userSearchDateTo.datebox('getValue'),
                state : userSearchState.combobox('getValue')
            });
        }
    },
    reset : function ()
    {
        userSearchKeywords.textbox('clear');
        userSearchDateType.combobox('clear').combobox('disableValidation');
        userSearchDateFrom.datebox('clear');
        userSearchDateTo.datebox('clear');
        userSearchState.combobox('clear');
        this.search();
        user.datagrid('sort', {
            sortName : 'create_time',
            sortOrder : 'DESC'
        });
    }
};


/*查询字段区域*/
userSearchKeywords.textbox({
    width : 150,
    prompt : '帐号'
});

//时间类型旋转
userSearchDateType.combobox({
    width : 100,
    editable : false,
    prompt : '时间类型',
    data : [{
        id : 'create_time',
        text : '创建时间'
    }],
    valueField : 'id',
    textFiedl : 'text',
    required : true,
    novalidate : true,
    panelHeight : 'auto',
    tipPosition : 'left',
    missingMessage : '请选择时间类型'
});

//查询时间对象
userDate = {
    width : 100,
    editable : false,
    onSelect : function ()
    {
        if (userSearchDateType.combobox('enableValidation').combobox('isValid') == false)
        {
            userSearchDateType.combobox('showPanel');
        }
    }
};

//起始时间
userDate.prompt = '起始时间';
userSearchDateFrom.datebox(userDate);

//结束时间
userDate.prompt = '结束时间';
userSearchDateTo.datebox(userDate);

//审核组件
userSearchState.combobox({
    width : 70,
    editable : false,
    prompt : '状态',
    data : [{
        id : '正常',
        text : '正常'
    }, {
        id : '冻结',
        text : '冻结'
    }],
    valueField : 'id',
    textFiedl : 'text',
    panelHeight : 'auto'
});


/*表单字段区域*/

//新增帐号
userAddAccounts.textbox({
    width : 220,
    height : 32,
    required : true,
    validType : 'length[2,20]',
    missingMessage : '请输入帐号名称',
    invalidMessage : '帐号名称2-20位之间'
});

//修改帐号
userEditAccounts.textbox({
    width : 220,
    height : 32,
    disabled : true
});

//新增密码
userAddPassword.textbox({
    width : 220,
    height : 32,
    validType : 'length[6,30]',
    required : true,
    missingMessage : '请修改帐号密码',
    invalidMessage : '帐号密码6-30位之间'
});

//修改密码
userEditPassword.textbox({
    width : 220,
    height : 32,
    validType : 'length[6,30]',
    missingMessage : '请修改帐号密码',
    invalidMessage : '帐号密码6-30位之间'
});

//新增随机密码
randAdd.click(function () {
    userAddPassword.textbox('setValue', getRandPassword(8, 16));
});

//修改随机密码
randEdit.click(function () {
    userEditPassword.textbox('setValue', getRandPassword(8, 16));
});

//创建一个随机密码生成器
var getRandPassword = function (min, max)
{
    var source = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789',
        length = Math.ceil(Math.random() * (max - min) + min),
        password = '';

    for (var i = 0; i < length; i ++)
    {
        password += source.charAt(Math.ceil(Math.random() * 1000 % source.length));
    }

    return password;
};

//修改状态滑动按钮
userEditStateButton.switchbutton({
    with : 65,
    onText : '正常',
    offText : '冻结',
    onChange : function (checked)
    {
        if (checked)
        {
            userEditState.val('正常');
        } else {
            userEditState.val('冻结');
        }
    }
});