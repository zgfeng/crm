<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <title>CRM管理系统</title>
    <link rel="stylesheet" href="__EASYUI__/themes/bootstrap/easyui.css">
    <link rel="stylesheet" href="__EASYUI__/themes/icon.css">
    <link rel="stylesheet" href="__CSS__/index.css">
</head>
<script>
    var ThinkPHP = {
        'MODULE' : '__MODULE__'
    };
</script>
<body class="easyui-layout">
<!--软件头部-->
<div data-options="region:'north',split:true,border:false" class="layout-north">
    <div class="logo">
        <img src="__IMG__/logo.png" alt="CRM客户关系管理系统">
    </div>
    <div class="info">
        <a href=""style="color:#fff">退出</a>
    </div>
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
<script src="__EASYUI__/jquery.min.js"></script>
<script src="__EASYUI__/jquery.easyui.min.js"></script>
<script src="__EASYUI__/locale/easyui-lang-zh_CN.js"></script>
<script src="__JS__/index.js"></script>
</body>
</html>