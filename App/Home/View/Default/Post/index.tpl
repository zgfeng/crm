<!--数据列表-->
<table id="post"></table>
<!--工具条操作-->
<form id="post-tool">
    <div>
        <a href="javascript:void (0)" class="easyui-linkbutton" plain="true" iconCls="icon-newadd" onclick="postTool.add();">新增</a>
    </div>
</form>
<!--新增面板-->
<form id="post-add">
    <table class="form-table" style="max-width:420px;">
        <tbody>
        <tr>
            <td class="label" style="padding:15px 0 0 0;">
                <label for="post-add-name" class="form-label">职位名称：</label>
            </td>
            <td class="input" style="padding:15px 0 0 0;">
                <input type="text" id="post-add-name">
            </td>
        </tr>
        </tbody>
    </table>
</form>
<!--加载js-->
<script src="__JS__/post.js"></script>