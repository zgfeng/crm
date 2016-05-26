<?php
/**
 * Created by PhpStorm.
 * User: zgfeng
 * Date: 2016/5/24
 * Time: 13:08
 */
namespace Home\Controller;

use Think\Controller;

class PostController extends Controller
{

    //加载主页面
    public function index()
    {
        $this->display();
    }

    //加载数据列表
    public function getList()
    {
        if (IS_AJAX)
        {
            $Post = D('Post');
            $this->ajaxReturn($Post->getList(I('post.page'), I('post.rows'), I('post.sort'), I('post.order')));
        } else {
            $this->error('非法操作！');
        }
    }

    //新增操作
    public function register()
    {
        if (IS_AJAX)
        {
            $Post = D('Post');
            echo $Post->register(I('post.name'));
        } else {
            $this->error('非法操作！');
        }
    }

}