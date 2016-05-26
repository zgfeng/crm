/**
 * Created by zgfeng on 2016/5/24.
 */


var post = $('#post'),
    postAdd = $('#post-add'),
    postAddName = $('#post-add-name'),
    postTool;


//浏览器改变时触发
$(window).resize(function () {
    postAdd.dialog('center');
});


//表格数据列表
post.datagrid({
    url : ThinkPHP['MODULE'] + '/Post/getList',
    fit : true,
    fitColumns : true,
    rownumbers : true,
    border : false,
    sortName : 'create_time',
    sortOrder : 'DESC',
    toolbar : '#post-tool',
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
            field : 'name',
            title : '职位名称',
            width : 100
        },
        {
            field : 'create_time',
            title : '创建时间',
            width : 100
        }
    ]]
});


//新增面板
postAdd.dialog({
    title : '新增面板',
    width: 400,
    height: 190,
    iconCls : 'icon-newadd',
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
                if (postAdd.form('validate'))
                {
                    $.ajax({
                        url : ThinkPHP['MODULE'] + '/Post/register',
                        type : 'POST',
                        data : {
                            name : postAddName.val()
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
            text : '取消',
            size : 'large',
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



//工具条操作
postTool = {
    add : function ()
    {
        postAdd.dialog('open');
    }
};


/*表单字段区域*/

//新增职位
postAddName.textbox({
    width : 220,
    height : 32,
    required : true,
    validType : 'length[2,20]',
    missingMessage : '请输入职位名称',
    invalidMessage : '职位名称2-20位之间'
});

