<!--数据列表-->
<table id="post"></table>

<!--工具条-->
<form id="post-tool" style="padding: 5px;">
    <div>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-newadd" onclick="postTool.add()">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" iconCls="icon-newedit" onclick="postTool.edit()">修改</a>
    </div>
</form>


<!--新增面板-->
<form id="post-add">
    <table class="form-table" style="max-width: 420px;">
        <tbody>
        <tr>
            <td class="label">
                <label for="post-add-name" class="form-label">职位名称：</label>
            </td>
            <td class="input">
                <input type="text" id="post-add-name">
            </td>
        </tr>
        </tbody>
    </table>
</form>

<!--修改面板-->
<form id="post-edit">
    <input type="hidden" id="post-edit-id" name="id">
    <table class="form-table" style="max-width: 420px;">
        <tbody>
        <tr>
            <td class="label">
                <label for="post-edit-name" class="form-label">职位名称：</label>
            </td>
            <td class="input">
                <input type="text" id="post-edit-name" name="name">
            </td>
        </tr>
        </tbody>
    </table>
</form>

<!--JS-->
<script type="text/javascript" src="__JS__/post.js"></script>