<?php
/**
 * Created by PhpStorm.
 * User: zgfeng
 * Date: 2016/5/24
 * Time: 13:08
 */
namespace Home\Controller;

use Home\Model\PostModel;
use Think\Controller;

class PostController extends Controller
{
    //实例化模型
    private function obj()
    {
        return new PostModel('post');
    }

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
            //$Post = new PostModel('Post');
            $this->ajaxReturn($this->obj()->getList(I('post.page'), I('post.rows'), I('post.sort'), I('post.order')));
        } else {
            $this->error('非法操作！');
        }
    }

    //新增操作
    public function register()
    {
        if (IS_AJAX)
        {
            //$Post = D('Post');
            echo $this->obj()->register(I('post.name'));
        } else {
            $this->error('非法操作！');
        }
    }

    //根据ID获取一条可修改的记录
    public function getOne()
    {
        if (IS_AJAX)
        {
            //$Post = D('Post');
            $this->ajaxReturn($this->obj()->getOne(I('post.id')));
        } else {
            $this->error('非法操作！');
        }
    }

    //根据ID修改一条记录
    public function update()
    {
        if (IS_AJAX)
        {
            //$Post = D('Post');
            echo $this->obj()->update(I('post.id'),I('post.name'));
        } else {
            $this->error('非法操作！');
        }
    }

    //根据ID集合删除记录
    public function remove()
    {
        if (IS_AJAX)
        {
            //$Post = D('Post');
            echo $this->obj()->remove(I('post.id'));
        } else {
            $this->error('非法操作！');
        }
    }

}