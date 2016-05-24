<?php
/**
 * Created by PhpStorm.
 * User: zgfeng
 * Date: 2016/5/24
 * Time: 13:29
 */

namespace Home\Model;


use Think\Model;

class PostModel extends Model
{

    //获取职位部门列表
    public function getList($page,$rows,$order,$sort)
    {
        $object = $this->field('id,name,create_time')
                        ->order(array($sort=>$order))
                        ->limit(($rows*($page - 1)),$rows)
                        ->select();

        return array(
            'total'=>$this->count(),
            'rows'=>$object ? $object : ''
        );
    }
}