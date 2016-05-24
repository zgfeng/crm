/**
 * Created by zgfeng on 2016/5/24.
 */

//datagrid组件展示数据列表
$('#post').datagrid({
    url : ThinkPHP['MODULE'] + '/' + '/Post/getList',
    fit : true,
    fitColumns : true,
    striped :   true,
    rownumbers : true,
    border : false,
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


