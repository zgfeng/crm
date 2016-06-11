<?php
/**
 * Created by www.zgfeng.net
 * User: 张光锋
 * Date: 2016/6/11
 * Time: 19:55
 */
namespace Home\Controller;

use Think\Controller;

class HomeController extends Controller
{
    public function index()
    {
        if (session('admin'))
        {
            $this->display();
        } else {
            $this->redirect('Login/logout');
        }
    }
}
 