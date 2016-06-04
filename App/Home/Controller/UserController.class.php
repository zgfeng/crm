<?php
/**
 * Created by www.zgfeng.net
 * User: 张光锋
 * Date: 2016/6/4
 * Time: 15:47
 */
namespace Home\Controller;
use Think\Controller;

class UserController extends Controller
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
            $User = D('User');
            $this->ajaxReturn($User->getList(I('post.page'), I('post.rows'), I('post.sort'), I('post.order'),
                I('post.keywords'), I('post.dateType'), I('post.dateFrom'), I('post.dateTo'),
                I('post.state')));
        } else {
            $this->error('非法操作！');
        }
    }

    //新增操作
    public function register()
    {
        if (IS_AJAX)
        {
            $User = D('User');
            echo $User->register(I('post.accounts'), I('post.password'));
        } else {
            $this->error('非法操作！');
        }
    }

    //根据ID获取一条记录
    public function getOne()
    {
        if (IS_AJAX)
        {
            $User = D('User');
            $this->ajaxReturn($User->getOne(I('post.id')));
        } else {
            $this->error('非法操作！');
        }
    }

    //根据ID修改一条记录
    public function update()
    {
        if (IS_AJAX)
        {
            $User = D('User');
            echo $User->update(I('post.id'), I('post.password'), I('post.state'));
        } else {
            $this->error('非法操作！');
        }
    }

    //根据ID集合删除记录
    public function remove()
    {
        if (IS_AJAX)
        {
            $User = D('User');
            echo $User->remove(I('post.ids'));
        } else {
            $this->error('非法操作！');
        }
    }

    //审核状态
    public function state()
    {
        if (IS_AJAX)
        {
            $User = D('User');
            echo $User->state(I('post.id'), I('post.state'));
        } else {
            $this->error('非法操作！');
        }
    }

}
 