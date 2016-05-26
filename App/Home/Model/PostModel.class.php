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
    //自动验证
    protected $_validate = array(
        //职位2-20位之间
        array('name', '2,20', '职位名称长度不合法', self::VALUE_VALIDATE, 'length', self::MODEL_BOTH),
        //职位被占用
        array('name', '', '职位名称被占用', self::VALUE_VALIDATE, 'unique', self::MODEL_BOTH)
    );

    //获取数据列表
    public function getList($page, $rows, $sort, $order)
    {
        $object = $this->field('id,name,create_time')
            ->order(array($sort=>$order))
            ->limit(($rows * ($page - 1)), $rows)
            ->select();

        return array(
            'total'=>$this->count(),
            'rows'=>$object ? $object : ''
        );
    }

    //新增操作
    public function register($name)
    {
        $addData = array(
            'name'=>$name,
            'create_time'=>getTime()
        );

        if ($this->create($addData))
        {
            $id = $this->add($addData);
            return $id ? $id : 0;
        } else {
            if ($this->getError() == '职位名称被占用')
            {
                return -1;
            }
            return $this->getError();
        }
    }

}