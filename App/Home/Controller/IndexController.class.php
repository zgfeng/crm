<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){

        $this->show();
    }

    //加载菜单导航
    public function getTree()
    {
        $this->ajaxReturn(D('Nav')->getTree());
    }
}