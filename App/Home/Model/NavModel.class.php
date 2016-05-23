<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/5/23
 * Time: 11:57
 */
namespace Home\Model;

use Think\Model;

class NavModel extends Model
{
    public function getTree()
    {
        //得到所有节点
        $object = $this->field('id,text,url,iconCls,nid')->select();

        //创建一个树数组
        $tree = array();

        //先筛选出根节点
        foreach ($object as $key => $value)
        {
            if($value['nid'] == 0) {
                $tree[] = $value;
            }
        }

        //将子节点合并到对应的根节点
        foreach ($tree as $treeKey => $treeValue)
        {
            foreach ($object as $objectKey=>$objectValue)
            {
                if ($treeValue['id'] == $objectValue['nid'])
                {
                    $tree[$treeKey]['children'][] = $objectValue;
                }
            }
        }

        return $tree;
    }
}