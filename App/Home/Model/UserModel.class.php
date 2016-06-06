<?php
/**
 * Created by www.zgfeng.net
 * User: 张光锋
 * Date: 2016/6/4
 * Time: 15:45
 */
namespace Home\Model;
use Think\Model;

class UserModel extends Model
{
    //自动验证
    protected $_validate = array(
        //帐号2-20位之间
        array('accounts', '2,20', '帐号名称长度不合法', self::EXISTS_VALIDATE, 'length', self::MODEL_INSERT),
        //职位被占用
        array('accounts', '', '帐号名称被占用', self::EXISTS_VALIDATE, 'unique', self::MODEL_INSERT),
        //新增密码6-30
        array('password', '6,30', '密码长度不合法', self::EXISTS_VALIDATE, 'length', self::MODEL_INSERT),

        //修改密码6-30，可以空
        array('password', '6,30', '密码长度不合法', self::VALUE_VALIDATE, 'length', self::MODEL_INSERT),

        //确认密码是否与密码相同
        array('notpassword', 'password', '确认密码不正确', self::EXISTS_VALIDATE, 'confirm', self::MODEL_BOTH),

        //登录验证：帐号2-20位之间
        array('accounts', '2,20', '登录帐号长度不合法', self::EXISTS_VALIDATE, 'length', 4),
        //登录验证：密码6-30位之间
        array('password', '6,30', '登录密码长度不合法', self::EXISTS_VALIDATE, 'length', 4),
    );

    //获取数据列表
    public function getList($page, $rows, $sort, $order, $keywords, $dateType, $dateFrom, $dateTo, $state)
    {
        $map = array();

        if ($keywords)
        {
            $map['accounts'] = array('like', '%'.$keywords.'%');
        }

        if ($dateFrom && $dateTo)
        {
            $map["$dateType"] = array(array('egt', $dateFrom), array('elt', $dateTo));
        } else if ($dateFrom) {
            $map["$dateType"] = array('egt', $dateFrom);
        } else if ($dateTo) {
            $map["$dateType"] = array('elt', $dateTo);
        }


        //将审核状态组入SQL
        if ($state)
        {
            $map['state'] = $state;
        }

        $object = $this->field('id,accounts,last_login_time,last_login_ip,login_count,state,create_time')
            ->where($map)
            ->order(array($sort=>$order))
            ->limit(($rows * ($page - 1)), $rows)
            ->select();

        return array(
            'total'=>$this->count(),
            'rows'=>$object ? $object : ''
        );
    }

    //新增操作
    public function register($accounts, $password, $notpassword = '', $not = 0, $state = '')
    {
        $addData = array(
            'accounts'      =>  $accounts,
            'password'      =>  $password,
            'notpassword'   =>  $notpassword,
            'state'         =>  $state ? $state : '正常',
            'create_time'   =>  getTime()
        );

        //没有确认密码，直接unset不验证
        if ($not == 0)
        {
            unset($addData['notpassword']);
        }

        if ($this->create($addData))
        {
            $addData['password'] = sha1($password);
            $id = $this->add($addData);
            return $id ? $id : 0;
        } else {
            if ($this->getError() == '帐号名称被占用')
            {
                return -1;
            }
            return $this->getError();
        }
    }

    //根据ID获取一条记录
    public function getOne($id)
    {
        $map['id'] = $id;
        return $this->field('id,accounts,state')->where($map)->find();
    }

    //根据ID修改一条记录
    public function update($id, $password, $state)
    {
        $updateData = array(
            'id'=>$id,
            'password'=>$password,
            'state'=>$state
        );

        if ($this->create($updateData))
        {
            if (empty($password))
            {
                unset($updateData['password']);
            } else {
                $updateData['password'] = sha1($password);
            }
            $id = $this->save($updateData);
            return $id ? $id : 0;
        }
    }

    //根据ID修改帐号密码
    public function editPassword($id, $password, $notpassword)
    {
        $updateData = array(
            'id'            =>  $id,
            'password'      =>  $password,
            'notpassword'   =>  $notpassword
        );

        if ($this->create($updateData))
        {
            $updateData['password'] = sha1($password);
            $id = $this->save($updateData);
            return $id ? $id : 0;
        } else {
            return $this->getError();
        }
    }

    //根据ID集合删除记录
    public function remove($ids)
    {
        return $this->delete($ids);
    }


    //审核状态
    public function state($id, $state)
    {
        $StateData = array(
            'id'=>$id,
            'state'=>$state
        );

        return $this->save($StateData);
    }

    //验证帐号密码
    public function checkUser($accounts, $password)
    {
        $CheckData = array(
            'accounts'  =>  $accounts,
            'password'  =>  $password
        );

        if ($this->create($CheckData, 4))
        {
            $map = array(
                'accounts'  =>  $accounts,
                'password'  =>  sha1($password)
            );

            $object = $this ->field('id,accounts,state')
                ->where($map)
                ->find();

            if ($object)
            {

                //冻结帐号返回-1
                if ($object['state'] == '冻结') return -1;

                //登录成功，写入session
                session('admin', array(
                    'id'        =>  $object['id'],
                    'accounts'  =>  $object['accounts']
                ));

                //更新登录次数
                $LoginUpdate = array(
                    'id'                =>  $object['id'],
                    'last_login_time'   =>  getTime(),
                    'last_login_ip'     =>  get_client_ip(),
                    'login_count'       =>  array('exp', 'login_count+1')
                );

                //保存更新
                $this->save($LoginUpdate);

                //返回登录的ID
                return $object['id'];

            } else {
                //验证失败，返回0
                return 0;
            }
        } else {
            return $this->getError();
        }
    }

}
 