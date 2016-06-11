<?php
/**
 * Created by PhpStorm.
 * User: 嚣张哥
 * Date: 2016/6/6
 * Time: 9:49
 */
namespace Home\Controller;
use Think\Controller;

class LoginController extends Controller
{

    //登录页
    public function index()
    {
        if (session('admin')){
            $this->redirect('Index/index');
        } else {
            $this->display();
        }
    }

    //验证帐号密码
    public function checkUser()
    {
        if (IS_AJAX)
        {
            $User = D('User');
            echo $User->checkUser(I('post.accounts'), I('post.password'));
        } else {
            $this->error('非法操作！');
        }
    }

    //登出系统
    public function logout()
    {
        session('admin', null);
        $this->redirect('Login/index');
    }

}