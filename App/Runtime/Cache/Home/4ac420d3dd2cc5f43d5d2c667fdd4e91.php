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
<script src="/crm/Public/easyui/jquery.min.js"></script>
<script src="/crm/Public/easyui/jquery.easyui.min.js"></script>
<script src="/crm/Public/easyui/locale/easyui-lang-zh_CN.js"></script>
<script src="/crm/Public/js/index.js"></script>
</body>
</html>