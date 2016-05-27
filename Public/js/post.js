/**
 * Created by zgfeng on 2016/5/24.
 */


var post                = $('#post'),
    postAdd             = $('#post-add'),
    postEdit            = $('#post-edit'),
    postAddName         = $('#post-add-name'),
    postEditId          = $('#post-edit-id'),
    postEditName        = $('#post-edit-name'),
    postSearchKeywords  = $('#post-search-keywords'),
    postSearchDateType  = $('#post-search-date-type'),
    postSearchDateFrom  = $('#post-search-date-from'),
    postSearchDateTo    = $('#post-search-date-to'),
    postTool            = $('#post-tool'),
    postDate,
    toolOpt,
    postName;


//浏览器改变时触发
$(window).resize(function () {
    postAdd.dialog('center');
});


//表格数据列表
post.datagrid({
    url         : ThinkPHP['MODULE'] + '/Post/getList',
    fit         : true,
    fitColumns  : true,
    rownumbers  : true,
    border      : false,
    sortName    : 'create_time',
    sortOrder   : 'DESC',
    toolbar     : '#post-tool',
    pagination  : true,
    pageSize    : 20,
    pageList    : [10, 20, 30, 40, 50],
    pageNumber  : 1,
    columns     : [[
        {
            field : 'id',
            title : '自动编号',
            width : 100,
            checkbox : true
        },
        {
            field : 'name',
            title : '职位名称',
            width : 100
        },
        {
            field : 'create_time',
            title : '创建时间',
            width : 100,
            sortable : true,
        }
    ]]
});


//新增面板
postAdd.dialog({
    title       : '新增面板',
    width       : 400,
    height      : 190,
    iconCls     : 'icon-newadd',
    closed      : true,
    modal       : true,
    maximizable : true,
    buttons     :[
        {
            text    : '保存',
            size    : 'large',
            iconCls : 'icon-accept',
            handler : function ()
            {
                if (postAdd.form('validate'))
                {
                    $.ajax({
                        url         : ThinkPHP['MODULE'] + '/Post/register',
                        type        : 'POST',
                        data        : {
                            name : postAddName.val()
                        },
                        beforeSend  : function ()
                        {
                            $.messager.progress({
                                text : '正在处理中...'
                            })
                        },
                        success     : function (data)
                        {
                            $.messager.progress('close');
                            if (data > 0)
                            {
                                $.messager.show({
                                    title   : '操作提示',
                                    msg     : '添加成功'
                                });
                                postAdd.dialog('close');
                                post.datagrid('load');
                            } else if (data == -1) {
                                $.messager.alert('添加失败', '职位名称被占用！', 'warning', function () {
                                    postAddName.textbox('textbox').select();
                                });
                            }
                        }
                    });
                }
            }
        },{
            text    : '取消',
            size    : 'large',
            iconCls : 'icon-cross',
            handler : function ()
            {
                postAdd.dialog('close');
            }
        }],
    onClose : function ()
    {
        postAdd.form('reset');
        postAdd.dialog('center');
    }
});


//新增面板
postEdit.dialog({
    title       : '修改面板',
    width       : 400,
    height      : 190,
    iconCls     : 'icon-newedit',
    closed      : true,
    modal       : true,
    maximizable : true,
    buttons     :[
        {
            text    : '保存',
            size    : 'large',
            iconCls : 'icon-accept',
            handler : function ()
            {
                if (postEdit.form('validate'))
                {
                    $.ajax({
                        url         : ThinkPHP['MODULE'] + '/Post/update',
                        type        : 'POST',
                        data        : {
                            id   : postEditId.val(),
                            name : postEditName.val()
                        },
                        beforeSend  : function ()
                        {
                            $.messager.progress({
                                text : '正在处理中...'
                            })
                        },
                        success     : function (data)
                        {
                            $.messager.progress('close');
                            if (data > 0)
                            {
                                $.messager.show({
                                    title   : '操作提示',
                                    msg     : '修改成功'
                                });
                                postEdit.dialog('close');
                                post.datagrid('reload');
                            } else if (data == -1) {
                                $.messager.alert('修改失败', '职位名称被占用！', 'warning', function () {
                                    postEditName.textbox('textbox').select();
                                });
                            } else if (data == 0) {
                                $.messager.alert('修改失败', '尚未有任何修改！', 'warning', function () {
                                    postEditName.textbox('textbox').select();
                                });
                            }
                        }
                    });
                }
            }
        },{
            text    : '取消',
            size    : 'large',
            iconCls : 'icon-cross',
            handler : function ()
            {
                postEdit.dialog('close');
            }
        }],
    onClose : function ()
    {
        postEdit.form('reset');
        postEdit.dialog('center');
    }
});


//工具条操作
toolOpt = {
    add : function ()
    {
        postAdd.dialog('open');
    },
    edit : function ()
    {
        var rows = post.datagrid('getSelections');
        if (rows.length == 1)
        {
            postEdit.dialog('open');
            $.ajax({
                url         : ThinkPHP['MODULE'] + '/Post/getOne',
                type        : 'POST',
                data        : {
                    id : rows[0].id
                },
                beforeSend  : function ()
                {
                    $.messager.progress({
                        text : '正在处理中...'
                    })
                },
                success     : function (data)
                {
                    $.messager.progress('close');
                    if (data)
                    {
                        postEdit.form('load',{
                            id  : data.id,
                            name: data.name
                        })
                    } else {
                        $.messager.alert('操作警告','没有获取到相应数据！','warning');
                    }
                }
            });
        } else {
            $.messager.alert('操作警告','编辑记录必须只能选定一条数据！','warning');
        }
    },
    remove  : function ()
    {
        var rows = post.datagrid('getSelections');
        if (rows.length > 0)
        {
            $.messager.confirm('确认操作','你真的要删除所选的 <strong>' + rows.length + '</strong> 记录吗？',function (flag){
                if (flag)
                {
                    var ids = [];
                    for (var i = 0; i < rows.length; i++){
                        ids.push(rows[i].id);
                    }
                    $.ajax({
                        url         : ThinkPHP['MODULE'] + '/Post/remove',
                        type        : 'POST',
                        data        : {
                            id : ids.join(',')
                        },
                        beforeSend  : function ()
                        {
                            $.messager.progress({
                                text : '正在处理中...'
                            });
                            //post.datagrid('loading');
                        },
                        success     : function (data)
                        {
                            $.messager.progress('close');
                            //post.datagrid('loaded');
                            if (data)
                            {
                                post.datagrid('reload');
                                $.messager.show({
                                    title : '操作提醒',
                                    msg   : data + '条数据被成功删除！'
                                });
                            } else {
                                $.messager.alert('删除失败','没有删除任何数据！','warning');
                            }
                        }
                    });
                }

            });
        } else {
            $.messager.alert('操作警告','删除记录必须一条或以上的数据！','warning');
        }
    },
    reload  : function ()
    {
        post.datagrid('reload');
    },
    redo    : function ()
    {
        post.datagrid('unselectAll');
    },
    search : function ()
    {
        if (postTool.form('validate'))
        {
            post.datagrid('load',{
                keywords : postSearchKeywords.textbox('getValue'),
                dateType : postSearchDateType.combobox('getValue'),
                dateFrom : postSearchDateFrom.datebox('getValue'),
                dateTo   : postSearchDateTo.datebox('getValue')
            });
        }
    },
    reset : function ()
    {
        postSearchKeywords.textbox('clear');
        postSearchDateType.combobox('clear').combobox('disableValidation');
        postSearchDateFrom.datebox('clear');
        postSearchDateTo.datebox('clear');
        this.search();
        post.datagrid('sort',{
            sortName : 'create_time',
            sortOrder : 'DESC'
        });
    }
};

/*查询字段区域*/
postSearchKeywords.textbox({
    width : 150,
    prompt: '职位'
});

//时间类型旋转
postSearchDateType.combobox({
    width : 100,
    editable : false,
    prompt : '时间类型',
    data : [{
        id : 'create_time',
        text : '创建时间'
    }],
    valueField : 'id',
    textField : 'text',
    required : true,
    novalidate : true,
    panelHeight : 'auto',
    tipPosition : 'left',
    missingMessage : '请选择时间类型'
});

//查询时间对象
postDate = {
    width : 100,
    editable : false,
    onSelect : function ()
    {
        if(postSearchDateType.combobox('enableValidation').combobox('isValid')==false)
        {
            postSearchDateType.combobox('showPanel');
        }
    }
};

//起始时间
postDate.prompt = '起始时间';
postSearchDateFrom.datebox(postDate);

//截止时间
postDate.prompt = '截止时间';
postSearchDateTo.datebox(postDate);

/*表单字段区域*/

//职位名称

postName = {
    width : 220,
    height : 32,
    required : true,
    validType : 'length[2,20]',
    missingMessage : '请输入职位名称',
    invalidMessage : '职位名称2-20位之间'
};

//新增职位
postAddName.textbox(postName);
//修改职位
postEditName.textbox(postName);



