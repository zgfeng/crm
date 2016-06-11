<?php
namespace Home\Controller;

class IndexController extends HomeController
{
    //加载菜单导航
    public function getTree()
    {
        $this->ajaxReturn(D('Nav')->getTree());
    }
}