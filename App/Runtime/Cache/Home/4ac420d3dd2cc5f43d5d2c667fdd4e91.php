<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <title>CRM管理系统</title>
    <link rel="stylesheet" href="/crm/Public/easyui/themes/bootstrap/easyui.css">
    <link rel="stylesheet" href="/crm/Public/easyui/themes/icon.css">
    <link rel="stylesheet" href="/crm/Public/css/index.css">
</head>
<script>
    var ThinkPHP = {
        'MODULE' : '/crm/Home'
    };
</script>
<body class="easyui-layout">
<!--软件头部-->
<div data-options="region:'north',split:true,border:false" class="layout-north">
    <div class="logo">
        <img src="/crm/Public/img/logo.png" alt="CRM客户关系管理系统">
    </div>
    <div class="info">
        您好，<?php echo session('admin')['accounts'];?>！
        <a href="javascript:void(0)" class="easyui-linkbutton" id="btn-edit" iconCls="icon-edit">修改密码</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" id="btn-logout" iconCls="icon-remove">登录系统</a>
    </div>
    <!--修改密码-->
    <form id="edit" class="easyui-dialog">
        <input type="hidden" id="edit-id" value="<?php echo session('admin')['id'];?>">
        <table class="form-table" style="max-width: 420px;">
            <tbody>
            <tr>
                <td class="label">
                    <label for="edit-accounts" class="form-label">帐号：</label>
                </td>
                <td class="input">
                    <input type="text" id="edit-accounts" class="easyui-textbox" value="<?php echo session('admin')['accounts'];?>">
                </td>
            </tr>
            <tr>
                <td class="label">
                    <label for="edit-password" class="form-label">密码：</label>
                </td>
                <td class="input">
                    <input type="password" id="edit-password" class="easyui-textbox">
                </td>
            </tr>
            <tr>
                <td class="label">
                    <label for="edit-notpassword" class="form-label">确认密码：</label>
                </td>
                <td class="input">
                    <input type="password" id="edit-notpassword" class="easyui-textbox">
                </td>
            </tr>
            </tbody>
        </table>
    </form>
</div>
<!--软件导航-->
<div data-options="region:'west',title:'导航',split:true,border:true,iconCls:'icon-world'" class="layout-west">
    <div id="tree"></div>
</div>
<!--软件主体-->
<div data-options="region:'center',border:true" class="layout-center">
    <div id="tabs">
        <div title="起始页" iconCls="icon-house">
            <p>欢迎来到CRM管理系统！</p>
        </div>
    </div>
</div>
<!--软件底部-->
<div data-options="region:'south',split:true,border:false" class="layout-south">
    ©2010-2016 ZGFeng技术. Powered by ThinkPHP and EasyUI.
</div>

<!--右键菜单-->
<div id="menu" class="easyui-menu">
    <div class="closecur">关闭</div>
    <div class="closeall">关闭所有</div>
    <div class="closeother" iconCls="icon-cross">关闭其他所有</div>
</div>
<script src="/crm/Public/easyui/jquery.min.js"></script>
<script src="/crm/Public/easyui/jquery.easyui.min.js"></script>
<script src="/crm/Public/easyui/locale/easyui-lang-zh_CN.js"></script>
<script src="/crm/Public/js/index.js"></script>
</body>
</html>