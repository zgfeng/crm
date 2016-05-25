/**
 * Created by zgfeng on 2016/5/24.
 */

//初始化变量
var post = $('#post'),
    postAdd = $('#post-add'),
    postAddName = $('#post-add-name'),
    postTool;

//浏览器改变时触发
$(window).resize(function () {
    postAdd.dialog('center');
});


//datagrid组件展示数据列表
post.datagrid({
    url : ThinkPHP['MODULE'] + '/' + '/Post/getList',
    fit : true,
    fitColumns : true,
    striped :   true,
    rownumbers : true,
    border : false,
    toolbar : '#post-tool',
    pagination : true,
    pageSize :20,
    pageList :[10,20,30,40,50],
    pageNumber :1,
    sortName : 'create_time',
    sortOrder : 'DESC',
    columns : [[
        {
            field : 'id',
            title : '编号',
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
            sortable : true
        }
    ]]
});

//工具条操作
postTool = {
    add : function()
    {
        postAdd.dialog('open');
    }
};

//新增面板
postAdd.dialog({
    width       : 400,
    height      : 190,
    title       : '新增职位',
    iconCls     : 'icon-newadd',
    modal       : true,
    closed      : true,
    maximizable : true,
    buttons     : [
        {
            text    : '保存',
            iconCls : 'icon-accept',
            size    : 'large',
            handler : function ()
            {
                alert('');
            }
        },
        {
            text    : '取消',
            size    : 'large',
            iconCls : 'icon-cross',
            handler :function ()
            {
                postAdd.dialog('close');
            }
        }
    ],
    onClose     : function ()
    {
        postAdd.form('reset');
        postAdd.dialog('center');
    }
});

//新增名称
postAddName.textbox({
    width           : 220,
    height          : 32,
    required        : true,
    validType       : 'length[2,20]',
    missingMessage  : '请输入职位名称',
    invalidMessage  : '职位名称2-20位'
});

