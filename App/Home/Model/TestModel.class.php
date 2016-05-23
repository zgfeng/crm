<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/5/23
 * Time: 9:36
 */
namespace Home\Model;

use Think\Model;

class TestModel extends Model
{
    function getData()
    {
        return 'this is right!';
    }
}