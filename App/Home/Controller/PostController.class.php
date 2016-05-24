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
    //加载职位部门模板
    public  function index()
    {
        $this->display();
    }

    //获取职位部门列表
    public function getList()
    {
        if (IS_AJAX)
        {
            $Post = D('Post');
            $this->ajaxReturn($Post->getList(I('post.page'),I('post.rows'),I('post.order'),I('post.sort')));
        } else {
            $this->error('非法操作！');
        }
    }
}